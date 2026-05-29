"use client";

import React, { useState, useEffect } from "react";
import {
    CheckCircle, XCircle, Clock, FileText, ChevronDown, ChevronUp,
    Award, MessageSquare, X, Archive, Download, ZoomIn, ZoomOut,
    FileImage, File
} from "lucide-react";

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

// ── File preview content definitions ────────────────────────────────────────
const FILE_PREVIEWS: Record<string, { type: "pdf" | "zip"; content: React.ReactNode }> = {
    "Evaluation_Report_JPH.pdf": {
        type: "pdf",
        content: (
            <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#111", lineHeight: 1.6 }}>
                {/* Letterhead */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #1E3A5F", paddingBottom: "12px", marginBottom: "20px" }}>
                    <div>
                        <p style={{ fontSize: "20px", fontWeight: 900, color: "#1E3A5F", margin: 0, fontFamily: "sans-serif", letterSpacing: "-0.5px" }}>EstateX</p>
                        <p style={{ fontSize: "9px", color: "#888", margin: "2px 0 0", fontFamily: "sans-serif", letterSpacing: "2px", textTransform: "uppercase" }}>Property Owner Portal</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: "11px", color: "#555", margin: 0 }}>Ref: EVL-2026-0418-JPH</p>
                        <p style={{ fontSize: "11px", color: "#555", margin: "2px 0 0" }}>Date: 18 April 2026</p>
                        <p style={{ fontSize: "11px", color: "#555", margin: "2px 0 0" }}>Evaluator: Jean-Pierre Habimana</p>
                    </div>
                </div>

                {/* Title */}
                <p style={{ fontSize: "9px", color: "#888", fontFamily: "sans-serif", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 6px" }}>Property Evaluation Report</p>
                <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "#1E3A5F", margin: "0 0 4px" }}>Kigali Heights Residences</h1>
                <p style={{ fontSize: "12px", color: "#666", margin: "0 0 24px" }}>Gasabo District, Kigali · Site visit: 18 April 2026</p>

                {/* Section 1 */}
                <p style={{ fontSize: "11px", fontWeight: "bold", fontFamily: "sans-serif", color: "#1E3A5F", letterSpacing: "1.5px", textTransform: "uppercase", borderBottom: "1px solid #e5e7eb", paddingBottom: "4px", marginBottom: "10px" }}>1. Executive Summary</p>
                <p style={{ fontSize: "12.5px", color: "#333", marginBottom: "18px" }}>The property located at Kigali Heights, Gasabo District, has been evaluated as per EstateX tokenization requirements. The site is in excellent condition and aligns with all regulatory standards. The market value is consistent with comparable properties in the Nyarutarama corridor.</p>

                {/* Section 2 */}
                <p style={{ fontSize: "11px", fontWeight: "bold", fontFamily: "sans-serif", color: "#1E3A5F", letterSpacing: "1.5px", textTransform: "uppercase", borderBottom: "1px solid #e5e7eb", paddingBottom: "4px", marginBottom: "10px" }}>2. Valuation Assessment</p>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12.5px", marginBottom: "18px" }}>
                    <thead>
                        <tr style={{ background: "#f8f9fa" }}>
                            <th style={{ textAlign: "left", padding: "6px 10px", fontFamily: "sans-serif", fontSize: "10px", color: "#666", fontWeight: 600, borderBottom: "1px solid #e5e7eb" }}>Component</th>
                            <th style={{ textAlign: "right", padding: "6px 10px", fontFamily: "sans-serif", fontSize: "10px", color: "#666", fontWeight: 600, borderBottom: "1px solid #e5e7eb" }}>Value (RWF)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            ["Land value", "220,000,000"],
                            ["Construction value", "195,000,000"],
                            ["Fixtures & fittings", "42,000,000"],
                            ["Infrastructure premium", "23,000,000"],
                        ].map(([label, val]) => (
                            <tr key={label} style={{ borderBottom: "1px solid #f3f4f6" }}>
                                <td style={{ padding: "7px 10px", color: "#444" }}>{label}</td>
                                <td style={{ padding: "7px 10px", textAlign: "right", color: "#444" }}>{val}</td>
                            </tr>
                        ))}
                        <tr style={{ borderTop: "2px solid #1E3A5F", background: "#f0f4f8" }}>
                            <td style={{ padding: "8px 10px", fontWeight: "bold", color: "#1E3A5F", fontFamily: "sans-serif" }}>Total Estimated Value</td>
                            <td style={{ padding: "8px 10px", textAlign: "right", fontWeight: "bold", color: "#1E3A5F", fontFamily: "sans-serif" }}>480,000,000</td>
                        </tr>
                    </tbody>
                </table>

                {/* Section 3 */}
                <p style={{ fontSize: "11px", fontWeight: "bold", fontFamily: "sans-serif", color: "#1E3A5F", letterSpacing: "1.5px", textTransform: "uppercase", borderBottom: "1px solid #e5e7eb", paddingBottom: "4px", marginBottom: "10px" }}>3. Evaluator Remarks</p>
                <p style={{ fontSize: "12.5px", color: "#333", marginBottom: "24px" }}>Property is in excellent condition. Market value aligns with submitted valuation. Construction quality meets required standards. No structural concerns observed during site visit. I recommend this property for approval and listing to investors on the EstateX platform.</p>

                {/* Recommendation box */}
                <div style={{ border: "1px solid #10b981", background: "#f0fdf4", borderRadius: "8px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px" }}>
                    <span style={{ color: "#10b981", fontSize: "16px" }}>✓</span>
                    <p style={{ fontSize: "12px", fontWeight: "bold", color: "#065f46", fontFamily: "sans-serif", margin: 0 }}>Recommendation: Approve for EstateX investor listing</p>
                </div>

                {/* Signature */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "60px" }}>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ borderBottom: "1px solid #aaa", width: "160px", marginBottom: "4px" }} />
                        <p style={{ fontSize: "11px", color: "#555", fontFamily: "sans-serif", margin: 0 }}>Jean-Pierre Habimana</p>
                        <p style={{ fontSize: "10px", color: "#888", fontFamily: "sans-serif", margin: 0 }}>Certified Property Evaluator</p>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "10px", display: "flex", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "9px", color: "#aaa", fontFamily: "sans-serif", margin: 0 }}>Confidential — EstateX Platform Document</p>
                    <p style={{ fontSize: "9px", color: "#aaa", fontFamily: "sans-serif", margin: 0 }}>Page 1 of 1</p>
                </div>
            </div>
        )
    },
    "Site_Photos_JPH.zip": {
        type: "zip",
        content: (
            <div className="space-y-3">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4">ZIP Archive Contents · 14 files</p>
                {[
                    { name: "front_elevation.jpg", size: "3.2 MB", type: "image" },
                    { name: "rear_view.jpg", size: "2.8 MB", type: "image" },
                    { name: "living_room.jpg", size: "4.1 MB", type: "image" },
                    { name: "master_bedroom.jpg", size: "3.7 MB", type: "image" },
                    { name: "kitchen.jpg", size: "2.9 MB", type: "image" },
                    { name: "roof_structure.jpg", size: "5.0 MB", type: "image" },
                    { name: "foundation_detail.jpg", size: "4.4 MB", type: "image" },
                    { name: "electrical_panel.jpg", size: "1.8 MB", type: "image" },
                    { name: "plumbing_inspection.jpg", size: "2.2 MB", type: "image" },
                    { name: "site_boundary.jpg", size: "6.1 MB", type: "image" },
                    { name: "access_road.jpg", size: "3.3 MB", type: "image" },
                    { name: "aerial_overview.jpg", size: "7.8 MB", type: "image" },
                    { name: "gps_coordinates.txt", size: "1 KB", type: "text" },
                    { name: "photo_manifest.csv", size: "4 KB", type: "text" },
                ].map((file, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer group">
                        <div className="p-2 rounded-lg bg-stone-100 group-hover:bg-stone-200 transition-colors shrink-0">
                            {file.type === "image"
                                ? <FileImage size={14} className="text-[#1E3A5F]" />
                                : <File size={14} className="text-stone-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-semibold text-stone-800 truncate">{file.name}</p>
                            <p className="text-[10px] text-stone-400">{file.size}</p>
                        </div>
                        <Download size={13} className="text-stone-300 group-hover:text-[#1E3A5F] transition-colors shrink-0" />
                    </div>
                ))}
            </div>
        )
    },
    "Structural_Report_MU.pdf": {
        type: "pdf",
        content: (
            <div className="font-sans space-y-5 text-stone-800">
                <div className="border-b border-stone-200 pb-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[11px] font-black text-stone-400 uppercase tracking-widest mb-1">EstateX · Structural Engineering Report</p>
                            <h2 className="text-[18px] font-black text-[#1E3A5F] leading-tight">Kigali Heights Residences</h2>
                            <p className="text-[12px] text-stone-500 mt-1">Report ID: EVL-2026-0419-MU</p>
                        </div>
                        <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">PASS</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-stone-100">
                        {[
                            { label: "Evaluator", value: "Marie Uwimana" },
                            { label: "Specialization", value: "Structural Engineering" },
                            { label: "Site Visit", value: "19 April 2026" },
                        ].map(item => (
                            <div key={item.label}>
                                <p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest">{item.label}</p>
                                <p className="text-[12px] font-semibold text-stone-700 mt-0.5">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">1. Foundation Assessment</p>
                    <p className="text-[12px] leading-relaxed text-stone-600">The foundation system consists of reinforced concrete strip footings at a depth of 1.2m below ground level. Load calculations confirm adequate bearing capacity for the proposed 4-storey structure. No signs of settlement or cracking were observed.</p>
                </div>
                <div>
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">2. Structural Compliance Checklist</p>
                    <div className="space-y-2">
                        {[
                            { item: "Foundation depth & width", status: true },
                            { item: "Load-bearing wall thickness (≥200mm)", status: true },
                            { item: "Column reinforcement spacing", status: true },
                            { item: "Roof truss connections", status: true },
                            { item: "Electrical earthing & bonding", status: true },
                            { item: "Plumbing pressure test (≥6 bar)", status: true },
                        ].map(row => (
                            <div key={row.item} className="flex items-center justify-between p-2.5 bg-stone-50 rounded-lg text-[12px]">
                                <span className="text-stone-600">{row.item}</span>
                                <span className={`font-bold text-[10px] px-2 py-0.5 rounded-md ${row.status ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                                    {row.status ? "✓ Pass" : "✗ Fail"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">3. Engineer's Sign-off</p>
                    <p className="text-[12px] leading-relaxed text-stone-600">All structural elements comply with the Rwanda Standards Board (RSB) guidelines for residential construction. The property is deemed structurally sound and safe for occupancy and investment listing.</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3">
                    <CheckCircle size={16} className="text-emerald-600 shrink-0" />
                    <p className="text-[12px] font-bold text-emerald-700">Structural clearance granted — safe for investor listing</p>
                </div>
            </div>
        )
    },
};

// ── File Preview Modal ───────────────────────────────────────────────────────
function FilePreviewModal({ filename, onClose }: { filename: string; onClose: () => void }) {
    const preview = FILE_PREVIEWS[filename];
    const isPdf = preview?.type === "pdf";
    const [zoom, setZoom] = useState(100);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ fontFamily: "inherit" }}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Viewer shell */}
            <div className="relative z-10 flex flex-col w-full h-full max-w-4xl mx-auto my-6 rounded-2xl overflow-hidden shadow-2xl">

                {/* ── Toolbar ── */}
                <div className="flex items-center justify-between px-5 py-3 bg-[#3c3c3c] shrink-0">
                    {/* Left: file info */}
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-white/10">
                            {isPdf
                                ? <FileText size={14} className="text-white/80" />
                                : <Archive size={14} className="text-white/80" />}
                        </div>
                        <div>
                            <p className="text-[12px] font-bold text-white leading-tight">{filename}</p>
                            <p className="text-[9px] text-white/40 uppercase tracking-widest font-semibold mt-0.5">
                                {isPdf ? "PDF Document" : "ZIP Archive"}
                            </p>
                        </div>
                    </div>

                    {/* Centre: PDF controls */}
                    {isPdf && (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 bg-white/10 rounded-lg px-1 py-1">
                                <button
                                    onClick={() => setZoom(z => Math.max(50, z - 25))}
                                    className="p-1 rounded hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                                >
                                    <ZoomOut size={13} />
                                </button>
                                <span className="text-white/80 text-[11px] font-bold w-10 text-center">{zoom}%</span>
                                <button
                                    onClick={() => setZoom(z => Math.min(200, z + 25))}
                                    className="p-1 rounded hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                                >
                                    <ZoomIn size={13} />
                                </button>
                            </div>
                            <span className="text-white/30 text-[11px]">Page 1 of 1</span>
                        </div>
                    )}

                    {/* Right: actions */}
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 text-[11px] font-bold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
                            <Download size={12} /> Download
                        </button>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg hover:bg-white/20 text-white/50 hover:text-white transition-colors"
                        >
                            <X size={15} />
                        </button>
                    </div>
                </div>

                {/* ── Viewer body ── */}
                <div
                    className="flex-1 overflow-y-auto flex justify-center py-8 px-4"
                    style={{ background: "#525659" }}
                >
                    {isPdf ? (
                        /* White A4 page */
                        <div
                            className="bg-white shadow-2xl origin-top transition-transform duration-200"
                            style={{
                                width: "210mm",
                                minHeight: "297mm",
                                padding: "20mm 18mm",
                                transform: `scale(${zoom / 100})`,
                                transformOrigin: "top center",
                                boxShadow: "0 4px 40px rgba(0,0,0,0.5)",
                                fontFamily: "Georgia, 'Times New Roman', serif",
                            }}
                        >
                            {preview?.content}
                        </div>
                    ) : (
                        /* ZIP browser on grey */
                        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6">
                            {preview?.content}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function EvaluatorVerdicts() {
    const [expanded, setExpanded] = useState<string | null>("p1");
    const [previewFile, setPreviewFile] = useState<string | null>(null);

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
            {previewFile && (
                <FilePreviewModal filename={previewFile} onClose={() => setPreviewFile(null)} />
            )}

            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-black text-stone-900 tracking-tight">Evaluation Verdicts</h2>
                    <p className="text-[13px] text-stone-500 mt-1">
                        View all evaluator reports and admin decisions for your projects. Click any file to preview it.
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
                                                    <div key={r.id} className={`rounded-xl border p-4 ${r.status === 'pending' ? 'border-amber-200 bg-amber-50/50' :
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
                                                                            <button
                                                                                key={i}
                                                                                onClick={() => setPreviewFile(doc)}
                                                                                className="flex items-center gap-1.5 text-[11px] font-bold text-[#1E3A5F] bg-[#1E3A5F]/10 px-2.5 py-1 rounded-lg hover:bg-[#1E3A5F]/20 hover:shadow-sm transition-all cursor-pointer"
                                                                            >
                                                                                {doc.endsWith(".zip")
                                                                                    ? <Archive size={11} />
                                                                                    : <FileText size={11} />}
                                                                                {doc}
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
