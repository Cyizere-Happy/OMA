"use client";

import React from "react";
import { Building, MoreHorizontal, Inbox } from "lucide-react";

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
    <section className="px-8 py-4">
      <div className="rounded-sm border-2 border-stone-400 bg-stone-100/40 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
        <div className="flex items-center justify-between px-4 py-3 bg-stone-300/90 border-b-2 border-stone-400">
          <h3 className="text-[11px] font-black text-stone-800 uppercase tracking-[0.15em]">Your property projects</h3>
          <span className="text-[10px] font-bold text-stone-600">{projects.length} total</span>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[2.2fr_1.4fr_1.6fr_1fr_0.6fr] px-4 py-2.5 bg-stone-200/80 border-b border-stone-300 text-[10px] font-black text-stone-600 uppercase tracking-wider">
              {["Project", "Location", "Status", "Raised", ""].map((header) => (
                <span key={header} className="last:text-right">{header}</span>
              ))}
            </div>

            <div>
              {projects.map((project, i) => {
                const location = `${project.property.address.sector}, ${project.property.address.district}`;
                const fundingPct = project.funding_goal > 0
                  ? `${Math.min(100, Math.round((project.current_funding / project.funding_goal) * 100))}%`
                  : "—";

                return (
                  <div
                    key={project.id}
                    className={`grid grid-cols-[2.2fr_1.4fr_1.6fr_1fr_0.6fr] items-center px-4 py-3 border-b border-stone-300/80 last:border-b-0 transition-colors ${
                      i % 2 === 0 ? "bg-white" : "bg-stone-50"
                    } hover:bg-[#1E3A5F]/5`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-1.5 bg-stone-100 border border-stone-300 rounded-sm shrink-0">
                        <Building size={18} className="text-[#1E3A5F]" />
                      </div>
                      <span className="font-bold text-stone-900 text-[13px] truncate">{project.title}</span>
                    </div>
                    <span className="text-[12px] font-semibold text-stone-600 truncate">{location}</span>
                    <span className="text-[11px] font-semibold text-stone-800 truncate">{statusLabel[project.project_status] || project.project_status}</span>
                    <span className="text-[12px] font-black text-[#1E3A5F]">{fundingPct}</span>
                    <div className="flex justify-end">
                      <button type="button" className="p-1.5 rounded-sm text-stone-400 hover:bg-stone-200 hover:text-[#1E3A5F]" aria-label="More">
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
