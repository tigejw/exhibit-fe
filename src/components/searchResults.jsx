import { useNavigate } from "react-router-dom";

export default function SearchResults({ results, error }) {
  const navigate = useNavigate();

  if (!results.length && !error) {
    return <p>No results found</p>;
  }

  return (
    <div className="results-grid-container">
      {results.map((artwork) => (
        <button
          className="result-card"
          key={artwork.objectID || artwork.artwork_id}
          onClick={() => navigate(`/artwork/${artwork.objectID || artwork.artwork_id}`)}
        >
          <div className="result-image-container">
            <img
  src={artwork.primaryImageSmall}
  alt={artwork.title || "Artwork image"}
  referrerPolicy="no-referrer"
/>
          </div>
          <div className="result-title">{artwork.title}</div>
          <div className="result-artist">{artwork.artistDisplayName}</div>
        </button>
      ))}
    </div>
  );
}