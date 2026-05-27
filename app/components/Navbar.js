"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <Link href="/" className="navbar-brand">STREAMFLIX</Link>
      <div className="navbar-links">
        <Link href="/">Beranda</Link>
        <Link href="/movies">Film</Link>
        <Link href="/series">Series</Link>
      </div>
      <div className="navbar-right">
        <form onSubmit={handleSearch} className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Cari film atau series..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
    </nav>
  );
}
