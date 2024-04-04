'use client';

import { useState, useRef, useEffect, use } from "react";
// import { get_autocomplete } from "../_api/groq";
import { get_autocomplete } from "../_api/google";

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
        }, 1);
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
    <div className="max-w-3xl mx-auto text-base">
      <fieldset className="relative bg-white pl-[1.125rem] pr-5 sm:pr-3 rounded-2xl top-4 shadow-white/[.5] shadow-[0_4px_16px_var(--tw-shadow-color)] border-0.5 border-border-300 transition-all">
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
            <div className="w-9 h-9">
              {/* File upload label */}
              <label className="bg-black/[.25] text-black relative grid place-content-center aspect-square rounded-xl cursor-pointer bg-bg-200 transition [fieldset:not(:disabled)_&]:hover:bg-bg-400 [fieldset:disabled_&]:opacity-50 [fieldset:disabled_&]:pointer-events-none focus-within:ring">
                <input
                  data-testid="file-upload"
                  className="opacity-0 absolute inset-0 rounded-xl -z-10 overflow-hidden"
                  accept=".pdf,.doc,.docx,.rtf,.epub,.odt,.odp,.pptx,.txt,.py,.ipynb,.js,.jsx,.html,.css,.java,.cs,.php,.c,.cpp,.cxx,.h,.hpp,.rs,.R,.Rmd,.swift,.go,.rb,.kt,.kts,.ts,.tsx,.m,.scala,.rs,.dart,.lua,.pl,.pm,.t,.sh,.bash,.zsh,.csv,.log,.ini,.config,.json,.yaml,.yml,.toml,.lua,.sql,.bat,.md,.coffee,.tex,.latex,.jpg,.jpeg,.png,.gif,.webp"
                  multiple
                  type="file"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M208.25,123.76a6,6,0,0,1,0,8.49l-82.06,82a54,54,0,0,1-76.36-76.39L149.1,37.14a38,38,0,1,1,53.77,53.72L103.59,191.54a22,22,0,1,1-31.15-31.09l83.28-84.67a6,6,0,0,1,8.56,8.42L81,168.91a10,10,0,1,0,14.11,14.18L194.35,82.4a26,26,0,1,0-36.74-36.8L58.33,146.28a42,42,0,1,0,59.37,59.44l82.06-82A6,6,0,0,1,208.25,123.76Z"></path>
                </svg>
              </label>
            </div>
            <div cmdk-item="" role="option" data-value="new chat">
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
        className={`bg-white/20 bottom-5 rounded-b-2xl ${
          suggestions.length === 0 || isMultiline ? "" : "pt-8"
        }`}
      >
        {!isMultiline &&
          suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`px-[1.125rem] py-3 hover:bg-black/25 ${
                highlightedIndex === index ? "bg-black/25" : ""
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
