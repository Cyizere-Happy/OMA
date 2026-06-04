"use client";

import React, { useState, useEffect } from "react";
import { 
  Inbox, 
  MapPin, 
  Flag, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  FileText, 
  Send,
  CheckCircle,
  Plus,
  Trash2
} from "lucide-react";

interface Milestone {
  name: string;
  amountRwf: string;
  status: "released" | "pending" | "reviewing";
  reportSummary?: string;
  submittedReport?: string;
  submittedEvidenceUrl?: string;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  project_status: string;
  location: string;
  valuation_rwf: number;
  funding_target_rwf: number;
  owner_name: string;
  milestones: Milestone[];
  milestones_approved?: boolean;
}

export default function MilestoneReporting() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Milestone Proposal builder states
  const [newMilestoneName, setNewMilestoneName] = useState("");
  const [newMilestoneAmount, setNewMilestoneAmount] = useState("");
  const [tempMilestones, setTempMilestones] = useState<Milestone[]>([]);

  // Form states for submitting milestone report
  const [reportingMilestoneIdx, setReportingMilestoneIdx] = useState<number | null>(null);
  const [reportDescription, setReportDescription] = useState("");
  const [evidenceFileName, setEvidenceFileName] = useState("");

  const activeProject = projects.find(p => p.id === activeProjectId);

  // Initialize temp milestones when active project changes
  useEffect(() => {
    if (activeProject) {
      if (!activeProject.milestones || activeProject.milestones.length === 0 || activeProject.milestones_approved === false) {
        setTempMilestones(activeProject.milestones || []);
      } else {
        setTempMilestones([]);
      }
    } else {
      setTempMilestones([]);
    }
    setNewMilestoneName("");
    setNewMilestoneAmount("");
  }, [activeProjectId, activeProject]);

  const handleAddMilestone = () => {
    if (!newMilestoneName.trim() || !newMilestoneAmount) return;
    const newM: Milestone = {
      name: newMilestoneName.trim(),
      amountRwf: newMilestoneAmount,
      status: "pending"
    };
    setTempMilestones([...tempMilestones, newM]);
    setNewMilestoneName("");
    setNewMilestoneAmount("");
  };

  const handleRemoveMilestone = (idx: number) => {
    setTempMilestones(tempMilestones.filter((_, i) => i !== idx));
  };

  const handleProposeMilestones = async () => {
    if (!activeProject) return;
    setSubmitting(true);
    try {
      const dbRes = await fetch("/api/sync");
      const dbData = await dbRes.json();
      const currentDbProj = dbData[activeProject.id] || {};

      const updatedProject = {
        ...currentDbProj,
        milestones: tempMilestones,
        milestones_approved: false
      };

      await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [activeProject.id]: updatedProject
        })
      });

      // Update local projects state
      setProjects(prev => prev.map(p => p.id === activeProject.id ? { ...p, milestones: tempMilestones, milestones_approved: false } : p));
      alert("Milestone proposal submitted successfully. Pending onsite evaluator review.");
    } catch (err) {
      console.error("Error submitting milestone proposal:", err);
      alert("Failed to submit milestones proposal.");
    } finally {
      setSubmitting(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/sync");
      const data = await res.json();
      if (data && Object.keys(data).length > 0) {
        const dbList: Project[] = Object.keys(data)
          .map(key => {
            const p = data[key];
            return {
              id: p.id,
              title: p.title,
              slug: p.slug,
              summary: p.summary,
              project_status: p.project_status || p.reviewStatus || "under_review",
              location: p.location || `${p.locationProvince || ""}, ${p.locationDistrict || ""}`,
              valuation_rwf: p.valuation_rwf || parseFloat(p.propertyValuation || "0"),
              funding_target_rwf: p.funding_target_rwf || parseFloat(p.fundingTarget || "0"),
              owner_name: p.owner_name || "",
              milestones: p.milestones || [],
              milestones_approved: p.milestones_approved
            };
          })
          .filter(p => p.project_status === "funded");

        setProjects(dbList);
        if (dbList.length > 0 && !activeProjectId) {
          setActiveProjectId(dbList[0].id);
        }
      }
    } catch (err) {
      console.error("Error fetching projects in reporting:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    const interval = setInterval(fetchProjects, 2500);
    return () => clearInterval(interval);
  }, [activeProjectId]);

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProject || reportingMilestoneIdx === null || !reportDescription.trim()) return;

    setSubmitting(true);
    try {
      const updatedMilestones = activeProject.milestones.map((m, idx) => {
        if (idx === reportingMilestoneIdx) {
          return {
            ...m,
            status: "reviewing" as const,
            submittedReport: reportDescription.trim(),
            submittedEvidenceUrl: evidenceFileName.trim() || "evidence_dossier.pdf"
          };
        }
        return m;
      });

      // Get current full DB file
      const dbRes = await fetch("/api/sync");
      const dbData = await dbRes.json();
      const currentDbProj = dbData[activeProject.id] || {};

      const updatedProject = {
        ...currentDbProj,
        milestones: updatedMilestones
      };

      // POST to DB
      await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [activeProject.id]: updatedProject
        })
      });

      // Update local state
      setProjects(prev => prev.map(p => p.id === activeProject.id ? { ...p, milestones: updatedMilestones } : p));
      
      // Reset form
      setReportingMilestoneIdx(null);
      setReportDescription("");
      setEvidenceFileName("");
      alert("Progress evidence report submitted successfully. Admin review pending.");
    } catch (err) {
      console.error("Error submitting milestone report:", err);
      alert("Failed to submit progress report.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden h-full bg-[#f8f9fa] select-none font-sans">
      {/* Left panel: Funded projects */}
      <div className="w-[320px] border-r border-slate-200 bg-white flex flex-col shrink-0 overflow-hidden">
        <div className="p-6 border-b border-slate-100 shrink-0">
          <h2 className="text-[16px] font-black text-slate-900 tracking-tight">Milestone Progress</h2>
          <p className="text-[11.5px] text-slate-500 mt-1 leading-normal">Submit progress evidence reports to request escrow release of your construction budgets.</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3">
          {loading ? (
            <div className="py-12 text-center text-slate-400 text-xs">Loading funded projects...</div>
          ) : projects.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400 text-center px-4">
              <Inbox size={32} className="text-slate-350 stroke-[1.5]" />
              <h4 className="mt-3 font-bold text-[12px] text-slate-700">No Funded Projects</h4>
              <p className="mt-1 text-[10.5px] text-slate-500 leading-relaxed">Once your project is funded on the platform, milestones will appear here.</p>
            </div>
          ) : (
            projects.map(p => {
              const releasedCount = p.milestones.filter(m => m.status === "released").length;
              const isDefined = p.milestones.length > 0 && p.milestones_approved !== false;
              
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setActiveProjectId(p.id);
                    setReportingMilestoneIdx(null);
                  }}
                  className={`p-4 border rounded-[20px] transition-all cursor-pointer text-left ${
                    activeProjectId === p.id
                      ? "bg-[#1E3A5F] border-[#1E3A5F] text-white shadow-md shadow-[#1E3A5F]/15"
                      : "bg-white border-slate-200/80 hover:border-slate-350 text-slate-800"
                  }`}
                >
                  <h4 className="text-[13.5px] font-black truncate leading-snug">{p.title}</h4>
                  <p className={`text-[10.5px] mt-1 flex items-center gap-1.5 ${activeProjectId === p.id ? "text-slate-200" : "text-slate-500"}`}>
                    <MapPin size={11} /> {p.location.split("—")[0]}
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t pt-3 border-neutral-100/10">
                    <div>
                      <span className={`text-[9px] font-bold uppercase tracking-wider block ${activeProjectId === p.id ? "text-slate-300" : "text-slate-400"}`}>
                        Budget Target
                      </span>
                      <span className="text-[12px] font-black mt-0.5 block">
                        {p.funding_target_rwf.toLocaleString()} RWF
                      </span>
                    </div>

                    <div className="text-right">
                      {isDefined ? (
                        <span className={`text-[9.5px] font-black border px-2 py-0.5 rounded-lg ${
                          activeProjectId === p.id 
                            ? "bg-white/10 border-white/20 text-white" 
                            : "bg-emerald-50 border-emerald-100 text-emerald-700"
                        }`}>
                          {releasedCount}/{p.milestones.length} Released
                        </span>
                      ) : p.milestones.length > 0 ? (
                        <span className={`text-[9.5px] font-black border px-2 py-0.5 rounded-lg ${
                          activeProjectId === p.id 
                            ? "bg-white/10 border-white/20 text-white" 
                            : "bg-purple-50 border-purple-100 text-purple-700"
                        }`}>
                          Proposed
                        </span>
                      ) : (
                        <span className={`text-[9.5px] font-black border px-2 py-0.5 rounded-lg ${
                          activeProjectId === p.id 
                            ? "bg-white/10 border-white/20 text-white" 
                            : "bg-amber-50 border-amber-100 text-amber-700"
                        }`}>
                          Pending Proposal
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Center workspace */}
      <div className="flex-1 bg-white overflow-y-auto custom-scrollbar p-8 flex flex-col h-full">
        {activeProject ? (
          <div className="max-w-4xl space-y-6 flex-1 flex flex-col">
            <div className="border-b border-slate-250 pb-5">
              <span className="text-[9.5px] font-black text-[#1E3A5F] bg-[#1E3A5F]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Milestone Progress Reporting Workspace
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-3 tracking-tight">{activeProject.title}</h3>
              <p className="text-[12.5px] text-slate-500 mt-1">
                Provide status logs and verify completions to trigger admin releasing escrow tranches.
              </p>
            </div>

            {activeProject.milestones.length === 0 ? (
              /* Milestones Builder for Developer */
              <div className="space-y-6 text-left">
                <div className="border-l-4 border-amber-350 bg-amber-50/40 p-4 rounded-r-xl">
                  <h4 className="text-[13px] font-black text-amber-900">Define Escrow Milestones Schedule Proposal</h4>
                  <p className="text-[11.5px] mt-1 leading-normal text-slate-600 font-semibold">
                    Propose the milestone tranches for your funded project. The sum of all tranches must equal your project's funding target of <strong>{activeProject.funding_target_rwf.toLocaleString()} RWF</strong> exactly. Once submitted, the onsite evaluator will review and approve these milestones.
                  </p>
                </div>

                <div className="space-y-4 bg-white border border-slate-200/60 p-5 rounded-[20px] shadow-2xs">
                  <h4 className="text-[11.5px] font-black text-[#1E3A5F] uppercase tracking-wider flex items-center gap-1.5">
                    <Plus size={14} /> Add Escrow Tranche
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Tranche Name / Building Phase</label>
                      <input
                        type="text"
                        value={newMilestoneName}
                        onChange={e => setNewMilestoneName(e.target.value)}
                        placeholder="e.g. Milestone 1: Slab Pouring & Foundations"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-[12px] font-semibold outline-none focus:border-[#1E3A5F] focus:bg-white transition-all text-slate-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Allocation Amount (RWF)</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={newMilestoneAmount}
                          onChange={e => setNewMilestoneAmount(e.target.value)}
                          placeholder="e.g. 150000000"
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-[12px] font-semibold outline-none focus:border-[#1E3A5F] focus:bg-white transition-all text-slate-800"
                        />
                        <button
                          type="button"
                          onClick={handleAddMilestone}
                          disabled={!newMilestoneName.trim() || !newMilestoneAmount}
                          className="px-5 py-2.5 bg-[#1E3A5F] hover:brightness-110 text-white font-bold text-[12px] rounded-xl disabled:opacity-40 transition-all shrink-0 border-0 shadow-sm cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* List of allocations */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-[11.5px] font-black text-slate-400 uppercase tracking-wider">Tranche Allocation Proposal Checklist</h4>
                  {tempMilestones.length === 0 ? (
                    <div className="border border-dashed border-slate-200 rounded-2xl py-12 flex flex-col items-center justify-center text-slate-400 text-center bg-white">
                      <Flag size={28} className="stroke-[1.5] mb-2 text-slate-300" />
                      <p className="text-[11.5px] font-semibold text-slate-500">No tranches added yet. Add tranches above to define the schedule.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
                        {tempMilestones.map((m, idx) => {
                          const amt = parseFloat(m.amountRwf);
                          const pct = activeProject.funding_target_rwf > 0 ? (amt / activeProject.funding_target_rwf) * 100 : 0;
                          return (
                            <div key={idx} className="p-4 flex items-center justify-between gap-4 bg-white hover:bg-slate-50/30 transition-colors">
                              <div>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">Tranche #{idx + 1}</span>
                                <p className="text-[13.5px] font-bold text-slate-900 mt-0.5">{m.name}</p>
                                <p className="text-[11.5px] text-slate-500 mt-0.5 font-semibold">
                                  Allocation: <strong>{amt.toLocaleString()} RWF</strong> ({pct.toFixed(0)}% of target)
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveMilestone(idx)}
                                className="p-1.5 border border-slate-200 hover:border-red-250 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-all cursor-pointer shrink-0 bg-white"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-2xs">
                        <div>
                          <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">Allocated Sum</span>
                          <span className="text-[16px] font-black text-slate-800 mt-0.5 block font-bold">
                            {tempMilestones.reduce((s, m) => s + parseFloat(m.amountRwf), 0).toLocaleString()} RWF / {activeProject.funding_target_rwf.toLocaleString()} RWF
                          </span>
                        </div>
                        <button
                          type="button"
                          disabled={tempMilestones.reduce((s, m) => s + parseFloat(m.amountRwf), 0) !== activeProject.funding_target_rwf || submitting}
                          onClick={handleProposeMilestones}
                          className="px-6 py-3 bg-[#1E3A5F] hover:brightness-110 disabled:opacity-40 text-white font-bold text-[12.5px] rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer border-0"
                        >
                          <Send size={14} />
                          <span>{submitting ? "Submitting Proposal..." : "Submit Milestones Proposal"}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : activeProject.milestones_approved === false ? (
              /* Proposed Milestones waiting for Onsite Evaluator Clearance */
              <div className="space-y-6 text-left">
                <div className="border-l-4 border-amber-350 bg-amber-50/40 p-4 rounded-r-xl">
                  <h4 className="text-[13px] font-black text-amber-900">⟳ Milestones Proposal Submitted</h4>
                  <p className="text-[11.5px] mt-1 leading-normal text-slate-600 font-semibold">
                    Your proposed milestones schedule has been submitted. The onsite evaluator (notary Sylvain Nkurunziza) will verify this schedule during his onsite visitation and finalize it.
                  </p>
                </div>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
                  {activeProject.milestones.map((m, idx) => {
                    const amt = parseFloat(m.amountRwf);
                    const pct = activeProject.funding_target_rwf > 0 ? (amt / activeProject.funding_target_rwf) * 100 : 0;
                    return (
                      <div key={idx} className="p-4 flex items-center justify-between bg-white hover:bg-slate-50/30 transition-colors">
                        <div>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">Tranche #{idx + 1}</span>
                          <p className="text-[13.5px] font-bold text-slate-900 mt-0.5">{m.name}</p>
                          <p className="text-[11.5px] text-slate-500 mt-0.5 font-bold">
                            Suggested Allocation: {amt.toLocaleString()} RWF · Weight: {pct.toFixed(0)}%
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[9.5px] font-extrabold bg-amber-50 border border-amber-100 text-amber-700 px-3 py-1.5 rounded-full uppercase tracking-wider">
                          Pending Onsite Approval
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : reportingMilestoneIdx !== null ? (
              /* REPORT SUBMISSION FORM */
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-5 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[9px] font-black text-[#1E3A5F] uppercase tracking-wider block">Submit Progress Report</span>
                    <h4 className="text-[14px] font-bold text-slate-800 mt-1">
                      {activeProject.milestones[reportingMilestoneIdx].name}
                    </h4>
                  </div>
                  <button
                    onClick={() => setReportingMilestoneIdx(null)}
                    className="text-xs text-slate-500 hover:text-slate-800 font-bold hover:underline cursor-pointer bg-transparent border-0"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSubmitReport} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">
                      Progress Summary Details
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={reportDescription}
                      onChange={e => setReportDescription(e.target.value)}
                      placeholder="Describe what works have been completed for this milestone. Include quantities, inspections, dates, and sign-offs where applicable."
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-[12.5px] font-medium outline-none focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/10 transition-all text-slate-800 leading-relaxed placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">
                      Evidence File / File Name Attachments
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={evidenceFileName}
                        onChange={e => setEvidenceFileName(e.target.value)}
                        placeholder="e.g. foundation_pour_certificate.pdf"
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-[12.5px] font-medium outline-none focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/10 transition-all text-slate-800"
                      />
                      <FileText size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 italic">
                      Specify the name of the dossier or certification document to show the admin inspector.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || !reportDescription.trim()}
                    className="w-full h-12 bg-[#1E3A5F] hover:brightness-110 disabled:opacity-50 text-white font-bold text-[12px] uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-[#1E3A5F]/15 transition-all cursor-pointer mt-2"
                  >
                    <Send size={13} />
                    <span>{submitting ? "Uploading evidence report..." : "Submit Progress Evidence Report"}</span>
                  </button>
                </form>
              </div>
            ) : (
              /* MILESTONES SCHEDULE TIMELINE */
              <div className="space-y-4">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Milestones Escrow Schedule</h4>
                <div className="space-y-3">
                  {activeProject.milestones.map((m, idx) => {
                    const isReleased = m.status === "released";
                    const isReviewing = m.status === "reviewing";
                    const amt = parseFloat(m.amountRwf);
                    const pct = activeProject.funding_target_rwf > 0 ? (amt / activeProject.funding_target_rwf) * 100 : 0;
                    
                    return (
                      <div
                        key={idx}
                        className={`border rounded-2xl p-5 bg-white transition-all ${
                          isReleased
                            ? "border-emerald-100 bg-emerald-50/10"
                            : isReviewing
                              ? "border-amber-200 bg-amber-50/20"
                              : "border-slate-200 hover:border-slate-350"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wide ${
                                isReleased ? "bg-emerald-100 text-emerald-800" : isReviewing ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-500"
                              }`}>
                                Tranche #{idx + 1}
                              </span>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                                isReleased
                                  ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                                  : isReviewing
                                    ? "bg-amber-50 border-amber-200 text-amber-700"
                                    : "bg-slate-50 border-slate-200 text-slate-500"
                              }`}>
                                {isReleased ? "✓ Tranche Released" : isReviewing ? "⟳ Verification Pending" : "Escrow Locked"}
                              </span>
                            </div>

                            <h4 className="text-[14px] font-black text-slate-800 mt-2">{m.name}</h4>
                            <p className="text-[11.5px] text-slate-500 mt-1">
                              Allocation: <strong>{amt.toLocaleString()} RWF</strong> ({pct.toFixed(0)}% of target)
                            </p>

                            {/* Show details for released/reviewing items */}
                            {isReleased && m.reportSummary && (
                              <div className="mt-3 p-3 bg-emerald-50/40 border border-emerald-100/50 rounded-xl text-[11px] text-emerald-800 italic leading-relaxed">
                                <strong>Release Audit Details:</strong> {m.reportSummary}
                              </div>
                            )}

                            {isReviewing && m.submittedReport && (
                              <div className="mt-3 p-3 bg-amber-50/30 border border-amber-100/40 rounded-xl text-[11px] text-slate-750 leading-relaxed">
                                <span className="font-bold text-amber-800 block text-[10px] uppercase tracking-wider mb-1">Your Submitted Report:</span>
                                {m.submittedReport}
                                {m.submittedEvidenceUrl && (
                                  <div className="mt-1.5 pt-1.5 border-t border-amber-100/45 text-[9.5px] text-slate-500 flex justify-between">
                                    <span>Evidence attachment:</span>
                                    <strong className="text-slate-600 font-bold">{m.submittedEvidenceUrl}</strong>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="shrink-0 flex items-center justify-end">
                            {isReleased ? (
                              <div className="flex items-center gap-1 text-emerald-600 font-bold text-[11px] bg-emerald-50 rounded-lg px-3 py-1.5 border border-emerald-150">
                                <CheckCircle size={13} />
                                <span>Paid Out</span>
                              </div>
                            ) : isReviewing ? (
                              <div className="flex items-center gap-1 text-amber-600 font-bold text-[11px] bg-amber-50 rounded-lg px-3 py-1.5 border border-amber-150">
                                <Clock size={13} className="animate-spin" />
                                <span>In Review</span>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setReportingMilestoneIdx(idx);
                                  setReportDescription("");
                                  setEvidenceFileName("");
                                }}
                                className="px-4 py-2 bg-[#1E3A5F] hover:brightness-110 text-white font-bold text-[11px] rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                              >
                                <span>Report Progress</span>
                                <ArrowRight size={11} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-24 text-center">
            <Inbox size={48} strokeWidth={1} />
            <h4 className="mt-4 font-bold text-[14px] text-slate-800">No Funded Property Selected</h4>
            <p className="mt-1 text-[12px] text-slate-500">Please choose a funded project from the left panel to submit progress reporting.</p>
          </div>
        )}
      </div>
    </div>
  );
}
