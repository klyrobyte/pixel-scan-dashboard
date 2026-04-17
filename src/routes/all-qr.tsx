import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, ExternalLink, QrCode, Search } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/all-qr")({
  head: () => ({
    meta: [
      { title: "All QR Codes — Sugity Creatives" },
      { name: "description", content: "Complete archive of created QR stock codes." },
    ],
  }),
  component: AllQrPage,
});

type QrItem = {
  id: string;
  partName: string;
  factory: string;
  material: string;
  units: number;
  createdAt: string;
};

const ITEMS: QrItem[] = [
  { id: "QR-1042", partName: "Resin Cap", factory: "Factory Seizo", material: "Plastic Resin", units: 120, createdAt: "2026-04-17" },
  { id: "QR-1041", partName: "Bracket M-22", factory: "Factory Aichi", material: "Aluminum Sheet", units: 60, createdAt: "2026-04-16" },
  { id: "QR-1040", partName: "Coil Spring", factory: "Factory Karawang", material: "Copper Coil", units: 200, createdAt: "2026-04-15" },
  { id: "QR-1039", partName: "Hinge B-04", factory: "Factory Aichi", material: "Steel Plate", units: 40, createdAt: "2026-04-14" },
  { id: "QR-1038", partName: "Gasket R-9", factory: "Factory Karawang", material: "Plastic Resin", units: 90, createdAt: "2026-04-13" },
  { id: "QR-1037", partName: "Lorem Ipsum A", factory: "Factory Seizo", material: "Steel Plate", units: 10, createdAt: "2026-04-12" },
  { id: "QR-1036", partName: "Plate X-11", factory: "Factory Seizo", material: "Steel Plate", units: 320, createdAt: "2026-04-11" },
  { id: "QR-1035", partName: "Clip Z-3", factory: "Factory Aichi", material: "Aluminum Sheet", units: 150, createdAt: "2026-04-10" },
];

function AllQrPage() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(
    () =>
      ITEMS.filter(
        (i) =>
          i.partName.toLowerCase().includes(query.toLowerCase()) ||
          i.id.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <DashboardLayout>
      <div className="animate-in fade-in duration-300">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-smooth hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Stock Scan
        </Link>

        <div className="mb-6 flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Archive
          </span>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">All QR Codes</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A full archive of every QR stock code created across factories.
          </p>
        </div>

        <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by ID or part…"
                className="h-10 w-full rounded-full border border-transparent bg-card-elevated pl-9 pr-4 text-sm outline-none transition-smooth focus:border-primary/60"
              />
            </div>
            <div className="inline-flex rounded-full bg-card-elevated p-1 text-xs">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`rounded-full px-4 py-1.5 capitalize transition-smooth ${
                    view === v ? "bg-pixel-blue-soft text-[oklch(0.2_0.04_250)]" : "text-muted-foreground"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {view === "grid" ? (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((i) => (
                <div
                  key={i.id}
                  className="group rounded-2xl border border-border bg-card-elevated/30 p-4 transition-smooth hover:bg-card-elevated/60"
                >
                  <div className="flex aspect-square items-center justify-center rounded-xl bg-foreground/90 text-background">
                    <QrCode className="h-16 w-16" strokeWidth={1.5} />
                  </div>
                  <div className="mt-4">
                    <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      {i.id}
                    </div>
                    <div className="mt-0.5 truncate text-sm font-semibold text-foreground">
                      {i.partName}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-muted-foreground">
                      {i.factory} · {i.units} units
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-smooth hover:bg-accent">
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </button>
                    <button
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-smooth hover:bg-accent hover:text-foreground"
                      aria-label="Open"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full py-16 text-center text-sm text-muted-foreground">
                  No QR codes match your search.
                </div>
              )}
            </div>
          ) : (
            <div className="mt-6 -mx-2 overflow-x-auto px-2 scrollbar-thin">
              <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    <th className="border-b border-border px-3 py-3 font-medium">ID</th>
                    <th className="border-b border-border px-3 py-3 font-medium">Part Name</th>
                    <th className="border-b border-border px-3 py-3 font-medium">Factory</th>
                    <th className="border-b border-border px-3 py-3 font-medium">Material</th>
                    <th className="border-b border-border px-3 py-3 font-medium">Units</th>
                    <th className="border-b border-border px-3 py-3 font-medium">Created</th>
                    <th className="border-b border-border px-3 py-3 font-medium text-right">QR</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((i) => (
                    <tr key={i.id} className="transition-smooth hover:bg-card-elevated/40">
                      <td className="border-b border-border/60 px-3 py-3.5 text-muted-foreground">{i.id}</td>
                      <td className="border-b border-border/60 px-3 py-3.5 text-foreground">{i.partName}</td>
                      <td className="border-b border-border/60 px-3 py-3.5 text-muted-foreground">{i.factory}</td>
                      <td className="border-b border-border/60 px-3 py-3.5 text-muted-foreground">{i.material}</td>
                      <td className="border-b border-border/60 px-3 py-3.5 text-foreground">{i.units}</td>
                      <td className="border-b border-border/60 px-3 py-3.5 text-muted-foreground">{i.createdAt}</td>
                      <td className="border-b border-border/60 px-3 py-3.5 text-right">
                        <div className="inline-flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground/90 text-background">
                            <QrCode className="h-5 w-5" strokeWidth={1.6} />
                          </div>
                          <button
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-smooth hover:bg-accent hover:text-foreground"
                            aria-label="Open"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
