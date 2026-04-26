import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-page" style={{ fontFamily: "inherit" }}>
      <Sidebar />
      <div className="flex flex-col flex-1" style={{ marginLeft: 220, minHeight: "100vh" }}>
        <Topbar />
        <main className="flex-1 p-7" style={{ maxWidth: 1200, width: "100%", boxSizing: "border-box" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
