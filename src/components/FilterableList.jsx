/** @format */

import { useState } from "react";
import { foods } from "../../public/data.js";
import { filterItems } from "../FilterItem.jsx";
import SearchBar from "./SearchBar.jsx";
export default function FilterableList() {
  const [query, setQuery] = useState("");
  const results = filterItems(foods, query);

  function handleChange(e) {
    setQuery(e.target.value);
  }
  return (
    <>
      <SearchBar
        onShow={handleChange}
        query={query}
      />
      <hr />
      <List items={results} />
    </>
  );
}

function List({ items }) {
  return (
    <table>
      <tbody>
        {items.map((food) => (
          <tr key={food.id}>
            <td>{food.name}</td>
            <td>{food.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
