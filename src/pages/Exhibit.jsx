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

  return (
    <div className="px-6 sm:px-12">
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p role="alert" className="text-red-600">
            {error}, try again later?
          </p>
        ) : (
          <>
            <div className="flex flex-col items-start gap-4 py-6">
              <h2 className="text-2xl font-bold leading-none">
                {exhibit.title}
              </h2>
              <p className="text-neutral-600">{exhibit.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 min-[601px]:grid-cols-2 min-[901px]:grid-cols-3">
              {exhibit.artworks && exhibit.artworks.length > 0 ? (
                exhibit.artworks.map((artwork) => (
                  <button
                    type="button"
                    key={artwork.objectID || artwork.artwork_id}
                    onClick={() =>
                      navigate(
                        `/artwork/${artwork.objectID || artwork.artwork_id}`
                      )
                    }
                    className="flex max-w-full flex-col rounded-lg border-[0.8px] border-[#3b0000] bg-white p-4 text-left transition hover:-translate-y-1.5 hover:shadow-[0_14px_40px_rgba(17,17,17,0.1)] focus-visible:-translate-y-1.5 focus-visible:shadow-[0_14px_40px_rgba(17,17,17,0.1)]"
                  >
                    <div className="h-fit w-full aspect-[4/3] rounded-lg bg-neutral-200">
                      <img
                        src={artwork.primaryImageSmall}
                        alt={artwork.title}
                        className="block h-full w-full bg-neutral-100 object-contain"
                      />
                    </div>
                    <div className="mt-2 break-words text-center text-[1.1rem] font-bold">
                      {artwork.title}
                    </div>
                    <div className="mt-[0.3rem] break-words text-center text-[0.98em] text-neutral-600">
                      {artwork.artistDisplayName}
                    </div>
                  </button>
                ))
              ) : (
                <p>No artworks in this exhibit yet.</p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}