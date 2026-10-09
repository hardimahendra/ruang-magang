import "./globals.css";
import "./depth.css";
import "./swiss.css";

export const metadata = {
  title: { default: "Ruang Magang", template: "%s — Ruang Magang" },
  description: "Dashboard demonstrasi untuk mengelola proses magang mahasiswa.",
};

export const viewport = { themeColor: "#0d2d36" };

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
