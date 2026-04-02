"use client";

import React from "react";
import { Upload, Shield, Inbox } from "lucide-react";

const required = [
  { name: "Proof of land title / lease", state: "missing" },
  { name: "Building permit or exemption letter", state: "missing" },
  { name: "Environmental clearance (if required)", state: "missing" },
  { name: "Company registration & tax ID", state: "missing" },
];

const OwnerDocuments = () => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Document uploads</h2>
        <p className="text-[13px] text-gray-500 mb-8">
          Keep compliance files current. Notaries and admins review before milestones pay out.
        </p>

        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Required checklist</h3>
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm divide-y divide-gray-50 mb-10">
          {required.map((row) => (
            <div key={row.name} className="px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 min-w-0">
                <Shield size={18} className="text-gray-300" />
                <span className="text-[13px] font-bold text-gray-800">{row.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg bg-gray-100 text-gray-500">
                  {row.state}
                </span>
                <button type="button" className="flex items-center gap-1.5 text-[11px] font-bold text-[#1E3A5F] hover:underline">
                  <Upload size={12} /> Upload
                </button>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Recent uploads</h3>
        <div className="flex flex-col items-center justify-center py-12 text-neutral-400">
          <Inbox size={48} strokeWidth={1} />
          <p className="mt-4 font-semibold text-[15px]">No uploads yet</p>
          <p className="text-[12px] mt-1">Upload your compliance documents to proceed with project approval.</p>
        </div>
      </div>
    </div>
  );
};

export default OwnerDocuments;
