"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AdvocatesGrid, SearchInput, Pagination } from "../components";
import { Advocate, PaginationInfo } from "../types";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchTerm = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1");

  const fetchAdvocates = async (search: string, page: number = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      params.append("page", page.toString());
      params.append("limit", "10");

      const response = await fetch(`/api/advocates?${params}`);
      const result = await response.json();

      setAdvocates(result.data || []);
      setPagination(result.pagination || null);
    } catch (error) {
      console.error("Error fetching advocates:", error);
      setAdvocates([]);
      setPagination(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchAdvocates(searchTerm, currentPage);
    } else {
      setAdvocates([]);
      setPagination(null);
    }
  }, [searchTerm, currentPage]);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams();
    if (term) params.append("search", term);
    params.append("page", "1"); // Reset to first page on new search
    
    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    params.append("page", page.toString());
    
    router.push(`/?${params.toString()}`);
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

        {searchTerm ? (
          <div className="mb-6 text-center">
            <p className="text-lg text-gray-600">
              {pagination ? (
                `Found ${pagination.totalCount} advocate${
                  pagination.totalCount === 1 ? "" : "s"
                } for "${searchTerm}" (Page ${pagination.page} of ${pagination.totalPages})`
              ) : advocates.length > 0 ? (
                `Found ${advocates.length} advocate${
                  advocates.length === 1 ? "" : "s"
                } for "${searchTerm}"`
              ) : (
                `No advocates found for "${searchTerm}"`
              )}
            </p>
          </div>
        ) : (
          <div className="mb-6 text-center">
            <p className="text-lg text-gray-600">
              Enter a search term to find advocates
            </p>
          </div>
        )}

        <AdvocatesGrid advocates={advocates} isLoading={isLoading} />
        
        {pagination && pagination.totalPages > 1 && (
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        )}
      </div>
    </main>
  );
}
