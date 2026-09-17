import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jejak Bangsa | Kuis Pergerakan Nasional Indonesia",
  description: "Materi ringkas, e-book, dan kuis pergerakan nasional Indonesia 1900–1928, dari Budi Utomo hingga Sumpah Pemuda.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
