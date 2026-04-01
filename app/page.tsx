"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import QuickAccess from "./components/QuickAccess";
import OwnerProjectsTable from "./components/OwnerProjectsTable";
import ProjectSubmission from "./components/ProjectSubmission";
import MilestoneReporting from "./components/MilestoneReporting";
import OwnerDocuments from "./components/OwnerDocuments";
import FundRequests from "./components/FundRequests";
import OwnerSitesMap from "./components/OwnerSitesMap";
import InvestorRelations from "./components/InvestorRelations";
import RevenuePayouts from "./components/RevenuePayouts";

export default function Home() {
  const [currentView, setCurrentView] = useState("dashboard");

  const renderContent = () => {
    switch (currentView) {
      case "submit":
        return <ProjectSubmission />;
      case "milestones":
        return <MilestoneReporting />;
      case "documents":
        return <OwnerDocuments />;
      case "funds":
        return <FundRequests />;
      case "map":
        return <OwnerSitesMap />;
      case "investors":
        return <InvestorRelations />;
      case "revenue":
        return <RevenuePayouts />;
      case "dashboard":
      default:
        return (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
            <QuickAccess />
            <OwnerProjectsTable />
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#F0EFEC] overflow-hidden text-stone-900">
      <Sidebar activeView={currentView} onNavigate={setCurrentView} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 flex flex-col overflow-hidden">{renderContent()}</main>
      </div>

      <style jsx global>{`
        ::selection {
          background-color: #1E3A5F;
          color: white;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
