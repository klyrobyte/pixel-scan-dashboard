import { Link, useRouterState } from "@tanstack/react-router";
import { ScanLine, Boxes, History, Smartphone, Menu } from "lucide-react";
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
      className={`flex h-full flex-col bg-sidebar text-sidebar-foreground transition-smooth ${
        collapsed ? "w-[84px]" : "w-[280px]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-5 py-5">
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
          className="hidden md:inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-smooth hover:bg-accent hover:text-foreground"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin">
        <ul className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  className={`group flex items-center gap-4 rounded-full px-4 py-3 transition-smooth ${
                    active
                      ? "bg-pixel-blue-soft text-[oklch(0.2_0.04_250)]"
                      : "text-foreground/90 hover:bg-accent"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 transition-smooth ${
                      active ? "text-[oklch(0.2_0.04_250)]" : "text-foreground/80"
                    }`}
                    strokeWidth={1.75}
                  />
                  <span
                    className={`min-w-0 flex-1 overflow-hidden transition-smooth ${
                      collapsed ? "w-0 opacity-0" : "opacity-100"
                    }`}
                  >
                    <span className="block truncate text-[14px] font-semibold">
                      {item.label}
                    </span>
                    <span
                      className={`block truncate text-[11.5px] ${
                        active ? "text-[oklch(0.32_0.04_250)]" : "text-muted-foreground"
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
