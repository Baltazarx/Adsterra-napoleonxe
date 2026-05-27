"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import AdsterraAd from "./components/AdsterraAd";
import SmartLinkAd from "./components/SmartLinkAd";
import { InlineBannerAd } from "./components/SpamAds";
import Footer from "./components/Footer";
import { movies, getFeaturedMovies, getMoviesByType } from "./data/movies";

export default function Home() {
  const featured = getFeaturedMovies();
  const [heroIndex, setHeroIndex] = useState(0);
  const hero = featured[heroIndex];
  const allMovies = getMoviesByType("movie");
  const allSeries = getMoviesByType("series");

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % featured.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [featured.length]);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${hero.backdrop})` }}
        />
        <div className="hero-content">
          <span className="hero-badge">
            🔥 {hero.type === "series" ? "Series Populer" : "Film Unggulan"}
          </span>
          <h1 className="hero-title">{hero.title}</h1>
          <div className="hero-meta">
            <span className="rating">⭐ {hero.rating}</span>
            <span className="dot" />
            <span>{hero.year}</span>
            <span className="dot" />
            <span>{hero.duration}</span>
            <span className="dot" />
            <span>{hero.genre.join(", ")}</span>
          </div>
          <p className="hero-desc">{hero.description}</p>
          <div className="hero-buttons">
            <Link href={`/detail/${hero.id}`} className="btn-primary">
              ▶ Tonton Sekarang
            </Link>
            <Link href={`/detail/${hero.id}`} className="btn-secondary">
              ℹ️ Detail
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Placement 1 */}
      <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <SmartLinkAd />
      </div>
      <AdsterraAd />

      {/* Trending Movies */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">🔥 Trending Film</h2>
          <Link href="/movies" className="see-all">Lihat Semua →</Link>
        </div>
        <div className="movie-row">
          {allMovies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </section>

      {/* Ad Placement 2 */}
      <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <SmartLinkAd />
      </div>
      <AdsterraAd />

      {/* Popular Series */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">📺 Series Populer</h2>
          <Link href="/series" className="see-all">Lihat Semua →</Link>
        </div>
        <div className="movie-row">
          {allSeries.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </section>

      {/* Ad Placement 3 */}
      <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <SmartLinkAd />
      </div>
      <AdsterraAd />

      {/* All Content */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">🎬 Semua Konten</h2>
        </div>
        <div className="movie-grid">
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
