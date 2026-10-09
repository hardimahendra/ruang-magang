"use client";

import { useMemo, useState } from "react";

const icons = {
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  briefcase: "M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-11 0h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm3 0h6M3 12h18",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 13h8M8 17h5",
  plus: "M12 5v14M5 12h14",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  search: "m21 21-4.35-4.35M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
  calendar: "M7 2v4m10-4v4M4 9h16M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  chevron: "m9 18 6-6-6-6",
  check: "m5 12 4 4L19 6",
};

function Icon({ name, size = 18 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={icons[name]} /></svg>;
}

const navigation = [
  ["Ikhtisar", "grid"],
  ["Program magang", "briefcase"],
  ["Laporan", "file"],
];

function statusClass(status) {
  return `status ${status.toLowerCase().replace(" ", "-")}`;
}

function downloadText(filename, contents) {
  const url = URL.createObjectURL(new Blob([contents], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function DashboardApp({ internships, reports }) {
  const [section, setSection] = useState("Ikhtisar");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Semua status");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [reportPreview, setReportPreview] = useState(null);

  const visibleInternships = useMemo(() => internships.filter((item) => {
    const matchesQuery = `${item.company} ${item.role} ${item.city}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (status === "Semua status" || item.status === status);
  }), [internships, query, status]);

  const activeInternship = internships[0];
  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3600);
  };
  const goTo = (item) => {
    setSection(item);
    setDrawerOpen(false);
  };
  const downloadLogbook = (report) => {
    const title = report ? `Ringkasan ${report.title}` : "Template logbook magang";
    const lines = [title, "DATA DEMO / TEMPLATE LOKAL", report ? `Periode: ${report.period}` : "Periode: ", report ? `Status: ${report.status}` : "Status: ", "", "Tanggal:", "Aktivitas:", "Hasil:", "Kendala:", "Tindak lanjut:", "Catatan pembimbing:"];
    downloadText(report ? `ringkasan-laporan-${report.id}.txt` : "template-logbook-magang.txt", lines.join("\n"));
    showNotice("Berkas teks berhasil diunduh ke perangkat.");
  };

  return (
    <main className="app-shell">
      {drawerOpen && <button className="scrim" aria-label="Tutup navigasi" onClick={() => setDrawerOpen(false)} />}
      <aside className={`sidebar ${drawerOpen ? "open" : ""}`} aria-label="Navigasi aplikasi">
        <div className="brand"><span className="brand-mark">M</span><span>ruang<span>magang</span></span></div>
        <div className="term-card"><span className="term-label">SEMESTER AKTIF</span><strong>Ganjil 2026/2027</strong><span>Berakhir 6 Feb 2027</span></div>
        <nav>{navigation.map(([item, icon]) => <button key={item} className={section === item ? "nav-item active" : "nav-item"} onClick={() => goTo(item)}><Icon name={icon} /><span>{item}</span></button>)}</nav>
        <div className="sidebar-footer"><div className="avatar">HM</div><div><strong>Hardi Mahendra</strong><span>Mahasiswa</span></div><button className="more" aria-label="Opsi akun" onClick={() => showNotice("Pengaturan akun belum tersedia pada mode demo.")}>•••</button></div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <button className="menu-button" aria-label="Buka navigasi" onClick={() => setDrawerOpen(true)}><Icon name="menu" /></button>
          <div className="crumb"><span>Portal mahasiswa</span><b>/</b><strong>{section}</strong></div>
          <div className="top-actions"><button className="icon-button" aria-label="Notifikasi" onClick={() => showNotice("Tidak ada notifikasi baru di mode demo.")}><Icon name="bell" /></button><div className="avatar avatar-small">HM</div></div>
        </header>
        <div className="content">
          {section === "Ikhtisar" && <Overview active={activeInternship} reports={reports} onNavigate={goTo} onNotice={showNotice} />}
          {section === "Program magang" && <InternshipList items={visibleInternships} query={query} setQuery={setQuery} status={status} setStatus={setStatus} onNotice={showNotice} />}
          {section === "Laporan" && <ReportList reports={reports} onNotice={showNotice} onPreview={setReportPreview} onDownload={downloadLogbook} />}
        </div>
      </section>
      {notice && <div className="toast" role="status"><Icon name="check" size={16} />{notice}</div>}
      {reportPreview && <div className="report-overlay" role="presentation" onClick={() => setReportPreview(null)}><section className="report-preview" role="dialog" aria-modal="true" aria-labelledby="report-preview-title" onClick={(event) => event.stopPropagation()}><button className="preview-close" aria-label="Tutup pratinjau" onClick={() => setReportPreview(null)}><Icon name="close" /></button><p className="eyebrow">PRATINJAU LAPORAN · DATA DEMO</p><h2 id="report-preview-title">{reportPreview.title}</h2><p className="preview-period">{reportPreview.period} · diperbarui {reportPreview.updated}</p><div className="preview-status"><span className={statusClass(reportPreview.status)}>{reportPreview.status}</span><span>Logbook minggu ke-12</span></div><div className="preview-body"><h3>Ringkasan kegiatan</h3><p>Catatan aktivitas, pembelajaran, dan tindak lanjut ditampilkan sebagai pratinjau lokal. Tidak ada berkas atau data pribadi yang disimpan pada versi portofolio ini.</p><h3>Langkah berikutnya</h3><p>Tinjau catatan bersama pembimbing sebelum mengirim versi final.</p></div><button className="secondary-button" onClick={() => downloadLogbook(reportPreview)}>Unduh ringkasan .txt <Icon name="arrow" size={15} /></button></section></div>}
    </main>
  );
}

function Overview({ active, reports, onNavigate, onNotice }) {
  return <>
    <section className="page-heading">
      <div><p className="eyebrow">SELASA, 27 OKTOBER 2026</p><h1>Pagi, Hardi.<br /><em>Perjalanan magangmu bergerak baik.</em></h1></div>
      <button className="primary-button" onClick={() => onNavigate("Program magang")}><Icon name="plus" />Lihat program</button>
    </section>
    <section className="stats" aria-label="Ringkasan magang"><Stat value="68%" label="Progres magang" note="12 minggu terselesaikan" /><Stat value="01" label="Laporan perlu tindakan" note="Tenggat Jumat, 17.00" /><Stat value="04" label="Aktivitas minggu ini" note="Target: 5 aktivitas" /></section>
    <section className="dashboard-grid">
      <article className="active-card"><div className="card-top"><div><p className="eyebrow">PROGRAM AKTIF</p><h2>{active.role}</h2><p>{active.company} · {active.city}</p></div><span className={statusClass(active.status)}>{active.status}</span></div><div className="progress-meta"><span>Mulai {active.start}</span><strong>{active.progress}%</strong><span>Selesai {active.end}</span></div><div className="progress-track"><span style={{ width: `${active.progress}%` }} /></div><div className="next-step"><div><span className="step-number">12</span><div><b>Langkah berikutnya</b><p>{active.next}</p></div></div><button className="text-button" onClick={() => onNavigate("Laporan")}>Buka laporan <Icon name="arrow" size={15} /></button></div></article>
      <article className="agenda-card"><div className="card-title"><div><p className="eyebrow">MINGGU INI</p><h2>Agenda terdekat</h2></div><Icon name="calendar" /></div><div className="agenda-item"><time>RAB<br /><strong>28</strong></time><div><b>Review logbook</b><p>Diskusi singkat dengan pembimbing · 10.00</p></div></div><div className="agenda-item"><time>JUM<br /><strong>30</strong></time><div><b>Tenggat laporan</b><p>Kirim laporan kegiatan minggu ke-12</p></div></div><button className="text-button" onClick={() => onNotice("Agenda demo tidak tersinkron ke kalender.")}>Lihat kalender <Icon name="arrow" size={15} /></button></article>
    </section>
    <section className="section-row"><div><p className="eyebrow">LAPORAN TERBARU</p><h2>Jaga catatanmu tetap rapi.</h2></div><button className="text-button" onClick={() => onNavigate("Laporan")}>Semua laporan <Icon name="arrow" size={15} /></button></section>
    <div className="report-strip">{reports.map((report) => <article key={report.id} className="mini-report"><div className="file-icon"><Icon name="file" /></div><div><span className={statusClass(report.status)}>{report.status}</span><h3>{report.title}</h3><p>{report.period}</p></div><button className="arrow-button" aria-label={`Buka ${report.title}`} onClick={() => onNotice("Ini adalah tampilan demonstrasi; berkas belum tersedia.")}><Icon name="arrow" /></button></article>)}</div>
  </>;
}

function Stat({ value, label, note }) { return <article className="stat"><strong>{value}</strong><div><span>{label}</span><small>{note}</small></div></article>; }

function InternshipList({ items, query, setQuery, status, setStatus, onNotice }) {
  return <>
    <section className="page-heading compact"><div><p className="eyebrow">PROGRAM MAGANG</p><h1>Temukan program<br /><em>yang sedang kamu jalani.</em></h1></div><button className="primary-button" onClick={() => onNotice("Mode demo: permohonan baru belum menyimpan data.")}><Icon name="plus" />Ajukan magang</button></section>
    <section className="filter-bar" aria-label="Filter program magang"><label className="search"><Icon name="search" /><span className="sr-only">Cari program magang</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari perusahaan atau peran" />{query && <button aria-label="Hapus pencarian" onClick={() => setQuery("")}><Icon name="close" size={15} /></button>}</label><label className="select-label"><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option>Semua status</option><option>Berjalan</option><option>Menunggu</option><option>Selesai</option><option>Revisi</option></select></label></section>
    <section className="table-card"><div className="table-header"><div><h2>Daftar program</h2><p>{items.length} program ditampilkan</p></div><span className="data-source">DATA DEMO LOKAL</span></div>{items.length ? <div className="table-scroll"><table><thead><tr><th>Program</th><th>Status</th><th>Periode</th><th>Progres</th><th aria-label="Aksi" /></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><strong>{item.company}</strong><span>{item.role} · {item.city}</span></td><td><span className={statusClass(item.status)}>{item.status}</span></td><td>{item.start}<span>s.d. {item.end}</span></td><td><div className="table-progress"><span><i style={{ width: `${item.progress}%` }} /></span><b>{item.progress}%</b></div></td><td><button className="arrow-button" aria-label={`Lihat ${item.company}`} onClick={() => onNotice(`Detail ${item.id} tersedia setelah backend ditambahkan.`)}><Icon name="arrow" /></button></td></tr>)}</tbody></table></div> : <div className="empty-state"><Icon name="search" size={28} /><h2>Tidak ada program yang cocok</h2><p>Coba hapus pencarian atau pilih status lain.</p><button className="text-button" onClick={() => { setQuery(""); setStatus("Semua status"); }}>Reset filter</button></div>}</section>
  </>;
}

function ReportList({ reports, onPreview, onDownload }) { return <>
  <section className="page-heading compact"><div><p className="eyebrow">LAPORAN MAGANG</p><h1>Catat, tinjau,<br /><em>lalu lanjutkan.</em></h1></div><button className="primary-button" onClick={() => onDownload(null)}><Icon name="plus" />Unduh template logbook</button></section>
  <section className="report-list">{reports.map((report, index) => <article className="report-row" key={report.id}><div className="report-index">{String(index + 1).padStart(2, "0")}</div><div className="file-icon"><Icon name="file" /></div><div className="report-copy"><span className={statusClass(report.status)}>{report.status}</span><h2>{report.title}</h2><p>{report.period} · Diperbarui {report.updated}</p></div><button className="secondary-button" onClick={() => onPreview(report)}>Tinjau <Icon name="arrow" size={15} /></button></article>)}</section>
  </>;
}
