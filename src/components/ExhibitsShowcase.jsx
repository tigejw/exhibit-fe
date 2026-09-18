import { useNavigate } from "react-router-dom";
import CreateExhibitForm from "./CreateExhibitForm";

export default function ExhibitShowcase({
  exhibits,
  showForm,
  setShowForm,
  title,
  setTitle,
  description,
  setDescription,
  handleCreateExhibit,
  formError,
  loading,
}) {
  const navigate = useNavigate();

  const sortedExhibits = exhibits
    ? [...exhibits].sort(
        (a, b) => new Date(b.date_created) - new Date(a.date_created)
      )
    : [];

  return (
    <div>
      <CreateExhibitForm
        showForm={showForm}
        setShowForm={setShowForm}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        handleCreateExhibit={handleCreateExhibit}
        formError={formError}
        loading={loading}
      />

      {sortedExhibits.length === 0 ? (
        <p className="py-12 text-center text-neutral-500">No exhibits found.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedExhibits.map((exhibit) => (
            <button
              key={exhibit.exhibit_id}
              type="button"
              onClick={() => navigate(`/exhibit/${exhibit.exhibit_id}`)}
              className="flex max-w-full flex-col rounded-lg border-[0.8px] border-[#3b0000] bg-gradient-to-b from-white to-[#ffeded] p-4 text-left transition hover:-translate-y-1.5 hover:shadow-[0_14px_40px_rgba(17,17,17,0.1)]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-200">
                <img
                  src={exhibit.thumbnail}
                  alt={`${exhibit.title} thumbnail`}
                  className="h-full w-full bg-neutral-100 object-contain"
                />
              </div>
              <div className="mt-2 break-words text-center text-lg font-bold">
                {exhibit.title}
              </div>
              <div className="mt-1 break-words text-center text-[0.98em] text-neutral-600">
                {exhibit.description}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}