import {
  AGENDA_FUTURE_CAP,
  buildAgendaTabOrder,
  type AgendaEventItem,
} from "./agenda-events";

function item(
  id: string,
  date: string,
  category: AgendaEventItem["category"] = "community",
): AgendaEventItem {
  return { id, category, title: id, description: "", date };
}

describe("buildAgendaTabOrder", () => {
  it("uses the soonest AGENDA_FUTURE_CAP upcoming, each band newest-first like the archive", () => {
    const today = "2026-05-14";
    const subset: AgendaEventItem[] = [
      item("f3", "2026-05-24"),
      item("f1", "2026-05-14"),
      item("p1", "2026-05-10"),
      item("f2", "2026-05-17"),
      item("f4", "2026-05-31"),
      item("f5", "2026-06-01"),
      item("p2", "2026-05-03"),
    ];
    const ordered = buildAgendaTabOrder(subset, today, AGENDA_FUTURE_CAP);
    expect(ordered).toHaveLength(3 + 2);
    expect(ordered.map((i) => i.id)).toEqual(["f3", "f2", "f1", "p1", "p2"]);
  });

  it("sorts past newest-first with stable id on same day", () => {
    const today = "2026-05-20";
    const subset: AgendaEventItem[] = [
      item("2026-05-19-b", "2026-05-19"),
      item("2026-05-19-a", "2026-05-19"),
      item("2026-05-10-1", "2026-05-10"),
    ];
    const ordered = buildAgendaTabOrder(subset, today, AGENDA_FUTURE_CAP);
    expect(ordered.map((i) => i.id)).toEqual([
      "2026-05-19-a",
      "2026-05-19-b",
      "2026-05-10-1",
    ]);
  });
});
