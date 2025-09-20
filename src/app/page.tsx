"use client";

import { useEffect, useState } from "react";
import { Advocate } from "../types";
import { AdvocatesGrid } from "@/components";

export default function Home() {
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  return (
    <main style={{ margin: "24px" }}>
      <AdvocatesGrid advocates={filteredAdvocates} isLoading={false} />
    </main>
  );
}
