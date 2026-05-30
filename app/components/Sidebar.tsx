"use client";

import React from "react";
import {
  Building,
  Layout,
  FileUp,
  Flag,
  FolderOpen,
  Wallet,
  Plus,
  Hammer,
  MapPin,
  Users,
  Banknote,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const Sidebar = ({ activeView, onNavigate }: SidebarProps) => {
  const navItems = [
    { icon: <Layout size={13} />, label: "Dashboard", id: "dashboard" },
    { icon: <MapPin size={13} />, label: "Project map", id: "map" },
    { icon: <FileUp size={13} />, label: "Submit project", id: "submit" },
    { icon: <ShieldCheck size={13} />, label: "My Applications", id: "gov-checks" },
    { icon: <Users size={13} />, label: "Investors", id: "investors" },
    { icon: <Banknote size={13} />, label: "Revenue", id: "revenue" },
  ];

  return (
    <aside className="w-[240px] bg-white flex flex-col h-screen sticky top-0 z-20 shrink-0 font-sans">
      {/* Brand logo at the top over a white background */}
      <div className="px-5 py-6 shrink-0 flex items-center gap-2.5">
        <div className="h-7 w-7 rounded-lg bg-[#1E3A5F] flex items-center justify-center shadow-md">
          <Building size={13} className="text-white fill-white" />
        </div>
        <div>
          <h1 className="text-[14px] font-black tracking-tight text-[#1E3A5F] leading-tight">EstateX</h1>
          <p className="text-[8px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">Owner Portal</p>
        </div>
      </div>

      {/* Main navigation body in deep blue container with curved top-right corner */}
      <div className="flex-1 flex flex-col bg-[#1E3A5F] rounded-tr-[36px] px-3 py-4 overflow-hidden text-white shadow-2xl">
        
        {/* New Project primary action button */}
        <button
          type="button"
          onClick={() => onNavigate("submit")}
          className="w-full bg-white text-[#1E3A5F] hover:bg-stone-50 active:scale-[0.98] py-2 px-3 rounded-full font-bold shadow-md transition-all duration-200 mb-4 text-[11px] flex items-center justify-center gap-1.5 group shrink-0 uppercase tracking-wide cursor-pointer"
        >
          <Plus size={11} className="group-hover:rotate-90 transition-transform text-[#1E3A5F]" />
          New project
        </button>

        {/* Navigation links */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto pr-1 sidebar-scrollbar -mr-1">
          {navItems.map((item, i) => (
            <div
              key={i}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer transition-all duration-150 group text-white/80 hover:text-white ${
                activeView === item.id
                  ? "bg-white/15 text-white font-semibold shadow-inner border border-white/5"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              <span className={`transition-colors shrink-0 ${
                activeView === item.id ? "text-white" : "text-white/40 group-hover:text-white/70"
              }`}>
                {item.icon}
              </span>
              <span className="text-[11.5px] tracking-wide font-medium">{item.label}</span>
            </div>
          ))}
        </nav>

        {/* Footer widgets section */}
        <div className="mt-3 pt-3.5 border-t border-white/10 shrink-0">
          <p className="text-[8px] uppercase tracking-widest font-black mb-3 text-white/40 px-1">Project health</p>

          <div className="space-y-3 px-1">
            {/* Active Builds Widget */}
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-white/70 shrink-0">
                <Hammer size={13} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-white leading-tight">Active Builds</p>
                <p className="text-[9px] text-white/60 mt-0.5">3 listed · 1 in review</p>
              </div>
            </div>

            {/* Raised (all) Widget */}
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-white/70 shrink-0">
                <Banknote size={13} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[11px] font-bold text-white leading-tight">Raised (all)</p>
                  <span className="text-[9px] font-black text-white/85">58%</span>
                </div>
                <div className="w-full h-[3px] bg-white/15 rounded-full overflow-hidden">
                  <div className="bg-white h-full w-[58%] rounded-full shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .sidebar-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .sidebar-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
