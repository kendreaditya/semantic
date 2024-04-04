'use client';

import { useState, useRef, useEffect, use } from "react";
import { get_autocomplete } from "../_api/groq";
// import { get_autocomplete } from "../_api/google";

export default function SearchBar() {
    const [suggestions, setSuggestions] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [searchQuery, setSearchQuery] = useState("");

    const debounceTimerRef = useRef(null);

    useEffect(() => {
    console.log(suggestions);
    }, [suggestions]);

    const textareaRef = useRef(null);
    const isMultiline = searchQuery.indexOf("\n") !== -1;

    useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    if (searchQuery.trim().length > 2 && !isMultiline) {
        // Clear the previous timeout
        if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            // setSuggestions([]); 
        get_autocomplete(searchQuery).then((suggestions) => {
            setSuggestions(suggestions.slice(0, 10));
        });
        }, 150);
    } else {
        // Clear the timeout and reset suggestions
        if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        }
        setSuggestions([]);
    }

    return () => {
        // Clean up the timeout on unmount or when dependencies change
        if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        }
    };
    }, [searchQuery, isMultiline]);

    const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
        );
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
        );
    } else if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSuggestionSelect(highlightedIndex);
    }
    };

    const handleMouseOver = (index: number) => {
    setHighlightedIndex(index);
    };

    const handleMouseLeave = () => {
    setHighlightedIndex(-1);
    };

    const handleSuggestionSelect = (index: number) => {
    if (index !== -1) {
        setSearchQuery(suggestions[index]);
        setHighlightedIndex(-1);
        document.getElementById("search")?.focus();
    }
    };

    // Rendering the SearchBar component
    return (
      <div className="max-w-3xl mx-auto text-base relative">
          <fieldset
            className="bg-white pl-[1.125rem] pr-5 sm:pr-3 rounded-2xl shadow-white/50 shadow-[0_4px_16px_var(--tw-shadow-color)] border-0.5 border-border-300 transition-all"
          >
            <div className="grid sm:grid-flow-col sm:grid-cols-[minmax(0,_1fr)_auto] sm:gap-2">
              <div className="flex items-center flex-grow break-words min-w-0">
                <div className="flex flex-col w-full">
                  <div className="overflow-y-auto w-full max-h-96 break-words py-4">
                    {/* Search box */}
                    <textarea
                      id="search"
                      ref={textareaRef}
                      autoFocus={true}
                      rows={1}
                      className="bg-transparent w-full outline-none break-words text-black resize-none block"
                      placeholder="What are you looking for?"
                      onKeyDown={handleKeyDown}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="grid grid-flow-col items-start gap-1.5 sm:pt-2.5 pb-2 sm:pb-0 place-self-end sm:place-self-auto -mr-3 sm:mr-0 auto-cols-[minmax(2rem,min-content)]">
                <div>
                  {/* Search button */}
                  <button className="bg-black/[.25] w-full flex items-center bg-bg-200 py-2 pr-2 pl-2 rounded-xl cursor-pointer transition-all ease-in-out active:scale-[0.98] text-ellipsis whitespace-nowrap overflow-x-hidden text-sm hover:bg-accent-main-200 [&:not(:disabled)]:bg-accent-main-100 [&:not(:disabled)]:text-[white]">
                    <div style={{ opacity: 1, width: "auto" }}>
                      <div className="mx-1 text-black">Search</div>
                    </div>
                    <div className="grid place-items-center w-5 h-5 text-black">
                      <svg
                        data-testid="geist-icon"
                        height="16"
                        stroke-linejoin="round"
                        viewBox="0 0 16 16"
                        width="16"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.53033 2.21968L9 1.68935L7.93934 2.75001L8.46967 3.28034L12.4393 7.25001H1.75H1V8.75001H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70711C14.9941 8.31659 14.9941 7.68342 14.6036 7.2929L9.53033 2.21968Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
        {/* Suggestions list */}
        <ul
          style={{ position: "absolute" }}
          className={`max-w-3xl w-full bg-zinc-700 rounded-b-2xl `}
        >
          {!isMultiline &&
            suggestions.map((suggestion, index) => (
              <li
                key={index}
                //   className={`px-[1.125rem] py-3 hover:bg-black/25 ${
                className={`px-[1.125rem] py-2 hover:bg-zinc-800 ${
                  highlightedIndex === index ? "bg-zinc-800" : ""
                }`}
                onMouseOver={() => handleMouseOver(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleSuggestionSelect(index)}
              >
                {suggestion}
              </li>
            ))}
        </ul>
      </div>
    );
}
