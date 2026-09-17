# Jejak Bangsa

Situs pembelajaran sejarah **Pergerakan Nasional Indonesia 1900–1928** — materi ringkas, e-book PDF,
dan kuis 10 soal, dari Budi Utomo hingga Sumpah Pemuda.

Dibuat dengan [Next.js](https://nextjs.org) (App Router), React 19, TypeScript, dan Tailwind CSS v4.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Script

| Perintah | Keterangan |
| --- | --- |
| `npm run dev` | Jalankan dev server |
| `npm run build` | Build untuk produksi |
| `npm run start` | Jalankan hasil build produksi |
| `npm run lint` | Jalankan ESLint |

## Struktur

```
app/
  layout.tsx                     layout root + metadata
  page.tsx                       halaman materi, e-book, dan kuis
  globals.css                    gaya global (Tailwind v4 + custom CSS)
  icon.svg                       favicon
  components/
    WordTypewriter.tsx           animasi judul per kata (framer-motion)
public/
  pergerakan-nasional-1900-1928.pdf   e-book
```

## Deploy ke Vercel

1. Import repo GitHub ini di [vercel.com/new](https://vercel.com/new).
2. Vercel otomatis mendeteksi framework **Next.js** — build command `next build`, tanpa environment variable.
3. Setiap push ke branch `main` akan memicu deploy produksi; branch lain menjadi preview deployment.
