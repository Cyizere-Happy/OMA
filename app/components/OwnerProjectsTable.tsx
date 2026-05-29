"use client";

import React from "react";
import { Building, MoreHorizontal } from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  project_status: string;
  funding_goal: number;
  current_funding: number;
  created_at: string;
  property: { address: { district: string; sector: string } };
}

const statusLabel: Record<string, string> = {
  draft: "Draft",
  under_review: "Under admin review",
  compliance_review: "Compliance review",
  approved: "Approved",
  funding_open: "Live — fundraising",
  active: "Active",
  completed: "Completed",
  cancelled: "Cancelled",
};

const DEMO_PROJECTS: Project[] = [
  { id: "1", title: "Kigali Heights Residences", slug: "kigali-heights", project_status: "funding_open", funding_goal: 2400000, current_funding: 1728000, created_at: "2026-02-10T10:00:00Z", property: { address: { district: "Gasabo", sector: "Kimironko" } } },
  { id: "2", title: "Nyarutarama Green Villas", slug: "nyarutarama-villas", project_status: "active", funding_goal: 3100000, current_funding: 3100000, created_at: "2026-01-15T14:30:00Z", property: { address: { district: "Gasabo", sector: "Remera" } } },
  { id: "3", title: "Musanze Lakeside Resort", slug: "musanze-resort", project_status: "under_review", funding_goal: 1850000, current_funding: 0, created_at: "2026-03-25T09:15:00Z", property: { address: { district: "Musanze", sector: "Muhoza" } } },
  { id: "4", title: "Rubavu Waterfront Apartments", slug: "rubavu-waterfront", project_status: "draft", funding_goal: 1600000, current_funding: 0, created_at: "2026-04-01T16:45:00Z", property: { address: { district: "Rubavu", sector: "Gisenyi" } } },
];

const OwnerProjectsTable = () => {
  const projects = DEMO_PROJECTS;

  return (
    <section className="px-8 py-4 font-sans">
      <div className="w-full">
        {/* Clean, spacing section header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-[0.2em]">Your Property Projects</h3>
          <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200/40">{projects.length} total</span>
        </div>

        {/* Clean list view matching the Investor Portal style */}
        <div className="w-full overflow-x-auto select-none">
          <div className="min-w-[800px]">
            {/* Header row labels */}
            <div className="grid grid-cols-[2.2fr_1.4fr_1.6fr_1.8fr_0.4fr] px-6 py-2.5 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              <span>Project Name</span>
              <span>Location</span>
              <span>Status</span>
              <span>Raised</span>
              <span></span>
            </div>

            {/* Floating rounded cards representing rows */}
            <div className="space-y-3 mt-1.5">
              {projects.map((project) => {
                const location = `${project.property.address.sector}, ${project.property.address.district}`;
                const fundingPct = project.funding_goal > 0
                  ? `${Math.min(100, Math.round((project.current_funding / project.funding_goal) * 100))}%`
                  : "0%";

                return (
                  <div
                    key={project.id}
                    className="grid grid-cols-[2.2fr_1.4fr_1.6fr_1.8fr_0.4fr] items-center px-6 py-3.5 bg-white border border-stone-200/60 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-stone-300 transition-all duration-200"
                  >
                    {/* Project Name column */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="p-2.5 bg-stone-50 border border-stone-100 rounded-xl shrink-0">
                        <Building size={16} className="text-[#1E3A5F]" />
                      </div>
                      <span className="font-bold text-stone-900 text-[13.5px] truncate">{project.title}</span>
                    </div>

                    {/* Location column */}
                    <span className="text-[12.5px] font-semibold text-stone-500 truncate pr-2">{location}</span>

                    {/* Status column */}
                    <div className="flex items-center">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${
                        project.project_status === 'funding_open' || project.project_status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : 'bg-stone-50 text-stone-600 border border-stone-100'
                      }`}>
                        {statusLabel[project.project_status] || project.project_status}
                      </span>
                    </div>

                    {/* Raised / Progress Column */}
                    <div className="flex flex-col pr-6">
                      <div className="flex justify-between items-center mb-1.5 max-w-[140px]">
                        <span className="text-[10px] text-stone-400 font-medium">Raised</span>
                        <span className="text-[12.5px] font-bold text-[#1E3A5F]">{fundingPct}</span>
                      </div>
                      <div className="w-full max-w-[140px] h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="bg-[#1E3A5F] h-full rounded-full transition-all duration-500 shadow-[0_0_4px_rgba(30,58,95,0.25)]"
                          style={{ width: fundingPct }}
                        />
                      </div>
                    </div>

                    {/* Actions Column */}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="p-2 rounded-xl text-stone-400 hover:bg-stone-50 hover:text-[#1E3A5F] transition-all cursor-pointer"
                        aria-label="Actions"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerProjectsTable;
