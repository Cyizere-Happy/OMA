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
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const Sidebar = ({ activeView, onNavigate }: SidebarProps) => {
  return (
    <aside className="w-[220px] bg-stone-100/95 flex flex-col h-screen sticky top-0 z-20 mr-2 rounded-r-3xl border border-stone-300/60 shadow-[6px_0_32px_-16px_rgba(28,25,23,0.15)]">
      <div className="px-5 py-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-[#1E3A5F] flex items-center justify-center shadow-inner">
            <Building size={20} className="text-white fill-white" />
          </div>
          <div>
            <h1 className="text-[15px] font-black tracking-tight text-stone-800 leading-tight">EstateX</h1>
            <p className="text-[9px] font-bold text-[#1E3A5F] uppercase tracking-widest mt-1">Site &amp; build</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-3 pb-3 overflow-hidden">
        <button
          type="button"
          onClick={() => onNavigate("submit")}
          className="bg-[#1E3A5F] text-white py-2.5 px-4 rounded-lg font-bold shadow-[0_4px_0_#152a45] hover:shadow-[0_2px_0_#152a45] hover:translate-y-0.5 transition-all duration-200 mb-5 text-[12px] flex items-center justify-center gap-2 group shrink-0 uppercase tracking-wide"
        >
          <Plus size={14} className="group-hover:rotate-90 transition-transform" />
          New project
        </button>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-1 custom-scrollbar -mr-1">
          {[
            { icon: <Layout size={16} />, label: "Dashboard", id: "dashboard" },
            { icon: <MapPin size={16} />, label: "Project map", id: "map" },
            { icon: <FileUp size={16} />, label: "Submit project", id: "submit" },
            { icon: <ShieldCheck size={16} />, label: "Gov Checks", id: "gov-checks" },
            { icon: <Flag size={16} />, label: "Milestones", id: "milestones" },
            { icon: <Users size={16} />, label: "Investors", id: "investors" },
            { icon: <Banknote size={16} />, label: "Revenue", id: "revenue" },
            { icon: <FolderOpen size={16} />, label: "Documents", id: "documents" },
            { icon: <Wallet size={16} />, label: "Fund requests", id: "funds" },
          ].map((item, i) => (
            <div
              key={i}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-full cursor-pointer transition-all duration-200 group border ${
                activeView === item.id
                  ? "bg-white text-[#0d6660] border-stone-200 shadow-sm font-semibold"
                  : "border-transparent text-stone-500 hover:bg-white/70 hover:text-stone-900"
              }`}
            >
              <span
                className={`transition-colors ${
                  activeView === item.id ? "text-[#1E3A5F]" : "text-stone-400 group-hover:text-stone-700"
                }`}
              >
                {item.icon}
              </span>
              <span className="font-medium text-[12.5px]">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="mt-4 pt-5 border-t border-stone-300/80 shrink-0">
          <p className="text-[9px] uppercase tracking-widest font-black mb-4 text-stone-500">Project health</p>

          <div className="space-y-4">
            <div className="rounded-xl bg-white/80 border border-stone-200/80 p-3 flex items-start gap-2.5">
              <Hammer size={16} className="text-[#1E3A5F] shrink-0 mt-0.5" />
              <div>
                <p className="text-[12px] font-bold text-stone-800">Active builds</p>
                <p className="text-[9px] font-medium text-stone-500 mt-0.5">3 listed · 1 in review</p>
              </div>
            </div>

            <div className="rounded-xl bg-white/80 border border-stone-200/80 p-3">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[12px] font-bold text-stone-800">Raised (all)</p>
                <span className="text-[10px] font-black text-[#1E3A5F]">58%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div className="bg-[#1E3A5F] h-full w-[58%] rounded-full shadow-[0_0_8px_rgba(30,58,95,0.35)]" />
              </div>
              <p className="text-[9px] font-medium text-stone-500 mt-1.5">Of combined targets</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
