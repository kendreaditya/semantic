"use client";
import React, { useState, useEffect } from "react";
import { semanticSearch } from "./_utils/api";

interface WikipediaArticle {
  _additional: {
    distance: number;
  };
  lang: string;
  text: string;
  title: string;
  url: string;
  views: number;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await semanticSearch(search);
      setResults(response !== undefined ? response : []);
    }
    fetchData();
  }, [search]);

  return (
    <div>
      <input
        className="border-2 border-gray-300"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {results.map((result: WikipediaArticle[], index) => (
          <div key={index}>
            <h2>{result.title}</h2>
            <p>{result.text}</p>
          </div>
        ))
      }

    </div>
  );
}
