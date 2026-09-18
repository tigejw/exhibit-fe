import ExhibitShowcase from "../components/ExhibitsShowcase";
import { useState } from "react";
import axios from "axios";

export default function HomePage({ exhibits, setExhibits, exhibitsLoading, error }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateExhibit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");
    try {
      const res = await axios.post("https://exhibit-mw48.onrender.com/exhibits", {
        title,
        description,
      });
      setExhibits((prev = []) => [...prev, res.data.exhibit]);
      setShowForm(false);
      setTitle("");
      setDescription("");
    } catch (err) {
      setFormError("Failed to create exhibit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 sm:px-12">
      <main>
        <div className="flex flex-col items-start gap-4 py-6">
          <h2 className="text-2xl font-bold leading-none">Exhibits</h2>
          <button
            type="button"
            data-create-toggle="1"
            disabled={loading}
            onClick={() => setShowForm((s) => !s)}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-px hover:bg-accent/90 hover:shadow-lg active:translate-y-0 active:scale-[0.99] active:bg-accent/80 active:shadow-inner disabled:cursor-not-allowed disabled:opacity-60"
          >
            {showForm ? "Close" : "+ Create New Exhibit"}
          </button>
        </div>

        {error ? (
          <p className="text-red-600">{error}, try again later...?</p>
        ) : exhibitsLoading ? (
          <div className="py-12 text-center text-neutral-500">Loading exhibits...</div>
        ) : (
          <ExhibitShowcase
            exhibits={exhibits}
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
        )}
      </main>
    </div>
  );
}