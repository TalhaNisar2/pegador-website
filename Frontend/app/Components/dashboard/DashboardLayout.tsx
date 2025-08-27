import { useToast } from "@/app/hooks/use-toast";
import { SidebarProvider, SidebarTrigger } from "@/app/Components/ui/sidebar";
import { DashboardSidebar } from "@/app/Components/dashboard/DashboardSidebar";
import { LogOut } from "lucide-react";
import { Button } from "@/app/Components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentSection: "products" | "users";
  onSectionChange: (section: "products" | "users") => void;
  onLogout: () => void;
}

const DashboardLayout = ({ children, currentSection, onSectionChange, onLogout }: DashboardLayoutProps) => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    onLogout();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-gray-100">
        {/* Sidebar */}
        <DashboardSidebar 
          currentSection={currentSection}
          onSectionChange={onSectionChange}
          onLogout={handleLogout}
        />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-gray-300 bg-white flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-blue-600 hover:text-blue-700 transition-colors" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">E-Commerce Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {currentSection === "products" ? "Manage your products" : "Manage your users"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-gray-50 transition-colors fade-in">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
