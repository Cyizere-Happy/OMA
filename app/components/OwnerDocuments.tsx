"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Upload, 
  Shield, 
  Inbox, 
  FileText, 
  CheckCircle, 
  Clock, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  X, 
  Loader2, 
  Eye
} from "lucide-react";

// ── Document Previews Mock Data ────────────────────────────────────────────────
const MOCK_DOCS: Record<string, { title: string; subtitle: string; content: React.ReactNode }> = {
  "Proof of land title / lease": {
    title: "Land Title Registry Certificate",
    subtitle: "Republic of Rwanda · Land Management Authority",
    content: (
      <div style={{ fontFamily: "Georgia, serif", color: "#111" }} className="p-8 border-4 border-double border-amber-800/30 bg-stone-50/30 rounded-lg">
        {/* Emblem header */}
        <div className="text-center border-b-2 border-stone-800 pb-4 mb-6">
          <p className="text-[10px] uppercase font-bold tracking-widest text-stone-500">Repubulika y'u Rwanda</p>
          <h2 className="text-[18px] font-black text-amber-950 uppercase tracking-wide mt-1">Rwanda Land Management and Use Authority</h2>
          <p className="text-[11px] font-semibold text-stone-600 mt-0.5">National Land Registry Office</p>
        </div>

        {/* Certificate title */}
        <div className="text-center my-8">
          <h3 className="text-[20px] font-black text-amber-900 tracking-tight uppercase">Certificate of Land Title</h3>
          <p className="text-[11px] text-stone-400 font-sans mt-1">Issued under the Land Law No. 43/2013 of 16/06/2013</p>
        </div>

        {/* Info Grid */}
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

        {/* Legal Declaration */}
        <div className="my-8 text-[12px] leading-relaxed text-stone-700 italic border-l-2 border-amber-900/20 pl-4">
          "This certifies that the proprietor named above is registered as the owner of the leasehold interest in the land parcel described hereon, subject to the reservations, conditions, and provisions contained in the Land Law of Rwanda."
        </div>

        {/* Signatures & Stamp */}
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
  "Building permit or exemption letter": {
    title: "Construction Permit",
    subtitle: "City of Kigali · Urban Planning & Construction Department",
    content: (
      <div style={{ fontFamily: "Georgia, serif", color: "#111" }} className="p-8 border-4 border-double border-blue-900/30 bg-stone-50/30 rounded-lg">
        {/* Emblem header */}
        <div className="text-center border-b-2 border-stone-800 pb-4 mb-6">
          <p className="text-[10px] uppercase font-bold tracking-widest text-stone-500">City of Kigali</p>
          <h2 className="text-[18px] font-black text-blue-950 uppercase tracking-wide mt-1">One Stop Center - Construction Permits</h2>
          <p className="text-[11px] font-semibold text-stone-600 mt-0.5">Zoning & Compliance Office</p>
        </div>

        {/* Permit Title */}
        <div className="text-center my-8">
          <h3 className="text-[20px] font-black text-blue-900 tracking-tight uppercase">Construction Permit</h3>
          <p className="text-[11px] text-stone-400 font-sans mt-1">Permit Number: CoK-CP-2026-45920</p>
        </div>

        {/* Info Grid */}
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

        {/* Authorization text */}
        <div className="my-8 text-[12px] leading-relaxed text-stone-700 italic border-l-2 border-blue-900/20 pl-4">
          "Permission is hereby granted to carry out construction works as described in the approved plans. All works must comply with the Rwanda Building Code and Kigali City Master Plan regulations."
        </div>

        {/* Signatures & Stamp */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-stone-200">
          <div>
            <p className="text-[9px] uppercase text-stone-400 font-sans">Approval Date</p>
            <p className="text-[11px] font-mono text-stone-600">May 29, 2026</p>
          </div>
          <div className="text-center relative">
            <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full border-4 border-dashed border-blue-900/20 flex items-center justify-center text-blue-900/20 font-black text-[9px] -rotate-12 select-none">
              APPROVED
            </div>
            <p className="text-[11px] font-bold text-stone-800 font-sans">Eng. Pudence Rubingisa</p>
            <p className="text-[9px] text-stone-400 font-sans uppercase">Director General, One Stop Center</p>
          </div>
        </div>
      </div>
    )
  },
  "Environmental clearance (if required)": {
    title: "Environmental Impact Assessment Certificate",
    subtitle: "Rwanda Environment Management Authority (REMA)",
    content: (
      <div style={{ fontFamily: "Georgia, serif", color: "#111" }} className="p-8 border-4 border-double border-emerald-900/30 bg-stone-50/30 rounded-lg">
        {/* Emblem header */}
        <div className="text-center border-b-2 border-stone-800 pb-4 mb-6">
          <p className="text-[10px] uppercase font-bold tracking-widest text-stone-500">Ministry of Environment</p>
          <h2 className="text-[18px] font-black text-emerald-950 uppercase tracking-wide mt-1">Rwanda Environment Management Authority</h2>
          <p className="text-[11px] font-semibold text-stone-600 mt-0.5">EIA Monitoring & Compliance Division</p>
        </div>

        {/* Certificate Title */}
        <div className="text-center my-8">
          <h3 className="text-[20px] font-black text-emerald-900 tracking-tight uppercase">EIA Clearance Certificate</h3>
          <p className="text-[11px] text-stone-400 font-sans mt-1">Certificate No: REMA-EIA-2026-802</p>
        </div>

        {/* Info Grid */}
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

        {/* Authorization text */}
        <div className="my-8 text-[12px] leading-relaxed text-stone-700 italic border-l-2 border-emerald-900/20 pl-4">
          "Having reviewed the Environmental Impact Report, REMA certifies that this project has satisfied all regulatory standards under Environmental Law No. 48/2018. Adequate mitigation plans are approved."
        </div>

        {/* Signatures & Stamp */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-stone-200">
          <div>
            <p className="text-[9px] uppercase text-stone-400 font-sans">Inspector Code</p>
            <p className="text-[11px] font-mono text-stone-600">REMA-INS-332</p>
          </div>
          <div className="text-center relative">
            <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full border-4 border-dashed border-emerald-900/20 flex items-center justify-center text-emerald-900/20 font-black text-[9px] rotate-45 select-none">
              CLEARED
            </div>
            <p className="text-[11px] font-bold text-stone-800 font-sans">Dr. Juliet Kabera</p>
            <p className="text-[9px] text-stone-400 font-sans uppercase">Director General, REMA</p>
          </div>
        </div>
      </div>
    )
  },
  "Company registration & tax ID": {
    title: "Certificate of Registration",
    subtitle: "Rwanda Development Board (RDB)",
    content: (
      <div style={{ fontFamily: "Georgia, serif", color: "#111" }} className="p-8 border-4 border-double border-red-900/30 bg-stone-50/30 rounded-lg">
        {/* Emblem header */}
        <div className="text-center border-b-2 border-stone-800 pb-4 mb-6">
          <p className="text-[10px] uppercase font-bold tracking-widest text-stone-500">Republic of Rwanda</p>
          <h2 className="text-[18px] font-black text-red-950 uppercase tracking-wide mt-1">Rwanda Development Board</h2>
          <p className="text-[11px] font-semibold text-stone-600 mt-0.5">Office of the Registrar General</p>
        </div>

        {/* Title */}
        <div className="text-center my-8">
          <h3 className="text-[20px] font-black text-red-900 tracking-tight uppercase">Certificate of Company Registration</h3>
          <p className="text-[11px] text-stone-400 font-sans mt-1">Company Code (TIN): 109284910</p>
        </div>

        {/* Info Grid */}
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

        {/* Authorization text */}
        <div className="my-8 text-[12px] leading-relaxed text-stone-700 italic border-l-2 border-red-900/20 pl-4">
          "This is to certify that ESTATEX DEVELOPMENT PARTNERS LTD has been registered under Law No. 007/2021 of 05/02/2021 governing companies. The company is authorized to engage in real estate development activities."
        </div>

        {/* Signatures & Stamp */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-stone-200">
          <div>
            <p className="text-[9px] uppercase text-stone-400 font-sans">Registered Office</p>
            <p className="text-[11px] font-semibold text-stone-600">Kigali, Gasabo, Kimihurura</p>
          </div>
          <div className="text-center relative">
            <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full border-4 border-dashed border-red-900/20 flex items-center justify-center text-red-900/20 font-black text-[9px] rotate-12 select-none">
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
function FilePreviewModal({ filename, onClose }: { filename: string; onClose: () => void }) {
  const preview = MOCK_DOCS[filename];
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!preview) return null;

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
              <FileText size={14} className="text-white/80" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-white leading-tight">{preview.title}</p>
              <p className="text-[9px] text-white/40 uppercase tracking-widest font-semibold mt-0.5">
                PDF Document · {filename}
              </p>
            </div>
          </div>

          {/* Centre: PDF controls */}
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

          {/* Right: actions */}
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

        {/* ── Viewer body ── */}
        <div
          className="flex-1 overflow-y-auto flex justify-center py-8 px-4"
          style={{ background: "#525659" }}
        >
          {/* White A4 page */}
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

// ── Main Component ───────────────────────────────────────────────────────────
const OwnerDocuments = () => {
  const [docs, setDocs] = useState([
    { id: "land_title", name: "Proof of land title / lease", state: "missing", progress: 0, file: null as { name: string; size: number; date: string } | null },
    { id: "building_permit", name: "Building permit or exemption letter", state: "missing", progress: 0, file: null as { name: string; size: number; date: string } | null },
    { id: "environmental", name: "Environmental clearance (if required)", state: "missing", progress: 0, file: null as { name: string; size: number; date: string } | null },
    { id: "company_reg", name: "Company registration & tax ID", state: "missing", progress: 0, file: null as { name: string; size: number; date: string } | null },
  ]);

  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = (docId: string) => {
    setActiveDocId(docId);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeDocId) return;

    // Set status to uploading
    setDocs(prev => prev.map(d => {
      if (d.id === activeDocId) {
        return { ...d, state: "uploading", progress: 0 };
      }
      return d;
    }));

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setDocs(prev => prev.map(d => {
        if (d.id === activeDocId) {
          return { ...d, progress: currentProgress };
        }
        return d;
      }));

      if (currentProgress >= 100) {
        clearInterval(interval);
        
        // Mark as uploaded / pending
        setDocs(prev => prev.map(d => {
          if (d.id === activeDocId) {
            return {
              ...d,
              state: "pending",
              progress: 100,
              file: {
                name: file.name,
                size: file.size,
                date: new Date().toLocaleDateString()
              }
            };
          }
          return d;
        }));

        setToast(`Successfully uploaded "${file.name}"!`);
        setTimeout(() => setToast(null), 3000);
      }
    }, 120);
  };

  const uploadedDocs = docs.filter(d => d.file !== null);

  const getStatusBadge = (state: string, progress: number) => {
    if (state === "missing") {
      return (
        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-red-50 text-red-500 border border-red-100 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
          Missing
        </span>
      );
    }
    if (state === "uploading") {
      return (
        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center gap-1.5">
          <Loader2 size={10} className="animate-spin text-blue-500" />
          Uploading {progress}%
        </span>
      );
    }
    return (
      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1.5">
        <Clock size={11} className="text-amber-500" />
        In Review
      </span>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#1E3A5F] text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 z-50 animate-fade-in text-[12px] font-bold border border-white/10">
          <CheckCircle size={15} className="text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Preview Modal */}
      {previewFile && (
        <FilePreviewModal filename={previewFile} onClose={() => setPreviewFile(null)} />
      )}

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
      />

      <div className="max-w-4xl">
        <h2 className="text-2xl font-black text-stone-900 tracking-tight mb-2">Document uploads</h2>
        <p className="text-[13px] text-stone-500 mb-8">
          Keep compliance files current. Notaries and admins review before milestones pay out.
        </p>

        <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Shield size={12} className="text-stone-400" /> Required checklist
        </h3>
        <div className="bg-white rounded-[24px] border border-stone-200/80 shadow-sm divide-y divide-stone-100 mb-10 overflow-hidden">
          {docs.map((row) => (
            <div key={row.id} className="px-6 py-4 flex items-center justify-between gap-4 flex-wrap hover:bg-stone-50/40 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <Shield size={18} className={row.state === "missing" ? "text-stone-300" : "text-[#1E3A5F]"} />
                <span className="text-[13px] font-bold text-stone-800">{row.name}</span>
              </div>
              <div className="flex items-center gap-4">
                {getStatusBadge(row.state, row.progress)}
                {row.state === "missing" ? (
                  <button 
                    onClick={() => handleUploadClick(row.id)}
                    type="button" 
                    className="flex items-center gap-1.5 text-[11px] font-bold text-[#1E3A5F] hover:text-[#2a4d75] hover:underline"
                  >
                    <Upload size={12} /> Upload
                  </button>
                ) : row.state === "pending" ? (
                  <button 
                    onClick={() => setPreviewFile(row.name)}
                    type="button" 
                    className="flex items-center gap-1.5 text-[11px] font-bold text-stone-500 hover:text-stone-800 transition-colors"
                  >
                    <Eye size={12} /> Preview
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4">Recent uploads</h3>
        {uploadedDocs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-stone-400 bg-white border border-stone-200/80 rounded-[24px] shadow-sm">
            <Inbox size={48} strokeWidth={1} className="text-stone-300" />
            <p className="mt-4 font-semibold text-[14px]">No uploads yet</p>
            <p className="text-[11px] text-stone-400 mt-1">Upload your compliance documents to proceed with project approval.</p>
          </div>
        ) : (
          <div className="bg-white rounded-[24px] border border-stone-200/80 shadow-sm divide-y divide-stone-100 overflow-hidden">
            {uploadedDocs.map((doc) => (
              <div key={doc.id} className="px-6 py-4 flex items-center justify-between gap-4 flex-wrap hover:bg-stone-50/40 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText size={18} className="text-[#1E3A5F]" />
                  <div className="min-w-0">
                    <span 
                      onClick={() => setPreviewFile(doc.name)}
                      className="text-[13px] font-bold text-[#1E3A5F] hover:underline cursor-pointer block truncate"
                    >
                      {doc.file?.name}
                    </span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">
                      {doc.name} · {(doc.file!.size / 1024).toFixed(1)} KB · {doc.file?.date}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setPreviewFile(doc.name)}
                    type="button" 
                    className="flex items-center gap-1.5 text-[11px] font-bold text-stone-500 hover:text-stone-800 transition-colors"
                  >
                    <Eye size={12} /> Preview
                  </button>
                  <button 
                    onClick={() => alert(`Downloading ${doc.file?.name}...`)}
                    type="button" 
                    className="flex items-center gap-1.5 text-[11px] font-bold text-[#1E3A5F] hover:underline"
                  >
                    <Download size={12} /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDocuments;
