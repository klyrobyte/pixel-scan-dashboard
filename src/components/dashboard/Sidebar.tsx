import { Link, useRouterState } from "@tanstack/react-router";
import { ScanLine, Boxes, History, Smartphone, Menu, QrCode } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  description: string;
  to: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Stock Scan",
    description: "Perform scanning tasks",
    to: "/",
    icon: ScanLine,
  },
  {
    label: "View Stock",
    description: "Realtime stock data",
    to: "/view-stock",
    icon: Boxes,
  },
  {
    label: "Task History",
    description: "Task history data",
    to: "/task-history",
    icon: History,
  },
  {
    label: "Scan QR",
    description: "Open QR scanner",
    to: "/scan",
    icon: QrCode,
  },
  {
    label: "Connected Devices",
    description: "Device pairing status",
    to: "/devices",
    icon: Smartphone,
  },
];

type Props = {
  collapsed: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
};

export function SidebarContent({ collapsed, onToggle, onNavigate }: Props) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={`flex h-full flex-col bg-[oklch(0.16_0_0)] text-sidebar-foreground transition-smooth ${
        collapsed ? "w-[84px]" : "w-[280px]"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center gap-3 py-5 ${
          collapsed ? "justify-center px-0" : "justify-between px-5"
        }`}
      >
        <div
          className={`min-w-0 leading-tight overflow-hidden transition-smooth ${
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          }`}
        >
          <div className="truncate text-[13px] font-semibold tracking-wide text-foreground">
            SUGITY CREATIVES
          </div>
          <div className="truncate text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Sugity Integrated Online
          </div>
        </div>
        <button
          onClick={onToggle}
          className="hidden md:inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-smooth hover:bg-[oklch(0.22_0_0)] hover:text-foreground"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className={`flex-1 overflow-y-auto py-2 scrollbar-thin ${collapsed ? "px-0" : "px-3"}`}>
        <ul className={`space-y-1.5 ${collapsed ? "flex flex-col items-center" : ""}`}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;

            if (collapsed) {
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onNavigate}
                    title={item.label}
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-smooth ${
                      active
                        ? "bg-[#a4c9e9] text-[oklch(0.2_0.04_250)]"
                        : "text-foreground/80 hover:bg-[oklch(0.22_0_0)] hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </Link>
                </li>
              );
            }

            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  className={`group flex items-center gap-4 rounded-full px-4 py-3 transition-smooth ${
                    active
                      ? "bg-[#a4c9e9] text-[oklch(0.2_0.04_250)]"
                      : "text-foreground/90 hover:bg-[oklch(0.22_0_0)]"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 transition-smooth ${
                      active ? "text-[oklch(0.2_0.04_250)]" : "text-foreground/80"
                    }`}
                    strokeWidth={1.75}
                  />
                  <span className="min-w-0 flex-1 overflow-hidden">
                    <span className="block truncate text-[14px] font-semibold">
                      {item.label}
                    </span>
                    <span
                      className={`block truncate text-[11.5px] ${
                        active ? "text-[oklch(0.35_0.05_250)]" : "text-muted-foreground"
                      }`}
                    >
                      {item.description}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className={`px-4 py-4 text-[11px] text-muted-foreground transition-smooth ${
          collapsed ? "opacity-0" : "opacity-100"
        }`}
      >
        v1.0 · Internal build
      </div>
    </aside>
  );
}
