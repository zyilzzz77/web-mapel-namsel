"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

const SPREAD_QUERY = "(min-width: 1024px)";
const FLIP_MS = 560;
const SNAP_MS = 240;
const MIN_MS = 230;
const TURN_RATIO = 0.2;
const FLICK_VELOCITY = 0.5;
const DRAG_SLOP = 6;
const MAX_BOW = 14;
const SHADE = 0.72;

const pages = [
  { src: "/ebook/page-01.webp", alt: "Sampul e-book Pergerakan Nasional Indonesia 1900–1928 karya Haqqi Anna Zili, siswa XI SIJA 2" },
  { src: "/ebook/page-02.webp", alt: "Halaman pengertian pergerakan nasional Indonesia" },
  { src: "/ebook/page-03.webp", alt: "Halaman foto-foto pergerakan nasional Indonesia" },
  { src: "/ebook/page-04.webp", alt: "Halaman faktor internal dan eksternal pergerakan nasional" },
  { src: "/ebook/page-05.webp", alt: "Halaman organisasi Budi Utomo" },
  { src: "/ebook/page-06.webp", alt: "Halaman organisasi Sarekat Islam" },
  { src: "/ebook/page-07.webp", alt: "Halaman organisasi Indische Partij" },
  { src: "/ebook/page-08.webp", alt: "Halaman organisasi Perhimpunan Indonesia" },
  { src: "/ebook/page-09.webp", alt: "Halaman organisasi Muhammadiyah dan Nahdlatul Ulama" },
  { src: "/ebook/page-10.webp", alt: "Halaman organisasi pemuda daerah" },
  { src: "/ebook/page-11.webp", alt: "Halaman peran perempuan dalam pergerakan nasional" },
  { src: "/ebook/page-12.webp", alt: "Halaman Sumpah Pemuda 1928" },
  { src: "/ebook/page-13.webp", alt: "Halaman tujuan pergerakan nasional" },
  { src: "/ebook/page-14.webp", alt: "Halaman kesimpulan pergerakan nasional" },
  { src: "/ebook/page-15.webp", alt: "Halaman penutup e-book" },
];

const total = pages.length;
const lastPage = total - 1;
const lastSpreadPage = Math.floor(lastPage / 2) * 2;
const imageSizes = "(min-width: 1024px) 500px, (min-width: 520px) 460px, 100vw";

type Motion = {
  leaf: number;
  from: number;
  to: number;
  start: number;
  duration: number;
  fromRest: boolean;
  forward: boolean;
  finish: () => void;
};

type Gesture = {
  id: number;
  x: number;
  y: number;
  width: number;
  axis: "x" | "y" | null;
  leaf: number | null;
  lastX: number;
  lastTime: number;
  velocity: number;
};

