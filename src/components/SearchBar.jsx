import { useNavigate } from "react-router-dom";

export default function SearchBar({ searchProps }) {
  const navigate = useNavigate();
  const {
    query, setQuery,
    source, setSource,
    department, setDepartment,
    sortBy, setSortBy,
    order, setOrder,
    limit, setLimit,
    onSearch,
  } = searchProps;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
    navigate("/search");
  };

  const inputClasses =
    "border border-border rounded-lg px-2 py-1.5 text-sm bg-white focus:outline-none focus:border-accent w-full";

  return (
    <>
      <form className="flex gap-2 w-full min-[650px]:w-auto" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search for artworks..."
          aria-label="search-bar"
          className="flex-1 min-[650px]:flex-none min-[650px]:w-40 border border-border rounded-full px-4 py-1.5 text-sm placeholder:text-text-muted focus:outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="rounded-full bg-accent hover:bg-accent-dark transition-colors text-white text-xs uppercase font-medium py-1.5 px-4 whitespace-nowrap"
        >
          search
        </button>
      </form>

      {/* Row 1 (mobile): Source + Department. At 650px+: dissolves into the header's flex row. */}
      <div className="grid grid-cols-2 gap-2 w-full min-[650px]:contents">
        <div className="flex flex-col gap-1">
          <label htmlFor="search-bar-filters-source" className="text-text-muted text-xs uppercase tracking-wide">Source</label>
          <select id="search-bar-filters-source" aria-label="search-bar-filters-source" value={source} onChange={(e) => setSource(e.target.value)} className={inputClasses}>
            <option value="">All Sources</option>
            <option value="met">The Met</option>
            <option value="chicago">Art Institute of Chicago</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="search-bar-filters-department" className="text-text-muted text-xs uppercase tracking-wide">Department</label>
          <select id="search-bar-filters-department" aria-label="search-bar-filters-department" value={department} onChange={(e) => setDepartment(e.target.value)} className={inputClasses}>
            <option value="">All Departments</option>
            <option value="European Art">European Art</option>
            <option value="Asian Art">Asian Art</option>
            <option value="Greek, Roman and Byzantium Art">Greek, Roman and Byzantium Art</option>
            <option value="Modern and Contemporary Art">Modern and Contemporary Art</option>
            <option value="Arts of the Americas">Arts of the Americas</option>
            <option value="Ancient Near Eastern Art">Ancient Near Eastern Art</option>
            <option value="Arms and Armor">Arms and Armor</option>
            <option value="Arts of Africa, Oceania, and the Americas">Arts of Africa, Oceania, and the Americas</option>
            <option value="The Cloisters">The Cloisters</option>
            <option value="The Costume Institute">The Costume Institute</option>
            <option value="Drawings and Prints">Drawings and Prints</option>
            <option value="Egyptian Art">Egyptian Art</option>
            <option value="Islamic Art">Islamic Art</option>
            <option value="The Robert Lehman Collection">The Robert Lehman Collection</option>
            <option value="The Libraries">The Libraries</option>
            <option value="Medieval Art">Medieval Art</option>
            <option value="Musical Instruments">Musical Instruments</option>
            <option value="Photographs">Photographs</option>
            <option value="Architecture and Design">Architecture and Design</option>
            <option value="Research Center">Research Center</option>
            <option value="Textiles">Textiles</option>
          </select>
        </div>
      </div>

      {/* Row 2 (mobile): Sort + Order + Limit. At 650px+: dissolves into the header's flex row. */}
      <div className="grid grid-cols-3 gap-2 w-full min-[650px]:contents">
        <div className="flex flex-col gap-1">
          <label htmlFor="search-bar-filters-sortby" className="text-text-muted text-xs uppercase tracking-wide">Sort</label>
          <select id="search-bar-filters-sortby" aria-label="search-bar-filters-sortby" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={inputClasses}>
            <option value="">sort By</option>
            <option value="title">title</option>
            <option value="medium">medium</option>
            <option value="artistDisplayName">artist</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="search-bar-filters-order" className="text-text-muted text-xs uppercase tracking-wide">Order</label>
          <select id="search-bar-filters-order" aria-label="search-bar-filters-order" value={order} onChange={(e) => setOrder(e.target.value)} className={inputClasses}>
            <option value="">order</option>
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="search-bar-limit" className="text-text-muted text-xs uppercase tracking-wide">Limit</label>
          <input id="search-bar-limit" type="number" value={limit} onChange={(e) => setLimit(e.target.value)} placeholder="Limit" min="1" aria-label="search-bar-limit" className="border border-border rounded-lg px-2 py-1.5 text-sm bg-white focus:outline-none focus:border-accent w-32" />
        </div>
      </div>
    </>
  );
}