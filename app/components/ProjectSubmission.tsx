"use client";

import React, { useState } from "react";
import { Upload, MapPin, Landmark, FileCheck, Send, Plus, Trash2, CheckCircle, Clock, XCircle } from "lucide-react";

interface UnitDef {
    unit_number: string;
    unit_type: "apartment" | "office" | "retail";
    floor: string;
    area_sqm: string;
    price: string;
}

const ProjectSubmission = () => {
    const [step, setStep] = useState(0);
    const [units, setUnits] = useState<UnitDef[]>([
        { unit_number: "", unit_type: "apartment", floor: "", area_sqm: "", price: "" }
    ]);
    const steps = ["Basics", "Site & legal", "Units", "Funding plan", "Documents"];

    const addUnit = () => setUnits(u => [...u, { unit_number: "", unit_type: "apartment", floor: "", area_sqm: "", price: "" }]);
    const removeUnit = (i: number) => setUnits(u => u.filter((_, idx) => idx !== i));
    const updateUnit = (i: number, field: keyof UnitDef, value: string) =>
        setUnits(u => u.map((unit, idx) => idx === i ? { ...unit, [field]: value } : unit));

    const govChecks = [
        { label: "NLA Title Check", status: "pending", desc: "Land ownership & encumbrances" },
        { label: "CLB Collateral", status: "pending", desc: "Loan collateral registry" },
        { label: "Kubaka Permit", status: "pending", desc: "Building permit & zoning" },
    ];

    const statusIcon = (s: string) => {
        if (s === "passed" || s === "verified") return <CheckCircle size={14} className="text-emerald-500" />;
        if (s === "failed") return <XCircle size={14} className="text-red-500" />;
        return <Clock size={14} className="text-amber-500" />;
    };

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Submit a property project</h2>
                <p className="text-[13px] text-gray-500 mb-8">
                    List a project for EstateX verification. Government APIs (NLA, CLB, Kubaka) will be checked automatically.
                </p>

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
                    {step === 0 && (
                        <>
                            <label className="block">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Project title</span>
                                <input className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]"
                                    placeholder="e.g. Kigali mixed-use tower" />
                            </label>
                            <label className="block">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Investment model</span>
                                <select className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]">
                                    <option value="raise_to_complete">Raise to Complete — sell units to fund ongoing construction</option>
                                    <option value="new_project">New Project — gather investors from scratch</option>
                                </select>
                            </label>
                            <label className="block">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Construction completion level</span>
                                <select className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]">
                                    <option value="planning">Planning</option>
                                    <option value="foundation">Foundation</option>
                                    <option value="structure">Structure</option>
                                    <option value="finishing">Finishing</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </label>
                            <label className="block">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Short description</span>
                                <textarea rows={3} className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F] resize-none"
                                    placeholder="Scope, timeline, and current construction stage…" />
                            </label>
                        </>
                    )}

                    {step === 1 && (
                        <>
                            <label className="block">
                                <span className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <MapPin size={12} /> District & sector
                                </span>
                                <input className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]"
                                    placeholder="e.g. Gasabo, Kimironko" />
                            </label>
                            <label className="block">
                                <span className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <Landmark size={12} /> UPI (Unique Parcel Identifier)
                                </span>
                                <input className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]"
                                    placeholder="1/01/01/01/100" />
                                <p className="text-[11px] text-gray-400 mt-1">NLA, CLB, and Kubaka checks will run automatically after submission.</p>
                            </label>

                            {/* Gov verification status panel */}
                            <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Government Verification Status</p>
                                {govChecks.map(check => (
                                    <div key={check.label} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {statusIcon(check.status)}
                                            <div>
                                                <p className="text-[12px] font-bold text-gray-800">{check.label}</p>
                                                <p className="text-[11px] text-gray-400">{check.desc}</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold text-amber-600 uppercase">Pending</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Unit definitions</span>
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
                                                    <option value="retail">Retail</option>
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
                                Total units: {units.length} · Total value: {units.reduce((s, u) => s + (parseFloat(u.price) || 0), 0).toLocaleString()} RWF
                            </p>
                        </>
                    )}

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
                        </>
                    )}

                    {step === 4 && (
                        <>
                            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center">
                                <Upload className="mx-auto text-[#1E3A5F] mb-3" size={28} />
                                <p className="text-[13px] font-bold text-gray-800">Upload title deed, building permit, site plan</p>
                                <p className="text-[11px] text-gray-400 mt-1">Legal docs → IPFS · Media (photos/videos) → CDN · Max 50MB legal / 200MB media</p>
                                <button type="button" className="mt-4 px-5 py-2 bg-[#1E3A5F] text-white text-[11px] font-bold rounded-xl">
                                    Browse files
                                </button>
                            </div>
                            <ul className="space-y-2 text-[12px] text-gray-600">
                                <li className="flex items-center gap-2">
                                    <FileCheck size={16} className="text-emerald-600 shrink-0" />
                                    Legal documents are pinned to IPFS for immutable storage.
                                </li>
                                <li className="flex items-center gap-2">
                                    <FileCheck size={16} className="text-emerald-600 shrink-0" />
                                    2–3 independent evaluators will be assigned after gov checks pass.
                                </li>
                            </ul>
                        </>
                    )}

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
