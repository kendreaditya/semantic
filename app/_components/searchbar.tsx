const SearchBar = () => {
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
            type="search"
            id="default-search"
            className="block w-full p-4 pr-24 text-base focus:outline-none bg-transparent text-gray-200 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
            placeholder="Search anything..."
            autoComplete="off"
            autoFocus={true}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-indigo-500 hover:bg-indigo-500/90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>
        </div>
      </form>
    );
}

export default SearchBar;