function subscribeToSpread(callback: () => void) {
  const query = window.matchMedia(SPREAD_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSpreadSnapshot() {
  return window.matchMedia(SPREAD_QUERY).matches;
}

function getServerSpreadSnapshot() {
  return false;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const curveX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const curveY = (t: number) => ((ay * t + by) * t + cy) * t;
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    let t = x;
    for (let step = 0; step < 6; step += 1) {
      const delta = curveX(t) - x;
      if (Math.abs(delta) < 1e-5) return curveY(t);
      const slope = slopeX(t);
      if (Math.abs(slope) < 1e-6) break;
      t -= delta / slope;
    }
    return curveY(t);
  };
}

const easeFromRest = cubicBezier(0.4, 0.12, 0.16, 1);
const easeFromFlick = cubicBezier(0.18, 0.68, 0.24, 1);

function angleFor(forward: boolean, dx: number, width: number) {
  const turned = clamp(dx / width, -1, 1) * 180;
  return forward ? clamp(turned, -180, 0) : clamp(-180 + turned, -180, 0);
}

export default function BookFlip() {
  const isSpread = useSyncExternalStore(subscribeToSpread, getSpreadSnapshot, getServerSpreadSnapshot);
  const [rawPage, setRawPage] = useState(0);

  const bookRef = useRef<HTMLDivElement>(null);
  const leafRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef<number | null>(null);
  const pendingRef = useRef<number | null>(null);
  const gestureRef = useRef<Gesture | null>(null);
  const motionRef = useRef<Motion | null>(null);
  const rafRef = useRef<number | null>(null);
  const lockRef = useRef(false);

  const step = isSpread ? 2 : 1;
  const leafCount = isSpread ? Math.floor(total / 2) : total;
  const page = isSpread ? Math.min(Math.floor((rawPage + 1) / 2) * 2, lastSpreadPage) : Math.min(rawPage, lastPage);
  const view = isSpread ? page / 2 : page;
  const maxPage = isSpread ? lastSpreadPage : lastPage;

  const leaves = useMemo(
    () =>
      Array.from({ length: leafCount }, (_, index) => ({
        front: isSpread ? index * 2 : index,
        back: isSpread ? index * 2 + 1 : -1,
      })),
    [isSpread, leafCount],
  );

  const canPrev = page > 0;
  const canNext = page < maxPage;

  function applyStack() {
    const active = activeRef.current;
    for (let index = 0; index < leafCount; index += 1) {
      const node = leafRefs.current[index];
      if (!node) continue;
      const depth = active === index ? leafCount * 3 : index < view ? index + 1 : leafCount * 2 - index;
      node.style.zIndex = String(depth);
    }
  }

  function focusLeaf(index: number | null) {
    activeRef.current = index;
    applyStack();
  }

  function paint(index: number, angle: number, forward: boolean) {
    const node = leafRefs.current[index];
    if (!node) return;
    const strength = Math.abs(Math.sin((angle * Math.PI) / 180));
    node.style.willChange = "transform";
    node.style.transform = `rotateY(${angle.toFixed(2)}deg) translateZ(${(strength * MAX_BOW).toFixed(2)}px)`;
    node.style.setProperty("--flip-shade", (strength * SHADE).toFixed(3));
    const book = bookRef.current;
    if (!book) return;
    const shade = (strength * SHADE).toFixed(3);
    book.style.setProperty("--shade-right", forward ? shade : "0");
    book.style.setProperty("--shade-left", forward ? "0" : shade);
  }

  function clearPaint(index: number) {
    const node = leafRefs.current[index];
    if (node) {
      node.style.willChange = "";
      node.style.transform = "";
      node.style.removeProperty("--flip-shade");
    }
    const book = bookRef.current;
    if (book) {
      book.style.removeProperty("--shade-right");
      book.style.removeProperty("--shade-left");
    }
  }

  function stopMotion() {
    if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    motionRef.current = null;
  }

  function startMotion(create: () => Omit<Motion, "start">) {
    stopMotion();
    lockRef.current = true;
    const motion: Motion = { ...create(), start: -1 };
    motionRef.current = motion;
    const frame = (now: number) => {
      const current = motionRef.current;
      if (!current) return;
      if (current.start < 0) current.start = now;
      const progress = clamp((now - current.start) / current.duration, 0, 1);
      const eased = current.fromRest ? easeFromRest(progress) : easeFromFlick(progress);
      paint(current.leaf, current.from + (current.to - current.from) * eased, current.forward);
      if (progress < 1) {
        rafRef.current = window.requestAnimationFrame(frame);
        return;
      }
      rafRef.current = null;
      motionRef.current = null;
      current.finish();
    };
    rafRef.current = window.requestAnimationFrame(frame);
  }

  useLayoutEffect(() => {
    stopMotion();
    gestureRef.current = null;
    lockRef.current = false;
    activeRef.current = null;
    pendingRef.current = null;
    leafRefs.current.forEach((_, index) => clearPaint(index));
  }, [isSpread]);

  useLayoutEffect(() => {
    if (pendingRef.current !== null) {
      const index = pendingRef.current;
      pendingRef.current = null;
      activeRef.current = null;
      clearPaint(index);
      lockRef.current = false;
    }
    applyStack();
  });

  useEffect(() => () => stopMotion(), []);

  function turn(direction: 1 | -1) {
    if (lockRef.current) return;
    const next = page + direction * step;
    if (next < 0 || next > maxPage) return;
    const forward = direction === 1;
    const leaf = Math.min(view, isSpread ? next / 2 : next);
    focusLeaf(leaf);
    if (forward) {
      pendingRef.current = leaf;
      startMotion(() => ({
        leaf,
        from: 0,
        to: -180,
        duration: FLIP_MS,
        fromRest: true,
        forward: true,
        finish: () => setRawPage(next),
      }));
      return;
    }
    startMotion(() => ({
      leaf,
      from: -180,
      to: 0,
      duration: FLIP_MS,
      fromRest: true,
      forward: false,
      finish: () => setRawPage(next),
    }));
    pendingRef.current = leaf;
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (lockRef.current) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const rect = bookRef.current?.getBoundingClientRect();
    if (!rect) return;
    gestureRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      width: isSpread ? rect.width / 2 : rect.width,
      axis: null,
      leaf: null,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocity: 0,
    };
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (gesture.axis === null) {
      if (Math.abs(dx) < DRAG_SLOP && Math.abs(dy) < DRAG_SLOP) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        gestureRef.current = null;
        return;
      }
      gesture.axis = "x";
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    const elapsed = event.timeStamp - gesture.lastTime;
    if (elapsed > 0) gesture.velocity = (event.clientX - gesture.lastX) / elapsed;
    gesture.lastX = event.clientX;
    gesture.lastTime = event.timeStamp;

    const forward = dx < 0;
    const leaf = forward ? view : view - 1;
    if (forward ? !canNext : !canPrev) return;
    if (gesture.leaf !== leaf) {
      if (gesture.leaf !== null) clearPaint(gesture.leaf);
      gesture.leaf = leaf;
      focusLeaf(leaf);
    }
    paint(leaf, angleFor(forward, dx, gesture.width), forward);
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    if (!gesture || gesture.id !== event.pointerId || gesture.axis !== "x" || gesture.leaf === null) {
      if (gesture?.leaf != null) clearPaint(gesture.leaf);
      focusLeaf(null);
      return;
    }
    const leaf = gesture.leaf;
    const dx = event.clientX - gesture.x;
    const elapsed = event.timeStamp - gesture.lastTime;
    const velocity = elapsed > 0 ? (event.clientX - gesture.lastX) / elapsed : gesture.velocity;
    const forward = dx < 0;
    const angle = angleFor(forward, dx, gesture.width);
    const performed = forward ? Math.abs(angle) / 180 : 1 - Math.abs(angle) / 180;
    const flicked = forward ? velocity < -FLICK_VELOCITY : velocity > FLICK_VELOCITY;
    const next = page + (forward ? step : -step);
    const complete = next >= 0 && next <= maxPage && (performed >= TURN_RATIO || (flicked && performed > 0.02));
    const target = complete ? (forward ? -180 : 0) : forward ? 0 : -180;
    const remaining = Math.abs(target - angle) / 180;
    const boost = Math.min(0.5, Math.abs(velocity) * 0.6);
    const duration = complete
      ? clamp(MIN_MS + remaining * (FLIP_MS - MIN_MS) * (1 - boost), MIN_MS, FLIP_MS)
      : clamp(SNAP_MS * remaining, 110, SNAP_MS);

    if (complete) pendingRef.current = leaf;
    startMotion(() => ({
      leaf,
      from: angle,
      to: target,
      duration,
      fromRest: false,
      forward,
      finish: complete
        ? () => setRawPage(next)
        : () => {
            clearPaint(leaf);
            focusLeaf(null);
            lockRef.current = false;
          },
    }));
  }

  function onPointerCancel() {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    if (gesture?.leaf != null) clearPaint(gesture.leaf);
    focusLeaf(null);
  }

  const counter = isSpread
    ? view === 0
      ? `Halaman 1 dari ${total}`
      : `Halaman ${view * 2}–${view * 2 + 1} dari ${total}`
    : `Halaman ${page + 1} dari ${total}`;

  const progress = ((page + 1) / total) * 100;

  return (
    <div className="book-shell">
      <div
        className={`book${isSpread ? " is-spread" : " is-single"}`}
        ref={bookRef}
        role="group"
        aria-label={`E-book Pergerakan Nasional Indonesia 1900 sampai 1928. ${counter}. Geser halaman ke kiri atau ke kanan untuk membuka halaman lain.`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div className="book-static is-left" aria-hidden="true" />
        {isSpread && (
          <div className="book-static is-right" aria-hidden="true">
            <Image src={pages[lastPage].src} alt="" fill sizes={imageSizes} quality={80} className="book-image" />
          </div>
        )}
        <div className="book-shade is-left" aria-hidden="true" />
        <div className="book-shade is-right" aria-hidden="true" />
        {leaves.map((leaf, index) => (
          <div
            key={index}
            className={`book-leaf${index < view ? " is-flipped" : ""}`}
            ref={(node) => {
              leafRefs.current[index] = node;
            }}
          >
            <div className="book-face is-front">
              <Image src={pages[leaf.front].src} alt={pages[leaf.front].alt} fill sizes={imageSizes} quality={80} className="book-image" />
            </div>
            {leaf.back >= 0 && (
              <div className="book-face is-back">
                <Image src={pages[leaf.back].src} alt={pages[leaf.back].alt} fill sizes={imageSizes} quality={80} className="book-image" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="book-controls">
        <button type="button" className="book-nav" onClick={() => turn(-1)} disabled={!canPrev} aria-label="Halaman sebelumnya">
          <span aria-hidden="true">←</span> Sebelumnya
        </button>
        <div className="book-status">
          <span className="book-counter" aria-live="polite">{counter}</span>
          <div className="book-progress" role="progressbar" aria-label="Kemajuan membaca e-book" aria-valuenow={page + 1} aria-valuemin={1} aria-valuemax={total}>
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
        <button type="button" className="book-nav" onClick={() => turn(1)} disabled={!canNext} aria-label="Halaman berikutnya">
          Berikutnya <span aria-hidden="true">→</span>
        </button>
      </div>
      <p className="book-hint">Geser ke kiri atau ke kanan, atau pakai tombol untuk membalik halaman.</p>
    </div>
  );
}
