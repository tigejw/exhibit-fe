import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function ExhibitViewPage() {
  const navigate = useNavigate();
  const { exhibitId } = useParams();
  const [exhibit, setExhibit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://exhibit-mw48.onrender.com/exhibits/${exhibitId}`)
      .then((res) => {
        setExhibit(res.data.exhibit);
        setLoading(false);
      })
      .catch((err) => {
        setExhibit(null);
        setLoading(false);
        setError("Error: " + err.message);
      });
  }, [exhibitId]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {error ? (
        <p className="error">{error}, try again later?</p>
      ) : (
        <div className="exhibit-view-container">
          <div className="exhibit-header">
            <h2>{exhibit.title}</h2>
            <p>{exhibit.description}</p>
          </div>
          <div className="results-grid-container">
            {exhibit.artworks && exhibit.artworks.length > 0 ? (
              exhibit.artworks.map((artwork) => (
                <button
                  className="result-card"
                  key={artwork.objectID || artwork.artwork_id}
                  onClick={() =>
                    navigate(
                      `/artwork/${artwork.objectID || artwork.artwork_id}`
                    )
                  }
                  type="button"
                >
                  <div className="result-image-container">
                    <img src={artwork.primaryImageSmall} alt={artwork.title} />
                  </div>
                  <div className="result-title">{artwork.title}</div>
                  <div className="result-artist">
                    {artwork.artistDisplayName}
                  </div>
                </button>
              ))
            ) : (
              <p>No artworks in this exhibit yet.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
