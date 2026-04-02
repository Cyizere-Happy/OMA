"use client";

import React, { useEffect, useState } from "react";
import { Building, MoreHorizontal, Loader2, Inbox } from "lucide-react";
import { api } from "../../lib/api";

interface Project {
  id: string;
  title: string;
  slug: string;
  project_status: string;
  funding_goal: number;
  current_funding: number;
  created_at: string;
  property?: { address?: { district?: string; sector?: string } };
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

const OwnerProjectsTable = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/projects?limit=50")
      .then((res) => setProjects(res.data || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="px-8 py-4">
        <div className="flex items-center justify-center py-16"><Loader2 className="animate-spin text-[#1E3A5F]" size={28} /></div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="px-8 py-4">
        <div className="flex flex-col items-center justify-center py-16 text-stone-400">
          <Inbox size={48} strokeWidth={1} />
          <p className="mt-4 font-semibold text-[15px]">No projects yet</p>
          <p className="text-[12px] mt-1">Submit your first property project to get started.</p>
        </div>
      </section>
    );
  }

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
                const location = project.property?.address
                  ? `${project.property.address.sector || ""}, ${project.property.address.district || ""}`.replace(/^, |, $/g, "")
                  : "—";
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
