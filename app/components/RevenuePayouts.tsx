"use client";

import React from "react";
import {
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Building,
  Banknote,
} from "lucide-react";

const payoutHistory = [
  { id: "1", milestone: "Foundation complete", project: "Kigali Heights Plaza", amount: "$45,000", date: "Mar 10, 2026", status: "paid" },
  { id: "2", milestone: "Ground floor slab", project: "Kigali Heights Plaza", amount: "$38,000", date: "Feb 22, 2026", status: "paid" },
  { id: "3", milestone: "Structural steel", project: "Gahanga Housing", amount: "$28,500", date: "Mar 15, 2026", status: "pending" },
  { id: "4", milestone: "Site preparation", project: "Gahanga Housing", amount: "$15,000", date: "Jan 28, 2026", status: "paid" },
  { id: "5", milestone: "Handover", project: "Kigali Heights Plaza", amount: "$52,000", date: "Apr 2026", status: "upcoming" },
];

const RevenuePayouts = () => {
  const totalRaised = 284000;
  const totalPaid = 126500;
  const pendingRelease = 28500;
  const remaining = totalRaised - totalPaid - pendingRelease;

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-[#F0EFEC]">
      <div className="max-w-5xl">
        <h2 className="text-2xl font-black text-stone-900 tracking-tight mb-1">
          Revenue & payouts
        </h2>
        <p className="text-[13px] text-stone-500 mb-8">
          Track milestone fund releases, escrow balances, and rental income distribution.
        </p>

        {/* Revenue cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total raised", value: "$284K", icon: <DollarSign size={18} />, accent: "bg-[#1E3A5F]" },
            { label: "Released", value: "$126.5K", icon: <CheckCircle2 size={18} />, accent: "bg-emerald-600" },
            { label: "Pending release", value: "$28.5K", icon: <Clock size={18} />, accent: "bg-amber-500" },
            { label: "In escrow", value: "$129K", icon: <Banknote size={18} />, accent: "bg-stone-700" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
              <div className={`${s.accent} text-white p-2 rounded-lg w-fit mb-3`}>{s.icon}</div>
              <p className="text-[20px] font-black text-stone-900">{s.value}</p>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[14px] font-black text-stone-900">Fund release progress</h3>
            <p className="text-[12px] font-bold text-stone-500">{Math.round((totalPaid / totalRaised) * 100)}% released</p>
          </div>
          <div className="w-full h-4 bg-stone-100 rounded-full overflow-hidden flex">
            <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${(totalPaid / totalRaised) * 100}%` }} />
            <div className="bg-amber-400 h-full transition-all duration-1000" style={{ width: `${(pendingRelease / totalRaised) * 100}%` }} />
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
            <span>$0</span>
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full inline-block" /> Released</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-400 rounded-full inline-block" /> Pending</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-stone-200 rounded-full inline-block" /> Escrowed</span>
            </div>
            <span>${(totalRaised / 1000).toFixed(0)}K</span>
          </div>
        </div>

        {/* Payout history */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
            <h3 className="text-[14px] font-black text-stone-900">Payout history</h3>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              {payoutHistory.length} records
            </span>
          </div>
          <div className="divide-y divide-stone-50">
            {payoutHistory.map((p) => (
              <div key={p.id} className="px-6 py-4 flex items-center gap-4 hover:bg-stone-50/40 transition-colors">
                <div className={`p-2 rounded-lg shrink-0 ${
                  p.status === "paid" ? "bg-emerald-50" : p.status === "pending" ? "bg-amber-50" : "bg-stone-100"
                }`}>
                  <Building size={16} className={
                    p.status === "paid" ? "text-emerald-600" : p.status === "pending" ? "text-amber-600" : "text-stone-400"
                  } />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-stone-900">{p.milestone}</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">{p.project}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[14px] font-black text-stone-900">{p.amount}</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">{p.date}</p>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shrink-0 ${
                  p.status === "paid" ? "bg-emerald-50 text-emerald-800" :
                  p.status === "pending" ? "bg-amber-50 text-amber-800" :
                  "bg-stone-100 text-stone-500"
                }`}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenuePayouts;
