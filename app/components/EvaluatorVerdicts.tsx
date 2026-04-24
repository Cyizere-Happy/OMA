"use client";

import React, { useState } from "react";
import { CheckCircle, XCircle, Clock, FileText, ChevronDown, ChevronUp, Award, MessageSquare } from "lucide-react";

interface EvaluatorReport {
    id: string;
    evaluator_name: string;
    specialization: string;
    result: "pass" | "fail" | null;
    comment: string;
    estimated_value_rwf: number | null;
    site_visit_date: string | null;
    submitted_at: string | null;
    report_docs: string[];
    status: "pending" | "completed";
}

interface ProjectVerdict {
    project_id: string;
    project_title: string;
    admin_decision: "approved" | "rejected" | "pending";
    admin_message?: string;
    admin_decided_at?: string;
    evaluator_reports: EvaluatorReport[];
}

const DEMO_VERDICTS: ProjectVerdict[] = [
    {
        project_id: "p1",
        project_title: "Kigali Heights Residences",
        admin_decision: "approved",
        admin_decided_at: "2026-04-22",
        evaluator_reports: [
            {
                id: "r1", evaluator_name: "Jean-Pierre Habimana", specialization: "Property Valuation",
                result: "pass", comment: "Property is in excellent condition. Market value aligns with submitted valuation. Construction quality meets required standards. No structural concerns observed during site visit.",
                estimated_value_rwf: 480000000, site_visit_date: "2026-04-18", submitted_at: "2026-04-18",
                report_docs: ["Evaluation_Report_JPH.pdf", "Site_Photos_JPH.zip"], status: "completed"
            },
            {
                id: "r2", evaluator_name: "Marie Uwimana", specialization: "Structural Engineering",
                result: "pass", comment: "Structural integrity is sound. Foundation and load-bearing walls meet Rwandan construction standards. Electrical and plumbing systems are properly installed.",
                estimated_value_rwf: 475000000, site_visit_date: "2026-04-19", submitted_at: "2026-04-19",
                report_docs: ["Structural_Report_MU.pdf"], status: "completed"
            },
        ]
    },
    {
        project_id: "p2",
        project_title: "Nyarutarama Green Villas",
        admin_decision: "pending",
        evaluator_reports: [
            {
                id: "r3", evaluator_name: "Patrick Nkurunziza", specialization: "Urban Planning",
                result: null, comment: "", estimated_value_rwf: null, site_visit_date: null, submitted_at: null,
                report_docs: [], status: "pending"
            },
        ]
    },
];

