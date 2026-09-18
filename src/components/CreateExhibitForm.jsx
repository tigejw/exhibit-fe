import React, { useEffect, useRef } from "react";

export default function CreateExhibitForm({
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
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (!showForm) return;
    firstInputRef.current?.focus();

    function onKey(e) {
      if (e.key === "Escape") setShowForm(false);
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [showForm, setShowForm]);

  if (!showForm) return null;

  return (
  <div
  role="region"
  aria-labelledby="create-exhibit-title"
  className="z-[3] mx-auto my-4 mb-6 w-[calc(100%-2rem)] max-w-[880px] rounded-xl bg-white p-4 text-neutral-900 shadow-[0_8px_30px_rgba(17,17,17,0.06)]"
>
      <form
  onSubmit={handleCreateExhibit}
  className="grid grid-cols-1 gap-3"
>
  <label className="flex flex-col gap-1.5 text-[0.95rem] font-semibold text-neutral-800">
    Title
    <input
      ref={firstInputRef}
      name="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
      className="box-border min-h-[40px] w-full rounded-[10px] border border-neutral-300 bg-neutral-50 px-3 text-base text-neutral-900 focus-visible:border-accent focus-visible:outline-none"
    />
  </label>

  <label className="flex flex-col gap-1.5 text-[0.95rem] font-semibold text-neutral-800">
    Description
    <textarea
      name="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="box-border min-h-[88px] w-full resize-y rounded-[10px] border border-neutral-300 bg-neutral-50 px-3 py-2 text-base text-neutral-900 focus-visible:border-accent focus-visible:outline-none"
    />
  </label>

  {formError && (
    <div role="alert" className="text-sm font-medium text-red-600">
      {formError}
    </div>
  )}

  <div className="mt-1 flex justify-end gap-3">
    <button
      type="button"
      onClick={() => setShowForm(false)}
      className="rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-[0.56rem] text-neutral-800 transition hover:bg-neutral-200"
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={loading}
      className="rounded-xl bg-accent px-4 py-2 font-semibold text-white transition hover:-translate-y-px hover:bg-accent/90 hover:shadow-lg active:translate-y-0 active:scale-[0.995] active:bg-accent/80 active:shadow-inner disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Creating..." : "Create"}
    </button>
  </div>
</form>
    </div>
  );
}