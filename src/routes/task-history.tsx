import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Clock, XCircle, History } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/task-history")({
  head: () => ({
    meta: [
      { title: "Task History — Sugity Creatives" },
      { name: "description", content: "View your task history." },
    ],
  }),
  component: TaskHistoryPage,
});

type Task = {
  id: string;
  title: string;
  type: "Scan In" | "Scan Out" | "QR Created" | "Audit";
  status: "completed" | "pending" | "failed";
  user: string;
  time: string;
};

const TASKS: Task[] = [
  { id: "T-1042", title: "Inbound batch SZ-2026-04-17", type: "Scan In", status: "completed", user: "Hana", time: "2026-04-17 09:24" },
  { id: "T-1041", title: "QR for Resin Cap (×120)", type: "QR Created", status: "completed", user: "Bima", time: "2026-04-17 08:52" },
  { id: "T-1040", title: "Outbound to Aichi line 3", type: "Scan Out", status: "pending", user: "Rama", time: "2026-04-17 08:10" },
  { id: "T-1039", title: "Quarterly audit Karawang", type: "Audit", status: "completed", user: "Sari", time: "2026-04-16 17:45" },
  { id: "T-1038", title: "QR for Bracket M-22 (×60)", type: "QR Created", status: "failed", user: "Bima", time: "2026-04-16 16:02" },
  { id: "T-1037", title: "Inbound batch AC-2026-04-16", type: "Scan In", status: "completed", user: "Hana", time: "2026-04-16 11:30" },
];

const STATUS_META = {
  completed: { icon: CheckCircle2, cls: "bg-pixel-blue-soft/20 text-[oklch(0.82_0.06_245)]", label: "Completed" },
  pending: { icon: Clock, cls: "bg-card-elevated text-muted-foreground", label: "Pending" },
  failed: { icon: XCircle, cls: "bg-destructive/15 text-destructive", label: "Failed" },
} as const;

function TaskHistoryPage() {
  return (
    <DashboardLayout>
      <div className="animate-in fade-in duration-300">
        <div className="mb-6 flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Activity
          </span>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Task History</h1>
        </div>

        <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">Recent Tasks</h2>
            <span className="text-xs text-muted-foreground">{TASKS.length} entries</span>
          </div>

          <ul className="mt-5 space-y-3">
            {TASKS.map((t) => {
              const meta = STATUS_META[t.status];
              const Icon = meta.icon;
              return (
                <li
                  key={t.id}
                  className="group flex items-start gap-4 rounded-2xl border border-border bg-card-elevated/30 p-4 transition-smooth hover:bg-card-elevated/60"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card text-foreground/80">
                    <History className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                        {t.id}
                      </span>
                      <span className="rounded-full bg-card px-2 py-0.5 text-[11px] text-muted-foreground">
                        {t.type}
                      </span>
                    </div>
                    <div className="mt-1 truncate text-sm font-medium text-foreground">
                      {t.title}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      by {t.user} · {t.time}
                    </div>
                  </div>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${meta.cls}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {meta.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </DashboardLayout>
  );
}
