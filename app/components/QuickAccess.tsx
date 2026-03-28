"use client";

import React from "react";
import { RotateCw, FileText, Building, Flag, Wallet, ClipboardList } from "lucide-react";

const QuickAccess = () => {
  const stats = [
    {
      label: "Submissions",
      value: "4 total",
      sub: "Projects in pipeline",
      icon: <Building size={22} className="text-[#1E3A5F]" />,
    },
    {
      label: "This month",
      value: "2 reports",
      sub: "Milestones due",
      icon: <Flag size={22} className="text-[#1E3A5F]" />,
    },
    {
      label: "Escrow → you",
      value: "$220k YTD",
      sub: "Funds released",
      icon: <Wallet size={22} className="text-[#1E3A5F]" />,
    },
  ];

  return (
    <section className="px-8 py-4">
      <div className="border-l-4 border-[#1E3A5F] pl-5 py-1 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-600 bg-stone-200/90 px-2 py-1 rounded border border-stone-300">
            Field
          </span>
          <h2 className="text-3xl font-black text-stone-800 tracking-tight">Project Owner Portal</h2>
          <button
            type="button"
            className="bg-stone-100 p-2 rounded-lg border border-stone-300 hover:bg-stone-200 transition-all group text-[#1E3A5F] ml-auto"
          >
            <RotateCw size={20} className="group-active:rotate-180 transition-transform duration-500" />
          </button>
        </div>
        <p className="text-[12px] text-stone-600 mt-3 max-w-xl">
          Submit builds, report milestones, and request releases — dashboard is task-first, not card-heavy.
        </p>
      </div>

      <p className="text-[10px] font-black text-stone-500 uppercase tracking-[0.2em] mb-3">Site snapshot</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-4 p-4 bg-white border border-stone-300 rounded-r-xl border-l-4 border-l-[#1E3A5F] shadow-[0_2px_0_rgba(28,25,23,0.04)]"
          >
            <div className="p-2.5 rounded-lg bg-stone-100 border border-stone-200 shrink-0">{s.icon}</div>
            <div className="min-w-0">
              <p className="text-[9px] font-black text-stone-400 uppercase tracking-wider">{s.sub}</p>
              <p className="text-lg font-black text-stone-900 leading-tight mt-0.5">{s.value}</p>
              <p className="text-[11px] font-semibold text-stone-500 mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-stretch gap-4 p-4 bg-stone-100/80 border border-stone-300 rounded-lg">
        <div className="p-3 rounded-md bg-white border border-stone-200 text-[#1E3A5F] shrink-0">
          <FileText size={22} />
        </div>
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-[10px] font-black text-stone-500 uppercase tracking-widest flex items-center gap-2">
              <ClipboardList size={12} />
              Compliance
            </p>
            <h4 className="text-[16px] font-black text-stone-900 mt-1">Owner checklist</h4>
            <p className="text-[12px] text-stone-600 mt-0.5">Permits and registry docs before next tranche.</p>
          </div>
          <button
            type="button"
            className="self-start sm:self-center px-5 py-2.5 bg-[#1E3A5F] text-white text-[11px] font-bold rounded-md hover:bg-[#2a4d75] transition-colors shrink-0"
          >
            Open checklist
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
