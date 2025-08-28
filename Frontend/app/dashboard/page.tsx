"use client";

import { useState } from "react";
import Login from "../Components/dashboard/Login";
import DashboardLayout from "../Components/dashboard/DashboardLayout";
import ProductsSection from "../Components/dashboard/ProductsSection";
import UsersSection from "../Components/dashboard/UsersSection";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentSection, setCurrentSection] = useState<"products" | "users">("products");

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentSection("products");
  };

  const handleSectionChange = (section: "products" | "users") => setCurrentSection(section);

  if (!isLoggedIn) return <Login onLogin={handleLogin} />;

  return (
    <DashboardLayout
      currentSection={currentSection}
      onSectionChange={handleSectionChange}
      onLogout={handleLogout}
    >
      {currentSection === "products" ? <ProductsSection /> : <UsersSection />}
    </DashboardLayout>
  );
};

export default Dashboard;
