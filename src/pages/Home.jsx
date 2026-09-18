import ExhibitShowcase from "../components/ExhibitsShowcase";
import { useState } from "react";
import axios from "axios";

export default function HomePage({ exhibits, setExhibits, exhibitsLoading, error }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setformError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateExhibit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setformError("");
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
      setformError("Failed to create exhibit.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="home-container">
      <main>
        <div className="exhibits-header-row">
          <h2 className="section-title">Exhibits</h2>
          <button
            className="create-exhibit-btn"
            onClick={() => setShowForm((s) => !s)}
            disabled={loading}
            type="button"

            data-create-toggle="1"
          >
            {showForm ? "Close" : "+ Create New Exhibit"}
          </button>
        </div>
        
        {error ? (
          <p className="error">{error}, try again later?</p>
        ) : exhibitsLoading ? (
          <div className="loading-indicator">Loading exhibits...</div>
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
