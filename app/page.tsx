import WordTypewriter from "@/app/components/WordTypewriter";
import MaterialCard from "@/app/components/MaterialCard";
import QuizGame, { type QuizQuestion } from "@/app/components/QuizGame";

const materials = [
  {
    index: "01",
    label: "LATAR BELAKANG",
    title: "Kesadaran baru",
    body: "Perlawanan di berbagai daerah telah berlangsung lama, tetapi sering bergerak sendiri-sendiri. Pada masa Politik Etis, sebagian rakyat mendapat kesempatan belajar. Mereka mulai memakai pendidikan, pers, dan organisasi untuk menyuarakan perubahan. Gagasan nasionalisme dari luar negeri juga ikut memberi pengaruh.",
    image: "/images/kesadaran-baru.jpg",
    imageAlt: "Potret siswa School tot Opleiding van Indische Artsen (STOVIA) di Batavia, sekitar 1920-an",
  },
  {
    index: "02",
    label: "ORGANISASI",
    title: "Bergerak bersama",
    body: "Budi Utomo berdiri pada 1908 dan menjadi tonggak Kebangkitan Nasional. Sesudahnya, Sarekat Islam berkembang dari gerakan perdagangan; Indische Partij menyuarakan persatuan dan kemerdekaan; Muhammadiyah serta Taman Siswa memperluas pendidikan. Perhimpunan Indonesia dan PNI juga mempertegas cita-cita kebangsaan.",
    image: "/images/bergerak-bersama.jpg",
    imageAlt: "Rapat pembukaan cabang Sarekat Islam di Blitar pada awal abad ke-20",
  },
  {
    index: "03",
    label: "PUNCAK PERSATUAN",
    title: "Sumpah Pemuda",
    body: "Organisasi pemuda dari berbagai daerah mulai mencari titik temu sebagai satu bangsa. Dalam Kongres Pemuda II pada 28 Oktober 1928, mereka menegaskan satu tanah air, satu bangsa, dan menjunjung bahasa persatuan: Indonesia. Ikrar ini menjadi penanda penting tumbuhnya persatuan nasional.",
    image: "/images/sumpah-pemuda.jpg",
    imageAlt: "Dokumen Poetoesan Congres Pemoeda-Pemoeda Indonesia, 27-28 Oktober 1928",
    imagePosition: "top",
  },
];

