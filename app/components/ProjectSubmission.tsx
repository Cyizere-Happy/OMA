"use client";

import React, { useState, useRef } from "react";
import { Upload, MapPin, Landmark, Send, Plus, Trash2, FileText, X, AlertCircle } from "lucide-react";

interface UnitDef {
    unit_number: string;
    unit_type: "apartment" | "office" | "retail";
    floor: string;
    area_sqm: string;
    price: string;
}

interface UploadedFile {
    file: File;
    name: string;
    size: string;
    type: string;
    safe: boolean;
    error?: string;
}

// Validate file for malicious content indicators
function validateFile(file: File): { safe: boolean; error?: string } {
    const dangerousExtensions = ['.exe', '.bat', '.cmd', '.sh', '.ps1', '.vbs', '.js', '.jar', '.php', '.py', '.rb', '.pl'];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (dangerousExtensions.includes(ext)) {
        return { safe: false, error: 'File type not allowed for security reasons' };
    }
    const allowedTypes = [
        'application/pdf', 'image/jpeg', 'image/png', 'image/webp',
        'video/mp4', 'video/quicktime', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!allowedTypes.includes(file.type)) {
        return { safe: false, error: `File format not accepted (${file.type || 'unknown'})` };
    }
    if (file.size > 200 * 1024 * 1024) {
        return { safe: false, error: 'File exceeds 200MB limit' };
    }
    return { safe: true };
}

