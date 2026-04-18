import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ScanLine,
  Camera,
  Image as ImageIcon,
  Zap,
  ZapOff,
  RotateCcw,
  Keyboard,
  ShieldCheck,
  CircleDot,
  ChevronRight,
  History,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title: "Scan QR — Sugity Creatives" },
      {
        name: "description",
        content: "Scan QR codes to track stock and tasks with a clean, professional scanner.",
      },
      { property: "og:title", content: "Scan QR — Sugity Creatives" },
      {
        property: "og:description",
        content: "Scan QR codes to track stock and tasks with a clean, professional scanner.",
      },
    ],
  }),
  component: ScanPage,
});

type RecentScan = {
  id: string;
  label: string;
  factory: string;
  time: string;
};

const RECENT: RecentScan[] = [
  { id: "QR-1042", label: "Resin Cap", factory: "Factory Seizo", time: "2 min ago" },
  { id: "QR-1041", label: "Bracket M-22", factory: "Factory Aichi", time: "14 min ago" },
  { id: "QR-1040", label: "Coil Spring", factory: "Factory Karawang", time: "1 h ago" },
];

function ScanPage() {
  const [torch, setTorch] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (!scanning) return;
    const id = setInterval(() => setPulse((p) => (p + 1) % 100), 50);
    return () => clearInterval(id);
  }, [scanning]);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Scanner
            </div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Scan a QR Code
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Align the code within the frame. Detection happens automatically once a code is in
              view.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11.5px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-[#a4c9e9]" />
            Secure session · End-to-end verified
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* Scanner viewport */}
          <section className="rounded-3xl border border-border bg-card p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[12.5px] font-medium text-foreground/90">
                <CircleDot
                  className={`h-3.5 w-3.5 ${scanning ? "text-emerald-400" : "text-muted-foreground"}`}
                />
                {scanning ? "Live · Looking for QR" : "Paused"}
              </div>
              <div className="text-[11px] text-muted-foreground">Rear camera · 1080p</div>
            </div>

            {/* Viewport */}
            <div className="relative mt-4 aspect-square w-full overflow-hidden rounded-2xl bg-[oklch(0.12_0_0)]">
              {/* Subtle grid backdrop */}
              <div
                className="absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, oklch(0.3 0 0) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.3 0 0) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              {/* Soft vignette */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.55)_100%)]" />

              {/* Frame */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-[68%] w-[68%]">
                  {/* Corner brackets */}
                  {[
                    "left-0 top-0 border-l-2 border-t-2 rounded-tl-2xl",
                    "right-0 top-0 border-r-2 border-t-2 rounded-tr-2xl",
                    "left-0 bottom-0 border-l-2 border-b-2 rounded-bl-2xl",
                    "right-0 bottom-0 border-r-2 border-b-2 rounded-br-2xl",
                  ].map((pos, i) => (
                    <span
                      key={i}
                      className={`absolute h-10 w-10 border-[#a4c9e9] ${pos}`}
                      style={{ boxShadow: "0 0 24px -4px #a4c9e9aa" }}
                    />
                  ))}

                  {/* Scanning line */}
                  {scanning && (
                    <div
                      className="absolute inset-x-3 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#a4c9e9] to-transparent transition-smooth"
                      style={{
                        top: `${10 + (pulse / 100) * 80}%`,
                        boxShadow: "0 0 16px 2px #a4c9e9cc",
                      }}
                    />
                  )}

                  {/* Center hint */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-black/40 px-3 py-1.5 text-[11px] text-white/80 backdrop-blur">
                      Align QR within the frame
                    </div>
                  </div>
                </div>
              </div>

              {/* Top-right torch */}
              <button
                onClick={() => setTorch((t) => !t)}
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-smooth hover:bg-black/70"
                aria-label="Toggle torch"
              >
                {torch ? <Zap className="h-4 w-4 text-[#a4c9e9]" /> : <ZapOff className="h-4 w-4" />}
              </button>
            </div>

            {/* Controls */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setScanning((s) => !s)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#a4c9e9] px-5 py-2.5 text-[13px] font-semibold text-[oklch(0.2_0.04_250)] transition-smooth hover:brightness-95"
                >
                  <ScanLine className="h-4 w-4" />
                  {scanning ? "Pause Scanning" : "Resume Scanning"}
                </button>
                <button
                  onClick={() => setPulse(0)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-card-elevated text-foreground/80 transition-smooth hover:bg-accent"
                  aria-label="Reset"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <ActionPill icon={ImageIcon} label="Upload Image" />
                <ActionPill icon={Camera} label="Switch Camera" />
                <ActionPill icon={Keyboard} label="Enter Manually" />
              </div>
            </div>
          </section>

          {/* Side panel */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
              <h2 className="text-[13px] font-semibold tracking-wide">Scan Tips</h2>
              <ul className="mt-4 space-y-3 text-[12.5px] text-muted-foreground">
                {[
                  "Hold the device 15–25 cm away from the code.",
                  "Ensure even lighting; toggle torch if it's dim.",
                  "Avoid reflective glare on glossy surfaces.",
                  "Keep the QR within the highlighted frame.",
                ].map((tip) => (
                  <li key={tip} className="flex gap-2.5">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#a4c9e9]" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-[13px] font-semibold tracking-wide">
                  <History className="h-4 w-4 text-muted-foreground" />
                  Recent Scans
                </h2>
                <Link
                  to="/task-history"
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] text-[#a4c9e9] transition-smooth hover:bg-[oklch(0.22_0_0)]"
                >
                  View all
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <ul className="mt-3 divide-y divide-border">
                {RECENT.map((r) => (
                  <li
                    key={r.id}
                    className="flex items-center gap-3 py-3 transition-smooth hover:bg-[oklch(0.22_0_0)]/40"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card-elevated">
                      <ScanLine className="h-4 w-4 text-foreground/80" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-[13px] font-medium">{r.label}</span>
                        <span className="rounded-full bg-card-elevated px-2 py-0.5 text-[10.5px] text-muted-foreground">
                          {r.id}
                        </span>
                      </div>
                      <div className="truncate text-[11.5px] text-muted-foreground">
                        {r.factory} · {r.time}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ActionPill({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card-elevated px-3.5 py-2 text-[12px] text-foreground/85 transition-smooth hover:bg-accent hover:text-foreground">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
