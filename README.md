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
    MaterialCard.tsx             kartu materi dengan gambar
public/
  images/                        foto historis untuk kartu materi
  pergerakan-nasional-1900-1928.pdf   e-book
```

## Sumber gambar

| Berkas | Sumber | Lisensi |
| --- | --- | --- |
| `public/images/kesadaran-baru.jpg` | [STOVIA, Wereldmuseum Amsterdam](https://commons.wikimedia.org/wiki/File:COLLECTIE_TROPENMUSEUM_Leerlingen_van_de_School_tot_Opleiding_van_Indische_Artsen_(STOVIA)_Doctor_Jawa_TMnr_60047128.jpg) | Domain publik |
| `public/images/bergerak-bersama.jpg` | [Rapat Sarekat Islam Blitar](https://commons.wikimedia.org/wiki/File:Oprichtingsvergadering_van_de_afdeling_van_de_Sarekat_Islam_te_Blitar.jpg) | CC BY 4.0 |
| `public/images/sumpah-pemuda.jpg` | [Poetoesan Congres Pemoeda-Pemoeda Indonesia 1928](https://commons.wikimedia.org/wiki/File:Historical_Indonesian_Youth_Pledge,_Sumpah_Pemuda_in_1928.jpg) | CC BY 4.0 |

## Deploy ke Vercel

1. Import repo GitHub ini di [vercel.com/new](https://vercel.com/new).
2. Vercel otomatis mendeteksi framework **Next.js** — build command `next build`, tanpa environment variable.
3. Setiap push ke branch `main` akan memicu deploy produksi; branch lain menjadi preview deployment.
