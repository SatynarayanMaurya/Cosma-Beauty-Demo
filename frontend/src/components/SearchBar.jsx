import { useState } from "react";

export default function SearchBar({ onSearch,searchQuery ,searchQueryValue}) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl mx-auto my-6">
      <input
        type="text"
        placeholder="Enter your skin/hair concern..."
        value={searchQueryValue}
        onChange={(e) => searchQuery(e)}
        className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <button type="submit"
        onClick={handleSearch}
        className="bg-pink-500 text-white px-6 py-2 rounded-xl shadow hover:bg-pink-600 transition"
      >
        Search
      </button>
    </form>
  );
}
