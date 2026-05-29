"use client";

import React from "react";
import { RotateCw, FileText, Building, Flag, Wallet, ClipboardList } from "lucide-react";

const QuickAccess = ({ 
  density = "comfortable", 
  showStats = true, 
  onOpenChecklist 
}: { 
  density?: "comfortable" | "compact"; 
  showStats?: boolean; 
  onOpenChecklist?: () => void; 
}) => {
  // DEMO MODE — hardcoded stats
  const stats = { projects: 4, milestones: 2, funds: 850000 };

  const statCards = [
    {
      label: "Submissions",
      value: `${stats.projects} total`,
      sub: "Projects in pipeline",
      icon: <Building size={22} className="text-[#1E3A5F]" />,
    },
    {
      label: "Milestones",
      value: `${stats.milestones} due`,
      sub: "Reports this month",
      icon: <Flag size={22} className="text-[#1E3A5F]" />,
    },
    {
      label: "Escrow → you",
      value: `+$${stats.funds.toLocaleString()}`,
      sub: "Funds released",
      icon: <Wallet size={22} className="text-[#1E3A5F]" />,
    },
  ];

  return (
    <section className="px-10 py-8">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200">Field</span>
          </div>
          <h2 className="text-3xl font-black text-stone-900 tracking-tight">Project Owner Portal</h2>
          <p className="text-[13px] text-stone-500 mt-2 max-w-xl">
            Submit builds, report milestones, and request releases — dashboard is task-first, not card-heavy.
          </p>
        </div>
        <button type="button" onClick={() => window.location.reload()}
          className="bg-white p-2 rounded-lg border border-stone-200 hover:bg-stone-50 transition-all group text-[#1E3A5F] shadow-sm">
          <RotateCw size={18} className="group-active:rotate-180 transition-transform duration-500" />
        </button>
      </div>

      <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-4">Site snapshot</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {statCards.map((s) => (
          <div key={s.label} className="flex items-center gap-4 p-5 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 rounded-xl bg-[#1E3A5F]/5 shrink-0">{s.icon}</div>
            <div className="min-w-0">
              <p className="text-[9px] font-black text-stone-400 uppercase tracking-wider">{s.sub}</p>
              <p className="text-lg font-black text-stone-900 leading-tight mt-0.5">{s.value}</p>
              <p className="text-[11px] font-semibold text-stone-500 mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-stretch gap-4 p-5 bg-white border border-stone-200 rounded-2xl shadow-sm">
        <div className="p-3 rounded-xl bg-[#1E3A5F]/5 text-[#1E3A5F] shrink-0">
          <FileText size={20} />
        </div>
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
              <ClipboardList size={12} /> Compliance
            </p>
            <h4 className="text-[15px] font-black text-stone-900 mt-1">Owner checklist</h4>
            <p className="text-[12px] text-stone-500 mt-0.5">Permits and registry docs before next tranche.</p>
          </div>
          <button type="button" onClick={onOpenChecklist}
            className="self-start sm:self-center px-5 py-2.5 bg-[#1E3A5F] text-white text-[11px] font-bold rounded-xl hover:bg-[#2a4d75] transition-colors shrink-0">
            Open checklist
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
