import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { equipmentData } from "../data/equipmentData.js";

function buildIndex() {
  const entries = [];
  const brands = Object.keys(equipmentData);
  for (const id of brands) {
    const eq = equipmentData[id];
    // Brand landing
    entries.push({ type: 'Brand', name: eq.name, path: `/${id}`, description: eq.manufacturer });
    // Manuals
    eq.manuals?.forEach(m => entries.push({ type: 'Manual', name: m.title, path: `/manuals/${m.file}`, description: m.description, brand: eq.name }));
    // Parts
    eq.parts?.forEach(p => entries.push({ type: 'Part', name: `${p.name} (${p.partNumber})`, path: `/parts/${id}?q=${encodeURIComponent(p.partNumber)}`, description: p.description, brand: eq.name }));
    // Issues / Error codes
    eq.commonIssues?.forEach(issue => entries.push({ type: 'Issue', name: issue.issue, path: `/${id}#issues`, description: `${issue.cause} — ${issue.solution}`, brand: eq.name }));
  }
  // Add key utility pages
  entries.push({ type: 'Tool', name: 'PT Chart', path: '/pt-chart', description: 'Pressure-Temperature chart for common refrigerants' });
  entries.push({ type: 'Tool', name: 'Calculators', path: '/calculators', description: 'Superheat and subcool calculator' });
  return entries;
}

const fuseOptions = {
  includeMatches: true,
  threshold: 0.3,
  keys: [
    { name: 'name', weight: 0.7 },
    { name: 'description', weight: 0.3 },
    { name: 'brand', weight: 0.2 },
    { name: 'type', weight: 0.2 },
  ],
};

function highlight(text, matchesForField) {
  if (!matchesForField || matchesForField.length === 0) return text;
  let result = '';
  let lastIndex = 0;
  matchesForField.forEach(([start, end]) => {
    result += text.slice(lastIndex, start);
    result += `<mark class="bg-yellow-200 text-yellow-900 rounded px-0.5">${text.slice(start, end + 1)}</mark>`;
    lastIndex = end + 1;
  });
  result += text.slice(lastIndex);
  return result;
}

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const index = useMemo(() => buildIndex(), []);
  const fuse = useMemo(() => new Fuse(index, fuseOptions), [index]);

  const results = useMemo(() => {
    if (!query.trim()) return index.slice(0, 8).map(item => ({ item, matches: [] }));
    return fuse.search(query);
  }, [query, fuse, index]);

  return (
    <div className="mb-6">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="🔍 Search manuals, parts, and errors..."
        className="w-full p-3 rounded-lg border border-gray-300 text-black"
      />
      <ul className="mt-3 space-y-2">
        {results.map((r, idx) => {
          const { item, matches } = r;
          const nameMatch = matches?.find(m => m.key === 'name');
          const descMatch = matches?.find(m => m.key === 'description');
          return (
            <li key={idx} className="p-2 rounded hover:bg-gray-100">
              <a href={item.path} className="block">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">{item.type}</span>
                  <span className="text-xs text-gray-500">{item.brand}</span>
                </div>
                <div className="text-blue-600 font-medium" dangerouslySetInnerHTML={{ __html: highlight(item.name, nameMatch?.indices) }} />
                {item.description && (
                  <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: highlight(item.description, descMatch?.indices) }} />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
