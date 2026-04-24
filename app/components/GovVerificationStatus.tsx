"use client";

import React from "react";
import { CheckCircle, XCircle, Clock, ShieldCheck } from "lucide-react";

interface Check {
  label: string;
  desc: string;
  status: "verified" | "failed" | "pending";
  checked_at?: string;
}

const DEMO_CHECKS: Check[] = [
  { label: "Land Ownership", desc: "Confirms you are the registered owner of this land parcel", status: "verified", checked_at: "2026-04-20" },
  { label: "Collateral Registry", desc: "Confirms the property is free from any loan or financial encumbrance", status: "verified", checked_at: "2026-04-20" },
  { label: "Building Permit", desc: "Confirms a valid construction permit and zoning compliance", status: "pending" },
];

const statusIcon = (s: string) => {
  if (s === "verified") return <CheckCircle size={18} className="text-emerald-500" />;
  if (s === "failed") return <XCircle size={18} className="text-red-500" />;
  return <Clock size={18} className="text-amber-500" />;
};

const statusBadge = (s: string) => {
  if (s === "verified") return "bg-emerald-50 text-emerald-700";
  if (s === "failed") return "bg-red-50 text-red-700";
  return "bg-amber-50 text-amber-700";
};

const statusLabel = (s: string) => {
  if (s === "verified") return "Verified";
  if (s === "failed") return "Failed";
  return "In progress";
};

export default function GovVerificationStatus() {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck size={28} className="text-[#1E3A5F]" />
          <div>
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">Property Verification</h2>
            <p className="text-[13px] text-stone-500 mt-0.5">
              EstateX verifies your property through official channels before listing it to investors.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {DEMO_CHECKS.map((check, i) => (
            <div key={i} className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {statusIcon(check.status)}
                <div>
                  <p className="text-[14px] font-bold text-stone-900">{check.label}</p>
                  <p className="text-[12px] text-stone-400 mt-0.5">{check.desc}</p>
                  {check.checked_at && (
                    <p className="text-[11px] text-stone-300 mt-0.5">
                      Verified on {new Date(check.checked_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg shrink-0 ${statusBadge(check.status)}`}>
                {statusLabel(check.status)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-stone-50 rounded-2xl border border-stone-200/60 p-5">
          <p className="text-[12px] font-bold text-stone-700 mb-1">What happens after verification?</p>
          <p className="text-[12px] text-stone-500 leading-relaxed">
            Once all checks pass, independent licensed evaluators will be assigned to assess your project.
            You will receive their verdicts and can respond if needed before your listing goes live to investors.
          </p>
        </div>
      </div>
    </div>
  );
}
