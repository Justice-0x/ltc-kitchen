# Polishing roadmap (short-term)

## 1) Must-fix polish (shipping today)

- Global search across docs/error codes/parts with highlights
- Sticky mobile action bar (Manuals, Parts, Errors, Contact)
- Commissioning checklist (print + export to PDF)
- Superheat/Sub-cooling calculator (inline widget + calculators page)
- Water quality card (TDS, hardness, chlorine/chloramine limits + filter SKUs)
- Version + Last reviewed tag on each manual tile

## 2) Near-term (same day)

- Model selector per brand (per-model overrides: specs, wiring, parts)
- Troubleshooting flowcharts with expected readings at each step
- Parts order form improvements (prefill unit model/serial; CC/BCC routing)
- Offline cache of PDFs + key pages (service mode)
- Error code quick-lookup (global, grouped by brand)

## 3) Nice-to-have

- Field photo attachments to unit log
- Export Job Packet (manual + checklist + parts) as a single PDF
- Tools & PPE list with meter ranges per procedure
- OEM vs aftermarket cross-ref, stocking priority

## Implementation notes

- Keep theme-aware styles (dark, light, spooky) with Tailwind variants
- Use Astro pages for content, React islands for interactive widgets
- Prefer small, composable components in `src/components`
