import React from "react";
import Header from "../components/dashboard/Header";
import ProfileSection from "../components/dashboard/ProfileSection";
import BalanceCard from "../components/dashboard/BalanceCard";
import ServicesGrid from "../components/dashboard/ServicesGrid";
import BannersSection from "../components/dashboard/BannerSection";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="w-full px-4 sm:px-6 md:px-8 py-6 max-w-[1280px] mx-auto">
        <ProfileSection />
        <BalanceCard />
        <ServicesGrid />
        <BannersSection />
      </main>
    </div>
  );
};

export default Dashboard;
