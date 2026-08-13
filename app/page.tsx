"use client";

import { useMemo, useState } from "react";

type Lesson = {
  year: string;
  eyebrow: string;
  title: string;
  text: string;
  facts: string[];
  image: string;
  alt: string;
  accent: string;
};

const lessons: Lesson[] = [
  {
    year: "1596",
    eyebrow: "Bab 01 - Kedatangan",
    title: "Dari dagang ke penjajahan",
    text: "Hindia Belanda adalah sebutan bagi wilayah Indonesia ketika berada di bawah kekuasaan kolonial Belanda. Rombongan Cornelis de Houtman tiba di Banten pada 1596 untuk mencari rempah-rempah. Kekayaan Nusantara kemudian mendorong Belanda untuk menguasai perdagangan dan wilayah.",
    facts: ["Pusat pemerintahan kelak berada di Batavia", "Lada, pala, dan cengkih sangat bernilai di Eropa", "Tujuan awalnya perdagangan, lalu berubah menjadi penguasaan"],
    image: "/assets/hindia/page-1-1.png",
    alt: "Ilustrasi kota pelabuhan Batavia pada masa kolonial",
    accent: "#ffb703",
  },
  {
    year: "1602",
    eyebrow: "Bab 02 - VOC",
    title: "Monopoli rempah-rempah",
    text: "VOC (Vereenigde Oostindische Compagnie) didirikan pada 20 Maret 1602. Dengan Hak Oktroi, VOC dapat memonopoli perdagangan, mencetak uang, membentuk tentara, membangun benteng, membuat perjanjian, bahkan berperang seperti sebuah negara.",
    facts: ["Hak Oktroi memberi kekuasaan sangat luas", "Rakyat dipaksa menjual hasil bumi kepada VOC", "VOC dibubarkan pada 31 Desember 1799 karena korupsi, kerugian, dan utang"],
    image: "/assets/hindia/page-1-2.png",
    alt: "Lambang VOC dan kapal dagang Belanda",
    accent: "#ff5d8f",
  },
  {
    year: "1808-1811",
    eyebrow: "Bab 03 - Pemerintahan Kolonial",
    title: "Hindia Belanda diperintah langsung",
    text: "Setelah VOC bubar, wilayah dan utangnya diambil alih pemerintah Belanda. Hindia Belanda dipimpin Gubernur Jenderal dari Batavia. Herman Willem Daendels memperkuat pertahanan Jawa dan membangun Jalan Raya Pos Anyer-Panarukan dengan kerja paksa yang menyengsarakan rakyat.",
    facts: ["Gubernur Jenderal menjadi wakil pemerintah Belanda", "Pajak berat dan kerja paksa membebani masyarakat", "1811-1816 wilayah ini sempat dikuasai Inggris di bawah Raffles"],
    image: "/assets/hindia/page-2-1.png",
    alt: "Daendels dan gambaran kerja paksa pada masa kolonial",
    accent: "#5f8dff",
  },
  {
    year: "1830",
    eyebrow: "Bab 04 - Tanam Paksa",
    title: "Tanah rakyat, untung untuk Belanda",
    text: "Johannes van den Bosch menerapkan Cultuurstelsel atau Sistem Tanam Paksa untuk mengisi kas Belanda. Rakyat wajib menyediakan tanah untuk tanaman ekspor seperti kopi, tebu, teh, tembakau, dan nila; hasilnya diserahkan kepada pemerintah kolonial.",
    facts: ["Tanam Paksa memicu kelaparan dan kemiskinan di banyak daerah", "Sejak 1870, Politik Liberal memberi ruang bagi perkebunan swasta", "Upah rendah dan kehilangan tanah tetap menjadi masalah rakyat"],
    image: "/assets/hindia/page-2-2.png",
    alt: "Pekerja di perkebunan kopi pada masa kolonial",
    accent: "#ff7a00",
  },
  {
    year: "1901",
    eyebrow: "Bab 05 - Politik Etis",
    title: "Balas budi yang membuka kesadaran",
    text: "Politik Etis lahir dari gagasan Conrad Theodor van Deventer tentang utang kehormatan Belanda. Programnya dikenal sebagai Trias van Deventer: edukasi, irigasi, dan transmigrasi. Pelaksanaannya belum sepenuhnya menyejahterakan rakyat, tetapi pendidikan melahirkan kaum terpelajar dan pergerakan nasional.",
    facts: ["Edukasi: perluasan pendidikan", "Irigasi: pembangunan saluran air pertanian", "Transmigrasi: pemindahan penduduk dari daerah padat"],
    image: "/assets/hindia/page-3-1.png",
    alt: "Murid dan guru pada era politik etis",
    accent: "#25b58b",
  },
  {
    year: "1803-1907",
    eyebrow: "Bab 06 - Perlawanan",
    title: "Melawan dari banyak penjuru",
    text: "Tekanan pajak, monopoli, kerja paksa, dan campur tangan Belanda mendorong perlawanan di berbagai daerah. Perlawanan yang awalnya bersifat kedaerahan secara perlahan menumbuhkan semangat persatuan dan nasionalisme Indonesia.",
    facts: ["Pattimura - Maluku (1817)", "Tuanku Imam Bonjol - Perang Padri, Sumatra Barat (1803-1837)", "Pangeran Diponegoro - Jawa (1825-1830)", "Pangeran Antasari - Perang Banjar (1859-1905)", "Teuku Umar, Cut Nyak Dhien, Panglima Polim - Perang Aceh (1873-1904)", "Sisingamangaraja XII - Sumatra Utara (1878-1907); Bali juga melawan lewat Puputan"],
    image: "/assets/hindia/page-4-1.png",
    alt: "Kolase para tokoh perlawanan terhadap Belanda",
    accent: "#9b5de5",
  },
  {
    year: "8 Maret 1942",
    eyebrow: "Bab 07 - Akhir Hindia Belanda",
    title: "Menyerah di Kalijati",
    text: "Ketika Perang Dunia II berlangsung, Jepang menyerang Hindia Belanda. Belanda menyerah tanpa syarat kepada Jepang melalui Perjanjian Kalijati di Subang pada 8 Maret 1942. Masa Hindia Belanda pun berakhir dan digantikan pendudukan Jepang hingga 1945.",
    facts: ["Belanda menyerah kepada Jepang di Kalijati, Subang", "Pendudukan Jepang berlangsung sekitar tiga setengah tahun", "17 Agustus 1945: Indonesia memproklamasikan kemerdekaan"],
    image: "/assets/hindia/page-5-1.png",
    alt: "Penyerahan Belanda kepada Jepang pada masa Perang Dunia II",
    accent: "#ef476f",
  },
];