const questions: QuizQuestion[] = [
  { year: "1901", topic: "Politik Etis", question: "Program Politik Etis yang ikut membuka jalan bagi lahirnya kaum terpelajar adalah …", options: ["Monopoli dagang", "Pendidikan", "Kerja paksa", "Tanam paksa"], answer: 1, explanation: "Pendidikan memberi kesempatan bagi sebagian penduduk bumiputra untuk belajar. Dari kalangan terpelajar ini tumbuh banyak gagasan pergerakan." },
  { year: "1908", topic: "Budi Utomo", question: "Organisasi apa yang berdiri pada 20 Mei 1908 dan diperingati sebagai tonggak Kebangkitan Nasional?", options: ["Budi Utomo", "Sarekat Islam", "Indische Partij", "PNI"], answer: 0, explanation: "Budi Utomo lahir pada 20 Mei 1908 melalui para pelajar STOVIA. Tanggal ini kemudian diperingati sebagai Hari Kebangkitan Nasional." },
  { year: "1912", topic: "Sarekat Islam", question: "Sarekat Islam berkembang dari perkumpulan yang mula-mula menghimpun para …", options: ["Petani tebu", "Pedagang batik", "Pegawai negeri", "Pelaut"], answer: 1, explanation: "Cikal bakal Sarekat Islam ialah Sarekat Dagang Islam, yang menghimpun pedagang muslim, terutama dalam perdagangan batik." },
  { year: "1912", topic: "Indische Partij", question: "Kelompok tokoh pendiri Indische Partij dikenal dengan sebutan …", options: ["Empat Serangkai", "Tiga Serangkai", "Panitia Sembilan", "Angkatan 45"], answer: 1, explanation: "Tiga Serangkai adalah Douwes Dekker, Tjipto Mangoenkoesoemo, dan Soewardi Soerjaningrat." },
  { year: "1912", topic: "Muhammadiyah", question: "Siapa pendiri Muhammadiyah di Yogyakarta?", options: ["K.H. Ahmad Dahlan", "H.O.S. Tjokroaminoto", "W.R. Soepratman", "Mohammad Hatta"], answer: 0, explanation: "K.H. Ahmad Dahlan mendirikan Muhammadiyah pada 1912. Organisasi ini bergerak dalam pendidikan, pelayanan sosial, dan pembaruan Islam." },
  { year: "1922", topic: "Taman Siswa", question: "Tokoh yang mendirikan perguruan Taman Siswa adalah …", options: ["Sutan Sjahrir", "Ki Hajar Dewantara", "Soekarno", "Dr. Soetomo"], answer: 1, explanation: "Ki Hajar Dewantara mendirikan Taman Siswa pada 1922 untuk memajukan pendidikan bangsa." },
  { year: "1927", topic: "PNI", question: "Partai Nasional Indonesia (PNI) yang berdiri pada 1927 erat kaitannya dengan tokoh …", options: ["Soekarno", "Pattimura", "Pangeran Diponegoro", "Cornelis de Houtman"], answer: 0, explanation: "Soekarno merupakan tokoh utama pendirian PNI pada 1927. Organisasi ini memperjuangkan kemerdekaan Indonesia." },
  { year: "1928", topic: "Sumpah Pemuda", question: "Sumpah Pemuda dihasilkan dalam peristiwa …", options: ["Kongres Pemuda II", "Kongres Budi Utomo I", "Sidang BPUPKI", "Konferensi Meja Bundar"], answer: 0, explanation: "Kongres Pemuda II berlangsung pada 27–28 Oktober 1928 dan melahirkan ikrar Sumpah Pemuda." },
  { year: "1928", topic: "Persatuan", question: "Bahasa yang dijunjung sebagai bahasa persatuan dalam Sumpah Pemuda adalah …", options: ["Bahasa Jawa", "Bahasa Melayu", "Bahasa Indonesia", "Bahasa Belanda"], answer: 2, explanation: "Salah satu isi ikrar Sumpah Pemuda ialah menjunjung bahasa persatuan, bahasa Indonesia." },
  { year: "1928", topic: "Indonesia Raya", question: "Siapa pencipta lagu Indonesia Raya yang diperdengarkan pada Kongres Pemuda II?", options: ["Ismail Marzuki", "W.R. Soepratman", "C. Simanjuntak", "Kusbini"], answer: 1, explanation: "W.R. Soepratman memperdengarkan Indonesia Raya dengan biola pada Kongres Pemuda II tahun 1928." },
];

