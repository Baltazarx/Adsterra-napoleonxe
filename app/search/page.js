"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import AdsterraAd from "../components/AdsterraAd";
import Footer from "../components/Footer";
import { searchMovies } from "../data/movies";

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const results = searchMovies(q);

  return (
    <>
      <section className="section" style={{ paddingBottom: 0 }}>
        <h1 className="section-title" style={{ fontSize: 28, marginBottom: 8 }}>
          🔍 Hasil Pencarian
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 15, marginBottom: 24 }}>
          {results.length} hasil ditemukan untuk &quot;<strong style={{ color: "var(--text-primary)" }}>{q}</strong>&quot;
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        {results.length > 0 ? (
          <div className="movie-grid">
            {results.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-secondary)" }}>
            <p style={{ fontSize: 64, marginBottom: 16 }}>🔍</p>
            <p style={{ fontSize: 18, marginBottom: 8 }}>Tidak ada hasil ditemukan</p>
            <p style={{ fontSize: 14 }}>Coba gunakan kata kunci yang berbeda</p>
          </div>
        )}
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 100 }}>
        <Suspense fallback={<div className="loading"><div className="spinner" /></div>}>
          <SearchResults />
        </Suspense>
        <AdsterraAd />
      </div>
      <Footer />
    </>
  );
}
