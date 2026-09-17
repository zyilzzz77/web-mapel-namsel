"use client";

import { useMemo, useRef, type CSSProperties } from "react";
import { motion, useInView, type Variants } from "framer-motion";

export type WordSegment = { text: string; accent?: boolean };

type Token = { kind: "word" | "space" | "br"; text: string; accent?: boolean };

type WordTypewriterProps = {
  segments?: WordSegment[];
  text?: string;
  wordDelay?: number;
  duration?: number;
  amount?: number;
  className?: string;
};

const wordStyle: CSSProperties = { display: "inline-block" };

function tokenize(segments: WordSegment[]): Token[] {
  const tokens: Token[] = [];
  for (const segment of segments) {
    for (const chunk of segment.text.match(/\S+|\s+/g) ?? []) {
      if (/^\s/.test(chunk)) {
        for (const char of chunk) {
          tokens.push(char === "\n" ? { kind: "br", text: "\n" } : { kind: "space", text: " " });
        }
      } else {
        tokens.push({ kind: "word", text: chunk, accent: segment.accent });
      }
    }
  }
  return tokens;
}

export default function WordTypewriter({ segments, text, wordDelay = 0.12, duration = 0.5, amount = 0.3, className }: WordTypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount });
  const tokens = useMemo(() => tokenize(segments ?? [{ text: text ?? "" }]), [segments, text]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: wordDelay } },
  };

  const word: Variants = {
    hidden: { opacity: 0, y: "0.45em" },
    show: { opacity: 1, y: 0, transition: { duration, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.span ref={ref} className={className} variants={container} initial="hidden" animate={inView ? "show" : "hidden"}>
      {tokens.map((token, index) => {
        if (token.kind === "space") return " ";
        if (token.kind === "br") return <br key={index} />;
        const wordElement = <motion.span key={index} variants={word} style={wordStyle}>{token.text}</motion.span>;
        return token.accent ? <em key={index}>{wordElement}</em> : wordElement;
      })}
    </motion.span>
  );
}
