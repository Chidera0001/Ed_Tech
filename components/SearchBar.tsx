// components/SearchBar.tsx

import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        className="bg-green-600 text-white rounded-r px-4 py-2 hover:bg-green-700"
        onClick={() => onSearch(searchTerm)}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
