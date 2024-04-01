"use client";

import { use, useEffect, useState } from "react";
import { useCombobox } from "downshift";

const SearchBar = ({onSearch}) => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);

  const handleSearch = () => {
    onSearch(query);
  };

  useEffect(() => {
    if (!query) {
      return setItems([]);
    }

    fetch(
      `https://justcors.com/tl_e9841d3/https://suggestqueries.google.com/complete/search?json&client=firefox&hl=en&lr=en&ds=n&q=${query}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Ensure data[1] exists before accessing
        const suggestions = data[1] || [];
        setItems(suggestions);
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
      });
  }, [query]);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items,
    onInputValueChange: ({ inputValue }) => {
      setQuery(inputValue);
    },
  });

  return (
    <form className="max-w-xl mx-auto relative p-4">
      <h1 className="hover:animate-pulse text-5xl font-bold mb-3 lg:absolute lg:-left-56 lg:top-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-50 text-transparent bg-clip-text text-center">
        semantic
      </h1>
      <label htmlFor="default-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <input
          {...getInputProps()}
          type="search"
          id="default-search"
          className="block w-full p-4 pr-24 text-base focus:outline-none bg-transparent text-gray-200 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
          placeholder="Search anything..."
          autoComplete="off"
          autoFocus={true}
          required
          onSubmit={handleSearch}
        />
        <button
          type="button"
          className="text-white absolute end-2.5 bottom-2.5 bg-indigo-500 hover:bg-indigo-500/90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
          onSubmit={handleSearch}
          onClick={handleSearch}
        >
          Search
        </button>
      <ul
        {...getMenuProps()}
        className={`${
            isOpen ? "block" : "hidden"
        } absolute z-10 bg-black border border-gray-500 rounded-md shadow-md w-full`}
        >
        {isOpen &&
          items.map((item, index) => (
              <li
              {...getItemProps({ item, index })}
              key={item}
              className={`${
                  highlightedIndex === index ? "bg-gray-100/25" : ""
                } py-2 px-4 cursor-pointer`}
                >
              {item}
            </li>
          ))}
      </ul>
          </div>
    </form>
  );
};

export default SearchBar;
