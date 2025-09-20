"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
  isLoading?: boolean;
}

export const SearchInput = ({
  onSearch,
  isLoading = false,
}: SearchInputProps) => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const urlSearchTerm = searchParams.get("search") || "";
    setSearchTerm(urlSearchTerm);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError("Search term is required");
      return;
    }
    setError("");
    onSearch(searchTerm.trim());
  };

  const handleReset = () => {
    setSearchTerm("");
    setError("");
    onSearch("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="rounded-lg shadow-md p-6 mb-8 bg-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700"
        >
          Search Advocates
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={handleKeyPress}
              placeholder="Search by name, city, degree, specialties..."
              className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 bg-white text-gray-900 text-sm ${
                error ? "border-red-500" : "border-blue-500"
              }`}
              autoFocus
            />
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
          </div>
          <div className="flex gap-2 sm:items-start">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
            {searchParams.get("search") && (
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
