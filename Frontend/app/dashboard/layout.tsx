// app/dashboard/layout.tsx
import React from "react";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; // No navbar or footer here
}
