"use client";

import React from "react";
import { CheckCircle, XCircle, Clock, RefreshCw, ShieldCheck } from "lucide-react";

interface Check {
  source: string;
  label: string;
  desc: string;
  status: "passed" | "failed" | "pending" | "verified";
  checked_at?: string;
}

const DEMO_CHECKS: Check[] = [
  { source: "nla", label: "NLA — Land Title", desc: "Ownership & encumbrances verified", status: "passed", checked_at: "2026-04-20" },
  { source: "clb", label: "CLB — Collateral", desc: "No loan collateral flag", status: "passed", checked_at: "2026-04-20" },
  { source: "kubaka", label: "Kubaka — Building Permit", desc: "Permit valid, zoning compliant", status: "verified", checked_at: "2026-04-21" },
];

const statusIcon = (s: string) => {
  if (s === "passed" || s === "verified") return <CheckCircle size={18} className="text-emerald-500" />;
  if (s === "failed") return <XCircle size={18} className="text-red-500" />;
  return <Clock size={18} className="text-amber-500" />;
};

const statusBadge = (s: string) => {
  if (s === "passed" || s === "verified") return "bg-emerald-50 text-emerald-700";
  if (s === "failed") return "bg-red-50 text-red-700";
  return "bg-amber-50 text-amber-700";
};

export default function GovVerificationStatus() {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck size={28} className="text-[#1E3A5F]" />
          <div>
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">Government Verifications</h2>
            <p className="text-[13px] text-stone-500 mt-0.5">
              Automated checks via NLA, CLB, and Kubaka APIs for your properties and projects.
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
                      Checked {new Date(check.checked_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase shrink-0 ${statusBadge(check.status)}`}>
                {check.status}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-stone-50 rounded-2xl border border-stone-200/60 p-5">
          <p className="text-[12px] font-bold text-stone-600 mb-2">How it works</p>
          <ul className="space-y-1.5 text-[12px] text-stone-500">
            <li className="flex items-start gap-2">
              <span className="text-[#1E3A5F] font-bold shrink-0">NLA</span>
              Verifies land ownership and checks for encumbrances or disputes on your UPI.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1E3A5F] font-bold shrink-0">CLB</span>
              Checks the Central Bank collateral registry to confirm the property is not pledged as a loan.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1E3A5F] font-bold shrink-0">Kubaka</span>
              Validates building permit validity and zoning compliance via kubaka.gov.rw.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
