"use client";

import React from "react";
import { Building, MoreHorizontal } from "lucide-react";

const OwnerProjectsTable = () => {
  const projects = [
    {
      name: "Kigali Heights Expansion",
      location: "Kacyiru, Kigali",
      status: "Live — fundraising",
      funding: "85%",
      nextMilestone: "Foundation complete",
      due: "Apr 12",
    },
    {
      name: "Vision City Phase II",
      location: "Gacuriro, Kigali",
      status: "Under admin review",
      funding: "0%",
      nextMilestone: "Submission accepted",
      due: "—",
    },
    {
      name: "Nyagatare Trade Center",
      location: "Nyagatare, Eastern",
      status: "Live — fundraising",
      funding: "34%",
      nextMilestone: "Steel frame inspection",
      due: "Mar 30",
    },
    {
      name: "Draft — Gahanga parcel",
      location: "Kicukiro, Kigali",
      status: "Draft",
      funding: "—",
      nextMilestone: "Submit for review",
      due: "—",
    },
  ];

  return (
    <section className="px-8 py-4">
      <div className="rounded-sm border-2 border-stone-400 bg-stone-100/40 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
        <div className="flex items-center justify-between px-4 py-3 bg-stone-300/90 border-b-2 border-stone-400">
          <h3 className="text-[11px] font-black text-stone-800 uppercase tracking-[0.15em]">Your property projects</h3>
          <span className="text-[10px] font-bold text-stone-600">Ledger view</span>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[2.2fr_1.4fr_1.6fr_1fr_1.2fr_0.6fr] px-4 py-2.5 bg-stone-200/80 border-b border-stone-300 text-[10px] font-black text-stone-600 uppercase tracking-wider">
              {["Project", "Location", "Status", "Raised", "Next milestone", ""].map((header) => (
                <span key={header} className="last:text-right">
                  {header}
                </span>
              ))}
            </div>

            <div>
              {projects.map((project, i) => (
                <div
                  key={project.name}
                  className={`grid grid-cols-[2.2fr_1.4fr_1.6fr_1fr_1.2fr_0.6fr] items-center px-4 py-3 border-b border-stone-300/80 last:border-b-0 transition-colors ${
                    i % 2 === 0 ? "bg-white" : "bg-stone-50"
                  } hover:bg-[#1E3A5F]/5`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 bg-stone-100 border border-stone-300 rounded-sm shrink-0">
                      <Building size={18} className="text-[#1E3A5F]" />
                    </div>
                    <span className="font-bold text-stone-900 text-[13px] truncate">{project.name}</span>
                  </div>
                  <span className="text-[12px] font-semibold text-stone-600 truncate">{project.location}</span>
                  <span className="text-[11px] font-semibold text-stone-800 truncate">{project.status}</span>
                  <span className="text-[12px] font-black text-[#1E3A5F]">{project.funding}</span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-stone-800 truncate">{project.nextMilestone}</p>
                    <p className="text-[10px] font-medium text-stone-500">Due {project.due}</p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="p-1.5 rounded-sm text-stone-400 hover:bg-stone-200 hover:text-[#1E3A5F]"
                      aria-label="More"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerProjectsTable;
