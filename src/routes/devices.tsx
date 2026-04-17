import { createFileRoute } from "@tanstack/react-router";
import { Smartphone, Tablet, Wifi, WifiOff, Battery, MoreHorizontal } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/devices")({
  head: () => ({
    meta: [
      { title: "Connected Devices — Sugity Creatives" },
      { name: "description", content: "Device pairing status." },
    ],
  }),
  component: DevicesPage,
});

type Device = {
  name: string;
  model: string;
  type: "phone" | "tablet";
  status: "online" | "offline";
  battery: number;
  location: string;
  lastSync: string;
};

const DEVICES: Device[] = [
  { name: "Scanner A-01", model: "Pixel 8", type: "phone", status: "online", battery: 86, location: "Factory Seizo · Line 1", lastSync: "Just now" },
  { name: "Scanner A-02", model: "Pixel 8", type: "phone", status: "online", battery: 42, location: "Factory Seizo · Line 2", lastSync: "2 min ago" },
  { name: "Audit Tab T-01", model: "Pixel Tablet", type: "tablet", status: "online", battery: 67, location: "Factory Aichi · QC", lastSync: "5 min ago" },
  { name: "Scanner B-04", model: "Pixel 7a", type: "phone", status: "offline", battery: 12, location: "Factory Karawang · Dock", lastSync: "3 hours ago" },
  { name: "Audit Tab T-02", model: "Pixel Tablet", type: "tablet", status: "offline", battery: 0, location: "Factory Aichi · Storage", lastSync: "Yesterday" },
];

function DevicesPage() {
  const online = DEVICES.filter((d) => d.status === "online").length;

  return (
    <DashboardLayout>
      <div className="animate-in fade-in duration-300">
        <div className="mb-6 flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Fleet
          </span>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Connected Devices
          </h1>
        </div>

        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-muted-foreground">
            <span className="text-foreground font-medium">{online}</span> of {DEVICES.length} devices online
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {DEVICES.map((d) => {
            const TypeIcon = d.type === "phone" ? Smartphone : Tablet;
            const isOnline = d.status === "online";
            return (
              <div
                key={d.name}
                className="rounded-3xl border border-border bg-card p-5 transition-smooth hover:bg-card-elevated/40"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-card-elevated text-foreground/90">
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{d.name}</div>
                      <div className="text-xs text-muted-foreground">{d.model}</div>
                    </div>
                  </div>
                  <button
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-smooth hover:bg-accent hover:text-foreground"
                    aria-label="More"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                      isOnline
                        ? "bg-pixel-blue-soft/20 text-[oklch(0.82_0.06_245)]"
                        : "bg-card-elevated text-muted-foreground"
                    }`}
                  >
                    {isOnline ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
                    {isOnline ? "Online" : "Offline"}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs ${
                      d.battery < 20 ? "text-destructive" : "text-muted-foreground"
                    }`}
                  >
                    <Battery className="h-3.5 w-3.5" />
                    {d.battery}%
                  </span>
                </div>

                <div className="mt-4 space-y-1 border-t border-border pt-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="text-foreground">{d.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Sync</span>
                    <span className="text-foreground">{d.lastSync}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
