import SearchResults from "../components/searchResults";

export default function SearchResultsPage({ results, loading, error }) {
  return (
    <div className="px-6 sm:px-12">
      <main>
        <div className="flex flex-col items-start gap-4 py-6">
          <h2 className="text-2xl font-bold leading-none">Search Results</h2>
        </div>

        {error && (
          <p role="alert" className="text-red-600">
            {error}, try again later?
          </p>
        )}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <SearchResults results={results} error={error} />
        )}
      </main>
    </div>
  );
}