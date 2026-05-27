"use client";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import MovieCard from "../../components/MovieCard";
import AdsterraAd from "../../components/AdsterraAd";
import Footer from "../../components/Footer";
import { getMovieById, movies } from "../../data/movies";

export default function DetailClient({ id }) {
  const movie = getMovieById(id);

  if (!movie) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: 120, textAlign: "center", minHeight: "60vh" }}>
          <p style={{ fontSize: 64, marginBottom: 16 }}>😢</p>
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>Konten Tidak Ditemukan</h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
            Film atau series yang kamu cari tidak tersedia.
          </p>
          <Link href="/" className="btn-primary">← Kembali ke Beranda</Link>
        </div>
        <Footer />
      </>
    );
  }

  const related = movies
    .filter((m) => m.id !== movie.id && m.genre.some((g) => movie.genre.includes(g)))
    .slice(0, 6);

  return (
    <>
      <Navbar />

      {/* Detail Hero */}
      <section className="detail-hero">
        <div className="detail-bg" style={{ backgroundImage: `url(${movie.backdrop})` }} />
        <div className="detail-content">
          <div className="detail-poster">
            <img src={movie.poster} alt={movie.title} />
          </div>
          <div className="detail-info">
            <div className="detail-genres">
              {movie.genre.map((g) => (
                <span key={g} className="genre-tag">{g}</span>
              ))}
            </div>
            <h1 className="detail-title">{movie.title}</h1>
            <div className="detail-meta">
              <span className="rating">⭐ {movie.rating}/10</span>
              <span style={{ color: "var(--text-secondary)" }}>•</span>
              <span>{movie.year}</span>
              <span style={{ color: "var(--text-secondary)" }}>•</span>
              <span>{movie.duration}</span>
              <span style={{ color: "var(--text-secondary)" }}>•</span>
              <span style={{ textTransform: "capitalize" }}>{movie.type}</span>
            </div>
            <p className="detail-desc">{movie.description}</p>
            <div className="detail-cast">
              <h3>Sutradara</h3>
              <p>{movie.director}</p>
            </div>
            <div className="detail-cast">
              <h3>Pemeran</h3>
              <p>{movie.cast.join(", ")}</p>
            </div>
            <div className="hero-buttons" style={{ marginTop: 24 }}>
              <button className="btn-primary">▶ Tonton Sekarang</button>
              <button className="btn-secondary">+ Tambah ke Daftar</button>
            </div>
          </div>
        </div>
      </section>

      {/* Trailer */}
      <section className="trailer-section">
        <h2>🎥 Trailer</h2>
        <div className="trailer-container">
          <iframe
            src={movie.trailer}
            title={`Trailer ${movie.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* Ad after Trailer */}
      <AdsterraAd />

      {/* Related */}
      {related.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">🎯 Rekomendasi Serupa</h2>
          </div>
          <div className="movie-row">
            {related.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </section>
      )}

      {/* Ad before Footer */}
      <AdsterraAd />

      <Footer />
    </>
  );
}
