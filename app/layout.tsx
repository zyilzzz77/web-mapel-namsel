import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sejarah+ | Hindia Belanda",
  description: "Belajar sejarah Hindia Belanda melalui materi interaktif, perlawanan rakyat, dan kuis.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
