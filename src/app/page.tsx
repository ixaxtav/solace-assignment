"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AdvocatesGrid, SearchInput } from "../components";
import { Advocate } from "../types";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchTerm = searchParams.get("search") || "";

  const fetchAdvocates = async (search: string) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);

      const response = await fetch(`/api/advocates?${params}`);
      const result = await response.json();

      setAdvocates(result.data || []);
    } catch (error) {
      console.error("Error fetching advocates:", error);
      setAdvocates([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchAdvocates(searchTerm);
    } else {
      setAdvocates([]);
    }
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    if (term) {
      router.push(`/?search=${encodeURIComponent(term)}`);
    } else {
      router.push("/");
    }
  };

  const getSearchMessage = () => {
    if (!searchTerm) {
      return "Enter a search term to find advocates";
    }

    if (advocates.length === 0) {
      return `No advocates found for "${searchTerm}"`;
    }

    const plural = advocates.length === 1 ? "" : "s";
    return `Found ${advocates.length} advocate${plural} for "${searchTerm}"`;
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Solace Advocates</h1>
          <p className="mt-2 text-lg text-gray-600">
            Find the right advocate for your needs
          </p>
        </div>

        <SearchInput onSearch={handleSearch} isLoading={isLoading} />

        <div className="mb-6 text-left">
          <p className="text-sm text-gray-600">{getSearchMessage()}</p>
        </div>

        <AdvocatesGrid advocates={advocates} isLoading={isLoading} />
      </div>
    </main>
  );
}
