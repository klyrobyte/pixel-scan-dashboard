import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Download,
  ExternalLink,
  QrCode,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stock Scan — Manage & Create QR Codes" },
      {
        name: "description",
        content:
          "Create QR stock codes, track factory origin, materials, and unit values in a clean dark dashboard.",
      },
      { property: "og:title", content: "Stock Scan — Manage & Create QR Codes" },
      {
        property: "og:description",
        content: "Create QR stock codes for your factory inventory with ease.",
      },
    ],
  }),
  component: StockScanPage,
});

const FACTORIES = ["Factory Seizo", "Factory Aichi", "Factory Karawang"];
const MATERIALS = ["Steel Plate", "Aluminum Sheet", "Copper Coil", "Plastic Resin"];

type HistoryRow = {
  time: string;
  partName: string;
  factory: string;
  material: string;
  value: string;
  units: number;
};

function StockScanPage() {
  const [partName, setPartName] = useState("");
  const [factory, setFactory] = useState("");
  const [material, setMaterial] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [generated, setGenerated] = useState<HistoryRow | null>(null);
  const [history, setHistory] = useState<HistoryRow[]>([
    {
      time: "2026-10-27",
      partName: "Lorem Ipsum A",
      factory: "Factory Seizo",
      material: "20254",
      value: "10",
      units: 10,
    },
  ]);

  const canSubmit = useMemo(
    () => partName && factory && material && qrValue,
    [partName, factory, material, qrValue],
  );

  const handleGenerate = () => {
    if (!canSubmit) return;
    const row: HistoryRow = {
      time: new Date().toISOString().slice(0, 10),
      partName,
      factory,
      material,
      value: qrValue,
      units: Number(qrValue) || 0,
    };
    setGenerated(row);
    setHistory((h) => [row, ...h]);
  };

  const handleReset = () => {
    setPartName("");
    setFactory("");
    setMaterial("");
    setQrValue("");
  };

  return (
    <DashboardLayout>
      <div className="animate-in fade-in duration-300">
        {/* Page heading */}
        <div className="mb-6 flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Stock Scan
          </span>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Manage & Create QR Codes
          </h1>
        </div>

        {/* Top card: form + preview */}
        <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Form */}
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Create A New QR Stock Code
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Fill in all fields below to generate a new QR code for your inventory.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Part Name">
                  <TextInput
                    value={partName}
                    onChange={setPartName}
                    placeholder="Type part name"
                  />
                </Field>
                <Field label="Factory Origin">
                  <SelectInput
                    value={factory}
                    onChange={setFactory}
                    placeholder="Select Factory"
                    options={FACTORIES}
                  />
                </Field>
                <Field label="Material">
                  <SelectInput
                    value={material}
                    onChange={setMaterial}
                    placeholder="Select Material"
                    options={MATERIALS}
                  />
                </Field>
                <Field label="QR Content Value">
                  <TextInput
                    value={qrValue}
                    onChange={setQrValue}
                    placeholder="How many units"
                    type="number"
                  />
                </Field>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={!canSubmit}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-smooth hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Sparkles className="h-4 w-4" />
                  Create QR Code
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition-smooth hover:bg-accent"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="rounded-2xl border border-border bg-card-elevated/40 p-5">
              <h3 className="text-sm font-semibold text-foreground">QR Code Created</h3>
              <div className="mt-4 flex aspect-square w-full items-center justify-center rounded-2xl border border-dashed border-border-strong bg-card text-center">
                {generated ? (
                  <div className="flex flex-col items-center gap-3 px-4">
                    <QrPlaceholder large />
                    <div className="text-xs text-muted-foreground">
                      {generated.partName} · {generated.units} units
                    </div>
                  </div>
                ) : (
                  <div className="px-6 text-sm text-muted-foreground">
                    Make QR First
                  </div>
                )}
              </div>
              <button
                disabled={!generated}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-smooth hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Download className="h-4 w-4" />
                Download QR
              </button>
              <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
                The QR code will be displayed after pressing the Generate button.
              </p>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="mt-6 rounded-3xl border border-border bg-card p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-semibold text-foreground">
                QR Creation History
              </h2>
              <span className="text-xs text-muted-foreground">
                {history.length} record{history.length !== 1 ? "s" : ""}
              </span>
            </div>
            <Link
              to="/all-qr"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card-elevated/40 px-4 py-2 text-xs font-medium text-foreground transition-smooth hover:bg-accent"
            >
              View All QR
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-4 -mx-2 overflow-x-auto px-2 scrollbar-thin">
            <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  <Th>Time</Th>
                  <Th>Part Name</Th>
                  <Th>Factory Origin</Th>
                  <Th>Material</Th>
                  <Th>Value</Th>
                  <Th className="text-right">QR Thumbnail</Th>
                </tr>
              </thead>
              <tbody>
                {history.map((row, i) => (
                  <tr
                    key={i}
                    className="group transition-smooth hover:bg-card-elevated/40"
                  >
                    <Td>{row.time}</Td>
                    <Td className="text-foreground">{row.partName}</Td>
                    <Td>{row.factory}</Td>
                    <Td>{row.material}</Td>
                    <Td>{row.units} units</Td>
                    <Td className="text-right">
                      <div className="inline-flex items-center gap-2">
                        <QrPlaceholder />
                        <button
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-smooth hover:bg-accent hover:text-foreground"
                          aria-label="Open"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

/* ---------- subcomponents ---------- */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-11 w-full rounded-xl border border-transparent bg-card-elevated px-4 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-smooth focus:border-primary/60 focus:bg-card-elevated"
    />
  );
}

function SelectInput({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-11 w-full appearance-none rounded-xl border border-transparent bg-card-elevated px-4 pr-10 text-sm outline-none transition-smooth focus:border-primary/60 ${
          value ? "text-foreground" : "text-muted-foreground/70"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-card text-foreground">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`border-b border-border px-3 py-3 font-medium text-muted-foreground ${className}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`border-b border-border/60 px-3 py-3.5 text-muted-foreground ${className}`}>
      {children}
    </td>
  );
}

function QrPlaceholder({ large = false }: { large?: boolean }) {
  const size = large ? "h-28 w-28" : "h-8 w-8";
  return (
    <div
      className={`${size} flex items-center justify-center rounded-md bg-foreground/90 text-background`}
    >
      <QrCode className={large ? "h-20 w-20" : "h-5 w-5"} strokeWidth={1.6} />
    </div>
  );
}
