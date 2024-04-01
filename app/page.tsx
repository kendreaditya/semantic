"use client";

import './_components/result'
import { useState } from 'react';
import Result from './_components/result';
import SearchBar from './_components/searchbar';
import Context from './_components/context';

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query: string) => {
    fetch(
      `http://127.0.0.1:8000/search?query=${query}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      setSearchResults(data);
    }).catch((error) => {
      console.error("Error fetching search results:", error);
    });
  };


  return (
    <main>
      <div className="w-full pt-32 pb-12 bg-gradient-to-b from-indigo-500/20 via-purple-500/13 to-0">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="flex sm:flex-row items-center justify-center">
        <div className="max-w-screen-2xl">
          <div className="px-12 sm:px-20 sm:flex sm:space-x-16">
            <div className="sm:basis-1/2">
              <Context />
            </div>
            <div className="sm:basis-1/2">
              <h1 className="text-2xl font-bold mb-3">Search Results</h1>
              {searchResults.map((result) => Result(result))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
