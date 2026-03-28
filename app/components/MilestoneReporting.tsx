"use client";

import React from "react";
import { CheckCircle2, Circle, Camera, FileText, Clock } from "lucide-react";

const milestones = [
  {
    id: "m1",
    project: "Kigali Heights Expansion",
    title: "Foundation & pilings",
    status: "complete",
    submitted: "Jan 18, 2026",
    payout: "Released",
  },
  {
    id: "m2",
    project: "Kigali Heights Expansion",
    title: "Ground floor slab",
    status: "due",
    due: "Apr 12, 2026",
    payout: "Pending inspection",
  },
  {
    id: "m3",
    project: "Nyagatare Trade Center",
    title: "Structural steel",
    status: "action",
    due: "Mar 30, 2026",
    payout: "Awaiting your report",
  },
];

const MilestoneReporting = () => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Milestone reporting</h2>
        <p className="text-[13px] text-gray-500 mb-8">
          Submit progress evidence for each funded stage. Admins and notaries verify before the next tranche is released.
        </p>

        <div className="space-y-4">
          {milestones.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {m.status === "complete" ? (
                  <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={22} />
                ) : m.status === "action" ? (
                  <Clock className="text-amber-500 shrink-0 mt-0.5" size={22} />
                ) : (
                  <Circle className="text-gray-300 shrink-0 mt-0.5" size={22} />
                )}
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{m.project}</p>
                  <h3 className="text-[16px] font-bold text-gray-900 mt-1">{m.title}</h3>
                  <p className="text-[12px] text-gray-500 mt-1">
                    {m.submitted && `Reported ${m.submitted}`}
                    {m.due && `Due ${m.due}`}
                  </p>
                  <p className="text-[11px] font-bold text-[#1E3A5F] mt-2">{m.payout}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-[11px] font-bold text-gray-700 hover:bg-gray-100"
                >
                  <Camera size={14} />
                  Site photos
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-[11px] font-bold text-gray-700 hover:bg-gray-100"
                >
                  <FileText size={14} />
                  Engineer sign-off
                </button>
                {m.status !== "complete" && (
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl bg-[#1E3A5F] text-white text-[11px] font-bold hover:shadow-lg"
                  >
                    Submit milestone report
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MilestoneReporting;
