"use client";

import React from "react";
import { Upload, Shield, FileText, AlertCircle } from "lucide-react";

const required = [
  { name: "Proof of land title / lease", state: "verified", updated: "Jan 4, 2026" },
  { name: "Building permit or exemption letter", state: "pending", updated: "—" },
  { name: "Environmental clearance (if required)", state: "missing", updated: "—" },
  { name: "Company registration & tax ID", state: "verified", updated: "Jan 2, 2026" },
];

const uploads = [
  { file: "KH_blueprints_rev3.pdf", project: "Kigali Heights Expansion", size: "4.2 MB", date: "Feb 2, 2026" },
  { file: "Nyagatare_inspection_photos.zip", project: "Nyagatare Trade Center", size: "18 MB", date: "Feb 8, 2026" },
];

const OwnerDocuments = () => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Document uploads</h2>
        <p className="text-[13px] text-gray-500 mb-8">
          Keep compliance files current. Notaries and admins review before milestones pay out.
        </p>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3 mb-8">
          <AlertCircle className="text-amber-600 shrink-0" size={20} />
          <p className="text-[12px] text-amber-900">
            One pending item is blocking <span className="font-bold">Vision City Phase II</span> from admin review.
          </p>
        </div>

        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Required checklist</h3>
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm divide-y divide-gray-50 mb-10">
          {required.map((row) => (
            <div key={row.name} className="px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 min-w-0">
                <Shield
                  size={18}
                  className={
                    row.state === "verified"
                      ? "text-emerald-600"
                      : row.state === "pending"
                        ? "text-amber-500"
                        : "text-gray-300"
                  }
                />
                <span className="text-[13px] font-bold text-gray-800">{row.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg ${
                    row.state === "verified"
                      ? "bg-emerald-50 text-emerald-800"
                      : row.state === "pending"
                        ? "bg-amber-50 text-amber-800"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {row.state}
                </span>
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-[11px] font-bold text-[#1E3A5F] hover:underline"
                >
                  <Upload size={12} />
                  Upload
                </button>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Recent uploads</h3>
        <div className="space-y-2">
          {uploads.map((u) => (
            <div
              key={u.file}
              className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex items-center justify-between gap-4 flex-wrap hover:border-[#1E3A5F]/20 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="text-[#1E3A5F] shrink-0" size={20} />
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-gray-800 truncate">{u.file}</p>
                  <p className="text-[11px] text-gray-400">
                    {u.project} · {u.size} · {u.date}
                  </p>
                </div>
              </div>
              <button type="button" className="text-[11px] font-bold text-gray-500 hover:text-[#1E3A5F]">
                Replace
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerDocuments;
