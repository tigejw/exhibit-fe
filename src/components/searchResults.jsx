import { useNavigate } from "react-router-dom";

export default function SearchResults({ results, error }) {
  const navigate = useNavigate();

  if (!results.length && !error) {
    return <p>No results found</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 min-[601px]:grid-cols-2 min-[901px]:grid-cols-3">
      {results.map((artwork) => (
        <button
          key={artwork.objectID || artwork.artwork_id}
          onClick={() =>
            navigate(`/artwork/${artwork.objectID || artwork.artwork_id}`)
          }
          className="flex max-w-full flex-col rounded-lg border-[0.8px] border-[#3b0000] bg-neutral-100 p-4 text-left transition hover:-translate-y-1.5 hover:shadow-[0_14px_40px_rgba(17,17,17,0.1)] focus-visible:-translate-y-1.5 focus-visible:shadow-[0_14px_40px_rgba(17,17,17,0.1)]"
        >
          <div className="h-fit w-full aspect-[4/3] rounded-lg bg-neutral-200">
            <img
              src={artwork.primaryImageSmall}
              alt={artwork.title || "Artwork image"}
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
      ))}
    </div>
  );
}