import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Boxes, Search, Filter, TrendingUp, TrendingDown, Package } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/view-stock")({
  head: () => ({
    meta: [
      { title: "View Stock — Sugity Creatives" },
      { name: "description", content: "Realtime stock data view." },
    ],
  }),
  component: ViewStockPage,
});

type StockRow = {
  partName: string;
  factory: string;
  material: string;
  units: number;
  trend: "up" | "down";
  delta: number;
};

const STOCK: StockRow[] = [
  { partName: "Lorem Ipsum A", factory: "Factory Seizo", material: "Steel Plate", units: 1240, trend: "up", delta: 12 },
  { partName: "Bracket M-22", factory: "Factory Aichi", material: "Aluminum Sheet", units: 860, trend: "down", delta: 4 },
  { partName: "Coil Spring", factory: "Factory Karawang", material: "Copper Coil", units: 432, trend: "up", delta: 6 },
  { partName: "Resin Cap", factory: "Factory Seizo", material: "Plastic Resin", units: 2120, trend: "up", delta: 18 },
  { partName: "Hinge B-04", factory: "Factory Aichi", material: "Steel Plate", units: 78, trend: "down", delta: 22 },
  { partName: "Gasket R-9", factory: "Factory Karawang", material: "Plastic Resin", units: 540, trend: "up", delta: 3 },
];

function ViewStockPage() {
  const [query, setQuery] = useState("");
  const [factory, setFactory] = useState("All");

  const factories = ["All", ...Array.from(new Set(STOCK.map((s) => s.factory)))];
  const filtered = useMemo(
    () =>
      STOCK.filter(
        (r) =>
          (factory === "All" || r.factory === factory) &&
          r.partName.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, factory],
  );

  const totalUnits = STOCK.reduce((a, b) => a + b.units, 0);
  const lowStock = STOCK.filter((s) => s.units < 100).length;

  return (
    <DashboardLayout>
      <div className="animate-in fade-in duration-300">
        <div className="mb-6 flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Inventory
          </span>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">View Stock</h1>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total Units" value={totalUnits.toLocaleString()} icon={Package} />
          <StatCard label="SKUs Tracked" value={STOCK.length.toString()} icon={Boxes} />
          <StatCard label="Low Stock Alerts" value={lowStock.toString()} icon={TrendingDown} accent />
        </div>

        <section className="mt-6 rounded-3xl border border-border bg-card p-5 sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base font-semibold text-foreground">Stock Levels</h2>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search part…"
                  className="h-10 w-full rounded-full border border-transparent bg-card-elevated pl-9 pr-4 text-sm outline-none transition-smooth focus:border-primary/60 sm:w-56"
                />
              </div>
              <div className="relative">
                <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <select
                  value={factory}
                  onChange={(e) => setFactory(e.target.value)}
                  className="h-10 appearance-none rounded-full border border-transparent bg-card-elevated pl-9 pr-8 text-sm text-foreground outline-none transition-smooth focus:border-primary/60"
                >
                  {factories.map((f) => (
                    <option key={f} value={f} className="bg-card">
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4 -mx-2 overflow-x-auto px-2 scrollbar-thin">
            <table className="w-full min-w-[680px] border-separate border-spacing-0 text-left text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  <th className="border-b border-border px-3 py-3 font-medium">Part Name</th>
                  <th className="border-b border-border px-3 py-3 font-medium">Factory</th>
                  <th className="border-b border-border px-3 py-3 font-medium">Material</th>
                  <th className="border-b border-border px-3 py-3 font-medium">Units</th>
                  <th className="border-b border-border px-3 py-3 font-medium text-right">Trend</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={i} className="transition-smooth hover:bg-card-elevated/40">
                    <td className="border-b border-border/60 px-3 py-3.5 text-foreground">{r.partName}</td>
                    <td className="border-b border-border/60 px-3 py-3.5 text-muted-foreground">{r.factory}</td>
                    <td className="border-b border-border/60 px-3 py-3.5 text-muted-foreground">{r.material}</td>
                    <td className="border-b border-border/60 px-3 py-3.5 text-foreground">
                      {r.units.toLocaleString()}
                    </td>
                    <td className="border-b border-border/60 px-3 py-3.5 text-right">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ${
                          r.trend === "up"
                            ? "bg-pixel-blue-soft/20 text-[oklch(0.82_0.06_245)]"
                            : "bg-destructive/15 text-destructive"
                        }`}
                      >
                        {r.trend === "up" ? (
                          <TrendingUp className="h-3.5 w-3.5" />
                        ) : (
                          <TrendingDown className="h-3.5 w-3.5" />
                        )}
                        {r.delta}%
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-3 py-10 text-center text-sm text-muted-foreground">
                      No items match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  icon: typeof Package;
  accent?: boolean;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full ${
            accent ? "bg-destructive/15 text-destructive" : "bg-card-elevated text-foreground/80"
          }`}
        >
          <Icon className="h-4.5 w-4.5" />
        </span>
      </div>
      <div className="mt-4 text-2xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}
