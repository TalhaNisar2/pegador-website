import { useState } from "react";
import { Users, Package, LogOut, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/Components/ui/sidebar";

interface DashboardSidebarProps {
  currentSection: "products" | "users";
  onSectionChange: (section: "products" | "users") => void;
  onLogout: () => void;
}

export function DashboardSidebar({ currentSection, onSectionChange, onLogout }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { title: "Products", key: "products" as const, icon: Package, description: "Manage your products" },
    { title: "Users", key: "users" as const, icon: Users, description: "Manage users" },
  ];

  return (
    <>
      {/* Sidebar */}
      <Sidebar
        className={`fixed top-0 left-0 h-screen z-50 transition-all duration-300
          ${collapsed ? "w-16 bg-gray-900" : "w-64 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800"} 
          text-white shadow-lg
        `}
      >
        {/* Sidebar Header */}
        <div className={`p-4 border-b ${collapsed ? "border-gray-700" : "border-blue-500"}`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/20 flex items-center justify-center">
              <ShoppingBag className={`h-6 w-6 ${collapsed ? "text-gray-200" : "text-white"}`} />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-bold text-white drop-shadow-md">Admin Panel</h2>
                <p className="text-xs text-white/80 mt-1">E-Commerce Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Content */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className={`text-white/70 ${collapsed ? "hidden" : ""}`}>
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      onClick={() => onSectionChange(item.key)}
                      className={`w-full justify-start gap-3 transition-all rounded-lg py-2 px-3 text-sm font-medium
                        ${currentSection === item.key
                          ? "bg-white/20 text-white shadow-md"
                          : "text-white hover:bg-white/10 hover:text-white"}
                      `}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex flex-col items-start">
                          <span className="font-semibold">{item.title}</span>
                          <span className="text-xs opacity-70">{item.description}</span>
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={onLogout}
                    className="w-full justify-start gap-3 rounded-lg py-2 px-3 text-sm font-medium text-white hover:bg-red-600 hover:text-white transition-all shadow-sm"
                  >
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && <span>Logout</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-4 top-4 z-50 w-8 h-8 bg-white text-blue-700 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </Sidebar>

      {/* Main content placeholder */}
      <div className={`transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"}`}>
        {/* Your main content goes here */}
      </div>
    </>
  );
}
