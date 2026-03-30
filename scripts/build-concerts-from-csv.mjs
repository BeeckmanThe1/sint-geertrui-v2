/**
 * Parse concerts-and-events.csv → src/content/agenda/concerts-events.json.
 * Also strips src/content/agenda/events-community.json to community agenda only (category === "agenda").
 * Run: npm run agenda:build
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const csvPath = path.join(root, "src/content/agenda/concerts-and-events.csv");
const communityPath = path.join(root, "src/content/agenda/events-community.json");
const concertsJsonPath = path.join(root, "src/content/agenda/concerts-events.json");

const MONTHS = {
  januari: 1,
  februari: 2,
  maart: 3,
  april: 4,
  mei: 5,
  juni: 6,
  juli: 7,
  augustus: 8,
  september: 9,
  oktober: 10,
  november: 11,
  december: 12,
};

function padIso(y, mo, d) {
  return `${y}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

/** @param {string} cell */
function parseDateCell(cell) {
  if (cell == null) {
    return null;
  }
  const s = cell.replace(/^["\s]+|["\s]+$/g, "").trim();
  if (!s || s === '""') {
    return null;
  }

  let m = s.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) {
    const d = Number(m[1]);
    const mo = Number(m[2]);
    const y = Number(m[3]);
    return padIso(y, mo, d);
  }

  m = s.match(/Week\s+van\s+(\d+)\s+tot\s+(\d+)\s+(\w+)/i);
  if (m) {
    const d1 = Number(m[1]);
    const monthName = m[3].toLowerCase();
    const mo = MONTHS[monthName];
    if (mo) {
      return padIso(2025, mo, d1);
    }
  }

  m = s.match(/(\d{1,2})\s+(\w+)/i);
  if (m) {
    const day = Number(m[1]);
    const monthName = m[2].toLowerCase();
    const mo = MONTHS[monthName];
    if (mo) {
      return padIso(2025, mo, day);
    }
  }

  return null;
}

function parseCSVLine(line) {
  const out = [];
  let cur = "";
  let i = 0;
  let inQ = false;
  while (i < line.length) {
    const c = line[i];
    if (c === '"') {
      if (inQ && line[i + 1] === '"') {
        cur += '"';
        i += 2;
        continue;
      }
      inQ = !inQ;
      i++;
      continue;
    }
    if (c === "," && !inQ) {
      out.push(cur.trim());
      cur = "";
      i++;
      continue;
    }
    cur += c;
    i++;
  }
  out.push(cur.trim());
  return out;
}

function cleanText(s) {
  return s.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "").trim();
}

/** Short heading for cards */
function makeTitle(desc, time) {
  const base = cleanText(desc) || cleanText(time) || "Activiteit";
  if (base.length <= 88) {
    return base;
  }
  return `${base.slice(0, 85)}…`;
}

function buildDescription(time, desc, person) {
  const t = cleanText(time).replace(/\.\s*$/, "");
  const d = cleanText(desc);
  const p = cleanText(person);
  const segments = [];
  if (t) {
    segments.push(`Tijd: ${t}`);
  }
  if (d) {
    segments.push(d);
  }
  if (p) {
    segments.push(`Planning: ${p}`);
  }
  return segments.join(". ");
}

function parseConcertsCsv(text) {
  const lines = text.split(/\r?\n/);
  /** @type {{ date: string, title: string, description: string, order: number }[]} */
  const events = [];
  let lastDate = null;
  let order = 0;

  for (const line of lines) {
    if (!line.trim()) {
      continue;
    }
    const cols = parseCSVLine(line);
    const c0 = cols[0] ?? "";
    const time = cols[2] ?? "";
    const desc = cols[4] ?? "";
    const person = cols[6] ?? cols[5] ?? "";

    const parsed = parseDateCell(c0);
    if (parsed) {
      lastDate = parsed;
    }

    const dClean = cleanText(desc);
    const tClean = cleanText(time);

    // Header / noise
    if (
      /SINT-GEERTRUIKERK|Wie volgt op/i.test(line) ||
      (dClean === "Wie volgt op?" && !tClean)
    ) {
      continue;
    }

    // Append contact / subtitle lines to previous row
    if (events.length && lastDate && /^contact:/i.test(dClean) && !tClean) {
      events[events.length - 1].description += ` ${dClean}`;
      continue;
    }
    if (events.length && lastDate && /^\([^)]+\)$/.test(dClean) && !tClean && !parsed) {
      events[events.length - 1].description += ` ${dClean}`;
      continue;
    }

    if (!lastDate) {
      continue;
    }
    if (!dClean && !tClean) {
      continue;
    }

    const title = makeTitle(dClean || "Activiteit", tClean);
    const description = buildDescription(time, desc, person);

    events.push({
      date: lastDate,
      title,
      description,
      order: order++,
    });
  }

  return events;
}

function main() {
  const csv = fs.readFileSync(csvPath, "utf8");
  const parsed = parseConcertsCsv(csv);

  const withIds = parsed.map((e) => ({
    id: "",
    category: "concerts",
    title: e.title,
    description: cleanText(e.description),
    date: e.date,
    _order: e.order,
  }));

  withIds.sort(
    (a, b) =>
      a.date.localeCompare(b.date) || a._order - b._order,
  );

  withIds.forEach((e, i) => {
    delete e._order;
    e.id = `${e.date}-c${i}`;
  });

  let pageSize = 9;
  if (fs.existsSync(communityPath)) {
    const communityFile = JSON.parse(fs.readFileSync(communityPath, "utf8"));
    pageSize = communityFile.pageSize ?? 9;
    const communityOnly = communityFile.events.filter((x) => x.category === "community");
    fs.writeFileSync(
      communityPath,
      `${JSON.stringify({ pageSize, events: communityOnly }, null, 2)}\n`,
    );
    console.error(`Wrote ${communityPath}: ${communityOnly.length} community events`);
  } else {
    console.error(`Warning: ${communityPath} missing; using pageSize ${pageSize} for concerts only`);
  }

  const concertsOut = {
    pageSize,
    events: withIds,
  };
  fs.writeFileSync(concertsJsonPath, `${JSON.stringify(concertsOut, null, 2)}\n`);
  console.error(`Wrote ${concertsJsonPath}: ${withIds.length} concerts from CSV`);
}

main();
