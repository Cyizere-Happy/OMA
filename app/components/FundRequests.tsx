"use client";

import React from "react";
import { Wallet, Plus, ArrowUpRight } from "lucide-react";

const requests = [
  {
    id: "FR-2041",
    project: "Kigali Heights Expansion",
    tranche: "Milestone 2 — Ground slab",
    amount: "$120,000",
    status: "Under review",
    requested: "Feb 10, 2026",
  },
  {
    id: "FR-1988",
    project: "Nyagatare Trade Center",
    tranche: "Milestone 1 — Site works",
    amount: "$45,000",
    status: "Approved — paying out",
    requested: "Jan 22, 2026",
  },
  {
    id: "FR-1920",
    project: "Kigali Heights Expansion",
    tranche: "Milestone 1 — Foundation",
    amount: "$95,000",
    status: "Paid",
    requested: "Dec 8, 2025",
  },
];

const FundRequests = () => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Fund requests</h2>
            <p className="text-[13px] text-gray-500">
              Request releases when a verified milestone is complete. Funds move from escrow after admin + notary sign-off.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1E3A5F] text-white text-[12px] font-bold rounded-full shadow-md hover:shadow-lg shrink-0"
          >
            <Plus size={16} />
            New fund request
          </button>
        </div>

        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-[1fr_1.2fr_1fr_1fr_1fr] gap-2 px-6 py-4 border-b border-gray-100 bg-gray-50/80">
            {["Request", "Project / tranche", "Amount", "Status", "Date"].map((h) => (
              <span key={h} className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                {h}
              </span>
            ))}
          </div>
          <div className="divide-y divide-gray-50">
            {requests.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1fr_1fr_1fr] gap-2 px-6 py-4 items-center hover:bg-gray-50/50"
              >
                <div className="flex items-center gap-2">
                  <Wallet size={16} className="text-[#1E3A5F]" />
                  <span className="text-[12px] font-black text-[#1E3A5F]">{r.id}</span>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-gray-800">{r.project}</p>
                  <p className="text-[11px] text-gray-500">{r.tranche}</p>
                </div>
                <span className="text-[13px] font-bold text-gray-900">{r.amount}</span>
                <span className="text-[12px] font-semibold text-gray-700">{r.status}</span>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] text-gray-400">{r.requested}</span>
                  <button type="button" className="p-1.5 text-gray-400 hover:text-[#1E3A5F]" aria-label="Open">
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundRequests;
