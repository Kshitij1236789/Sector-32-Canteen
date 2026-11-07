
function SearchBar({ search, setSearch }) {
  return (
    <div className="px-4 mt-5">

      <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">

        <span className="text-xl mr-3">
          🔍
        </span>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search rice, dal, snacks..."
          className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400 bg-transparent"
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-gray-400 text-xl ml-2"
          >
            ×
          </button>
        )}

      </div>

    </div>
  );
}

export default SearchBar;
