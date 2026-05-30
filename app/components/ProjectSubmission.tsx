"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Building, 
  FileText, 
  Shield, 
  Landmark, 
  ClipboardList, 
  ArrowLeft, 
  Upload, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Eye, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  X, 
  Loader2, 
  Send, 
  Check,
  Lock,
  MapPin,
  FileSpreadsheet
} from "lucide-react";

// ── Document Previews Mock Data ────────────────────────────────────────────────
const MOCK_DOC_TEMPLATES: Record<string, { title: string; subtitle: string; content: React.ReactNode }> = {
  nla: {
    title: "Land Title Registry Certificate",
    subtitle: "Republic of Rwanda · Land Management Authority",
    content: (
      <div style={{ fontFamily: "Georgia, serif", color: "#111" }} className="p-8 border-4 border-double border-amber-800/30 bg-stone-50/30 rounded-lg">
        <div className="text-center border-b-2 border-stone-800 pb-4 mb-6">
          <p className="text-[10px] uppercase font-bold tracking-widest text-stone-500">Repubulika y'u Rwanda</p>
          <h2 className="text-[18px] font-black text-amber-950 uppercase tracking-wide mt-1">Rwanda Land Management and Use Authority</h2>
          <p className="text-[11px] font-semibold text-stone-600 mt-0.5">National Land Registry Office</p>
        </div>
        <div className="text-center my-8">
          <h3 className="text-[20px] font-black text-amber-900 tracking-tight uppercase">Certificate of Land Title</h3>
          <p className="text-[11px] text-stone-400 font-sans mt-1">Issued under the Land Law No. 43/2013 of 16/06/2013</p>
        </div>
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[12px] my-6">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Unique Parcel Identifier (UPI)</p>
            <p className="font-bold text-stone-800 mt-0.5">1/02/08/04/4921</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Province / District</p>
            <p className="font-bold text-stone-800 mt-0.5">Kigali City / Gasabo</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Sector / Cell</p>
            <p className="font-bold text-stone-800 mt-0.5">Kimihurura / Rugando</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Land Use / Category</p>
            <p className="font-bold text-stone-800 mt-0.5">Commercial / High Density Residential</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Registered Owner</p>
            <p className="font-bold text-stone-800 mt-0.5">EstateX Development Partners Ltd</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Total Surface Area</p>
            <p className="font-bold text-stone-800 mt-0.5">3,450 sq. meters</p>
          </div>
        </div>
        <div className="my-8 text-[12px] leading-relaxed text-stone-700 italic border-l-2 border-amber-900/20 pl-4">
          "This certifies that the proprietor named above is registered as the owner of the leasehold interest in the land parcel described hereon, subject to the reservations, conditions, and provisions contained in the Land Law of Rwanda."
        </div>
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-stone-200">
          <div>
            <p className="text-[9px] uppercase text-stone-400 font-sans">Registry Reference</p>
            <p className="text-[11px] font-mono text-stone-600">RCA-KGL-2026-092-A</p>
          </div>
          <div className="text-center relative">
            <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full border-4 border-dashed border-[#1E3A5F]/20 flex items-center justify-center text-[#1E3A5F]/20 font-black text-[9px] rotate-12 select-none">
              OFFICIAL SEAL
            </div>
            <p className="text-[11px] font-bold text-stone-800 font-sans">Hon. Eric Rwigamba</p>
            <p className="text-[9px] text-stone-400 font-sans uppercase">Registrar of Land Titles</p>
          </div>
        </div>
      </div>
    )
  },
  house_plan: {
    title: "Construction Permit Blueprint",
    subtitle: "City of Kigali · Urban Planning & Construction Department",
    content: (
      <div style={{ fontFamily: "Georgia, serif", color: "#111" }} className="p-8 border-4 border-double border-blue-900/30 bg-stone-50/30 rounded-lg">
        <div className="text-center border-b-2 border-stone-800 pb-4 mb-6">
          <p className="text-[10px] uppercase font-bold tracking-widest text-stone-500">City of Kigali</p>
          <h2 className="text-[18px] font-black text-blue-950 uppercase tracking-wide mt-1">One Stop Center - Construction Permits</h2>
          <p className="text-[11px] font-semibold text-stone-600 mt-0.5">Zoning & Compliance Office</p>
        </div>
        <div className="text-center my-8">
          <h3 className="text-[20px] font-black text-blue-900 tracking-tight uppercase">Construction Permit</h3>
          <p className="text-[11px] text-stone-400 font-sans mt-1">Permit Number: CoK-CP-2026-45920</p>
        </div>
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[12px] my-6">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Project Category</p>
            <p className="font-bold text-stone-800 mt-0.5">Commercial Residential - R4 Mixed Use</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Authorized Floors</p>
            <p className="font-bold text-stone-800 mt-0.5">G + 4 Levels</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Plot UPI</p>
            <p className="font-bold text-stone-800 mt-0.5">1/02/08/04/4921</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Architect of Record</p>
            <p className="font-bold text-stone-800 mt-0.5">Aura Studio Architects (RIA No. 0422)</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Developer Name</p>
            <p className="font-bold text-stone-800 mt-0.5">EstateX Development Partners Ltd</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Valid Until</p>
            <p className="font-bold text-stone-800 mt-0.5">May 28, 2028 (24 Months)</p>
          </div>
        </div>
        <div className="my-8 text-[12px] leading-relaxed text-stone-700 italic border-l-2 border-blue-900/20 pl-4">
          "Permission is hereby granted to carry out construction works as described in the approved plans. All works must comply with the Rwanda Building Code and Kigali City Master Plan regulations."
        </div>
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-stone-200">
          <div>
            <p className="text-[9px] uppercase text-stone-400 font-sans">Approval Date</p>
            <p className="text-[11px] font-mono text-stone-600">May 29, 2026</p>
          </div>
          <div className="text-center relative">
            <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full border-4 border-dashed border-blue-900/25 flex items-center justify-center text-blue-900/25 font-black text-[9px] -rotate-12 select-none">
              APPROVED
            </div>
            <p className="text-[11px] font-bold text-stone-800 font-sans">Eng. Pudence Rubingisa</p>
            <p className="text-[9px] text-stone-400 font-sans uppercase">Director General, One Stop Center</p>
          </div>
        </div>
      </div>
    )
  },
  environmental: {
    title: "Environmental Impact Assessment Clearance",
    subtitle: "Rwanda Environment Management Authority (REMA)",
    content: (
      <div style={{ fontFamily: "Georgia, serif", color: "#111" }} className="p-8 border-4 border-double border-emerald-900/30 bg-stone-50/30 rounded-lg">
        <div className="text-center border-b-2 border-stone-800 pb-4 mb-6">
          <p className="text-[10px] uppercase font-bold tracking-widest text-stone-500">Ministry of Environment</p>
          <h2 className="text-[18px] font-black text-emerald-950 uppercase tracking-wide mt-1">Rwanda Environment Management Authority</h2>
          <p className="text-[11px] font-semibold text-stone-600 mt-0.5">EIA Monitoring & Compliance Division</p>
        </div>
        <div className="text-center my-8">
          <h3 className="text-[20px] font-black text-emerald-900 tracking-tight uppercase">EIA Clearance Certificate</h3>
          <p className="text-[11px] text-stone-400 font-sans mt-1">Certificate No: REMA-EIA-2026-802</p>
        </div>
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[12px] my-6">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Project Name</p>
            <p className="font-bold text-stone-800 mt-0.5">EstateX Rugando Towers Development</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Developer Name</p>
            <p className="font-bold text-stone-800 mt-0.5">EstateX Development Partners Ltd</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Site Location</p>
            <p className="font-bold text-stone-800 mt-0.5">Rugando Cell, Gasabo District</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Primary Assessment Date</p>
            <p className="font-bold text-stone-800 mt-0.5">April 12, 2026</p>
          </div>
        </div>
        <div className="my-8 text-[12px] leading-relaxed text-stone-700 italic border-l-2 border-emerald-900/20 pl-4">
          "Having reviewed the Environmental Impact Report, REMA certifies that this project has satisfied all regulatory standards under Environmental Law No. 48/2018. Adequate mitigation plans are approved."
        </div>
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-stone-200">
          <div>
            <p className="text-[9px] uppercase text-stone-400 font-sans">Inspector Code</p>
            <p className="text-[11px] font-mono text-stone-600">REMA-INS-332</p>
          </div>
          <div className="text-center relative">
            <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full border-4 border-dashed border-emerald-900/25 flex items-center justify-center text-emerald-900/25 font-black text-[9px] rotate-45 select-none">
              CLEARED
            </div>
            <p className="text-[11px] font-bold text-stone-800 font-sans">Dr. Juliet Kabera</p>
            <p className="text-[9px] text-stone-400 font-sans uppercase">Director General, REMA</p>
          </div>
        </div>
      </div>
    )
  },
  tax_reg: {
    title: "Certificate of Registration & Tax ID",
    subtitle: "Rwanda Development Board (RDB)",
    content: (
      <div style={{ fontFamily: "Georgia, serif", color: "#111" }} className="p-8 border-4 border-double border-red-900/30 bg-stone-50/30 rounded-lg">
        <div className="text-center border-b-2 border-stone-800 pb-4 mb-6">
          <p className="text-[10px] uppercase font-bold tracking-widest text-stone-500">Republic of Rwanda</p>
          <h2 className="text-[18px] font-black text-red-950 uppercase tracking-wide mt-1">Rwanda Development Board</h2>
          <p className="text-[11px] font-semibold text-stone-600 mt-0.5">Office of the Registrar General</p>
        </div>
        <div className="text-center my-8">
          <h3 className="text-[20px] font-black text-red-900 tracking-tight uppercase">Certificate of Company Registration</h3>
          <p className="text-[11px] text-stone-400 font-sans mt-1">Company Code (TIN): 109284910</p>
        </div>
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[12px] my-6">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Company Name</p>
            <p className="font-bold text-stone-800 mt-0.5">ESTATEX DEVELOPMENT PARTNERS LTD</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Registration Date</p>
            <p className="font-bold text-stone-800 mt-0.5">March 04, 2026</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Company Type</p>
            <p className="font-bold text-stone-800 mt-0.5">Private Company Limited by Shares</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Share Capital</p>
            <p className="font-bold text-stone-800 mt-0.5">50,000,000 RWF</p>
          </div>
        </div>
        <div className="my-8 text-[12px] leading-relaxed text-stone-700 italic border-l-2 border-red-900/20 pl-4">
          "This is to certify that ESTATEX DEVELOPMENT PARTNERS LTD has been registered under Law No. 007/2021 of 05/02/2021 governing companies. The company is authorized to engage in real estate development activities."
        </div>
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-stone-200">
          <div>
            <p className="text-[9px] uppercase text-stone-400 font-sans">Registered Office</p>
            <p className="text-[11px] font-semibold text-stone-600">Kigali, Gasabo, Kimihurura</p>
          </div>
          <div className="text-center relative">
            <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full border-4 border-dashed border-red-900/25 flex items-center justify-center text-red-900/25 font-black text-[9px] rotate-12 select-none">
              RDB SEAL
            </div>
            <p className="text-[11px] font-bold text-stone-800 font-sans">Richard Kayibanda</p>
            <p className="text-[9px] text-stone-400 font-sans uppercase">Registrar General, RDB</p>
          </div>
        </div>
      </div>
    )
  }
};

// ── File Preview Modal ────────────────────────────────────────────────────────
function FilePreviewModal({ 
  docKey, 
  onClose,
  project
}: { 
  docKey: string; 
  onClose: () => void;
  project?: any;
}) {
  let preview = MOCK_DOC_TEMPLATES[docKey];
  if (docKey === "evaluator_report" && project) {
    const recommendedVal = project.evaluatorPropertyValuation || "900000000";
    const recommendedTarget = project.evaluatorFundingTarget || "720000000";
    preview = {
      title: "Physical Survey & Asset Valuation Report",
      subtitle: "Republic of Rwanda · Land Management Authority",
      content: (
        <div style={{ fontFamily: "Georgia, serif", color: "#111" }} className="p-8 border-4 border-double border-blue-900/30 bg-stone-50/30 rounded-lg">
          <div className="text-center border-b-2 border-stone-850 pb-4 mb-6">
            <p className="text-[10px] uppercase font-bold tracking-widest text-stone-500">Repubulika y'u Rwanda</p>
            <h2 className="text-[16px] font-black text-blue-950 uppercase tracking-wide mt-1">Ministry of Infrastructure</h2>
            <p className="text-[11px] font-semibold text-stone-600 mt-0.5">certified site survey office</p>
          </div>
          <div className="text-center my-6">
            <h3 className="text-[18px] font-black text-blue-900 tracking-tight uppercase">Onsite Valuation Verdict</h3>
            <p className="text-[11px] text-stone-400 font-sans mt-1">Inspector Report ID: REMA-VAL-2026-948</p>
          </div>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[12px] my-6">
            <div className="col-span-2">
              <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans font-bold">Project Title</p>
              <p className="font-bold text-stone-855 mt-0.5 text-[13px]">{project.title || "New Project Application Draft"}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Land UPI Reference</p>
              <p className="font-bold text-stone-850 mt-0.5">{project.landParcelRef || "N/A"}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Location Sector</p>
              <p className="font-bold text-stone-850 mt-0.5">{project.locationSector || project.locationProvince || "Kimihurura, Gasabo"}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Owner Submitted Valuation</p>
              <p className="font-bold text-stone-855 mt-0.5">{parseFloat(project.propertyValuation || "0").toLocaleString()} RWF</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">Owner Requested Funding</p>
              <p className="font-bold text-stone-855 mt-0.5">{parseFloat(project.fundingTarget || "0").toLocaleString()} RWF</p>
            </div>
            <div className="border-t border-dashed border-stone-200 col-span-2 pt-3">
              <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans font-bold text-stone-500">Recommended Valuation (Verdict)</p>
              <p className="font-black text-[16px] text-stone-900 mt-0.5">{parseFloat(recommendedVal).toLocaleString()} RWF</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans font-bold text-stone-500">Recommended Funding Cap (Verdict)</p>
              <p className="font-black text-[14px] text-blue-900 mt-0.5">{parseFloat(recommendedTarget).toLocaleString()} RWF</p>
            </div>
          </div>
          <div className="my-6 text-[11.5px] leading-relaxed text-stone-700 italic border-l-2 border-blue-900/20 pl-4 bg-stone-100/50 p-3.5 rounded-r-lg">
            <strong>Evaluator Finding Notes:</strong><br />
            "Completed physical survey of plot coordinates. Structural foundations are sound but observed boundary wall grading differences. Recommended asset valuation set at 90% of request."
          </div>
          <div className="flex justify-between items-center mt-12 pt-6 border-t border-stone-200">
            <div>
              <p className="text-[9px] uppercase text-stone-400 font-sans">Surveyor License</p>
              <p className="text-[11px] font-mono text-stone-600">RCA-VAL-EXP-884</p>
            </div>
            <div className="text-center relative">
              <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full border-4 border-dashed border-blue-900/25 flex items-center justify-center text-blue-900/25 font-black text-[9px] -rotate-12 select-none">
                CERTIFIED
              </div>
              <p className="text-[11px] font-bold text-stone-850 font-sans">Eng. Eric Gasana</p>
              <p className="text-[9px] text-stone-400 font-sans uppercase">Certified Lead Surveyor</p>
            </div>
          </div>
        </div>
      )
    };
  }
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!preview) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ fontFamily: "inherit" }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 flex flex-col w-full h-full max-w-4xl mx-auto my-6 rounded-2xl overflow-hidden shadow-2xl">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#3c3c3c] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-white/10">
              <FileText size={14} className="text-white/80" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-white leading-tight">{preview.title}</p>
              <p className="text-[9px] text-white/40 uppercase tracking-widest font-semibold mt-0.5">
                PDF Document · {docKey.toUpperCase()}_Accreditation.pdf
              </p>
            </div>
          </div>
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
          <div className="flex items-center gap-2">
            <button 
              onClick={() => alert(`Downloading ${preview.title}...`)}
              className="flex items-center gap-1.5 text-[11px] font-bold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
            >
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
        {/* Body */}
        <div className="flex-1 overflow-y-auto flex justify-center py-8 px-4" style={{ background: "#525659" }}>
          <div
            className="bg-white shadow-2xl origin-top transition-transform duration-200"
            style={{
              width: "210mm",
              minHeight: "297mm",
              padding: "20mm 18mm",
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
              boxShadow: "0 4px 40px rgba(0,0,0,0.5)",
            }}
          >
            {preview.content}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Types ────────────────────────────────────────────────────────────────────
