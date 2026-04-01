"use client";

import React from "react";
import {
  Users,
  Globe,
  Wallet,
  MessageSquare,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const investors = [
  { id: "1", name: "Jean-Pierre Niyomugabo", amount: "$12,400", shares: 8, project: "Kigali Heights Plaza", diaspora: false, since: "Jan 2026" },
  { id: "2", name: "Sarah Chen", amount: "$45,000", shares: 22, project: "Kigali Heights Plaza", diaspora: true, since: "Dec 2025" },
  { id: "3", name: "Emmanuel Habimana", amount: "$8,200", shares: 5, project: "Gahanga Housing", diaspora: false, since: "Feb 2026" },
  { id: "4", name: "Marie Uwase", amount: "$25,800", shares: 15, project: "Kigali Heights Plaza", diaspora: true, since: "Jan 2026" },
  { id: "5", name: "David Mugisha", amount: "$6,500", shares: 4, project: "Gahanga Housing", diaspora: true, since: "Mar 2026" },
  { id: "6", name: "Alice Ingabire", amount: "$18,900", shares: 12, project: "Kigali Heights Plaza", diaspora: false, since: "Nov 2025" },
];

const InvestorRelations = () => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-[#F0EFEC]">
      <div className="max-w-5xl">
        <h2 className="text-2xl font-black text-stone-900 tracking-tight mb-1">
          Investor relations
        </h2>
        <p className="text-[13px] text-stone-500 mb-8">
          View who invested in your projects and communicate with your stakeholders.
        </p>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total investors", value: "48", icon: <Users size={18} /> },
            { label: "Diaspora investors", value: "19", icon: <Globe size={18} /> },
            { label: "Total raised", value: "$284K", icon: <Wallet size={18} /> },
            { label: "Avg. investment", value: "$5,917", icon: <TrendingUp size={18} /> },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
              <div className="p-2 bg-[#1E3A5F]/10 rounded-lg w-fit mb-3 text-[#1E3A5F]">{s.icon}</div>
              <p className="text-[20px] font-black text-stone-900">{s.value}</p>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Investor list */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
            <h3 className="text-[14px] font-black text-stone-900">Your investors</h3>
            <button className="flex items-center gap-1.5 text-[11px] font-bold text-[#1E3A5F] hover:underline">
              <MessageSquare size={12} /> Send update to all
            </button>
          </div>

          <div className="divide-y divide-stone-50">
            {investors.map((inv) => (
              <div key={inv.id} className="px-6 py-4 flex items-center gap-4 hover:bg-stone-50/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center text-[11px] font-black text-[#1E3A5F] shrink-0">
                  {inv.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-bold text-stone-900">{inv.name}</p>
                    {inv.diaspora && <span className="text-[8px] font-bold text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded-full">DIASPORA</span>}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">{inv.project} · Since {inv.since}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[14px] font-black text-stone-900">{inv.amount}</p>
                  <p className="text-[10px] text-stone-400">{inv.shares} shares</p>
                </div>
                <button className="p-2 text-stone-400 hover:text-[#1E3A5F] hover:bg-stone-100 rounded-lg transition-colors">
                  <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorRelations;
