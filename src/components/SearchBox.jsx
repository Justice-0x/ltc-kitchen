import { useState } from "react";
import Fuse from "fuse.js";

const items = [
  { name: "Perlick", path: "/perlick" },
  { name: "TurboChef", path: "/turbochef" },
  { name: "Frosty", path: "/frosty" },
  { name: "Hoshizaki", path: "/hoshizaki" },
  { name: "Southbend", path: "/southbend" },
  { name: "Chicago Folders", path: "/chicago-folders" },
  { name: "Ironers", path: "/ironers" },
  { name: "Laundry", path: "/laundry" },
  { name: "Bill’s Bitch", path: "/bills-bitch" },
];

const fuse = new Fuse(items, { keys: ["name"], threshold: 0.3 });

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(items);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      setResults(items);
    } else {
      setResults(fuse.search(value).map(r => r.item));
    }
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="🔍 Search equipment..."
        className="w-full p-3 rounded-lg border border-gray-300 text-black"
      />
      <ul className="mt-3 space-y-2">
        {results.map((r, idx) => (
          <li key={idx}>
            <a href={r.path} className="text-blue-500 hover:underline">{r.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
