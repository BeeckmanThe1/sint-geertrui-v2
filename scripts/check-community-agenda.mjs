/**
 * Validate community agenda JSON: duplicates, id/locale parity, description length bands.
 * Run: npm run agenda:check-community
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const agendaDir = path.join(root, "src/content/agenda");

const FILES = {
  nl: path.join(agendaDir, "community.json"),
  en: path.join(agendaDir, "community.en.json"),
  fr: path.join(agendaDir, "community.fr.json"),
};

/** Matches AgendaReadMoreDescription READ_MORE_MIN_CHARS. */
const READ_MORE_MIN_CHARS = 200;
const ROUTINE_MAX_CHARS = 140;

function loadEvents(locale) {
  const raw = JSON.parse(fs.readFileSync(FILES[locale], "utf8"));
  return raw.events ?? [];
}

function normalizeTitle(title) {
  return title.trim().toLowerCase().replace(/\s+/g, " ");
}

function serviceKind(title) {
  const t = normalizeTitle(title);
  if (t.includes("eucharist")) return "eucharist";
  if (t.includes("woord en communie") || t.includes("word and communion") || t.includes("parole et communion")) {
    return "word-communion";
  }
  if (t.includes("geloofsgesprek") || t.includes("faith conversation") || t.includes("conversation de foi")) {
    return "faith-talk";
  }
  if (t.includes("geertruicaf")) return "geertruicafe";
  return "other";
}

function checkLocale(events, locale) {
  const errors = [];
  const warnings = [];

  const ids = new Map();
  const dateTitle = new Map();
  const dateService = new Map();

  for (const row of events) {
    if (row.category !== "community") {
      errors.push(`[${locale}] ${row.id}: category must be "community"`);
    }

    if (ids.has(row.id)) {
      errors.push(`[${locale}] duplicate id "${row.id}"`);
    }
    ids.set(row.id, row);

    const titleKey = `${row.date}::${normalizeTitle(row.title)}`;
    if (dateTitle.has(titleKey)) {
      errors.push(
        `[${locale}] duplicate date+title on ${row.date}: "${row.title}" (ids ${dateTitle.get(titleKey)} and ${row.id})`,
      );
    } else {
      dateTitle.set(titleKey, row.id);
    }

    const kind = serviceKind(row.title);
    const serviceKey = `${row.date}::${kind}`;
    if (kind !== "other" && kind !== "geertruicafe" && dateService.has(serviceKey)) {
      const otherId = dateService.get(serviceKey);
      if (otherId !== row.id) {
        warnings.push(
          `[${locale}] same date + service type "${kind}" on ${row.date}: ids ${otherId} and ${row.id}, confirm intentional (e.g. two times?)`,
        );
      }
    } else if (kind !== "other") {
      dateService.set(serviceKey, row.id);
    }

    const len = row.description?.length ?? 0;
    const isRoutine =
      kind === "eucharist" || kind === "word-communion" || kind === "faith-talk";
    if (isRoutine && len >= READ_MORE_MIN_CHARS) {
      warnings.push(
        `[${locale}] ${row.id}: routine event description is ${len} chars (≥${READ_MORE_MIN_CHARS}), card grid will look uneven; shorten to ~${ROUTINE_MAX_CHARS} chars`,
      );
    }
    if (isRoutine && len > ROUTINE_MAX_CHARS && len < READ_MORE_MIN_CHARS) {
      warnings.push(
        `[${locale}] ${row.id}: routine description is ${len} chars, prefer ~60–${ROUTINE_MAX_CHARS} for grid consistency`,
      );
    }
  }

  return { errors, warnings };
}

function checkLocaleParity(bundles) {
  const errors = [];
  const nlIds = bundles.nl.map((e) => e.id).sort();
  const enIds = bundles.en.map((e) => e.id).sort();
  const frIds = bundles.fr.map((e) => e.id).sort();

  for (const [a, b, label] of [
    [nlIds, enIds, "nl vs en"],
    [nlIds, frIds, "nl vs fr"],
  ]) {
    if (a.length !== b.length) {
      errors.push(`id count mismatch (${label}): ${a.length} vs ${b.length}`);
    }
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i] !== b[i]) {
        errors.push(`id order mismatch (${label}) at index ${i}: ${a[i]} vs ${b[i]}`);
        break;
      }
    }
    const setB = new Set(b);
    for (const id of a) {
      if (!setB.has(id)) {
        errors.push(`missing id in ${label}: ${id}`);
      }
    }
  }

  return errors;
}

const bundles = {
  nl: loadEvents("nl"),
  en: loadEvents("en"),
  fr: loadEvents("fr"),
};

const allErrors = [];
const allWarnings = [];

for (const locale of ["nl", "en", "fr"]) {
  const { errors, warnings } = checkLocale(bundles[locale], locale);
  allErrors.push(...errors);
  allWarnings.push(...warnings);
}

allErrors.push(...checkLocaleParity(bundles));

if (allWarnings.length) {
  console.warn("Warnings:\n" + allWarnings.map((w) => `  ⚠ ${w}`).join("\n"));
}

if (allErrors.length) {
  console.error("Errors:\n" + allErrors.map((e) => `  ✗ ${e}`).join("\n"));
  process.exit(1);
}

console.log(
  `OK: ${bundles.nl.length} community events × 3 locales; no duplicate ids or date+title pairs.`,
);