function formatSize(bytes: number): string {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const ProjectSubmission = () => {
    const [step, setStep] = useState(0);
    const [units, setUnits] = useState<UnitDef[]>([
        { unit_number: "", unit_type: "apartment", floor: "", area_sqm: "", price: "" }
    ]);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const steps = ["Basics", "Location", "Units", "Funding", "Documents"];

    const addUnit = () => setUnits(u => [...u, { unit_number: "", unit_type: "apartment", floor: "", area_sqm: "", price: "" }]);
    const removeUnit = (i: number) => setUnits(u => u.filter((_, idx) => idx !== i));
    const updateUnit = (i: number, field: keyof UnitDef, value: string) =>
        setUnits(u => u.map((unit, idx) => idx === i ? { ...unit, [field]: value } : unit));

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const processed: UploadedFile[] = files.map(file => {
            const validation = validateFile(file);
            return {
                file,
                name: file.name,
                size: formatSize(file.size),
                type: file.type,
                safe: validation.safe,
                error: validation.error
            };
        });
        setUploadedFiles(prev => [...prev, ...processed]);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeFile = (i: number) => setUploadedFiles(f => f.filter((_, idx) => idx !== i));
    const safeFiles = uploadedFiles.filter(f => f.safe);
    const unsafeFiles = uploadedFiles.filter(f => !f.safe);

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Submit a property project</h2>
                <p className="text-[13px] text-gray-500 mb-8">
                    List your project on EstateX. Our team will review and verify your submission.
                </p>

                {/* Step tabs */}
                <div className="flex gap-2 mb-8 flex-wrap">
                    {steps.map((label, i) => (
                        <button key={label} type="button" onClick={() => setStep(i)}
                            className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                                step === i ? "bg-[#1E3A5F] text-white shadow-md" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            }`}>
                            {i + 1}. {label}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-8 space-y-6">

                    {/* Step 0: Basics */}
                    {step === 0 && (
                        <>
                            <label className="block">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Project title</span>
                                <input className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]"
                                    placeholder="e.g. Kigali Heights Residences" />
                            </label>
                            <label className="block">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Project type</span>
                                <select className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]">
                                    <option value="raise_to_complete">Raise funds to complete — sell units to fund ongoing construction</option>
                                    <option value="new_project">New development — gather investors for a project from scratch</option>
                                </select>
                            </label>
                            <label className="block">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Construction progress</span>
                                <select className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]">
                                    <option value="planning">Planning stage</option>
                                    <option value="foundation">Foundation complete</option>
                                    <option value="structure">Structure complete</option>
                                    <option value="finishing">Finishing works</option>
                                    <option value="completed">Fully completed</option>
                                </select>
                            </label>
                            <label className="block">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</span>
                                <textarea rows={4} className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F] resize-none"
                                    placeholder="Describe the project — scope, amenities, target buyers, and timeline…" />
                            </label>
                        </>
                    )}

                    {/* Step 1: Location */}
                    {step === 1 && (
                        <>
                            <label className="block">
                                <span className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <MapPin size={12} /> Province & District
                                </span>
                                <input className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]"
                                    placeholder="e.g. Kigali City, Gasabo" />
                            </label>
                            <label className="block">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sector & Cell</span>
                                <input className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]"
                                    placeholder="e.g. Kimironko, Bibare" />
                            </label>
                            <label className="block">
                                <span className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <Landmark size={12} /> Land Parcel Reference
                                </span>
                                <input className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]"
                                    placeholder="Unique Parcel Identifier (UPI)" />
                            </label>
                            <label className="block">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Land size (m²)</span>
                                <input type="number" className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]"
                                    placeholder="e.g. 2500" />
                            </label>
                        </>
                    )}

                    {/* Step 2: Units */}
                    {step === 2 && (
                        <>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Define your units</span>
                                <button type="button" onClick={addUnit}
                                    className="flex items-center gap-1 text-[11px] font-bold text-[#1E3A5F] hover:underline">
                                    <Plus size={14} /> Add unit
                                </button>
                            </div>
                            <div className="space-y-4">
                                {units.map((unit, i) => (
                                    <div key={i} className="bg-gray-50 rounded-2xl p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] font-black text-gray-600">Unit {i + 1}</span>
                                            {units.length > 1 && (
                                                <button type="button" onClick={() => removeUnit(i)}>
                                                    <Trash2 size={14} className="text-red-400 hover:text-red-600" />
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase">Unit number</label>
                                                <input value={unit.unit_number} onChange={e => updateUnit(i, 'unit_number', e.target.value)}
                                                    placeholder="A-101"
                                                    className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[12px] outline-none focus:border-[#1E3A5F]" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase">Type</label>
                                                <select value={unit.unit_type} onChange={e => updateUnit(i, 'unit_type', e.target.value as any)}
                                                    className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[12px] outline-none focus:border-[#1E3A5F]">
                                                    <option value="apartment">Apartment</option>
                                                    <option value="office">Office</option>
                                                    <option value="retail">Retail space</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase">Floor</label>
                                                <input type="number" value={unit.floor} onChange={e => updateUnit(i, 'floor', e.target.value)}
                                                    placeholder="1"
                                                    className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[12px] outline-none focus:border-[#1E3A5F]" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase">Area (m²)</label>
                                                <input type="number" value={unit.area_sqm} onChange={e => updateUnit(i, 'area_sqm', e.target.value)}
                                                    placeholder="65"
                                                    className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[12px] outline-none focus:border-[#1E3A5F]" />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase">Price (RWF)</label>
                                                <input type="number" value={unit.price} onChange={e => updateUnit(i, 'price', e.target.value)}
                                                    placeholder="45000000"
                                                    className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[12px] outline-none focus:border-[#1E3A5F]" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[11px] text-gray-400">
                                {units.length} unit{units.length !== 1 ? 's' : ''} · Total value: {units.reduce((s, u) => s + (parseFloat(u.price) || 0), 0).toLocaleString()} RWF
                            </p>
                        </>
                    )}

                    {/* Step 3: Funding */}
                    {step === 3 && (
                        <>
                            <label className="block">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Funding target (RWF)</span>
                                <input type="number" className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]"
                                    placeholder="200000000" />
                            </label>
                            <label className="block">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expected completion date</span>
                                <input type="date" className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]" />
                            </label>
                            <label className="block">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Property valuation (RWF)</span>
                                <input type="number" className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]"
                                    placeholder="500000000" />
                            </label>
                        </>
                    )}

                    {/* Step 4: Documents */}
                    {step === 4 && (
                        <>
                            {/* Upload zone */}
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-[#1E3A5F]/40 hover:bg-gray-50/50 transition-all">
                                <Upload className="mx-auto text-[#1E3A5F] mb-3" size={28} />
                                <p className="text-[13px] font-bold text-gray-800">Click to upload documents</p>
                                <p className="text-[11px] text-gray-400 mt-1">
                                    Title deed, building permit, site plan, property photos, videos — multiple files allowed
                                </p>
                                <p className="text-[10px] text-gray-300 mt-2">PDF, JPG, PNG, MP4 · Max 200MB per file</p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept=".pdf,.jpg,.jpeg,.png,.webp,.mp4,.mov,.doc,.docx"
                                    className="hidden"
                                    onChange={handleFileSelect}
                                />
                            </div>

                            {/* Rejected files */}
                            {unsafeFiles.length > 0 && (
                                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-2">
                                    <p className="text-[11px] font-black text-red-700 uppercase tracking-widest flex items-center gap-2">
                                        <AlertCircle size={14} /> Files rejected for security reasons
                                    </p>
                                    {unsafeFiles.map((f, i) => (
                                        <div key={i} className="flex items-center justify-between text-[12px] text-red-600">
                                            <span className="font-medium">{f.name}</span>
                                            <span className="text-[11px]">{f.error}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Accepted files */}
                            {safeFiles.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{safeFiles.length} file{safeFiles.length !== 1 ? 's' : ''} ready</p>
                                    {safeFiles.map((f, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                                            <FileText size={16} className="text-[#1E3A5F] shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[12px] font-bold text-gray-800 truncate">{f.name}</p>
                                                <p className="text-[10px] text-gray-400">{f.size}</p>
                                            </div>
                                            <button type="button" onClick={() => removeFile(uploadedFiles.indexOf(f))}
                                                className="text-gray-300 hover:text-red-500 transition-colors">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between pt-4 border-t border-gray-100">
                        <button type="button" disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))}
                            className="text-[12px] font-bold text-gray-500 disabled:opacity-40 hover:text-[#1E3A5F]">
                            Back
                        </button>
                        {step < steps.length - 1 ? (
                            <button type="button" onClick={() => setStep(s => s + 1)}
                                className="px-6 py-2.5 bg-[#1E3A5F] text-white text-[12px] font-bold rounded-xl">
                                Continue
                            </button>
                        ) : (
                            <button type="button" className="px-6 py-2.5 bg-[#1E3A5F] text-white text-[12px] font-bold rounded-xl flex items-center gap-2">
                                <Send size={14} /> Submit for review
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectSubmission;