interface DocumentState {
  state: "missing" | "uploading" | "pending" | "verified";
  progress: number;
  name?: string;
  size?: number;
  evaluatorComment?: string;
}

interface Milestone {
  name: string;
  amountRwf: string;
  status?: "pending" | "submitting" | "reviewing" | "released";
  reportSummary?: string;
  reportFile?: string;
}

interface ProjectApp {
  id: string;
  title: string;
  type: "raise_to_complete" | "new_project";
  progressState: "planning" | "foundation" | "structure" | "finishing" | "completed";
  description: string;
  
  // Location
  locationProvince: string;
  locationSector: string;
  landParcelRef: string;
  landSizeSqm: string;
  
  // Documents
  docs: {
    nla: DocumentState;
    house_plan: DocumentState;
    environmental: DocumentState;
    tax_reg: DocumentState;
  };

  // Review & Appeal states
  reviewStatus: "draft" | "under_review" | "reverted" | "under_appeal_review" | "approved";
  revertReason?: string;
  appealMessage?: string;
  appealSubmitted?: boolean;

  // Funding
  fundingTarget: string;
  expectedCompletionDate: string;
  propertyValuation: string;

  // Milestones
  milestones: Milestone[];
  currentStep: number;
  
  // Budget Allocation Document
  budgetFile?: {
    name: string;
    size: number;
    uploadedAt: string;
  };
  isFinalized?: boolean;

  // Onsite visit & evaluation properties
  siteVisitStatus?: "pending" | "scheduled" | "visited" | "appealed_funding" | "appealed_visit" | "approved";
  evaluatorPropertyValuation?: string;
  evaluatorFundingTarget?: string;
  siteVisitVerdictDetail?: string;
  siteVisitAppealType?: "funding" | "visit";
  siteVisitAppealText?: string;
}

// ── Default State Configurations ──────────────────────────────────────────────
const DEFAULT_PROJECTS: Record<string, ProjectApp> = {
  kigali_heights: {
    id: "kigali_heights",
    title: "Kigali Heights Residences",
    type: "raise_to_complete",
    progressState: "structure",
    description: "Commercial and high-density residential towers in the heart of Gasabo.",
    locationProvince: "Kigali City, Gasabo",
    locationSector: "Kimihurura, Rugando",
    landParcelRef: "1/02/08/04/4921",
    landSizeSqm: "3450",
    docs: {
      nla: { state: "verified", progress: 100, name: "NLA_Certificate_Gasabo_4921.pdf", size: 1024 * 1024 * 1.2 },
      house_plan: { 
        state: "verified", 
        progress: 100, 
        name: "House_Plan_Structural_Blueprints_v2.pdf", 
        size: 1024 * 1024 * 5.4,
        evaluatorComment: "The submitted House Plan is missing the digital seal of the Certified Structural Architect of Record on page 3."
      },
      environmental: { state: "verified", progress: 100, name: "REMA_Environmental_Permit_Rugando.pdf", size: 1024 * 1024 * 2.1 },
      tax_reg: { state: "verified", progress: 100, name: "RDB_Company_Incorp_Certificate.pdf", size: 1024 * 1024 * 0.8 },
    },
    reviewStatus: "reverted",
    revertReason: "The submitted House Plan is missing the digital seal of the Certified Structural Architect of Record on page 3. Please submit an appeal with proof of official certification, or re-upload a signed document sheet.",
    appealMessage: "",
    appealSubmitted: false,
    fundingTarget: "450000000",
    expectedCompletionDate: "2028-05-29",
    propertyValuation: "1200000000",
    milestones: [
      { name: "Milestone 1: Foundation Works", amountRwf: "150000000", status: "released", reportSummary: "Foundation concrete pouring completed and compression tested." },
      { name: "Milestone 2: Concrete Framing & Pillars", amountRwf: "200000000", status: "pending" },
      { name: "Milestone 3: Finishing & Interior Masonry", amountRwf: "100000000", status: "pending" },
    ],
    currentStep: 2, // Verification & Appeals (index 2)
    budgetFile: {
      name: "Kigali_Heights_Accreditation_Final_Budget_v2.xlsx",
      size: 1024 * 342,
      uploadedAt: "2026-05-29"
    },
    isFinalized: true,
    siteVisitStatus: "pending"
  },
  rugando_draft: {
    id: "rugando_draft",
    title: "",
    type: "new_project",
    progressState: "planning",
    description: "",
    locationProvince: "",
    locationSector: "",
    landParcelRef: "",
    landSizeSqm: "",
    docs: {
      nla: { state: "missing", progress: 0 },
      house_plan: { state: "missing", progress: 0 },
      environmental: { state: "missing", progress: 0 },
      tax_reg: { state: "missing", progress: 0 },
    },
    reviewStatus: "draft",
    appealMessage: "",
    appealSubmitted: false,
    fundingTarget: "",
    expectedCompletionDate: "",
    propertyValuation: "",
    milestones: [],
    currentStep: 0,
    isFinalized: false,
    siteVisitStatus: "pending"
  },
  nyarutarama_villas: {
    id: "nyarutarama_villas",
    title: "Nyarutarama Green Villas",
    type: "new_project",
    progressState: "foundation",
    description: "Eco-friendly luxury residential villas in the premium residential sector of Nyarutarama.",
    locationProvince: "Kigali City, Gasabo",
    locationSector: "Nyarutarama, Kamatamu",
    landParcelRef: "1/02/08/04/7712",
    landSizeSqm: "5200",
    docs: {
      nla: { state: "verified", progress: 100, name: "NLA_Lease_Nyarutarama_7712.pdf", size: 1024 * 1024 * 1.8 },
      house_plan: { state: "verified", progress: 100, name: "Villa_Eco_Blueprint_Certified.pdf", size: 1024 * 1024 * 8.2 },
      environmental: { state: "verified", progress: 100, name: "REMA_EIA_Clearance_Villas.pdf", size: 1024 * 1024 * 1.5 },
      tax_reg: { state: "verified", progress: 100, name: "RDB_Company_Incorp_Certificate.pdf", size: 1024 * 1024 * 0.8 },
    },
    reviewStatus: "approved",
    appealMessage: "",
    appealSubmitted: false,
    fundingTarget: "650000000",
    expectedCompletionDate: "2027-12-15",
    propertyValuation: "1500000000",
    milestones: [
      { name: "Milestone 1: Foundation Works", amountRwf: "200000000", status: "released", reportSummary: "Excavation and foundation concrete work approved by city engineers." },
      { name: "Milestone 2: Structure & Framing", amountRwf: "250000000", status: "pending" },
      { name: "Milestone 3: Exterior Finishing & Plumbing", amountRwf: "100000000", status: "pending" },
      { name: "Milestone 4: Interior Handover", amountRwf: "100000000", status: "pending" },
    ],
    currentStep: 5, // Milestones Definition (index 5)
    budgetFile: {
      name: "Nyarutarama_Villas_Development_Budget_Approved.xlsx",
      size: 1024 * 512,
      uploadedAt: "2026-05-28"
    },
    isFinalized: true,
    siteVisitStatus: "approved"
  }
};

// ── Stepper Definition ────────────────────────────────────────────────────────
const WIZARD_STEPS = [
  { index: 0, title: "Property Details", desc: "Title, type & progress", icon: <Building size={18} /> },
  { index: 1, title: "Compliance Documents", desc: "Upload NLA, plans & certificates", icon: <FileText size={18} /> },
  { index: 2, title: "Government Verification", desc: "Review, revert or appeal decisions", icon: <Shield size={18} /> },
  { index: 3, title: "Funding Setup", desc: "Set valuation & target amount", icon: <Landmark size={18} /> },
  { index: 4, title: "Evaluator Site Valuation", desc: "Site visit verdict & funding appeal", icon: <Eye size={18} /> },
  { index: 5, title: "Milestones Definition", desc: "Define tranches & build progress", icon: <ClipboardList size={18} /> }
];

