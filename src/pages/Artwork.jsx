import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ArtworkViewPage({ exhibits }) {
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

  return (
    <div className="px-6 sm:px-12">
      <main>
        {loading ? (
          <p className="py-6">Loading...</p>
        ) : error ? (
          <p role="alert" className="py-6 text-red-600">
            {error}, try again later?
          </p>
        ) : !artwork ? (
          <p className="py-6">Artwork not found.</p>
        ) : (
          <div className="my-8 flex flex-col flex-wrap justify-center gap-8 rounded-2xl bg-white p-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)] lg:flex-row lg:p-8">
            <div className="flex min-w-0 max-w-full flex-col items-center lg:min-w-[320px] lg:max-w-[60%]">
              <img
                src={artwork.primaryImage}
                alt={artwork.title}
                className="mb-6 w-full max-w-[70%] bg-neutral-100 object-fill shadow-[0_1px_8px_rgba(0,0,0,0.08)]"
              />
              <div className="mt-2 text-center text-2xl font-bold">
                {artwork.title}
              </div>
              <div className="mb-4 text-center text-lg text-neutral-600">
                {artwork.artistDisplayName}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <label>
                  Add to exhibit:{" "}
                  <select
                    value={selectedExhibit}
                    onChange={(e) => setSelectedExhibit(e.target.value)}
                  >
                    <option value="">Select exhibit</option>
                    {exhibits.map((ex) => (
                      <option key={ex.exhibit_id} value={ex.exhibit_id}>
                        {ex.title}
                      </option>
                    ))}
                  </select>
                </label>
                <button
  onClick={handleAddToExhibit}
  disabled={!selectedExhibit || addStatus === "loading"}
  className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-px hover:bg-accent/90 hover:shadow-lg active:translate-y-0 active:scale-[0.99] active:bg-accent/80 active:shadow-inner disabled:cursor-not-allowed disabled:opacity-60"
>
  Add
</button>
                {addStatus === "success" && (
                  <span className="text-green-600">Added!</span>
                )}
                {addStatus === "error" && (
                  <span className="text-red-600">Error adding artwork.</span>
                )}
              </div>
            </div>

            <div className="min-w-0 max-w-full flex-1 rounded-xl bg-neutral-50 p-6 text-base shadow-[0_1px_8px_rgba(0,0,0,0.04)] lg:min-w-[260px] lg:max-w-[400px]">
              <p className="my-2 leading-relaxed">
                <strong>Source:</strong> {artwork.source}
              </p>
              <p className="my-2 leading-relaxed">
                <strong>isPublicDomain:</strong>{" "}
                {artwork.isPublicDomain ? "Yes" : "No"}
              </p>
              <p className="my-2 leading-relaxed">
                <strong>Department:</strong> {artwork.museumDepartment}
              </p>
              <p className="my-2 leading-relaxed">
                <strong>Artist Bio:</strong> {artwork.artistDisplayBio}
              </p>
              <p className="my-2 leading-relaxed">
                <strong>Nationality:</strong> {artwork.artistNationality}
              </p>
              <p className="my-2 leading-relaxed">
                <strong>Date:</strong> {artwork.objectDate}
              </p>
              <p className="my-2 leading-relaxed">
                <strong>Medium:</strong> {artwork.medium}
              </p>
              <p className="my-2 leading-relaxed">
                <strong>Dimensions:</strong> {artwork.dimensions}
              </p>
              <p className="my-2 leading-relaxed">
                <strong>On View:</strong> {artwork.isOnView ? "Yes" : "No"}
              </p>
              <p className="my-2 leading-relaxed">
                <strong>More Info:</strong>{" "}
                <a
                  href={artwork.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {artwork.url}
                </a>
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}