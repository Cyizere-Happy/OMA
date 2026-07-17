"use client";

import React from "react";
import { User, MoreHorizontal, Activity } from "lucide-react";

interface Admission {
  id: string;
  name: string;
  patientId: string;
  triage_level: string;
  ward: string;
  created_at: string;
}

const triageColors: Record<string, string> = {
  Red: "bg-red-50 text-red-700 border-red-200",
  Yellow: "bg-amber-50 text-amber-700 border-amber-200",
  Green: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const DEMO_ADMISSIONS: Admission[] = [
  { id: "1", name: "Jean Mugisha", patientId: "1 1990 8 0000000 0 00", triage_level: "Yellow", ward: "ER - Bed 3", created_at: "2026-02-10T10:00:00Z" },
  { id: "2", name: "Alice Uwimana", patientId: "P-12345", triage_level: "Red", ward: "ICU - Bed 1", created_at: "2026-01-15T14:30:00Z" },
  { id: "3", name: "John Doe", patientId: "Accident Victim A", triage_level: "Red", ward: "Surgery - OR 2", created_at: "2026-03-25T09:15:00Z" },
  { id: "4", name: "Marie Chantal", patientId: "P-98765", triage_level: "Green", ward: "General - Bed 14", created_at: "2026-04-01T16:45:00Z" },
];

interface OwnerProjectsTableProps {
  density?: "comfortable" | "compact";
}

const OwnerProjectsTable = ({ density = "comfortable" }: OwnerProjectsTableProps) => {
  const admissions = DEMO_ADMISSIONS;

  return (
    <section className="px-8 py-4 font-sans">
      <div className="w-full">
        {/* Clean, spacing section header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-[0.2em]">Recent Admissions</h3>
          <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200/40">{admissions.length} active</span>
        </div>

        {/* Clean list view */}
        <div className="w-full overflow-x-auto select-none">
          <div className="min-w-[800px]">
            {/* Header row labels */}
            <div className="grid grid-cols-[2.2fr_1.8fr_1.4fr_1.4fr_0.4fr] px-6 py-2.5 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              <span>Patient</span>
              <span>Patient ID</span>
              <span>Triage Level</span>
              <span>Assigned Ward</span>
              <span></span>
            </div>

            {/* Floating rounded cards representing rows */}
            <div className="space-y-3 mt-1.5">
              {admissions.map((adm) => {
                const badgeColor = triageColors[adm.triage_level] || "bg-stone-50 text-stone-600 border-stone-100";

                return (
                  <div
                    key={adm.id}
                    className="grid grid-cols-[2.2fr_1.8fr_1.4fr_1.4fr_0.4fr] items-center px-6 py-3.5 bg-white border border-stone-200/60 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-stone-300 transition-all duration-200"
                  >
                    {/* Patient Name column */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="p-2.5 bg-stone-50 border border-stone-100 rounded-xl shrink-0">
                        <User size={16} className="text-[#0B5B3E]" />
                      </div>
                      <span className="font-bold text-stone-900 text-[13.5px] truncate">{adm.name}</span>
                    </div>

                    {/* Patient ID column */}
                    <span className="text-[12.5px] font-semibold text-stone-500 truncate pr-2">{adm.patientId}</span>

                    {/* Status column */}
                    <div className="flex items-center">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border flex items-center gap-1 ${badgeColor}`}>
                        <Activity size={12} /> {adm.triage_level}
                      </span>
                    </div>

                    {/* Ward Column */}
                    <div className="flex flex-col pr-6">
                      <span className="text-[12.5px] font-bold text-stone-800">{adm.ward}</span>
                    </div>

                    {/* Actions Column */}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="p-2 rounded-xl text-stone-400 hover:bg-stone-50 hover:text-[#0B5B3E] transition-all cursor-pointer"
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
