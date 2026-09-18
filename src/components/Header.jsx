import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

export default function Header({ searchProps }) {
  const navigate = useNavigate();
  return (
    <header className="border-b border-border pb-4 flex flex-col items-center gap-4 min-[650px]:flex-row min-[650px]:flex-wrap min-[650px]:justify-center min-[650px]:items-end">
      <h1
        className="font-semibold cursor-pointer leading-tight text-[clamp(1.75rem,9vw,3rem)] min-[650px]:text-2xl whitespace-nowrap"
        onClick={() => navigate("/")}
      >
        the met x the aic
      </h1>
      <SearchBar searchProps={searchProps} />
    </header>
  );
}