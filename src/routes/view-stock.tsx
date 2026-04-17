import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Placeholder } from "@/components/dashboard/Placeholder";

export const Route = createFileRoute("/view-stock")({
  head: () => ({
    meta: [
      { title: "View Stock — Sugity Creatives" },
      { name: "description", content: "Realtime stock data view." },
    ],
  }),
  component: () => (
    <DashboardLayout>
      <Placeholder title="View Stock" />
    </DashboardLayout>
  ),
});
