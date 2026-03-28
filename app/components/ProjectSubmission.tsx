"use client";

import React, { useState } from "react";
import { Upload, MapPin, Landmark, FileCheck, Send } from "lucide-react";

const ProjectSubmission = () => {
  const [step, setStep] = useState(0);
  const steps = ["Basics", "Site & legal", "Funding plan", "Documents"];

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Submit a property project</h2>
        <p className="text-[13px] text-gray-500 mb-8">
          List a construction or land development project for EstateX verification and investor fundraising.
        </p>

        <div className="flex gap-2 mb-8 flex-wrap">
          {steps.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setStep(i)}
              className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                step === i
                  ? "bg-[#1E3A5F] text-white shadow-md"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-8 space-y-6">
          {step === 0 && (
            <>
              <label className="block">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Project title</span>
                <input
                  className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F] focus:bg-white"
                  placeholder="e.g. Kigali mixed-use tower"
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Property type</span>
                <select className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]">
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Mixed use</option>
                  <option>Land / subdivision</option>
                </select>
              </label>
              <label className="block">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Short description</span>
                <textarea
                  rows={4}
                  className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F] resize-none"
                  placeholder="Scope, timeline, and current construction stage…"
                />
              </label>
            </>
          )}

          {step === 1 && (
            <>
              <label className="block">
                <span className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <MapPin size={12} /> District & sector
                </span>
                <input
                  className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]"
                  placeholder="Linked to national land registry parcel where applicable"
                />
              </label>
              <label className="block">
                <span className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <Landmark size={12} /> Title / UPI reference
                </span>
                <input
                  className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]"
                  placeholder="Unique parcel identifier for API verification"
                />
              </label>
            </>
          )}

          {step === 2 && (
            <>
              <label className="block">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total funding target (USD)</span>
                <input
                  type="number"
                  className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]"
                  placeholder="500000"
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Milestone tranches</span>
                <p className="text-[12px] text-gray-500 mt-1 mb-2">
                  Define releases tied to inspections (e.g. foundation, shell, handover).
                </p>
                <textarea
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F] resize-none"
                  placeholder="Milestone 1 — 20% …"
                />
              </label>
            </>
          )}

          {step === 3 && (
            <>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center">
                <Upload className="mx-auto text-[#1E3A5F] mb-3" size={28} />
                <p className="text-[13px] font-bold text-gray-800">Drag blueprints, permits, and ownership scans</p>
                <p className="text-[11px] text-gray-400 mt-1">PDF, ZIP up to 50MB — encrypted at rest</p>
                <button
                  type="button"
                  className="mt-4 px-5 py-2 bg-[#1E3A5F] text-white text-[11px] font-bold rounded-xl"
                >
                  Browse files
                </button>
              </div>
              <ul className="space-y-2 text-[12px] text-gray-600">
                <li className="flex items-center gap-2">
                  <FileCheck size={16} className="text-emerald-600 shrink-0" />
                  Application fee must be paid before listing moves out of pending.
                </li>
              </ul>
            </>
          )}

          <div className="flex justify-between pt-4 border-t border-gray-100">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="text-[12px] font-bold text-gray-500 disabled:opacity-40 hover:text-[#1E3A5F]"
            >
              Back
            </button>
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="px-6 py-2.5 bg-[#1E3A5F] text-white text-[12px] font-bold rounded-xl"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                className="px-6 py-2.5 bg-[#1E3A5F] text-white text-[12px] font-bold rounded-xl flex items-center gap-2"
              >
                <Send size={14} />
                Submit for review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSubmission;