export default function EvaluatorVerdicts() {
    const [expanded, setExpanded] = useState<string | null>("p1");

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-black text-stone-900 tracking-tight">Evaluation Verdicts</h2>
                    <p className="text-[13px] text-stone-500 mt-1">
                        View all evaluator reports and admin decisions for your projects. You can raise an appeal if you disagree with any decision.
                    </p>
                </div>

                <div className="space-y-5">
                    {DEMO_VERDICTS.map(verdict => {
                        const isOpen = expanded === verdict.project_id;
                        const allDone = verdict.evaluator_reports.every(r => r.status === 'completed');
                        const passCount = verdict.evaluator_reports.filter(r => r.result === 'pass').length;

                        return (
                            <div key={verdict.project_id} className="bg-white rounded-[24px] border border-stone-200/80 shadow-sm overflow-hidden">
                                {/* Header */}
                                <div className="px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-stone-50/50"
                                    onClick={() => setExpanded(isOpen ? null : verdict.project_id)}>
                                    <div>
                                        <h3 className="text-[15px] font-bold text-stone-900">{verdict.project_title}</h3>
                                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                            {!allDone ? (
                                                <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-lg">
                                                    <Clock size={10} /> Evaluations in progress
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg">
                                                    <CheckCircle size={10} /> {passCount}/{verdict.evaluator_reports.length} evaluators passed
                                                </span>
                                            )}
                                            {verdict.admin_decision === 'approved' && (
                                                <span className="text-[10px] font-bold bg-[#1E3A5F]/10 text-[#1E3A5F] px-2 py-0.5 rounded-lg">Admin: Approved</span>
                                            )}
                                            {verdict.admin_decision === 'rejected' && (
                                                <span className="text-[10px] font-bold bg-red-50 text-red-700 px-2 py-0.5 rounded-lg">Admin: Rejected</span>
                                            )}
                                            {verdict.admin_decision === 'pending' && (
                                                <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg">Admin: Pending</span>
                                            )}
                                        </div>
                                    </div>
                                    {isOpen ? <ChevronUp size={18} className="text-stone-400 shrink-0" /> : <ChevronDown size={18} className="text-stone-400 shrink-0" />}
                                </div>

                                {isOpen && (
                                    <div className="border-t border-stone-100 p-6 space-y-5">
                                        {/* Admin decision */}
                                        {verdict.admin_decision !== 'pending' && (
                                            <div className={`rounded-2xl p-4 border-2 ${verdict.admin_decision === 'approved' ? 'border-[#1E3A5F]/20 bg-[#1E3A5F]/5' : 'border-red-200 bg-red-50'}`}>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Award size={16} className={verdict.admin_decision === 'approved' ? 'text-[#1E3A5F]' : 'text-red-600'} />
                                                    <p className="text-[12px] font-black text-stone-700 uppercase tracking-widest">Admin Decision</p>
                                                </div>
                                                <p className={`text-[14px] font-black ${verdict.admin_decision === 'approved' ? 'text-[#1E3A5F]' : 'text-red-700'}`}>
                                                    {verdict.admin_decision === 'approved' ? '✓ Project Approved — Listed to investors' : '✗ Project Rejected'}
                                                </p>
                                                {verdict.admin_message && (
                                                    <p className="text-[12px] text-stone-600 mt-1">{verdict.admin_message}</p>
                                                )}
                                                {verdict.admin_decided_at && (
                                                    <p className="text-[11px] text-stone-400 mt-1">{new Date(verdict.admin_decided_at).toLocaleDateString()}</p>
                                                )}
                                                {verdict.admin_decision === 'rejected' && (
                                                    <button className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-red-600 hover:underline">
                                                        <MessageSquare size={13} /> Raise an appeal
                                                    </button>
                                                )}
                                            </div>
                                        )}

                                        {/* Evaluator reports */}
                                        <div>
                                            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">Evaluator Reports</p>
                                            <div className="space-y-3">
                                                {verdict.evaluator_reports.map(r => (
                                                    <div key={r.id} className={`rounded-xl border p-4 ${
                                                        r.status === 'pending' ? 'border-amber-200 bg-amber-50/50' :
                                                        r.result === 'pass' ? 'border-emerald-200 bg-emerald-50/50' : 'border-red-200 bg-red-50/50'
                                                    }`}>
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div>
                                                                <p className="text-[13px] font-bold text-stone-900">{r.evaluator_name}</p>
                                                                <p className="text-[11px] text-stone-400">{r.specialization}</p>
                                                            </div>
                                                            {r.status === 'pending' ? (
                                                                <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-lg shrink-0">
                                                                    <Clock size={10} /> Pending
                                                                </span>
                                                            ) : r.result === 'pass' ? (
                                                                <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg shrink-0">
                                                                    <CheckCircle size={10} /> Pass
                                                                </span>
                                                            ) : (
                                                                <span className="flex items-center gap-1 text-[10px] font-bold bg-red-100 text-red-700 px-2 py-1 rounded-lg shrink-0">
                                                                    <XCircle size={10} /> Fail
                                                                </span>
                                                            )}
                                                        </div>

                                                        {r.status === 'completed' && (
                                                            <>
                                                                <p className="text-[12px] text-stone-700 leading-relaxed mt-3">{r.comment}</p>
                                                                <div className="flex items-center gap-4 mt-3 flex-wrap">
                                                                    {r.estimated_value_rwf && (
                                                                        <span className="text-[11px] font-bold text-stone-600">
                                                                            Estimated value: {(r.estimated_value_rwf / 1_000_000).toFixed(0)}M RWF
                                                                        </span>
                                                                    )}
                                                                    {r.site_visit_date && (
                                                                        <span className="text-[11px] text-stone-400">
                                                                            Site visit: {new Date(r.site_visit_date).toLocaleDateString()}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                {r.report_docs.length > 0 && (
                                                                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                                                                        {r.report_docs.map((doc, i) => (
                                                                            <button key={i} className="flex items-center gap-1.5 text-[11px] font-bold text-[#1E3A5F] bg-[#1E3A5F]/10 px-2.5 py-1 rounded-lg hover:bg-[#1E3A5F]/20 transition-colors">
                                                                                <FileText size={11} /> {doc}
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                                {r.result === 'fail' && (
                                                                    <button className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-red-600 hover:underline">
                                                                        <MessageSquare size={13} /> Dispute this verdict
                                                                    </button>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
