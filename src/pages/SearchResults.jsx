import SearchResults from "../components/searchResults";

export default function SearchResultsPage({
  results,
  loading,
  error,
}) {
  console.log(error, "<<<")
  return (
    <div>
      <main>
        <h2>Search Results</h2>
        {error && <p className="error">{error}, try again later?</p>}
        {loading ? <p>Loading...</p> : <SearchResults results={results} error={error} />}
      </main>
    </div>
  );
}