const quiz = [
  { question: "Siapa pemimpin rombongan Belanda yang tiba di Banten pada 1596?", options: ["Cornelis de Houtman", "Jan Pieterszoon Coen", "Herman Willem Daendels", "Thomas Stamford Raffles"], answer: 0, note: "Cornelis de Houtman memimpin pelayaran Belanda pertama ke Banten pada 1596." },
  { question: "Hak istimewa VOC yang membuatnya bertindak layaknya negara disebut ...", options: ["Politik Etis", "Hak Oktroi", "Tanam Paksa", "Politik Liberal"], answer: 1, note: "Hak Oktroi memberi VOC hak monopoli, membentuk tentara, berperang, serta membuat perjanjian." },
  { question: "Sistem Tanam Paksa mulai diterapkan pada tahun ...", options: ["1799", "1816", "1830", "1901"], answer: 2, note: "Cultuurstelsel diterapkan oleh Johannes van den Bosch pada 1830." },
  { question: "Tokoh yang memimpin Perang Diponegoro adalah ...", options: ["Pattimura", "Pangeran Diponegoro", "Pangeran Antasari", "Sisingamangaraja XII"], answer: 1, note: "Perang Diponegoro berlangsung di Jawa pada 1825-1830." },
  { question: "Peristiwa yang menandai berakhirnya Hindia Belanda adalah ...", options: ["VOC didirikan", "Proklamasi Kemerdekaan", "Perjanjian Kalijati", "Sumpah Pemuda"], answer: 2, note: "Pada 8 Maret 1942, Belanda menyerah tanpa syarat kepada Jepang melalui Perjanjian Kalijati." },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const lesson = lessons[slide];
  const progress = useMemo(() => Math.round(((slide + 1) / lessons.length) * 100), [slide]);

  function pick(option: number) {
    if (selected !== null || done) return;
    setSelected(option);
    if (option === quiz[quizIndex].answer) setScore((value) => value + 1);
  }
  function nextQuestion() {
    if (quizIndex === quiz.length - 1) { setDone(true); return; }
    setQuizIndex((value) => value + 1); setSelected(null);
  }
  function restart() { setQuizIndex(0); setSelected(null); setScore(0); setDone(false); }

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#beranda"><span>SEJARAH</span><b>+</b></a>
        <div className="nav-links"><a href="#materi">Materi</a><a href="#perlawanan">Perlawanan</a><a href="#kuis">Kuis</a></div>
        <a className="nav-cta" href="#kuis">UJI DIRI ↗</a>
      </nav>

      <section id="beranda" className="hero grid-paper">
        <div className="hero-copy">
          <p className="kicker"><span className="dot" /> KELAS SEJARAH INDONESIA</p>
          <h1>HINDIA<br/><em>BELANDA</em></h1>
          <p className="hero-lede">Dari rempah-rempah, monopoli, hingga perlawanan rakyat. Pelajari satu bab demi satu bab, lalu uji ingatanmu.</p>
          <div className="hero-actions"><a href="#materi" className="button yellow">MULAI BELAJAR <span>→</span></a><a href="#timeline" className="button white">LIHAT TIMELINE</a></div>
          <div className="hero-stats"><div><b>1596</b><span>Belanda tiba</span></div><div><b>1942</b><span>Hindia Belanda berakhir</span></div><div><b>7</b><span>Bab pembelajaran</span></div></div>
        </div>
        <div className="hero-art"><div className="sticker sticker-top">REMEMBER<br/>THE PEOPLE!</div><img src="/assets/hindia/page-1-1.png" alt="Pelabuhan Batavia"/><div className="burst">✦</div><p className="caption">BATAVIA, PUSAT KEKUASAAN KOLONIAL</p></div>
      </section>

      <section id="timeline" className="timeline-wrap">
        <div className="section-title"><p>Garis besar</p><h2>JEJAK WAKTU</h2></div>
        <div className="timeline">{["1596 Datang", "1602 VOC", "1799 VOC bubar", "1830 Tanam Paksa", "1901 Politik Etis", "1942 Kalijati", "1945 Merdeka"].map((item, index) => <div key={item} className="time-node"><i>{index + 1}</i><span>{item}</span></div>)}</div>
      </section>

      <section id="materi" className="learning-section">
        <div className="section-title"><p>Materi per slide</p><h2>BONGKAR CERITANYA</h2><span>Klik panah atau kartu bab untuk menjelajah.</span></div>
        <div className="lesson-tabs" role="tablist">{lessons.map((item, index) => <button key={item.year} className={index === slide ? "tab active" : "tab"} onClick={() => setSlide(index)}><b>0{index + 1}</b><span>{item.year}</span></button>)}</div>
        <article className="lesson-card" style={{ "--accent": lesson.accent } as React.CSSProperties}>
          <div className="lesson-media"><img src={lesson.image} alt={lesson.alt}/><div className="media-year">{lesson.year}</div></div>
          <div className="lesson-content"><p className="lesson-eyebrow">{lesson.eyebrow}</p><h3>{lesson.title}</h3><p>{lesson.text}</p><ul>{lesson.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul><div className="lesson-controls"><button aria-label="Materi sebelumnya" onClick={() => setSlide((slide + lessons.length - 1) % lessons.length)}>←</button><span>{String(slide + 1).padStart(2, "0")} / {String(lessons.length).padStart(2, "0")}</span><button aria-label="Materi berikutnya" onClick={() => setSlide((slide + 1) % lessons.length)}>→</button></div></div>
        </article>
        <div className="progress" aria-label={`${progress}% materi terbuka`}><span style={{ width: `${progress}%` }}/></div>
      </section>

      <section id="perlawanan" className="resistance">
        <div className="resistance-image"><img src="/assets/hindia/page-4-1.png" alt="Para tokoh perlawanan Indonesia"/></div>
        <div className="resistance-copy"><p className="kicker">✦ PERLAWANAN RAKYAT</p><h2>TIDAK<br/><em>TINGGAL DIAM.</em></h2><p>Penjajahan menghadapi perlawanan dari Maluku sampai Aceh, dari Jawa sampai Tanah Batak dan Bali. Setiap perjuangan membawa cerita keberanian yang berbeda.</p><div className="resistance-list"><span>Pattimura <b>1817</b></span><span>Imam Bonjol <b>1803-1837</b></span><span>Diponegoro <b>1825-1830</b></span><span>Antasari <b>1859-1905</b></span><span>Aceh <b>1873-1904</b></span><span>Sisingamangaraja XII <b>1878-1907</b></span></div></div>
      </section>

      <section id="kuis" className="quiz-section grid-paper">
        <div className="quiz-top"><div><p className="kicker"><span className="dot" /> ZONA UJI DIRI</p><h2>SIAP<br/><em>BERDUEL?</em></h2></div><div className="score-box"><span>SKOR KAMU</span><b>{score}<small>/{quiz.length}</small></b></div></div>
        {!done ? <div className="quiz-card"><div className="question-count">SOAL {quizIndex + 1} DARI {quiz.length}</div><h3>{quiz[quizIndex].question}</h3><div className="answers">{quiz[quizIndex].options.map((option, index) => { const state = selected === null ? "" : index === quiz[quizIndex].answer ? "correct" : index === selected ? "wrong" : "muted"; return <button className={`answer ${state}`} key={option} onClick={() => pick(index)}><b>{String.fromCharCode(65 + index)}</b>{option}</button>; })}</div>{selected !== null && <div className="feedback"><p>{selected === quiz[quizIndex].answer ? "BENAR! Mantap." : "BELUM TEPAT. Coba ingat lagi."}</p><span>{quiz[quizIndex].note}</span><button className="button yellow" onClick={nextQuestion}>{quizIndex === quiz.length - 1 ? "LIHAT HASIL" : "SOAL SELANJUTNYA"} →</button></div>}</div> : <div className="quiz-card result"><p className="kicker">SELESAI!</p><h3>{score === quiz.length ? "KAMU JAGO SEJARAH!" : score >= 3 ? "KEREN, TERUSKAN!" : "YUK, ULANGI MATERINYA!"}</h3><p>Kamu menjawab benar <b>{score}</b> dari {quiz.length} soal. Kunjungi lagi bab materi untuk menguatkan ingatanmu.</p><button className="button yellow" onClick={restart}>ULANGI KUIS ↻</button></div>}
      </section>

      <footer><span>SEJARAH+ / HINDIA BELANDA</span><span>DIBUAT UNTUK BELAJAR, MENGINGAT, DAN BERTANYA.</span><a href="#beranda">KE ATAS ↑</a></footer>
    </main>
  );
}
