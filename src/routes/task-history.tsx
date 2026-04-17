import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Placeholder } from "@/components/dashboard/Placeholder";

export const Route = createFileRoute("/task-history")({
  head: () => ({
    meta: [
      { title: "Task History — Sugity Creatives" },
      { name: "description", content: "View your task history." },
    ],
  }),
  component: () => (
    <DashboardLayout>
      <Placeholder title="Task History" />
    </DashboardLayout>
  ),
});
