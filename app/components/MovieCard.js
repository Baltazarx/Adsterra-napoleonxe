import Link from "next/link";

export default function MovieCard({ movie }) {
  return (
    <Link href={`/detail/${movie.id}`} className="movie-card">
      <div className="card-poster">
        <img src={movie.poster} alt={movie.title} loading="lazy" />
        <div className="card-rating">⭐ {movie.rating}</div>
        <span className="card-type">{movie.type === "series" ? "Series" : "Film"}</span>
        <div className="card-overlay">
          <div className="card-play">▶</div>
        </div>
      </div>
      <div className="card-info">
        <div className="card-title">{movie.title}</div>
        <div className="card-meta">
          <span>{movie.year}</span>
          <span>{movie.genre[0]}</span>
        </div>
      </div>
    </Link>
  );
}
