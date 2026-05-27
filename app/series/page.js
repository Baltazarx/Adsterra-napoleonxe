"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import { getMoviesByType, genres } from "../data/movies";

export default function SeriesPage() {
  const allSeries = getMoviesByType("series");
  const [activeGenre, setActiveGenre] = useState("All");

  const filtered = activeGenre === "All"
    ? allSeries
    : allSeries.filter((m) => m.genre.includes(activeGenre));

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 100 }}>
        <section className="section" style={{ paddingBottom: 0 }}>
          <h1 className="section-title" style={{ fontSize: 32, marginBottom: 8 }}>
            📺 Semua Series
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 15, marginBottom: 24 }}>
            Temukan series yang menarik untuk ditonton
          </p>
        </section>

        <div className="genre-filter">
          <button
            className={`genre-btn ${activeGenre === "All" ? "active" : ""}`}
            onClick={() => setActiveGenre("All")}
          >
            Semua
          </button>
          {genres.map((g) => (
            <button
              key={g}
              className={`genre-btn ${activeGenre === g ? "active" : ""}`}
              onClick={() => setActiveGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>

        <section className="section" style={{ paddingTop: 0 }}>
          {filtered.length > 0 ? (
            <div className="movie-grid">
              {filtered.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-secondary)" }}>
              <p style={{ fontSize: 48, marginBottom: 16 }}>📺</p>
              <p style={{ fontSize: 18 }}>Tidak ada series dengan genre ini</p>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}
