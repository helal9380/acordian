/** @format */

function SearchBar({ query, onShow }) {
  return (
    <label>
      Search:{" "}
      <input
        value={query}
        onChange={onShow}
      />
    </label>
  );
}
export default SearchBar;
