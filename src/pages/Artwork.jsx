import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ArtworkViewPage({exhibits }) {
  const { artworkId } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
    const [selectedExhibit, setSelectedExhibit] = useState("");
  const [addStatus, setAddStatus] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://exhibit-mw48.onrender.com/artwork/${artworkId}`)
      .then((res) => {
        setArtwork(res.data.artwork);
        console.log("pingpingpingping", res.data.artwork)
        setLoading(false);
      })
      .catch((err) => {
        setArtwork(null);
        setLoading(false);
        setError(err.message);
      });
  }, [artworkId]);

  const handleAddToExhibit = async () => {
    if (!selectedExhibit) return;
    setAddStatus("loading");
    try {
      await axios.post(
        `https://exhibit-mw48.onrender.com/exhibits/${selectedExhibit}/artwork`,
        artwork
      );
      setAddStatus("success");
    } catch (err) {
      setAddStatus("error: " + err.message);

    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      {error ? <p className="error">{error}, try again later?</p> : !artwork ? <p>Artwork not found.</p> :
      <div className="artwork-view-container">
        <div className="artwork-image-section">
          <img
            src={artwork.primaryImage}
            alt={artwork.title}
            className="artwork-main-image"
          />
          <div className="artwork-title">{artwork.title}</div>
          <div className="artwork-artist">{artwork.artistDisplayName}</div>
          <div className="add-to-exhibit-section">
            <label>
              Add to exhibit:
              <select
                value={selectedExhibit}
                onChange={e => setSelectedExhibit(e.target.value)}
              >
                <option value="">Select exhibit</option>
                {exhibits.map(ex => (
                  <option key={ex.exhibit_id} value={ex.exhibit_id}>
                    {ex.title}
                  </option>
                ))}
              </select>
            </label>
            <button
              onClick={handleAddToExhibit}
              disabled={!selectedExhibit || addStatus === "loading"}
            >
              Add
            </button>
            {addStatus === "success" && <span style={{ color: "green" }}>Added!</span>}
            {addStatus === "error" && <span style={{ color: "red" }}>Error adding artwork.</span>}
          </div>
        </div>
        <div className="artwork-info-section">
          <p>
            <strong>Source:</strong> {artwork.source}
          </p>
          <p>
            <strong>isPublicDomain:</strong>{" "}
            {artwork.isPublicDomain ? "Yes" : "No"}
          </p>
          <p>
            <strong>Department:</strong> {artwork.museumDepartment}
          </p>
          <p>
            <strong>Artist Bio:</strong> {artwork.artistDisplayBio}
          </p>
          <p>
            <strong>Nationality:</strong> {artwork.artistNationality}
          </p>
          <p>
            <strong>Date:</strong> {artwork.objectDate}
          </p>
          <p>
            <strong>Medium:</strong> {artwork.medium}
          </p>
          <p>
            <strong>Dimensions:</strong> {artwork.dimensions}
          </p>
          <p>
            <strong>On View:</strong> {artwork.isOnView ? "Yes" : "No"}
          </p>
          <p>
            <strong>More Info:</strong> <a href={artwork.url} target="_blank" rel="noopener noreferrer">{artwork.url}</a>
          </p>
        </div>
      </div>}
    </>
  );
}