// ── Main Component ───────────────────────────────────────────────────────────
const ProjectSubmission = ({ 
  onNavigate, 
  initialStep,
  mode = "existing"
}: { 
  onNavigate?: (view: string) => void; 
  initialStep?: number | null; 
  mode?: "new" | "existing";
}) => {
  const [projects, setProjects] = useState<Record<string, ProjectApp>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("estatex_acc_wizard_projects_v2");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return { ...DEFAULT_PROJECTS, ...parsed };
        } catch (e) {
          console.error(e);
        }
      }
    }
    return DEFAULT_PROJECTS;
  });

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(() => {
    return mode === "new" ? "rugando_draft" : null;
  });

  const activeProjectId = selectedProjectId || "kigali_heights";

  const [previewDocKey, setPreviewDocKey] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [activeUploadDocId, setActiveUploadDocId] = useState<keyof ProjectApp["docs"] | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentProject = projects[activeProjectId] || DEFAULT_PROJECTS[activeProjectId] || DEFAULT_PROJECTS["kigali_heights"];
  const currentStep = currentProject.currentStep;

  // Final Budget upload simulation states
  const [budgetUploading, setBudgetUploading] = useState(false);
  const [budgetUploadProgress, setBudgetUploadProgress] = useState(0);
  const budgetFileInputRef = useRef<HTMLInputElement>(null);

  const handleBudgetFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBudgetUploading(true);
    setBudgetUploadProgress(0);

    let prog = 0;
    const interval = setInterval(() => {
      prog += 20;
      setBudgetUploadProgress(prog);

      if (prog >= 100) {
        clearInterval(interval);
        setBudgetUploading(false);
        updateCurrentProject({
          budgetFile: {
            name: file.name,
            size: file.size,
            uploadedAt: new Date().toISOString().split("T")[0]
          }
        });
        showToastMsg(`Budget sheet "${file.name}" uploaded successfully!`);
      }
    }, 150);
  };

  useEffect(() => {
    setSelectedProjectId(mode === "new" ? "rugando_draft" : null);
  }, [mode]);

  // Persistence effect
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("estatex_acc_wizard_projects_v2", JSON.stringify(projects));
    }
  }, [projects]);

  // Set currentStep if initialStep is passed
  useEffect(() => {
    if (initialStep !== undefined && initialStep !== null) {
      setSelectedProjectId("kigali_heights");
      setProjects(prev => {
        const proj = prev["kigali_heights"];
        if (proj) {
          return {
            ...prev,
            ["kigali_heights"]: { ...proj, currentStep: initialStep }
          };
        }
        return prev;
      });
    }
  }, [initialStep]);

  // Toast helper
  const showToastMsg = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Stepper controls
  const updateCurrentProject = (updates: Partial<ProjectApp>) => {
    setProjects(prev => ({
      ...prev,
      [activeProjectId]: {
        ...prev[activeProjectId],
        ...updates
      }
    }));
  };

  const handleNext = () => {
    // If transitioning from Documents (Step 2) to Verification (Step 3) for the first time
    if (currentStep === 1 && currentProject.reviewStatus === "draft") {
      updateCurrentProject({ currentStep: 2, reviewStatus: "under_review" });
      
      // Simulate audit after delay
      setTimeout(() => {
        setProjects(prev => {
          const proj = prev[activeProjectId];
          if (proj && proj.reviewStatus === "under_review") {
            return {
              ...prev,
              [activeProjectId]: {
                ...proj,
                reviewStatus: "reverted",
                revertReason: "System Audit Reversion: NLA Land Registry document reference does not match the landowner name. Please check and appeal if you believe this is in error.",
                docs: {
                  ...proj.docs,
                  nla: {
                    ...proj.docs.nla,
                    evaluatorComment: "System Audit Reversion: NLA Land Registry document reference does not match the landowner name. Please check and appeal if you believe this is in error."
                  }
                }
              }
            };
          }
          return prev;
        });
      }, 3000);
      return;
    }

    updateCurrentProject({ currentStep: Math.min(WIZARD_STEPS.length - 1, currentStep + 1) });
  };

  const handleBack = () => {
    updateCurrentProject({ currentStep: Math.max(0, currentStep - 1) });
  };

  // Project switching
  const handleProjectSwitch = (id: string) => {
    setSelectedProjectId(id);
    const title = id === "kigali_heights" 
      ? "Kigali Heights Residences" 
      : id === "nyarutarama_villas" 
        ? "Nyarutarama Green Villas" 
        : "Rugando Commercial Complex";
    showToastMsg(`Switched to: ${title}`);
  };

  // Step 2 Document Upload Handling
  const triggerDocUpload = (docKey: keyof ProjectApp["docs"]) => {
    setActiveUploadDocId(docKey);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeUploadDocId) return;

    // Start simulation
    setProjects(prev => {
      const proj = { ...prev[activeProjectId] };
      proj.docs = {
        ...proj.docs,
        [activeUploadDocId]: {
          state: "uploading",
          progress: 0,
          name: file.name,
          size: file.size
        }
      };
      return { ...prev, [activeProjectId]: proj };
    });

    let prog = 0;
    const interval = setInterval(() => {
      prog += 20;
      setProjects(prev => {
        const proj = { ...prev[activeProjectId] };
        const doc = proj.docs[activeUploadDocId!];
        if (doc && doc.state === "uploading") {
          proj.docs = {
            ...proj.docs,
            [activeUploadDocId!]: { ...doc, progress: prog }
          };
        }
        return { ...prev, [activeProjectId]: proj };
      });

      if (prog >= 100) {
        clearInterval(interval);
        setProjects(prev => {
          const proj = { ...prev[activeProjectId] };
          const doc = proj.docs[activeUploadDocId!];
          proj.docs = {
            ...proj.docs,
            [activeUploadDocId!]: {
              state: "pending", // In Review / Uploaded
              progress: 100,
              name: doc.name,
              size: doc.size
            }
          };
          
          // Check if all 4 docs are uploaded to auto-submit for review
          const allUploaded = Object.values(proj.docs).every(d => d.state === "pending" || d.state === "verified");
          if (allUploaded && proj.reviewStatus === "draft") {
            proj.reviewStatus = "under_review";
          }

          return { ...prev, [activeProjectId]: proj };
        });
        showToastMsg(`Uploaded "${file.name}" successfully!`);
      }
    }, 150);
  };

  // Step 3 Appeals Sim
  const [appealType, setAppealType] = useState("document_rejection");
  const [appealText, setAppealText] = useState("");
  const [appealFile, setAppealFile] = useState<File | null>(null);
  const [appealLoading, setAppealLoading] = useState(false);
  const appealInputRef = useRef<HTMLInputElement>(null);

  const handleAppealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appealText.trim()) return;

    setAppealLoading(true);
    setTimeout(() => {
      setAppealLoading(false);
      setProjects(prev => {
        const proj = prev[activeProjectId];
        return {
          ...prev,
          [activeProjectId]: {
            ...proj,
            reviewStatus: "approved",
            appealSubmitted: true,
            appealMessage: appealText
          }
        };
      });
      showToastMsg("Appeal Approved by Land Registrar!");
    }, 2000);
  };

  // Step 5 Evaluator Site Valuation Simulator
  const [siteVisitSimulating, setSiteVisitSimulating] = useState(false);
  const [siteVisitSimProgress, setSiteVisitSimProgress] = useState(0);
  const [showSiteAppealForm, setShowSiteAppealForm] = useState(false);
  const [siteAppealType, setSiteAppealType] = useState<"funding" | "visit">("funding");
  const [siteAppealText, setSiteAppealText] = useState("");
  const [siteAppealLoading, setSiteAppealLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleSimulateSiteVisit = () => {
    setSiteVisitSimulating(true);
    setSiteVisitSimProgress(0);
    let prog = 0;
    const interval = setInterval(() => {
      prog += 25;
      setSiteVisitSimProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setSiteVisitSimulating(false);
        
        const originalVal = parseFloat(currentProject.propertyValuation) || 1000000000;
        const recommendedVal = Math.round(originalVal * 0.9);
        const approvedCap = Math.round(recommendedVal * 0.8);
        
        updateCurrentProject({
          siteVisitStatus: "visited",
          evaluatorPropertyValuation: recommendedVal.toString(),
          evaluatorFundingTarget: approvedCap.toString(),
          siteVisitVerdictDetail: "Completed physical survey of plot coordinates. Structural foundations are sound but observed boundary wall grading differences. Recommended asset valuation set at 90% of request."
        });
        showToastMsg("Physical site inspection complete. Evaluator valuation verdict issued!");
      }
    }, 400);
  };

  const handleAcceptVerdict = () => {
    const recommendedVal = currentProject.evaluatorPropertyValuation || "900000000";
    const recommendedTarget = currentProject.evaluatorFundingTarget || "720000000";
    updateCurrentProject({
      propertyValuation: recommendedVal,
      fundingTarget: recommendedTarget,
      siteVisitStatus: "approved",
      currentStep: 5
    });
    showToastMsg("Valuation verdict accepted. Milestones builder unlocked!");
  };

  const handleSiteAppealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteAppealText.trim()) return;

    setSiteAppealLoading(true);
    setTimeout(() => {
      setSiteAppealLoading(false);
      
      const originalVal = parseFloat(currentProject.propertyValuation) || 1000000000;
      const originalTarget = parseFloat(currentProject.fundingTarget) || 800000000;
      
      if (siteAppealType === "funding") {
        updateCurrentProject({
          fundingTarget: originalTarget.toString(),
          siteVisitStatus: "approved",
          siteVisitAppealType: "funding",
          siteVisitAppealText: siteAppealText,
          currentStep: 5
        });
        showToastMsg("Funding appeal approved by Chief Land Registrar! Original funding target restored.");
      } else {
        const compromiseVal = Math.round(originalVal * 0.95);
        const compromiseTarget = Math.round(compromiseVal * 0.8);
        updateCurrentProject({
          propertyValuation: compromiseVal.toString(),
          fundingTarget: compromiseTarget.toString(),
          siteVisitStatus: "approved",
          siteVisitAppealType: "visit",
          siteVisitAppealText: siteAppealText,
          currentStep: 5
        });
        showToastMsg("Secondary inspection appeal approved! Compromise valuation updated.");
      }
      setSiteAppealText("");
      setShowSiteAppealForm(false);
    }, 2000);
  };

  // Step 6 Milestones
  const [newMilestoneName, setNewMilestoneName] = useState("");
  const [newMilestoneAmount, setNewMilestoneAmount] = useState("");

  const addMilestone = () => {
    if (!newMilestoneName.trim() || !newMilestoneAmount) return;
    const currentList = currentProject.milestones || [];
    updateCurrentProject({
      milestones: [...currentList, { name: newMilestoneName, amountRwf: newMilestoneAmount }]
    });
    setNewMilestoneName("");
    setNewMilestoneAmount("");
    showToastMsg("Milestone tranche added.");
  };

  const removeMilestone = (index: number) => {
    const currentList = currentProject.milestones || [];
    updateCurrentProject({
      milestones: currentList.filter((_, i) => i !== index)
    });
  };

  const fundingTargetNum = parseFloat(currentProject.fundingTarget) || 0;
  const milestonesSum = (currentProject.milestones || []).reduce((s, m) => s + (parseFloat(m.amountRwf) || 0), 0);
  const isMilestonesBalanced = milestonesSum === fundingTargetNum && fundingTargetNum > 0;
  const milestonesPercent = fundingTargetNum > 0 ? (milestonesSum / fundingTargetNum) * 100 : 0;
  const releasedFundsSum = (currentProject.milestones || []).reduce((s, m) => {
    return m.status === "released" ? s + (parseFloat(m.amountRwf) || 0) : s;
  }, 0);
  const escrowLockedSum = fundingTargetNum - releasedFundsSum;

  // Final Step 5 Submission
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const handleFinalSubmit = () => {
    updateCurrentProject({ isFinalized: true });
    setSubmissionComplete(true);
    showToastMsg("Project submission complete!");
  };

  const resetWizard = () => {
    setProjects(DEFAULT_PROJECTS);
    setSelectedProjectId(mode === "new" ? "rugando_draft" : null);
    setSubmissionComplete(false);
    showToastMsg("Wizard reset to default demonstration state.");
  };

  // Validation checkers for active navigation buttons
  const isStep1Valid = currentProject.title && currentProject.description && currentProject.locationProvince && currentProject.landParcelRef;
  const isStep2Valid = Object.values(currentProject.docs).every(d => d.state === "pending" || d.state === "verified");
  const isStep3Valid = currentProject.reviewStatus === "approved";
  const isStep4Valid = parseFloat(currentProject.fundingTarget) > 0 && parseFloat(currentProject.propertyValuation) >= parseFloat(currentProject.fundingTarget);

  const canContinue = () => {
    if (currentStep === 0) return isStep1Valid;
    if (currentStep === 1) return isStep2Valid;
    if (currentStep === 2) return isStep3Valid;
    if (currentStep === 3) return isStep4Valid;
    if (currentStep === 4) return currentProject.siteVisitStatus === "approved";
    return false;
  };

  const isStepUnlocked = (idx: number) => {
    if (idx === 0) return true;
    if (idx === 1) return !!isStep1Valid;
    if (idx === 2) {
      const docsUploaded = Object.values(currentProject.docs).every(d => d.state !== "missing");
      return !!isStep1Valid && docsUploaded;
    }
    if (idx === 3) return currentProject.reviewStatus === "approved";
    if (idx === 4) return currentProject.reviewStatus === "approved" && !!isStep4Valid;
    if (idx === 5) return currentProject.reviewStatus === "approved" && !!isStep4Valid && currentProject.siteVisitStatus === "approved";
    return false;
  };

  const isProjectEditable = (proj: ProjectApp) => {
    if (proj.isFinalized === true) return false;
    if (proj.reviewStatus === "draft") return true;
    return false;
  };

  const isFundingSetupEditable = (proj: ProjectApp) => {
    if (proj.isFinalized === true) return false;
    if (proj.reviewStatus !== "approved") return false;
    if (proj.siteVisitStatus === "approved") return false;
    return true;
  };

  if (mode === "existing" && selectedProjectId === null) {
    return (
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-[#F8FAFC]">
        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 right-6 bg-[#1E3A5F] text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 z-50 border border-white/10 text-[12px] font-bold animate-fade-in">
            <CheckCircle size={15} className="text-emerald-400" />
            {toast}
          </div>
        )}

        {/* Heading Panel */}
        <div className="w-full max-w-5xl mx-auto mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-black text-[#1E3A5F] tracking-tight">My Applications</h2>
              <p className="text-[12px] text-stone-400 mt-1 font-medium">Track your real estate accreditations, appeal zoning decisions, and manage escrow releases.</p>
            </div>
            <button
              onClick={() => {
                onNavigate?.("submit");
              }}
              className="px-5 py-2.5 bg-[#1E3A5F] text-white hover:brightness-110 font-bold text-[11px] rounded-xl transition-all shadow-md shadow-[#1E3A5F]/10 flex items-center gap-1.5 shrink-0 uppercase tracking-wider cursor-pointer"
            >
              <Plus size={14} /> Submit New Project
            </button>
          </div>
        </div>

        {/* Grid Panel */}
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {Object.values(projects).map(proj => {
            const displayTitle = proj.title || "New Project Application Draft";
            const displayDesc = proj.description || "Incomplete draft. Click Track Project to continue entering details.";
            const displayLocation = proj.locationProvince ? proj.locationProvince : "Kimihurura, Kigali";
            
            const valuationText = proj.propertyValuation ? `${parseFloat(proj.propertyValuation).toLocaleString()} RWF` : "-- RWF";
            const targetText = proj.fundingTarget ? `${parseFloat(proj.fundingTarget).toLocaleString()} RWF` : "-- RWF";
            
            let badgeBg = "bg-stone-50 text-stone-500 border-stone-200";
            let badgeText = "Draft";
            if (proj.reviewStatus === "under_review") {
              badgeBg = "bg-blue-50 text-blue-600 border-blue-100";
              badgeText = "Under Review";
            } else if (proj.reviewStatus === "reverted") {
              badgeBg = "bg-red-50 text-red-650 border-red-150";
              badgeText = "Reverted / Action Needed";
            } else if (proj.reviewStatus === "approved") {
              badgeBg = "bg-emerald-50 text-emerald-600 border-emerald-100";
              badgeText = "Approved & Active";
            }
            
            const progressPercent = Math.round((proj.currentStep / 5) * 100);

            return (
              <div key={proj.id} className="bg-white border border-stone-200/80 rounded-[24px] shadow-sm hover:shadow-md hover:border-[#1E3A5F]/20 transition-all p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${badgeBg}`}>
                      {badgeText}
                    </span>
                    <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">
                      Step {proj.currentStep + 1} of 6
                    </span>
                  </div>

                  <h3 className="text-[14px] font-black text-stone-900 tracking-tight leading-snug">
                    {displayTitle}
                  </h3>
                  <p className="text-[11px] text-stone-400 mt-2 leading-relaxed line-clamp-3">
                    {displayDesc}
                  </p>

                  <div className="flex items-center gap-1.5 mt-4 text-[10px] text-stone-500 font-semibold">
                    <MapPin size={12} className="text-stone-400 shrink-0" />
                    <span className="truncate">{displayLocation}</span>
                  </div>

                  <div className="h-px bg-stone-100 my-4" />

                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest font-black text-stone-400">Valuation</p>
                      <p className="text-[11.5px] font-bold text-stone-700 mt-0.5">{valuationText}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest font-black text-stone-400">Target Capital</p>
                      <p className="text-[11.5px] font-bold text-[#1E3A5F] mt-0.5">{targetText}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="flex justify-between items-center text-[9px] font-black text-stone-400 uppercase mb-1">
                      <span>Wizard Progress</span>
                      <span>{progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#1E3A5F] h-full rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedProjectId(proj.id);
                  }}
                  className="mt-6 w-full h-10 bg-white border border-[#1E3A5F]/20 hover:border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F]/5 active:scale-[0.99] font-black text-[10px] rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                >
                  Track Project / Escrow
                </button>
              </div>
            );
          })}

          {/* Dotted Card for new application shortcut */}
          <div className="bg-stone-50/50 border-2 border-dashed border-stone-200/80 rounded-[24px] p-6 flex flex-col items-center justify-center text-center hover:border-[#1E3A5F]/30 hover:bg-stone-50 transition-all min-h-[300px]">
            <div className="w-12 h-12 rounded-full bg-[#1E3A5F]/5 text-[#1E3A5F] flex items-center justify-center border border-[#1E3A5F]/10 mb-4 shadow-inner">
              <Building size={20} />
            </div>
            <h4 className="text-[13px] font-black text-stone-850">New Project Accreditation</h4>
            <p className="text-[11px] text-stone-400 mt-1 max-w-[200px] leading-normal">
              Register a new asset layout and compliance certificates.
            </p>
            <button
              onClick={() => onNavigate?.("submit")}
              className="mt-5 px-4 h-9 bg-white border border-stone-200 hover:border-stone-400 text-stone-700 font-bold text-[10px] rounded-lg shadow-sm transition-all uppercase tracking-wider cursor-pointer"
            >
              Start New Submission
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-[#F8FAFC]">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#1E3A5F] text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 z-50 border border-white/10 text-[12px] font-bold animate-fade-in">
          <CheckCircle size={15} className="text-emerald-400" />
          {toast}
        </div>
      )}

      {/* PDF View Modal */}
      {previewDocKey && (
        <FilePreviewModal docKey={previewDocKey} onClose={() => setPreviewDocKey(null)} project={currentProject} />
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-stone-200 rounded-[28px] p-6 max-w-sm w-full shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-655 border border-red-100 flex items-center justify-center mx-auto shadow-inner">
              <AlertCircle size={20} className="text-red-500" />
            </div>
            <div>
              <h4 className="text-[15px] font-black text-stone-900 tracking-tight">Discard Application?</h4>
              <p className="text-[11.5px] text-stone-400 mt-1 leading-normal">
                Are you sure you want to cancel and permanently delete this application? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-[11px] rounded-xl transition-all"
              >
                No, Keep Draft
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCancelModal(false);
                  setProjects(prev => {
                    const updated = { ...prev };
                    delete updated[activeProjectId];
                    return updated;
                  });
                  setSelectedProjectId(null);
                  if (mode === "new") {
                    onNavigate?.("gov-checks");
                  }
                  showToastMsg("Application successfully deleted and discarded.");
                }}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-750 text-white font-bold text-[11px] rounded-xl transition-all shadow-md shadow-red-600/10 cursor-pointer"
              >
                Yes, Discard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File inputs for step 2 & appeal uploads */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".pdf,.png,.jpg,.jpeg" 
      />
      <input 
        type="file" 
        ref={appealInputRef} 
        onChange={(e) => setAppealFile(e.target.files?.[0] || null)} 
        className="hidden" 
        accept=".pdf,.png,.jpg,.jpeg" 
      />

      {/* Connection Stepper Sidebar */}
      <div className="w-full md:w-[290px] bg-white border-r border-stone-200/80 p-6 flex flex-col shrink-0">
        <button 
          onClick={() => {
            if (mode === "existing") {
              setSelectedProjectId(null);
            } else {
              onNavigate?.("dashboard");
            }
          }} 
          type="button"
          className="flex items-center gap-1.5 text-[11px] font-bold text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-wider mb-8 self-start cursor-pointer"
        >
          <ArrowLeft size={13} /> {mode === "existing" ? "Back to Applications" : "Quit to Dashboard"}
        </button>

        {/* Node connectors list */}
        <div className="flex-1 flex flex-col relative space-y-6">
          {WIZARD_STEPS.map((s, idx) => {
            const isActive = currentStep === idx;
            const isCompleted = currentStep > idx;
            const unlocked = isStepUnlocked(idx);

            return (
              <div 
                key={idx} 
                onClick={() => {
                  if (unlocked) {
                    updateCurrentProject({ currentStep: idx });
                  } else {
                    showToastMsg(`Step "${s.title}" is locked until previous stages are completed/approved.`);
                  }
                }}
                className={`flex items-start gap-4 relative group ${unlocked ? "cursor-pointer" : "cursor-not-allowed"}`}
              >
                {idx < WIZARD_STEPS.length - 1 && (
                  <div className={`absolute left-[13px] top-[28px] bottom-[-24px] w-[2px] transition-colors ${
                    currentStep > idx ? "bg-[#1E3A5F]" : "bg-stone-100"
                  }`} />
                )}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center border text-[9px] shrink-0 z-10 transition-all ${
                  isActive 
                    ? "bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-sm shadow-[#1E3A5F]/20 font-black" 
                    : isCompleted 
                      ? "bg-emerald-50 text-emerald-600 border-emerald-200 font-bold" 
                      : !unlocked
                        ? "bg-stone-50 text-stone-300 border-stone-150"
                        : "bg-white text-stone-600 border-stone-200 hover:border-[#1E3A5F] hover:text-[#1E3A5F]"
                }`}>
                  {!unlocked ? <Lock size={10} className="text-stone-400" /> : isCompleted ? "✓" : idx + 1}
                </div>
                <div className="min-w-0">
                  <p className={`text-[12px] font-bold leading-tight ${
                    isActive 
                      ? "text-[#1E3A5F]" 
                      : isCompleted 
                        ? "text-stone-850 font-bold" 
                        : !unlocked
                          ? "text-stone-350 font-normal"
                          : "text-stone-650 group-hover:text-[#1E3A5F] transition-colors font-semibold"
                  }`}>{s.title}</p>
                  <p className={`text-[10px] mt-0.5 leading-normal ${
                    !unlocked ? "text-stone-200" : "text-stone-400"
                  }`}>{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info/controls inside sidebar */}
        <div className="pt-6 border-t border-stone-100 mt-auto">
          <p className="text-[9px] uppercase tracking-widest font-black text-stone-400 mb-1">State Sync Status</p>
          <p className="text-[10px] text-stone-500 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Saved to LocalStorage
          </p>
        </div>
      </div>

      {/* Main Wizard Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 flex flex-col justify-start">

        {submissionComplete ? (
          /* Success Screen */
          <div className="w-full max-w-xl mx-auto bg-white border border-stone-200/80 rounded-[32px] shadow-sm p-8 text-center animate-fade-in my-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-inner border border-emerald-100">
              <Check size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-black text-stone-900 tracking-tight">Submission Completed!</h3>
            <p className="text-[13px] text-stone-500 mt-2 leading-relaxed">
              Your property application for <strong>{currentProject.title || "New Project"}</strong> has been successfully submitted to the RDB Escrow monitors. 
            </p>
            <div className="my-6 p-4 bg-stone-50 border border-stone-100 rounded-2xl text-left space-y-2">
              <div className="flex justify-between text-[11px] font-semibold text-stone-500">
                <span>PROJECT TIN</span>
                <span className="font-mono text-stone-800">109284910</span>
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-stone-500">
                <span>VALUATION</span>
                <span className="font-bold text-stone-800">{parseFloat(currentProject.propertyValuation || "0").toLocaleString()} RWF</span>
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-stone-500">
                <span>FUNDING TARGET</span>
                <span className="font-bold text-stone-800 text-[#1E3A5F]">{parseFloat(currentProject.fundingTarget || "0").toLocaleString()} RWF</span>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setSubmissionComplete(false);
                  onNavigate?.("dashboard");
                }}
                className="w-full py-3 bg-[#1E3A5F] hover:bg-[#1E3A5F]/90 text-white font-bold text-[12px] rounded-xl transition-all shadow-sm shadow-[#1E3A5F]/20 cursor-pointer"
              >
                Go to Dashboard
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubmissionComplete(false);
                  onNavigate?.("gov-checks");
                }}
                className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-[12px] rounded-xl transition-all cursor-pointer"
              >
                Track Status & Appeals
              </button>
            </div>
          </div>
        ) : (
          /* Normal Stepper and Status Banners */
          <div className="w-full max-w-3xl mx-auto space-y-6">
            {/* Status Banners / Evaluator Feedback Comments */}
            {mode === "existing" && currentProject.reviewStatus === "reverted" && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm animate-fade-in">
                <AlertCircle size={22} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[13px] font-black text-red-900 leading-tight">Action Required — Reverted by Zoning Office</h4>
                  <p className="text-[11.5px] text-red-700 mt-1.5 leading-relaxed font-semibold">
                    The zoning evaluator has requested compliance changes. Input fields and file re-uploads are now unlocked so you can update and re-submit your details.
                  </p>
                  {currentProject.revertReason && (
                    <div className="text-[11px] text-stone-700 mt-3.5 bg-white border border-stone-150 p-4 rounded-xl shadow-inner">
                      <span className="font-black text-stone-850 uppercase text-[9px] tracking-wider block mb-1">Evaluator Feedback Comment:</span>
                      <p className="italic font-medium">"{currentProject.revertReason}"</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {mode === "existing" && currentProject.reviewStatus === "under_review" && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm animate-pulse animate-fade-in">
                <Clock size={22} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[13px] font-black text-blue-900 leading-tight">Application Under Review</h4>
                  <p className="text-[11.5px] text-blue-700 mt-1.5 leading-relaxed font-medium">
                    This project is currently locked for review by RDB notaries. Form inputs are in read-only mode, and document upload actions are locked.
                  </p>
                </div>
              </div>
            )}

            {mode === "existing" && currentProject.reviewStatus === "under_appeal_review" && (
              <div className="bg-amber-50 border border-amber-250 rounded-2xl p-5 flex items-start gap-4 shadow-sm animate-fade-in">
                <Loader2 size={22} className="text-amber-600 shrink-0 mt-0.5 animate-spin" />
                <div>
                  <h4 className="text-[13px] font-black text-amber-900 leading-tight">Dispute Appeal Under Review</h4>
                  <p className="text-[11.5px] text-amber-700 mt-1.5 leading-relaxed font-medium">
                    Your formal dispute appeal is currently being audited by the land notary. All submission fields are locked.
                  </p>
                </div>
              </div>
            )}

            {mode === "existing" && currentProject.reviewStatus === "approved" && (
              <div className="bg-emerald-50 border border-emerald-250 rounded-2xl p-5 flex items-start gap-4 shadow-sm animate-fade-in">
                <CheckCircle size={22} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[13px] font-black text-emerald-900 leading-tight">Accreditation Approved & Verified</h4>
                  <p className="text-[11.5px] text-emerald-705 mt-1.5 leading-relaxed font-medium">
                    All compliance certificates have been approved by the authorities. You can view your details or manage milestone releases in Step 5.
                  </p>
                </div>
              </div>
            )}

            {/* Active Wizard Card */}
            <div className="w-full bg-white border border-stone-200/80 rounded-[32px] shadow-sm p-6 md:p-8 relative">
            
            {/* Breadcrumb / Project Title Header */}
            <div className="mb-6 pb-4 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Applications</span>
                <span className="text-stone-300 text-[12px]">/</span>
                <span className="text-[11px] font-black text-[#1E3A5F] uppercase tracking-wider bg-[#1E3A5F]/5 px-2.5 py-1 rounded-lg">
                  {currentProject.title || "New Project Application Draft"}
                </span>
              </div>
              {/* Status Badge */}
              <div>
                {currentProject.reviewStatus === "draft" && (
                  <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-100 text-stone-500 border border-stone-200">
                    Draft
                  </span>
                )}
                {currentProject.reviewStatus === "under_review" && (
                  <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 animate-pulse">
                    Under Review
                  </span>
                )}
                {currentProject.reviewStatus === "reverted" && (
                  <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-50 text-red-650 border border-red-100">
                    Reverted
                  </span>
                )}
                {currentProject.reviewStatus === "under_appeal_review" && (
                  <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-655 border border-amber-100 animate-pulse">
                    Appeal Review
                  </span>
                )}
                {currentProject.reviewStatus === "approved" && (
                  <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-650 border border-emerald-100">
                    Approved
                  </span>
                )}
              </div>
            </div>

            {/* Top Stage Icon */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#1E3A5F]/5 border border-[#1E3A5F]/10 text-[#1E3A5F] flex items-center justify-center shadow-inner">
                {WIZARD_STEPS[currentStep].icon}
              </div>
              <h3 className="text-[17px] font-black text-stone-900 tracking-tight mt-3">{WIZARD_STEPS[currentStep].title}</h3>
              <p className="text-[11px] text-stone-400 font-medium text-center mt-0.5">{WIZARD_STEPS[currentStep].desc}</p>
            </div>

            {/* Stepper Content Body */}
            <div className="space-y-5 mb-8">
              
              {/* STEP 1: Property Details */}
              {currentStep === 0 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Project Title</span>
                      <input 
                        value={currentProject.title}
                        onChange={e => updateCurrentProject({ title: e.target.value })}
                        disabled={!isProjectEditable(currentProject)}
                        className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium outline-none focus:border-[#1E3A5F] focus:bg-white transition-all shadow-sm disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-not-allowed"
                        placeholder="e.g. Rugando Commercial Complex" 
                      />
                    </label>
 
                    <label className="block">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Project Type</span>
                      <select 
                        value={currentProject.type}
                        onChange={e => updateCurrentProject({ type: e.target.value as any })}
                        disabled={!isProjectEditable(currentProject)}
                        className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium outline-none focus:border-[#1E3A5F] focus:bg-white transition-all shadow-sm cursor-pointer disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-not-allowed"
                      >
                        <option value="raise_to_complete">Raise funds to complete — sell units to fund construction</option>
                        <option value="new_project">New development — gather investors from scratch</option>
                      </select>
                    </label>
                  </div>
 
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Construction Progress</span>
                      <select 
                        value={currentProject.progressState}
                        onChange={e => updateCurrentProject({ progressState: e.target.value as any })}
                        disabled={!isProjectEditable(currentProject)}
                        className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium outline-none focus:border-[#1E3A5F] focus:bg-white transition-all shadow-sm cursor-pointer disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-not-allowed"
                      >
                        <option value="planning">Planning stage</option>
                        <option value="foundation">Foundation complete</option>
                        <option value="structure">Structure complete</option>
                        <option value="finishing">Finishing works</option>
                        <option value="completed">Fully completed</option>
                      </select>
                    </label>
 
                    <label className="block">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Land Parcel Reference (UPI)</span>
                      <input 
                        value={currentProject.landParcelRef}
                        onChange={e => updateCurrentProject({ landParcelRef: e.target.value })}
                        disabled={!isProjectEditable(currentProject)}
                        className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium outline-none focus:border-[#1E3A5F] focus:bg-white transition-all shadow-sm disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-not-allowed"
                        placeholder="UPI, e.g., 1/02/08/04/4921" 
                      />
                    </label>
                  </div>
 
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="block md:col-span-2">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Province, District, Sector & Cell</span>
                      <input 
                        value={currentProject.locationProvince}
                        onChange={e => updateCurrentProject({ locationProvince: e.target.value })}
                        disabled={!isProjectEditable(currentProject)}
                        className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium outline-none focus:border-[#1E3A5F] focus:bg-white transition-all shadow-sm disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-not-allowed"
                        placeholder="e.g. Kigali City, Gasabo, Kimihurura, Rugando" 
                      />
                    </label>
 
                    <label className="block">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Land size (m²)</span>
                      <input 
                        type="number"
                        value={currentProject.landSizeSqm}
                        onChange={e => updateCurrentProject({ landSizeSqm: e.target.value })}
                        disabled={!isProjectEditable(currentProject)}
                        className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium outline-none focus:border-[#1E3A5F] focus:bg-white transition-all shadow-sm disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-not-allowed"
                        placeholder="e.g. 3450" 
                      />
                    </label>
                  </div>
 
                  <label className="block">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Project Description</span>
                    <textarea 
                      value={currentProject.description}
                      onChange={e => updateCurrentProject({ description: e.target.value })}
                      disabled={!isProjectEditable(currentProject)}
                      rows={3} 
                      className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium outline-none focus:border-[#1E3A5F] focus:bg-white transition-all shadow-sm resize-none disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-not-allowed"
                      placeholder="Detail the scope of works, commercial viability, architectural structure, and expected timeline..." 
                    />
                  </label>
                </div>
              )}

              {/* STEP 2: Compliance Documents */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <p className="text-[11px] text-stone-400 mb-3 bg-stone-50 border border-stone-150 rounded-xl p-3">
                    Submit compliance details. To inspect your documents, click the **Preview** button.
                  </p>
                  
                  <div className="border border-stone-200/80 rounded-2xl bg-white shadow-sm overflow-hidden divide-y divide-stone-100">
                    {[
                      { key: "nla", label: "National Land Authority (NLA) Document", desc: "Verifies land parcel lease deeds" },
                      { key: "house_plan", label: "Architectural House Plan Blueprint", desc: "Zoning schematics and floor details" },
                      { key: "environmental", label: "REMA Environmental Impact Clearance", desc: "Audit approval certificate" },
                      { key: "tax_reg", label: "Company RDB Incorp & Tax ID Certificate", desc: "Corporate registration registry" }
                    ].map((docItem) => {
                      const docVal = currentProject.docs[docItem.key as keyof ProjectApp["docs"]];
                      return (
                        <div key={docItem.key} className="px-5 py-4 flex flex-col gap-2 hover:bg-stone-50/40 transition-colors">
                          {/* Row 1: Details & Actions */}
                          <div className="flex items-center justify-between gap-4 flex-wrap w-full">
                            <div className="flex items-center gap-3.5 min-w-0">
                              <div className="p-2 rounded-xl bg-[#1E3A5F]/5 text-[#1E3A5F] shrink-0">
                                <FileText size={16} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[12.5px] font-bold text-stone-800">{docItem.label}</p>
                                <p className="text-[10px] text-stone-400 mt-0.5 truncate">{docVal.name || docItem.desc}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              {docVal.state === "missing" && (
                                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-50 text-red-500 border border-red-100">
                                  Missing
                                </span>
                              )}
                              {docVal.state === "uploading" && (
                                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100 flex items-center gap-1">
                                  <Loader2 size={9} className="animate-spin text-blue-500" />
                                  {docVal.progress}%
                                </span>
                              )}
                              {docVal.state === "pending" && (
                                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1">
                                  <Clock size={10} className="text-amber-500" /> Uploaded
                                </span>
                              )}
                              {docVal.state === "verified" && (
                                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1">
                                  <Check size={10} className="text-emerald-600" /> Verified
                                </span>
                              )}

                              {/* Actions */}
                              {docVal.state === "missing" ? (
                                isProjectEditable(currentProject) ? (
                                  <button
                                    onClick={() => triggerDocUpload(docItem.key as keyof ProjectApp["docs"])}
                                    className="flex items-center gap-1 text-[11px] font-bold text-[#1E3A5F] hover:underline"
                                  >
                                    <Upload size={12} /> Upload
                                  </button>
                                ) : (
                                  <span className="text-[10px] text-stone-400 font-semibold italic">Locked</span>
                                )
                              ) : (docVal.state === "pending" || docVal.state === "verified") ? (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setPreviewDocKey(docItem.key)}
                                    className="flex items-center gap-1 text-[11px] font-bold text-stone-500 hover:text-stone-800 transition-colors"
                                  >
                                    <Eye size={12} /> Preview
                                  </button>
                                  {isProjectEditable(currentProject) && (
                                    <button
                                      onClick={() => triggerDocUpload(docItem.key as keyof ProjectApp["docs"])}
                                      className="text-stone-300 hover:text-stone-500"
                                    >
                                      Re-upload
                                    </button>
                                  )}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          {/* Row 2: Evaluator Feedback comments */}
                          {mode === "existing" && docVal.evaluatorComment && currentProject.reviewStatus === "reverted" && (
                            <div className="mt-2 text-[10.5px] font-semibold text-red-750 bg-red-50/40 border border-red-100 p-2.5 rounded-xl flex items-start gap-1.5 w-full animate-fade-in">
                              <AlertCircle size={13} className="text-red-500 shrink-0 mt-0.5" />
                              <span><strong>Evaluator Review Feedback:</strong> "{docVal.evaluatorComment}"</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: Verification & Appeals */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-fade-in">
                  {currentProject.reviewStatus === "under_review" && (
                    <div className="text-center py-10 bg-stone-50 rounded-2xl border border-stone-200 border-dashed space-y-4">
                      <Loader2 size={32} className="animate-spin text-[#1E3A5F] mx-auto" />
                      <div>
                        <h4 className="text-[14px] font-black text-stone-800">Review In Progress</h4>
                        <p className="text-[11px] text-stone-400 mt-1 max-w-sm mx-auto">
                          Our notaries are auditing coordinates and checking land UPI against the national database.
                        </p>
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            // Let the user simulate the decision
                            updateCurrentProject({ 
                              reviewStatus: "reverted", 
                              revertReason: "System Audit Reversion: NLA Land Registry document reference does not match the landowner name. Please check and appeal if you believe this is in error."
                            });
                          }}
                          className="px-4 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold text-[10px] rounded-lg transition-all"
                        >
                          Simulate Audit Reversion
                        </button>
                      </div>
                    </div>
                  )}

                  {currentProject.reviewStatus === "reverted" && (
                    <div className="space-y-4">
                      {/* Revert Banner Alert */}
                      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-4">
                        <AlertCircle size={22} className="text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-[14px] font-black text-red-900 leading-tight">Compliance Issue Detected</h4>
                          <p className="text-[12px] text-red-700 mt-1.5 leading-relaxed font-semibold">
                            {currentProject.revertReason}
                          </p>
                        </div>
                      </div>

                      {/* Secondary Choice: Go back to compliance document submission */}
                      <div className="border border-stone-200 rounded-2xl p-5 bg-stone-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in">
                        <div className="space-y-1">
                          <h4 className="text-[13.5px] font-black text-stone-850">Correct Document Errors Directly</h4>
                          <p className="text-[10.5px] text-stone-400 leading-normal max-w-md">
                            If the zoning feedback indicates a document registry mismatch or incomplete files, you can choose to reset and re-upload documents on Step 2.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            // Reset reviewStatus to draft, and go to Step 2 (Documents)
                            setProjects(prev => {
                              const proj = { ...prev[activeProjectId] };
                              proj.reviewStatus = "draft";
                              proj.currentStep = 1; // Step 2 (Documents) is index 1
                              return { ...prev, [activeProjectId]: proj };
                            });
                            showToastMsg("Returned to Compliance Documents. Upload controls are unlocked.");
                          }}
                          className="px-4 py-2 bg-white border border-[#1E3A5F]/20 hover:border-[#1E3A5F] hover:bg-[#1E3A5F]/5 text-[#1E3A5F] font-black text-[10.5px] rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-sm"
                        >
                          Resubmit Documents
                        </button>
                      </div>

                      {/* Appeal Subform wrapper */}
                      <div className="border border-stone-200 rounded-2xl p-5 bg-white shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                          <div>
                            <h4 className="text-[13px] font-black text-stone-900">File a Formal Appeal</h4>
                            <p className="text-[10px] text-stone-400">Submit structural certification disputes inline.</p>
                          </div>
                          <span className="text-[9px] font-black bg-stone-150 text-stone-500 px-2 py-0.5 rounded uppercase tracking-wider">
                            Step 3 Dispute
                          </span>
                        </div>

                        <form onSubmit={handleAppealSubmit} className="space-y-3">
                          <div>
                            <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest block mb-1">Dispute Type</label>
                            <select 
                              value={appealType}
                              onChange={e => setAppealType(e.target.value)}
                              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-[11px] font-bold outline-none focus:border-[#1E3A5F] cursor-pointer"
                            >
                              <option value="document_rejection">Document Certification Dispute (Seal Mismatch)</option>
                              <option value="land_parcel_mismatch">UPI / Parcel Bounds Dispute</option>
                              <option value="zoning_refusal">Zoning & Exemption Dispute</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest block mb-1">Appeal Message *</label>
                            <textarea 
                              required
                              value={appealText}
                              onChange={e => setAppealText(e.target.value)}
                              rows={3}
                              placeholder="Detail why you believe the audit decision is incorrect, and reference the certified seal location..."
                              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-[11px] outline-none focus:border-[#1E3A5F] focus:bg-white resize-none"
                            />
                          </div>

                          <div className="flex justify-between items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <button 
                                type="button"
                                onClick={() => appealInputRef.current?.click()}
                                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold text-[10.5px] rounded-lg transition-colors flex items-center gap-1.5"
                              >
                                <Upload size={11} />
                                {appealFile ? appealFile.name : "Attach Seal Proof"}
                              </button>
                              {appealFile && (
                                <button type="button" onClick={() => setAppealFile(null)} className="text-stone-300 hover:text-red-500">
                                  <X size={13} />
                                </button>
                              )}
                            </div>

                            <button 
                              type="submit"
                              disabled={!appealText.trim() || appealLoading}
                              className="px-5 py-2 bg-[#1E3A5F] text-white hover:brightness-110 font-black text-[11px] rounded-lg transition-all flex items-center gap-1.5 disabled:opacity-50"
                            >
                              {appealLoading ? (
                                <>
                                  <Loader2 size={12} className="animate-spin text-white" />
                                  Verifying Dispute...
                                </>
                              ) : (
                                <>
                                  <Send size={11} />
                                  Submit Dispute
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {currentProject.reviewStatus === "approved" && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 animate-fade-in">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle size={24} />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-black text-emerald-900">Zoning & NLA Permits Verified</h4>
                        <p className="text-[12px] text-emerald-700 mt-1 max-w-md mx-auto leading-relaxed">
                          All structural seals and land coordinates match the national records. Project is eligible for escrow funding.
                        </p>
                      </div>
                      {currentProject.appealSubmitted && (
                        <div className="text-[10px] bg-emerald-100/50 text-emerald-800 font-bold px-3 py-1 rounded-lg inline-block">
                          ✓ Dispute Resolved by Land Notary Office
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: Funding Setup */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Property Valuation (RWF)</span>
                      <input 
                        type="number"
                        value={currentProject.propertyValuation}
                        onChange={e => updateCurrentProject({ propertyValuation: e.target.value })}
                        disabled={!isFundingSetupEditable(currentProject)}
                        className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-semibold outline-none focus:border-[#1E3A5F] focus:bg-white transition-all shadow-sm disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-not-allowed"
                        placeholder="e.g. 1200000000" 
                      />
                      <span className="text-[9px] text-stone-400 block mt-1">
                        Est. market appraisal by licensed surveyor.
                      </span>
                    </label>
 
                    <label className="block">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Funding Target (RWF)</span>
                      <input 
                        type="number"
                        value={currentProject.fundingTarget}
                        onChange={e => updateCurrentProject({ fundingTarget: e.target.value })}
                        disabled={!isFundingSetupEditable(currentProject)}
                        className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-semibold outline-none focus:border-[#1E3A5F] focus:bg-white transition-all shadow-sm text-[#1E3A5F] disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-not-allowed"
                        placeholder="e.g. 450000000" 
                      />
                      <span className="text-[9px] text-stone-400 block mt-1">
                        Target capital to raise from fraction investors.
                      </span>
                    </label>
                  </div>
 
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Expected Completion Date</span>
                      <input 
                        type="date"
                        value={currentProject.expectedCompletionDate}
                        onChange={e => updateCurrentProject({ expectedCompletionDate: e.target.value })}
                        disabled={!isFundingSetupEditable(currentProject)}
                        className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-semibold outline-none focus:border-[#1E3A5F] focus:bg-white transition-all shadow-sm cursor-pointer disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-not-allowed"
                      />
                    </label>
 
                    <div className="bg-stone-50 border border-stone-150 rounded-2xl p-4 flex flex-col justify-center">
                      <p className="text-[11px] font-bold text-stone-700 leading-tight">Escrow Safety Threshold</p>
                      <p className="text-[10px] text-stone-400 mt-1 leading-relaxed">
                        Funds will remain locked in the RDB trustee account, released in tranches corresponding to milestones.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Evaluator Site Valuation */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-fade-in">
                  {(currentProject.siteVisitStatus === "pending" || currentProject.siteVisitStatus === "scheduled" || !currentProject.siteVisitStatus) ? (
                    /* PENDING ONSITE VISIT VIEW */
                    <div className="border border-stone-200 rounded-[24px] p-6 bg-white shadow-sm space-y-6 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center mx-auto shadow-inner">
                        <MapPin size={28} className="animate-bounce" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-[16px] font-black text-stone-900 tracking-tight">Physical Onsite Survey Required</h4>
                        <p className="text-[12px] text-stone-500 max-w-md mx-auto leading-relaxed">
                          Before your milestone tranches can be authorized, a government-certified inspector must verify your property bounds, grading, and structural foundation.
                        </p>
                      </div>

                      {/* Scheduled Card */}
                      <div className="bg-stone-50 border border-stone-150 rounded-2xl p-4 max-w-sm mx-auto text-left flex items-start gap-3">
                        <Clock size={16} className="text-amber-650 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[11px] font-bold text-stone-700">Survey Inspector Assignment</p>
                          <p className="text-[10px] text-stone-400 mt-0.5 leading-normal">
                            Inspector Eric Gasana has been scheduled for a site audit within 48 hours.
                          </p>
                        </div>
                      </div>

                      {/* Simulation Controller */}
                      <div className="pt-2 max-w-sm mx-auto">
                        {siteVisitSimulating ? (
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-[10px] font-black text-stone-400 uppercase">
                              <span className="flex items-center gap-1">
                                <Loader2 size={11} className="animate-spin text-blue-500" /> Simulating onsite inspection...
                              </span>
                              <span>{siteVisitSimProgress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                              <div className="bg-blue-500 h-full transition-all duration-150" style={{ width: `${siteVisitSimProgress}%` }} />
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={handleSimulateSiteVisit}
                            className="w-full py-3 bg-[#1E3A5F] hover:brightness-110 text-white font-black text-[11px] rounded-xl uppercase tracking-wider transition-all shadow-md shadow-[#1E3A5F]/15 flex items-center justify-center gap-1.5 cursor-pointer animate-pulse"
                          >
                            <Eye size={14} /> Schedule & Simulate Onsite Visit
                          </button>
                        )}
                      </div>

                      {/* Cancel Draft Button inside Step 5 pending state */}
                      <div className="pt-4 border-t border-stone-100 mt-2">
                        <button
                          type="button"
                          onClick={() => setShowCancelModal(true)}
                          className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 font-bold text-[10px] rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                        >
                          Cancel & Discard Application
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* VERDICT ISSUED VIEW */
                    <div className="space-y-5">
                      {/* Official Valuation Verdict Panel */}
                      <div className="border border-stone-200 rounded-[24px] p-6 bg-white shadow-sm space-y-5">
                        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                          <div className="flex items-center gap-2">
                            <Shield size={16} className="text-[#1E3A5F]" />
                            <h4 className="text-[13px] font-black text-stone-900">Evaluator Asset Valuation Report</h4>
                          </div>
                          {currentProject.siteVisitStatus === "approved" ? (
                            <span className="text-[9px] font-black bg-emerald-50 text-emerald-700 border border-emerald-250 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                              <CheckCircle size={10} className="text-emerald-600" /> Approved & Unlocked
                            </span>
                          ) : (
                            <span className="text-[9px] font-black bg-amber-50 text-amber-700 border border-amber-250 px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                              Pending Acceptance
                            </span>
                          )}
                        </div>

                        {/* Comparison Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Recommended Valuation Card */}
                          <div className="bg-stone-50 border border-stone-150 rounded-2xl p-4 space-y-2">
                            <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Recommended Property Valuation</p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-[16px] font-black text-stone-850">
                                {parseFloat(currentProject.evaluatorPropertyValuation || "0").toLocaleString()} RWF
                              </span>
                              <span className="text-[10px] text-stone-400 line-through">
                                {parseFloat(currentProject.propertyValuation || "0").toLocaleString()} RWF
                              </span>
                            </div>
                            <p className="text-[9.5px] text-stone-400 leading-normal">
                              Evaluator appraisal set at 90% of submitted property value due to boundary grading adjustment.
                            </p>
                          </div>

                          {/* Approved Funding Cap Card */}
                          <div className="bg-stone-50 border border-stone-150 rounded-2xl p-4 space-y-2">
                            <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Approved Funding Target Cap</p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-[16px] font-black text-[#1E3A5F]">
                                {parseFloat(currentProject.evaluatorFundingTarget || "0").toLocaleString()} RWF
                              </span>
                              <span className="text-[10px] text-stone-400 line-through">
                                {parseFloat(currentProject.fundingTarget || "0").toLocaleString()} RWF
                              </span>
                            </div>
                            <p className="text-[9.5px] text-stone-400 leading-normal">
                              Approved capital raise capped at 80% of recommended property valuation.
                            </p>
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="bg-stone-50 border border-stone-150 rounded-xl p-3.5 text-stone-600 text-[11px] leading-relaxed">
                          <p className="font-bold text-stone-850">Surveyor Field Notes:</p>
                          <p className="italic mt-1">"{currentProject.siteVisitVerdictDetail}"</p>
                        </div>

                        {/* Official Document Preview & Download Card */}
                        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="p-2.5 rounded-xl bg-blue-50 text-[#1E3A5F] shrink-0">
                              <FileText size={16} />
                            </div>
                            <div className="min-w-0">
                              <h5 className="text-[12.5px] font-black text-stone-850">Official Valuation Report</h5>
                              <p className="text-[10px] text-stone-400 mt-0.5 truncate font-medium">
                                Valuation_Report_{currentProject.landParcelRef ? currentProject.landParcelRef.replace(/\//g, "_") : "Property"}.pdf (1.4 MB) · Digitally Certified
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => setPreviewDocKey("evaluator_report")}
                              className="px-3.5 py-1.5 bg-[#1E3A5F] text-white hover:brightness-110 font-bold text-[10px] rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <Eye size={11} /> Preview
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                showToastMsg(`Downloading Valuation Report...`);
                                setTimeout(() => {
                                  showToastMsg(`Downloaded 'Valuation_Report_${currentProject.landParcelRef ? currentProject.landParcelRef.replace(/\//g, "_") : "Property"}.pdf' successfully.`);
                                }, 800);
                              }}
                              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold text-[10px] rounded-lg transition-colors border border-stone-200 cursor-pointer flex items-center gap-1"
                            >
                              <Download size={11} /> Download
                            </button>
                          </div>
                        </div>

                        {/* Appeal status details if resolved via appeal */}
                        {currentProject.siteVisitAppealType && (
                          <div className="bg-emerald-50 border border-emerald-150 rounded-xl p-3 text-emerald-800 text-[10.5px] font-semibold">
                            <p className="flex items-center gap-1">
                              <CheckCircle size={12} className="text-emerald-600" />
                              Appeal Approved: {currentProject.siteVisitAppealType === "funding" ? "Funding cap restored to original request." : "Property valuation updated to compromise level."}
                            </p>
                            <p className="text-[9.5px] text-emerald-600 mt-1 italic font-medium">
                              Justification: "{currentProject.siteVisitAppealText}"
                            </p>
                          </div>
                        )}

                        {/* Interactive Buttons (If not yet approved) */}
                        {currentProject.siteVisitStatus !== "approved" && (
                          <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                              type="button"
                              onClick={handleAcceptVerdict}
                              className="flex-1 py-3 bg-[#1E3A5F] hover:brightness-110 text-white font-black text-[11px] rounded-xl uppercase tracking-wider transition-all shadow-md shadow-[#1E3A5F]/15 flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <CheckCircle size={14} /> Accept Recommended Valuation
                            </button>

                            <button
                              type="button"
                              onClick={() => setShowSiteAppealForm(!showSiteAppealForm)}
                              className="flex-1 py-3 bg-white border border-stone-200 hover:border-stone-400 text-stone-700 font-bold text-[11px] rounded-xl uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                            >
                              Appeal Valuation Verdict
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Appeal Subform Panel */}
                      {showSiteAppealForm && currentProject.siteVisitStatus !== "approved" && (
                        <div className="border border-stone-200 rounded-[24px] p-6 bg-white shadow-sm space-y-4 animate-fade-in">
                          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                            <div>
                              <h4 className="text-[13px] font-black text-stone-900">File Valuation Appeal</h4>
                              <p className="text-[10px] text-stone-400">Submit a dispute request regarding the evaluator's site report.</p>
                            </div>
                            <span className="text-[9px] font-black bg-stone-150 text-stone-500 px-2 py-0.5 rounded uppercase tracking-wider">
                              Valuation Dispute
                            </span>
                          </div>

                          <form onSubmit={handleSiteAppealSubmit} className="space-y-4">
                            <div>
                              <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest block mb-1">Appeal Request Option</label>
                              <select 
                                value={siteAppealType}
                                onChange={e => setSiteAppealType(e.target.value as any)}
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-[11.5px] font-bold outline-none focus:border-[#1E3A5F] cursor-pointer"
                              >
                                <option value="funding">Appeal funding cap (Request original funding amount: {parseFloat(currentProject.fundingTarget || "0").toLocaleString()} RWF)</option>
                                <option value="visit">Appeal for secondary site survey (Proposes compromise property valuation: {Math.round((parseFloat(currentProject.propertyValuation || "0") * 0.95)).toLocaleString()} RWF)</option>
                              </select>
                            </div>

                            <div>
                              <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest block mb-1">Appeal Justification Message *</label>
                              <textarea 
                                required
                                value={siteAppealText}
                                onChange={e => setSiteAppealText(e.target.value)}
                                rows={3}
                                placeholder="Detail why the evaluator's recommendation is insufficient for this zone, or attach boundary certificate proofs..."
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-[12px] font-medium outline-none focus:border-[#1E3A5F] focus:bg-white resize-none"
                              />
                            </div>

                            <div className="flex justify-end gap-3">
                              <button 
                                type="button"
                                onClick={() => setShowSiteAppealForm(false)}
                                className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-[11px] rounded-xl transition-colors"
                              >
                                Cancel
                              </button>

                              <button 
                                type="submit"
                                disabled={!siteAppealText.trim() || siteAppealLoading}
                                className="px-5 py-2.5 bg-[#1E3A5F] text-white hover:brightness-110 font-black text-[11px] rounded-xl transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                              >
                                {siteAppealLoading ? (
                                  <>
                                    <Loader2 size={12} className="animate-spin text-white" />
                                    Reviewing Appeal...
                                  </>
                                ) : (
                                  <>
                                    <Send size={11} />
                                    Submit Appeal
                                  </>
                                )}
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* Cancel Draft Button at bottom of step 5 verdict state */}
                      {currentProject.siteVisitStatus !== "approved" && (
                        <div className="text-center pt-2">
                          <button
                            type="button"
                            onClick={() => setShowCancelModal(true)}
                            className="px-5 py-2.5 border border-red-200 text-red-650 hover:bg-red-50 font-bold text-[10px] rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                          >
                            Cancel & Discard Application
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 6: Milestones (Definition vs Live Release Tracker) */}
              {currentStep === 5 && (
                <div className="space-y-5 animate-fade-in">
                  {!currentProject.isFinalized ? (
                    /* DRAFTING / BUILDER MODE */
                    <>
                      {/* Summary progress validation bar */}
                      <div className={`border rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap transition-colors ${
                        (isMilestonesBalanced && currentProject.budgetFile) 
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                          : "bg-amber-50 border-amber-200 text-amber-800"
                      }`}>
                        <div>
                          <h4 className="text-[13px] font-black leading-tight">Milestone & Budget Balance</h4>
                          <p className="text-[10.5px] mt-0.5 font-medium">
                            {isMilestonesBalanced 
                              ? `Milestones are fully balanced (${milestonesPercent.toFixed(0)}%).` 
                              : `Unbalanced milestones: ${milestonesSum.toLocaleString()} RWF allocated of ${fundingTargetNum.toLocaleString()} RWF target (${milestonesPercent.toFixed(0)}%).`}
                            {" "}
                            {currentProject.budgetFile 
                              ? "Budget plan spreadsheet is attached." 
                              : "Standard budget spreadsheet template must be downloaded, completed, and uploaded."}
                          </p>
                        </div>
                        {(isMilestonesBalanced && currentProject.budgetFile) ? (
                          <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1 shrink-0">
                            <CheckCircle size={10} /> Balanced & Attached
                          </span>
                        ) : (
                          <span className="text-[9px] font-black bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1 rounded-lg uppercase tracking-wider shrink-0 animate-pulse">
                            Action Required
                          </span>
                        )}
                      </div>

                      {/* Milestones list builder */}
                      <div className="space-y-2">
                        {(currentProject.milestones || []).map((m, idx) => {
                          const percentage = fundingTargetNum > 0 ? (parseFloat(m.amountRwf) / fundingTargetNum) * 100 : 0;
                          return (
                            <div key={idx} className="bg-stone-50 border border-stone-150 rounded-xl p-3 flex items-center justify-between gap-4">
                              <div className="min-w-0">
                                <p className="text-[12.5px] font-bold text-stone-800 truncate">{m.name}</p>
                                <p className="text-[10px] text-stone-400 mt-0.5">
                                  Release Amount: {parseFloat(m.amountRwf).toLocaleString()} RWF ({percentage.toFixed(0)}%)
                                </p>
                              </div>
                              <button 
                                type="button"
                                onClick={() => removeMilestone(idx)}
                                className="text-stone-300 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {/* Add Milestone Subform */}
                      <div className="bg-white border border-stone-200/80 rounded-2xl p-4 space-y-3 shadow-sm">
                        <p className="text-[10px] font-black uppercase text-stone-400 tracking-wider">Add Milestone Release Tranche</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input 
                            type="text" 
                            value={newMilestoneName}
                            onChange={e => setNewMilestoneName(e.target.value)}
                            placeholder="Milestone Description (e.g. Roof Slab Complete)"
                            className="bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-[12px] outline-none focus:border-[#1E3A5F] focus:bg-white transition-all shadow-sm"
                          />
                          <div className="flex gap-2">
                            <input 
                              type="number" 
                              value={newMilestoneAmount}
                              onChange={e => setNewMilestoneAmount(e.target.value)}
                              placeholder="Release Amount (RWF)"
                              className="bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-[12px] outline-none focus:border-[#1E3A5F] focus:bg-white transition-all shadow-sm flex-1"
                            />
                            <button 
                              type="button" 
                              onClick={addMilestone}
                              disabled={!newMilestoneName.trim() || !newMilestoneAmount}
                              className="px-4 py-2 bg-[#1E3A5F] text-white hover:brightness-110 font-bold text-[12px] rounded-xl disabled:opacity-40 transition-all"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Budget Download/Upload Section */}
                      <div className="bg-white border border-stone-200/80 rounded-2xl p-5 space-y-4 shadow-sm">
                        <div className="flex items-start justify-between gap-4 border-b border-stone-100 pb-3">
                          <div>
                            <h4 className="text-[13px] font-black text-[#1E3A5F]">Final Project Budget Allocation Plan</h4>
                            <p className="text-[10.5px] text-stone-400 mt-0.5">Please download the template, itemize project milestone costs, and upload the completed sheet.</p>
                          </div>
                          <span className="text-[9px] font-black bg-stone-150 text-stone-500 px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                            Required
                          </span>
                        </div>

                        {/* Instructions */}
                        <div className="bg-stone-50 border border-stone-150 rounded-xl p-3.5 space-y-2 text-stone-600 text-[11px] leading-relaxed">
                          <p className="font-semibold text-stone-850">Instructions for Budget Submission:</p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>Tranche release amounts in the spreadsheet must match the milestone definitions above.</li>
                            <li>Include the civil engineering contractor estimate reference number.</li>
                            <li>Allowed file extensions: <strong>.xlsx, .pdf</strong> (Maximum size: 10MB).</li>
                          </ul>
                        </div>

                        {/* Actions wrapper */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                          {/* Download Template Button */}
                          <button
                            type="button"
                            onClick={() => {
                              showToastMsg("Downloading budget template spreadsheet...");
                              setTimeout(() => {
                                showToastMsg("Downloaded 'EstateX_Standard_Budget_Template.xlsx' successfully.");
                              }, 850);
                            }}
                            className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-[11.5px] rounded-xl transition-all flex items-center justify-center gap-1.5 border border-stone-200 cursor-pointer"
                          >
                            <Download size={14} /> Download Budget Template (.xlsx)
                          </button>

                          {/* Upload Zone */}
                          <div className="flex-1">
                            {currentProject.budgetFile ? (
                              <div className="border border-emerald-100 rounded-xl p-2.5 flex items-center justify-between gap-3 bg-emerald-50/20 w-full">
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                                    <FileSpreadsheet size={14} />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-[11px] font-bold text-stone-850 truncate">{currentProject.budgetFile.name}</p>
                                    <p className="text-[9px] text-stone-400 mt-0.5">{(currentProject.budgetFile.size / 1024).toFixed(0)} KB · Verified</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    updateCurrentProject({ budgetFile: undefined });
                                    showToastMsg("Budget sheet removed.");
                                  }}
                                  className="text-stone-300 hover:text-red-500 transition-colors px-1"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ) : budgetUploading ? (
                              <div className="border border-stone-200 rounded-xl p-2.5 flex flex-col justify-center bg-stone-50/50 w-full">
                                <div className="flex justify-between items-center text-[10px] font-bold text-stone-500 mb-1">
                                  <span className="flex items-center gap-1">
                                    <Loader2 size={11} className="animate-spin text-blue-500" /> Uploading budget sheet...
                                  </span>
                                  <span>{budgetUploadProgress}%</span>
                                </div>
                                <div className="w-full h-1 bg-stone-100 rounded-full overflow-hidden">
                                  <div className="bg-blue-500 h-full transition-all duration-150" style={{ width: `${budgetUploadProgress}%` }} />
                                </div>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => budgetFileInputRef.current?.click()}
                                className="w-full py-3 border border-dashed border-stone-300 hover:border-[#1E3A5F] bg-stone-50/40 hover:bg-stone-50 text-stone-500 hover:text-stone-700 font-bold text-[11.5px] rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <Upload size={14} /> Upload Final Budget Sheet
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Hidden file input */}
                        <input
                          type="file"
                          ref={budgetFileInputRef}
                          onChange={handleBudgetFileChange}
                          accept=".xlsx,.xls,.pdf"
                          className="hidden"
                        />
                      </div>
                    </>
                  ) : (
                    /* LIVE ACTIVE ESCROW RELEASE TRACKER */
                    <div className="space-y-6">
                      {/* Payout Stats Summary cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-stone-50 border border-stone-150 rounded-2xl p-4 shadow-inner">
                          <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Escrow Pool Total</p>
                          <p className="text-[14px] font-black text-[#1E3A5F] mt-1">
                            {fundingTargetNum.toLocaleString()} RWF
                          </p>
                        </div>
                        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 shadow-inner">
                          <p className="text-[9px] font-black text-emerald-650 uppercase tracking-widest">Released Payouts</p>
                          <p className="text-[14px] font-black text-emerald-700 mt-1">
                            {releasedFundsSum.toLocaleString()} RWF
                          </p>
                        </div>
                        <div className="bg-stone-50 border border-stone-150 rounded-2xl p-4 shadow-inner">
                          <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Locked Remaining</p>
                          <p className="text-[14px] font-black text-stone-700 mt-1">
                            {escrowLockedSum.toLocaleString()} RWF
                          </p>
                        </div>
                      </div>

                      {/* Budget Sheet Read-Only Card */}
                      {currentProject.budgetFile && (
                        <div className="bg-white border border-stone-200/80 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm animate-fade-in">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                              <FileSpreadsheet size={16} />
                            </div>
                            <div className="min-w-0">
                              <h5 className="text-[12px] font-black text-stone-850">Approved Project Budget Sheet</h5>
                              <p className="text-[10px] text-stone-400 mt-0.5 truncate font-medium">
                                {currentProject.budgetFile.name} ({(currentProject.budgetFile.size / 1024).toFixed(0)} KB) · Uploaded on {currentProject.budgetFile.uploadedAt}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              showToastMsg(`Downloading budget sheet: ${currentProject.budgetFile?.name}`);
                              setTimeout(() => {
                                showToastMsg(`Downloaded '${currentProject.budgetFile?.name}' successfully.`);
                              }, 800);
                            }}
                            className="px-3.5 py-1.5 bg-[#1E3A5F]/5 hover:bg-[#1E3A5F]/10 text-[#1E3A5F] font-bold text-[10px] rounded-lg transition-colors border border-[#1E3A5F]/10 cursor-pointer flex items-center gap-1 shrink-0"
                          >
                            <Download size={11} /> Download
                          </button>
                        </div>
                      )}

                      {/* Milestone timeline progress items */}
                      <div className="relative border-l border-stone-250 ml-4 pl-8 space-y-6">
                        {(currentProject.milestones || []).map((m, idx) => {
                          const isReleased = m.status === "released";
                          const isReviewing = m.status === "reviewing";
                          
                          // First index that is not released
                          const firstPendingIdx = (currentProject.milestones || []).findIndex(x => x.status !== "released");
                          const isFirstPending = firstPendingIdx === idx;
                          
                          return (
                            <div key={idx} className="relative">
                              {/* Step dot */}
                              <div className={`absolute left-[-42px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border text-[9px] ${
                                isReleased 
                                  ? "bg-emerald-500 text-white border-emerald-500"
                                  : isReviewing 
                                    ? "bg-blue-500 text-white border-blue-500 animate-pulse font-bold"
                                    : isFirstPending
                                      ? "bg-[#1E3A5F] text-white border-[#1E3A5F] font-bold"
                                      : "bg-white text-stone-300 border-stone-200"
                              }`}>
                                {isReleased ? "✓" : idx + 1}
                              </div>

                              {/* Milestone Details Card */}
                              <div className={`border rounded-2xl p-5 bg-white shadow-sm transition-all ${
                                isFirstPending ? "border-[#1E3A5F]/40 shadow-md ring-2 ring-[#1E3A5F]/5" : "border-stone-200/80"
                              }`}>
                                <div className="flex justify-between items-start gap-4">
                                  <div>
                                    <h4 className="text-[13px] font-black text-stone-900 leading-tight">{m.name}</h4>
                                    <p className="text-[10px] text-stone-400 mt-1">
                                      Tranche release: <strong className="text-stone-700">{parseFloat(m.amountRwf).toLocaleString()} RWF</strong> ({fundingTargetNum > 0 ? ((parseFloat(m.amountRwf) / fundingTargetNum) * 100).toFixed(0) : 0}%)
                                    </p>
                                  </div>

                                  {isReleased && (
                                    <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-lg flex items-center gap-1">
                                      <CheckCircle size={10} className="text-emerald-600" /> Released
                                    </span>
                                  )}
                                  {isReviewing && (
                                    <span className="text-[9px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-lg flex items-center gap-1 animate-pulse">
                                      <Loader2 size={10} className="animate-spin text-blue-600" /> Reviewing...
                                    </span>
                                  )}
                                  {!isReleased && !isReviewing && (
                                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg ${
                                      isFirstPending 
                                        ? "bg-amber-50 text-amber-700 border border-amber-200 animate-pulse" 
                                        : "bg-stone-50 text-stone-400 border border-stone-200"
                                    }`}>
                                      {isFirstPending ? "Action Required" : "Locked"}
                                    </span>
                                  )}
                                </div>

                                {isReleased && m.reportSummary && (
                                  <div className="mt-3 text-[11px] text-stone-500 border-t border-stone-100 pt-2.5">
                                    <p className="font-semibold text-stone-700">Completion Report Summary:</p>
                                    <p className="mt-0.5 italic">"{m.reportSummary}"</p>
                                  </div>
                                )}

                                {/* Inline Completion Report form */}
                                {!isReleased && !isReviewing && isFirstPending && (
                                  <div className="mt-4 border-t border-stone-100 pt-4 space-y-3.5">
                                    <div className="bg-stone-50/70 border border-stone-150 rounded-xl p-4 space-y-3">
                                      <div className="flex items-center gap-2">
                                        <ClipboardList size={14} className="text-[#1E3A5F]" />
                                        <h5 className="text-[11px] font-black text-stone-600 uppercase tracking-wider">Tranche Completion Report</h5>
                                      </div>

                                      <div>
                                        <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest block mb-1">Work Log Summary *</label>
                                        <textarea 
                                          id={`report-summary-${idx}`}
                                          rows={2}
                                          placeholder="Detail completed tasks (inspections, test clearances, or masonry progress logs)..."
                                          className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-[11px] font-medium outline-none focus:border-[#1E3A5F] resize-none"
                                        />
                                      </div>

                                      <div className="flex justify-between items-center flex-wrap gap-2 pt-1">
                                        <button 
                                          type="button"
                                          onClick={() => showToastMsg("Completion evidence photo attached.")}
                                          className="px-3 py-1.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-600 font-bold text-[10px] rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                                        >
                                          <Upload size={11} /> Attach Inspection Photo
                                        </button>

                                        <button 
                                          type="button"
                                          onClick={() => {
                                            const textarea = document.getElementById(`report-summary-${idx}`) as HTMLTextAreaElement;
                                            const summary = textarea?.value || "";
                                            if (!summary.trim()) {
                                              showToastMsg("Error: Report summary cannot be empty.");
                                              return;
                                            }

                                            // Simulating Review
                                            setProjects(prev => {
                                              const proj = { ...prev[activeProjectId] };
                                              const mils = proj.milestones.map((mItem, mIdx) => {
                                                if (mIdx === idx) {
                                                  return { ...mItem, status: "reviewing" };
                                                }
                                                return mItem;
                                              });
                                              return { ...prev, [activeProjectId]: { ...proj, milestones: mils } };
                                            });

                                            setTimeout(() => {
                                              setProjects(prev => {
                                                const proj = { ...prev[activeProjectId] };
                                                const mils = proj.milestones.map((mItem, mIdx) => {
                                                  if (mIdx === idx) {
                                                    return { 
                                                      ...mItem, 
                                                      status: "released" as const, 
                                                      reportSummary: summary 
                                                    };
                                                  }
                                                  return mItem;
                                                });
                                                
                                                // Unlocks the next milestone by setting it to pending
                                                if (idx < mils.length - 1) {
                                                  mils[idx + 1].status = "pending";
                                                }

                                                return { ...prev, [activeProjectId]: { ...proj, milestones: mils } };
                                              });
                                              showToastMsg(`Milestone tranche release approved!`);
                                            }, 2000);
                                          }}
                                          className="px-4 py-1.5 bg-[#1E3A5F] text-white hover:brightness-110 font-black text-[10.5px] rounded-lg transition-all"
                                        >
                                          Submit Report & Payout Request
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Nav Buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-stone-100 shrink-0">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="px-4 py-2 text-[11px] font-bold text-stone-500 disabled:opacity-40 hover:text-stone-800 transition-colors"
              >
                Back
              </button>

              {currentStep < WIZARD_STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canContinue()}
                  className="px-6 py-2.5 bg-[#1E3A5F] text-white text-[11px] font-black uppercase tracking-wider rounded-xl hover:brightness-110 disabled:opacity-45 transition-all shadow-md shadow-[#1E3A5F]/10 cursor-pointer"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={!isMilestonesBalanced || !currentProject.budgetFile}
                  className="px-6 py-2.5 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider rounded-xl hover:brightness-110 disabled:opacity-45 transition-all shadow-md shadow-emerald-600/10 cursor-pointer flex items-center gap-1.5"
                >
                  <Send size={13} />
                  Submit Application
                </button>
              )}
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSubmission;
