"use client";

import { useState } from "react";

type Question = {
  year: string;
  topic: string;
  question: string;
  options: [string, string, string, string];
  answer: number;
  explanation: string;
};

const questions: Question[] = [
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

const letters = ["A", "B", "C", "D"];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const current = questions[index];

  function choose(option: number) {
    if (selected !== null) return;
    setSelected(option);
    if (option === current.answer) setScore((value) => value + 1);
  }

  function next() {
    if (index === questions.length - 1) {
      setFinished(true);
    } else {
      setIndex((value) => value + 1);
      setSelected(null);
    }
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <div className="brand-mark"><span aria-hidden="true">✦</span> Jejak Bangsa</div>
        <nav className="topbar-nav" aria-label="Navigasi utama"><a href="#materi">Materi</a><a href="#ebook">E-book</a><a href="#kuis">Kuis</a></nav>
      </header>
      <section className="learning-section" id="materi">
        <div className="learning-heading">
          <p className="eyebrow">MATERI SINGKAT · 1900–1928</p>
          <h1>Dari organisasi<br/>menuju <em>persatuan.</em></h1>
          <p>Pada awal abad ke-20, perjuangan bangsa Indonesia semakin terorganisasi. Pendidikan melahirkan kaum terpelajar, sementara pengalaman hidup di bawah penjajahan mendorong keinginan untuk memperbaiki nasib bersama.</p>
        </div>
        <div className="material-grid">
          <article className="material-card">
            <span>01 / LATAR BELAKANG</span>
            <h2>Kesadaran baru</h2>
            <p>Perlawanan di berbagai daerah telah berlangsung lama, tetapi sering bergerak sendiri-sendiri. Pada masa Politik Etis, sebagian rakyat mendapat kesempatan belajar. Mereka mulai memakai pendidikan, pers, dan organisasi untuk menyuarakan perubahan. Gagasan nasionalisme dari luar negeri juga ikut memberi pengaruh.</p>
          </article>
          <article className="material-card">
            <span>02 / ORGANISASI</span>
            <h2>Bergerak bersama</h2>
            <p>Budi Utomo berdiri pada 1908 dan menjadi tonggak Kebangkitan Nasional. Sesudahnya, Sarekat Islam berkembang dari gerakan perdagangan; Indische Partij menyuarakan persatuan dan kemerdekaan; Muhammadiyah serta Taman Siswa memperluas pendidikan. Perhimpunan Indonesia dan PNI juga mempertegas cita-cita kebangsaan.</p>
          </article>
          <article className="material-card">
            <span>03 / PUNCAK PERSATUAN</span>
            <h2>Sumpah Pemuda</h2>
            <p>Organisasi pemuda dari berbagai daerah mulai mencari titik temu sebagai satu bangsa. Dalam Kongres Pemuda II pada 28 Oktober 1928, mereka menegaskan satu tanah air, satu bangsa, dan menjunjung bahasa persatuan: Indonesia. Ikrar ini menjadi penanda penting tumbuhnya persatuan nasional.</p>
          </article>
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
          <h1>Pergerakan<br/><em>Nasional</em><br/>Indonesia</h1>
          <p className="intro-copy">Sudah membaca materinya? Jawab 10 soal singkat tentang organisasi, tokoh, dan Sumpah Pemuda. Penjelasan muncul setelah setiap jawaban.</p>
          <div className="milestones" aria-label="Garis waktu singkat">
            <div><strong>1908</strong><span>Budi Utomo</span></div>
            <div><strong>1912</strong><span>Organisasi berkembang</span></div>
            <div><strong>1928</strong><span>Sumpah Pemuda</span></div>
          </div>
        </aside>
        <section className="quiz-panel" aria-label="Kuis pergerakan nasional">
          {!finished ? (
            <>
              <div className="quiz-head">
                <div><span className="small-label">SOAL {String(index + 1).padStart(2, "0")} / {questions.length}</span><span className="topic-tag">{current.topic}</span></div>
                <span className="live-score">Skor <strong>{score}</strong></span>
              </div>
              <div className="progress-track" role="progressbar" aria-label="Kemajuan kuis" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={questions.length}><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
              <p className="question-year">{current.year} <span aria-hidden="true">/</span> PILIH SATU JAWABAN</p>
              <h2>{current.question}</h2>
              <div className="options">
                {current.options.map((option, optionIndex) => {
                  const answered = selected !== null;
                  const state = answered ? optionIndex === current.answer ? "correct" : optionIndex === selected ? "incorrect" : "dimmed" : "";
                  return <button key={option} type="button" disabled={answered} className={`option ${state}`} onClick={() => choose(optionIndex)} aria-pressed={selected === optionIndex}><span className="option-letter">{letters[optionIndex]}</span><span>{option}</span></button>;
                })}
              </div>
              {selected !== null && <div className={`answer-note ${selected === current.answer ? "is-correct" : "is-incorrect"}`} role="status"><strong>{selected === current.answer ? "Tepat!" : "Belum tepat."}</strong><p>{current.explanation}</p></div>}
              <div className="quiz-footer">
                <span>{selected === null ? "Pilih jawaban untuk melanjutkan." : `Jawaban benar: ${current.options[current.answer]}`}</span>
                <button type="button" className="next-button" onClick={next} disabled={selected === null}>{index === questions.length - 1 ? "Lihat hasil" : "Soal berikutnya"}<span aria-hidden="true"> →</span></button>
              </div>
            </>
          ) : (
            <div className="result" role="status">
              <span className="result-icon" aria-hidden="true">✦</span>
              <p className="small-label">KUIS SELESAI</p>
              <h2>{score >= 8 ? "Hebat, kamu paham materinya!" : score >= 5 ? "Bagus, terus pelajari sejarahnya!" : "Ayo coba lagi!"}</h2>
              <p className="result-score"><strong>{score}</strong> / {questions.length} jawaban benar</p>
              <p className="result-copy">Setiap soal membantu mengingat perjalanan dari Budi Utomo hingga Sumpah Pemuda.</p>
              <button type="button" className="next-button" onClick={restart}>Ulangi kuis <span aria-hidden="true">↻</span></button>
            </div>
          )}
        </section>
      </div>
      <footer className="site-footer">
        <span>Jejak Bangsa · Belajar sejarah dengan ringkas</span>
        <span>Rujukan: <a href="https://kebudayaan.kemdikbud.go.id/Vredeburg/diorama-kongres-pertama-boedi-oetomo-diorama-museum-benteng-vredeburg-yogyakarta/" target="_blank" rel="noreferrer">Budi Utomo</a> · <a href="https://kebudayaan.kemdikbud.go.id/Vredeburg/diorama-berdirinya-tamansiswa-diorama-museum-benteng-vredeburg-yogyakarta/" target="_blank" rel="noreferrer">Taman Siswa</a> · <a href="https://kebudayaan.kemdikbud.go.id/kisah-dibalik-lahirnya-lagu-kebangsaan-indonesia-raya/" target="_blank" rel="noreferrer">Kongres Pemuda II</a></span>
      </footer>
    </main>
  );
}