export default function Home() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <div className="brand-mark"><span aria-hidden="true">✦</span> Jejak Bangsa</div>
        <nav className="topbar-nav" aria-label="Navigasi utama"><a href="#materi">Materi</a><a href="#ebook">E-book</a><a href="#kuis">Kuis</a></nav>
      </header>
      <section className="learning-section" id="materi">
        <div className="learning-heading">
          <p className="eyebrow">MATERI SINGKAT · 1900–1928</p>
          <h1><WordTypewriter segments={[{ text: "Dari organisasi\n" }, { text: "menuju " }, { text: "persatuan.", accent: true }]} /></h1>
          <p>Pada awal abad ke-20, perjuangan bangsa Indonesia semakin terorganisasi. Pendidikan melahirkan kaum terpelajar, sementara pengalaman hidup di bawah penjajahan mendorong keinginan untuk memperbaiki nasib bersama.</p>
        </div>
        <div className="material-grid">
          {materials.map((material) => (
            <MaterialCard key={material.index} {...material} />
          ))}
        </div>
      </section>
      <section className="ebook-section" id="ebook">
        <div className="ebook-info">
          <p className="eyebrow">BACA LEBIH LENGKAP</p>
          <h2>E-book Pergerakan Nasional Indonesia</h2>
          <p>Buku 15 halaman ini membahas latar belakang pergerakan, organisasi dan tokohnya, peran pemuda dan perempuan, hingga Sumpah Pemuda 1928.</p>
          <div className="ebook-actions">
            <a className="ebook-button" href="/pergerakan-nasional-1900-1928.pdf" target="_blank" rel="noreferrer">Buka e-book <span aria-hidden="true">↗</span></a>
            <a className="ebook-download" href="/pergerakan-nasional-1900-1928.pdf" download="Pergerakan Nasional Indonesia (1900-1928).pdf">Unduh PDF</a>
          </div>
        </div>
        <div className="ebook-preview"><iframe src="/pergerakan-nasional-1900-1928.pdf#page=1&view=FitH" title="Pratinjau e-book Pergerakan Nasional Indonesia 1900 sampai 1928" loading="lazy" /></div>
      </section>
      <div className="page-grid" id="kuis">
        <aside className="intro-panel">
          <p className="eyebrow">1900 — 1928</p>
          <h1><WordTypewriter segments={[{ text: "Pergerakan\n" }, { text: "Nasional\n", accent: true }, { text: "Indonesia" }]} /></h1>
          <p className="intro-copy">Sudah membaca materinya? Jawab 10 soal tentang organisasi, tokoh, dan Sumpah Pemuda sebelum waktu habis. Setiap jawaban langsung dinilai, lalu lanjut otomatis.</p>
          <div className="milestones" aria-label="Garis waktu singkat">
            <div><strong>1908</strong><span>Budi Utomo</span></div>
            <div><strong>1912</strong><span>Organisasi berkembang</span></div>
            <div><strong>1928</strong><span>Sumpah Pemuda</span></div>
          </div>
        </aside>
        <QuizGame questions={questions} />
      </div>
      <footer className="site-footer">
        <span>Jejak Bangsa · Belajar sejarah dengan ringkas</span>
        <span>Foto: <a href="https://commons.wikimedia.org/wiki/File:COLLECTIE_TROPENMUSEUM_Leerlingen_van_de_School_tot_Opleiding_van_Indische_Artsen_(STOVIA)_Doctor_Jawa_TMnr_60047128.jpg" target="_blank" rel="noreferrer">STOVIA</a> (Wereldmuseum Amsterdam, domain publik) · <a href="https://commons.wikimedia.org/wiki/File:Oprichtingsvergadering_van_de_afdeling_van_de_Sarekat_Islam_te_Blitar.jpg" target="_blank" rel="noreferrer">Sarekat Islam Blitar</a> &amp; <a href="https://commons.wikimedia.org/wiki/File:Historical_Indonesian_Youth_Pledge,_Sumpah_Pemuda_in_1928.jpg" target="_blank" rel="noreferrer">Poetoesan Congres 1928</a> (Wikimedia Commons, CC BY 4.0)</span>
        <span>Rujukan: <a href="https://kebudayaan.kemdikbud.go.id/Vredeburg/diorama-kongres-pertama-boedi-oetomo-diorama-museum-benteng-vredeburg-yogyakarta/" target="_blank" rel="noreferrer">Budi Utomo</a> · <a href="https://kebudayaan.kemdikbud.go.id/Vredeburg/diorama-berdirinya-tamansiswa-diorama-museum-benteng-vredeburg-yogyakarta/" target="_blank" rel="noreferrer">Taman Siswa</a> · <a href="https://kebudayaan.kemdikbud.go.id/kisah-dibalik-lahirnya-lagu-kebangsaan-indonesia-raya/" target="_blank" rel="noreferrer">Kongres Pemuda II</a></span>
      </footer>
    </main>
  );
}
