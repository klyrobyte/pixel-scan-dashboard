import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Placeholder } from "@/components/dashboard/Placeholder";

export const Route = createFileRoute("/devices")({
  head: () => ({
    meta: [
      { title: "Connected Devices — Sugity Creatives" },
      { name: "description", content: "Device pairing status." },
    ],
  }),
  component: () => (
    <DashboardLayout>
      <Placeholder title="Connected Devices" />
    </DashboardLayout>
  ),
});
