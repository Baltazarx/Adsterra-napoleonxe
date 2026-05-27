import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">STREAMFLIX</div>
          <p className="footer-desc">
            Platform streaming terbaik untuk menonton film dan series favorit kamu. Nikmati ribuan konten berkualitas tinggi kapan saja.
          </p>
        </div>
        <div>
          <h4>Navigasi</h4>
          <ul>
            <li><Link href="/">Beranda</Link></li>
            <li><Link href="/movies">Film</Link></li>
            <li><Link href="/series">Series</Link></li>
          </ul>
        </div>
        <div>
          <h4>Genre</h4>
          <ul>
            <li><a href="#">Action</a></li>
            <li><a href="#">Drama</a></li>
            <li><a href="#">Sci-Fi</a></li>
            <li><a href="#">Thriller</a></li>
          </ul>
        </div>
        <div>
          <h4>Info</h4>
          <ul>
            <li><a href="#">Tentang Kami</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Kontak</a></li>
            <li><a href="#">Kebijakan Privasi</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 StreamFlix. All rights reserved. Made with ❤️</p>
      </div>
    </footer>
  );
}
