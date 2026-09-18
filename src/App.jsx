import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import SearchResultsPage from "./pages/SearchResults";
import ArtworkViewPage from "./pages/Artwork";
import ExhibitViewPage from "./pages/Exhibit";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";

function App() {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("");
  const [onDisplay, setOnDisplay] = useState("");
  const [department, setDepartment] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [limit, setLimit] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exhibitsLoading, setExhibitsLoading] = useState(false);
  const [error, setError] = useState("");
  const [exhibits, setExhibits] = useState([]);

  useEffect(() => {
    setExhibitsLoading(true);
    axios
      .get("https://exhibit-mw48.onrender.com/exhibits")
      .then((res) => {
        setExhibits(res.data.exhibits);
        setExhibitsLoading(false);
      })
      .catch((err) => {
        setError(err.message)
        console.error("exhibits error:", err);
      });
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (source) params.append("source", source);
    if (onDisplay) params.append("onDisplay", onDisplay);
    if (department) params.append("department", department);
    if (sortBy) params.append("sortBy", sortBy);
    if (order) params.append("order", order);
    if (limit) params.append("limit", limit);
    if (page) params.append("page", page);
    console.log(params.toString());
    try {
      const res = await axios.get(
        `https://exhibit-mw48.onrender.com/search?${params.toString()}`
      );
      setResults(res.data.artworksData);
    } catch (err) {
      setError(err.message)
      console.error("Search error:", err);
    }
    setLoading(false);
  };

  const searchProps = {
    query,
    setQuery,
    source,
    setSource,
    onDisplay,
    setOnDisplay,
    department,
    setDepartment,
    sortBy,
    setSortBy,
    order,
    setOrder,
    limit,
    setLimit,
    page,
    setPage,
    onSearch: handleSearch,
  };
  return (
    <Router>
      <main className="min-h-screen p-4 w-full max-w-[1800px] mx-auto flex flex-col gap-4">
        <Header searchProps={searchProps} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                exhibits={exhibits}
                setExhibits={setExhibits}
                exhibitsLoading={exhibitsLoading}
                error={error}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchResultsPage
                results={results}
                loading={loading}
                error={error} 
              />
            }
          />
          <Route
            path="/artwork/:artworkId"
            element={
              <ArtworkViewPage
                results={results}
                exhibits={exhibits}
              />
            }
          />
          <Route
            path="/exhibit/:exhibitId"
            element={<ExhibitViewPage/>}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

/*
notes
search, filter, sort, pagination
//add next and previous buttons for pagination
accessibility 
loading states
error handling
artwork component with full image and details
links to museum page
where can you view

// 
exhibits showcased in home page.
view exhibit page with list of artworks 
exhibit creation
add artwork to exhibit from artwork view page + maybe search results.
css and design
*/
