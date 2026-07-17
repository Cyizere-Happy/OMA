"use client";

import React, { useState, useEffect } from "react";
import { 
  User,
  Search,
  FileText, 
  Shield, 
  ShieldAlert,
  CheckCircle, 
  ArrowLeft, 
  X,
  Activity,
  Bed,
  Stethoscope,
  Plus,
  Trash2
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
export interface InsuranceRecord {
  provider: string;
  policyNumber: string;
}
interface Vitals {
  bloodPressure: string;
  temperature: string;
  heartRate: string;
  respiratoryRate: string;
  o2Saturation: string;
  painScore: string;
}

interface TEWSData {
  mobility: string;
  avpu: string;
  trauma: string;
}

interface PatientRecord {
  id: string;
  title: string;

  // Patient Details
  patientMode?: "identified" | "anonymous";
  patientId?: string;
  firstName?: string;
  lastName?: string;
  age?: string;
  ageRange?: string;
  gender?: string;
  weightKg?: string;
  anonymousIndicator?: string;
  email?: string;
  phone?: string;
  insurances?: InsuranceRecord[];
  isNewRegistration?: boolean;
  isOutsider?: boolean;
  passportNumber?: string;
  mockImage?: string;

  // Step 2: Triage
  epidemicFever?: boolean;
  epidemicTravel?: boolean;
  emergencySigns?: string[];
  triageLevel?: "Red" | "Orange" | "Yellow" | "Green" | "Black" | "";
  vitals: Vitals;
  tewsData: TEWSData;
  tewsScore?: number;

  // Step 3: Diagnostics
  nurseObservations?: string;
  requiredTests: string[];

  // Step 4: Ward Assignment
  assignedWard?: string;
  assignedBed?: string;
  admissionNotes?: string;

  currentStep: number;
  reviewStatus: "draft" | "admitted";
}

// ── Default State Configurations ──────────────────────────────────────────────
const DEFAULT_PROJECTS: Record<string, PatientRecord> = {
  rugando_draft: {
    id: "rugando_draft",
    title: "",
    currentStep: 0,
    reviewStatus: "draft",
    patientMode: "identified",
    vitals: { bloodPressure: "", temperature: "", heartRate: "", respiratoryRate: "", o2Saturation: "", painScore: "" },
    tewsData: { mobility: "Walking", avpu: "A", trauma: "No" },
    emergencySigns: [],
    requiredTests: []
  }
};

// ── Stepper Definition ────────────────────────────────────────────────────────
const WIZARD_STEPS = [
  { index: 0, title: "Patient Details", desc: "ID, demographics & vitals", icon: <User size={18} /> },
  { index: 1, title: "Triage & Vitals", desc: "Priority & initial measurements", icon: <Activity size={18} /> },
  { index: 2, title: "Preliminary Diagnostics", desc: "Nurse observations & tests", icon: <Stethoscope size={18} /> },
  { index: 3, title: "Ward Assignment", desc: "Finalize bed assignment", icon: <Bed size={18} /> }
];

// ── Main Component ───────────────────────────────────────────────────────────
const ProjectSubmission = ({ 
  onNavigate, 
  initialStep,
  mode = "new"
}: { 
  onNavigate?: (view: string) => void; 
  initialStep?: number | null; 
  mode?: "new" | "existing";
}) => {
  const [projects, setProjects] = useState<Record<string, PatientRecord>>(DEFAULT_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("rugando_draft");
  
  const currentProject = projects[selectedProjectId];
  
  // Override initial step if provided
  useEffect(() => {
    if (initialStep !== undefined && initialStep !== null && currentProject) {
      updateCurrentProject({ currentStep: initialStep });
    }
  }, [initialStep]);

  const updateCurrentProject = (updates: Partial<PatientRecord>) => {
    setProjects(prev => ({
      ...prev,
      [selectedProjectId]: { ...prev[selectedProjectId], ...updates }
    }));
  };

  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const showToastMsg = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const currentStep = currentProject.currentStep || 0;

  const nextStep = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      updateCurrentProject({ currentStep: currentStep + 1 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      updateCurrentProject({ currentStep: currentStep - 1 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleTest = (testName: string) => {
    const currentTests = currentProject.requiredTests || [];
    if (currentTests.includes(testName)) {
      updateCurrentProject({ requiredTests: currentTests.filter(t => t !== testName) });
    } else {
      updateCurrentProject({ requiredTests: [...currentTests, testName] });
    }
  };
  useEffect(() => {
    if (currentStep === 1) {
      const vitals = currentProject.vitals;
      const tews = currentProject.tewsData;
      let score = 0;

      // Mobility
      if (tews?.mobility === "Wheelchair") score += 1;
      if (tews?.mobility === "Stretcher") score += 2;

      // RR
      const rr = parseInt(vitals?.respiratoryRate);
      if (!isNaN(rr)) {
        if (rr < 9) score += 2;
        else if (rr >= 15 && rr <= 20) score += 1;
        else if (rr >= 21 && rr <= 29) score += 2;
        else if (rr > 29) score += 3;
      }

      // HR
      const hr = parseInt(vitals?.heartRate);
      if (!isNaN(hr)) {
        if (hr < 41) score += 2;
        else if (hr >= 41 && hr <= 50) score += 1;
        else if (hr >= 101 && hr <= 110) score += 1;
        else if (hr >= 111 && hr <= 129) score += 2;
        else if (hr > 129) score += 3;
      }

      // SBP (Blood Pressure - just grab systolic)
      let sbp = NaN;
      if (vitals?.bloodPressure) {
        sbp = parseInt(vitals.bloodPressure.split('/')[0]);
      }
      if (!isNaN(sbp)) {
        if (sbp < 71) score += 3;
        else if (sbp >= 71 && sbp <= 80) score += 2;
        else if (sbp >= 81 && sbp <= 100) score += 1;
        else if (sbp > 199) score += 2;
      }

      // Temp
      const temp = parseFloat(vitals?.temperature);
      if (!isNaN(temp)) {
        if (temp < 35.0) score += 2;
        else if (temp > 38.4) score += 2;
      }

      // AVPU
      if (tews?.avpu === "V") score += 1;
      if (tews?.avpu === "P") score += 2;
      if (tews?.avpu === "U") score += 3;

      // Trauma
      if (tews?.trauma === "Yes") score += 1;

      // Determine Triage Level
      let level: PatientRecord["triageLevel"] = "Green";
      const sat = parseInt(vitals?.o2Saturation);
      
      if (currentProject.epidemicFever && currentProject.epidemicTravel) {
        level = "Red";
      } else if (currentProject.emergencySigns && currentProject.emergencySigns.length > 0) {
        level = "Red";
      } else if (!isNaN(sat) && sat < 92) {
        level = "Red";
      } else if (score >= 7) {
        level = "Red";
      } else if (score >= 5) {
        level = "Orange";
      } else if (score >= 3) {
        level = "Yellow";
      } else {
        level = "Green";
      }

      if (currentProject.tewsScore !== score || currentProject.triageLevel !== level) {
         setTimeout(() => {
           updateCurrentProject({ tewsScore: score, triageLevel: level });
         }, 0);
      }
    }
  }, [
    currentProject.vitals, 
    currentProject.tewsData, 
    currentProject.emergencySigns, 
    currentProject.epidemicFever, 
    currentProject.epidemicTravel, 
    currentStep,
    currentProject.tewsScore,
    currentProject.triageLevel
  ]);

  return (
    <div className="flex flex-col min-h-full bg-stone-50/50 font-sans pb-20">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50 animate-fade-in ${
          toast.type === "success" ? "bg-stone-900 text-white" : "bg-red-500 text-white"
        }`}>
          {toast.type === "success" ? <CheckCircle size={16} className="text-emerald-400" /> : <X size={16} />}
          <span className="text-[12px] font-bold tracking-wide">{toast.msg}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-8 py-5 sticky top-0 z-30 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate && onNavigate("dashboard")}
            className="p-2 rounded-xl hover:bg-stone-100 text-stone-500 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-[18px] font-black text-stone-900 tracking-tight">New Patient Admission</h2>
            <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest mt-0.5">
              Draft ID: {selectedProjectId}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-[11px] font-bold text-stone-500 hover:text-stone-800 transition-colors px-3 py-2 rounded-lg hover:bg-stone-100">
            Save Draft
          </button>
        </div>
      </div>

      <div className="flex-1 flex px-8 py-8 gap-8 max-w-[1200px] mx-auto w-full">
        {/* Left Sidebar Stepper */}
        <div className="w-[280px] shrink-0 hidden md:block">
          <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sticky top-[100px] shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-5 pl-2">Admission Process</h3>
            <div className="space-y-1 relative">
              {WIZARD_STEPS.map((step, idx) => {
                const isActive = currentStep === step.index;
                const isPast = currentStep > step.index;
                
                return (
                  <button
                    key={idx}
                    onClick={() => updateCurrentProject({ currentStep: step.index })}
                    className={`w-full flex items-start gap-3.5 p-3 rounded-xl transition-all text-left ${
                      isActive ? "bg-[#0B5B3E]/5 border border-[#0B5B3E]/20" : 
                      isPast ? "hover:bg-stone-50 border border-transparent" : 
                      "opacity-50 border border-transparent"
                    }`}
                  >
                    <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                      isActive ? "bg-[#0B5B3E] text-white shadow-md" : 
                      isPast ? "bg-stone-200 text-stone-600" : 
                      "bg-stone-100 text-stone-400"
                    }`}>
                      {isPast && !isActive ? <CheckCircle size={14} /> : step.icon}
                    </div>
                    <div>
                      <p className={`text-[12px] font-bold ${isActive ? "text-[#0B5B3E]" : "text-stone-700"}`}>
                        {step.title}
                      </p>
                      <p className="text-[10px] text-stone-400 mt-0.5 leading-snug">{step.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <div className="bg-white border border-stone-200/80 rounded-2xl shadow-sm overflow-hidden">
            
            {/* Step Header */}
            <div className="px-8 py-6 border-b border-stone-100 bg-stone-50/30">
              <h3 className="text-[18px] font-black text-stone-900">{WIZARD_STEPS[currentStep].title}</h3>
              <p className="text-[12px] text-stone-500 font-medium mt-1">{WIZARD_STEPS[currentStep].desc}</p>
            </div>

            <div className="p-8">
              {/* STEP 1: Patient Details */}
              {currentStep === 0 && (
                <div className="space-y-6 animate-fade-in">
                  {/* Mode Toggle */}
                  <div className="flex bg-stone-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => updateCurrentProject({ patientMode: "identified", anonymousIndicator: "", weightKg: "" })}
                      className={`flex-1 py-2 text-[12px] font-bold rounded-lg transition-all cursor-pointer ${
                        currentProject.patientMode !== "anonymous" 
                          ? "bg-white text-[#0B5B3E] shadow-sm" 
                          : "text-stone-500 hover:text-stone-700"
                      }`}
                    >
                      Identified Patient
                    </button>
                    <button
                      type="button"
                      onClick={() => updateCurrentProject({ patientMode: "anonymous", patientId: "", firstName: "", lastName: "", gender: "", mockImage: "", weightKg: "", ageRange: "" })}
                      className={`flex-1 py-2 text-[12px] font-bold rounded-lg transition-all cursor-pointer ${
                        currentProject.patientMode === "anonymous" 
                          ? "bg-white text-[#0B5B3E] shadow-sm" 
                          : "text-stone-500 hover:text-stone-700"
                      }`}
                    >
                      Anonymous Mode
                    </button>
                  </div>

                  {currentProject.patientMode !== "anonymous" ? (
                    <div className="space-y-6 animate-fade-in">
                      {!currentProject.isOutsider ? (
                        <label className="block">
                          <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">National ID / Patient ID</span>
                            <button 
                              type="button" 
                              onClick={() => updateCurrentProject({ isOutsider: true, isNewRegistration: true, patientId: "", firstName: "", lastName: "", gender: "", age: "", email: "", phone: "", insurances: [], mockImage: undefined })}
                              className="text-[10px] font-bold text-[#0B5B3E] hover:underline"
                            >
                              Register International Patient
                            </button>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <input 
                              value={currentProject.patientId || ""}
                              onChange={e => updateCurrentProject({ patientId: e.target.value })}
                              className="flex-1 bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium outline-none focus:border-[#0B5B3E] focus:bg-white transition-all shadow-sm"
                              placeholder="e.g. 1 1990 8 0000000 0 00 or P-12345" 
                            />
                            <button 
                              type="button"
                              onClick={() => {
                                if (!currentProject.patientId) return;
                                if (currentProject.patientId.endsWith("404")) {
                                  updateCurrentProject({
                                    isNewRegistration: true,
                                    firstName: "",
                                    lastName: "",
                                    gender: "",
                                    age: "",
                                    email: "",
                                    phone: "",
                                    insurances: [],
                                    mockImage: undefined
                                  });
                                  showToastMsg("Patient not found. Please register.");
                                } else if (currentProject.patientId.length >= 16) {
                                  updateCurrentProject({
                                    isNewRegistration: false,
                                    firstName: "Jean",
                                    lastName: "Mugisha",
                                    gender: "Male",
                                    age: "36",
                                    mockImage: "https://i.pravatar.cc/150?u=jean"
                                  });
                                  showToastMsg("National ID found. Details retrieved.");
                                } else {
                                  updateCurrentProject({
                                    isNewRegistration: false,
                                    firstName: "Alice",
                                    lastName: "Uwimana",
                                    gender: "Female",
                                    age: "24",
                                    mockImage: undefined
                                  });
                                  showToastMsg("Patient ID found. Details retrieved.");
                                }
                              }}
                              className="bg-[#0B5B3E] text-white px-5 rounded-xl text-[12px] font-bold hover:bg-[#0B5B3E]/90 transition-all flex items-center gap-2 cursor-pointer"
                            >
                              <Search size={14} /> Lookup
                            </button>
                          </div>
                        </label>
                      ) : (
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-[12px] font-black text-orange-900 uppercase tracking-widest">International Patient / Outsider</h4>
                            <button 
                              type="button" 
                              onClick={() => updateCurrentProject({ isOutsider: false, isNewRegistration: false, passportNumber: "" })}
                              className="text-[10px] font-bold text-orange-700 hover:underline"
                            >
                              Cancel
                            </button>
                          </div>
                          <label className="block">
                            <span className="text-[10px] font-black text-orange-800 uppercase tracking-widest">Passport Number</span>
                            <input 
                              value={currentProject.passportNumber || ""}
                              onChange={e => updateCurrentProject({ passportNumber: e.target.value })}
                              className="mt-2 w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-[12px] font-medium outline-none focus:border-orange-500 transition-all shadow-sm"
                              placeholder="e.g. PC1234567" 
                            />
                          </label>
                        </div>
                      )}

                      {currentProject.isNewRegistration ? (
                        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 animate-fade-in space-y-4">
                          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                            <h4 className="text-[13px] font-black text-stone-800 uppercase tracking-widest">New Patient Registration</h4>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <label className="block">
                              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">First Name</span>
                              <input value={currentProject.firstName || ""} onChange={e => updateCurrentProject({ firstName: e.target.value })} className="mt-2 w-full bg-white border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium" />
                            </label>
                            <label className="block">
                              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Last Name</span>
                              <input value={currentProject.lastName || ""} onChange={e => updateCurrentProject({ lastName: e.target.value })} className="mt-2 w-full bg-white border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium" />
                            </label>
                            <label className="block">
                              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Gender</span>
                              <select value={currentProject.gender || ""} onChange={e => updateCurrentProject({ gender: e.target.value })} className="mt-2 w-full bg-white border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium">
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </label>
                            <label className="block">
                              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Age</span>
                              <input type="number" value={currentProject.age || ""} onChange={e => updateCurrentProject({ age: e.target.value })} className="mt-2 w-full bg-white border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium" />
                            </label>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="block">
                              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Email</span>
                              <input type="email" value={currentProject.email || ""} onChange={e => updateCurrentProject({ email: e.target.value })} className="mt-2 w-full bg-white border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium" />
                            </label>
                            <label className="block">
                              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Phone Number</span>
                              <input value={currentProject.phone || ""} onChange={e => updateCurrentProject({ phone: e.target.value })} className="mt-2 w-full bg-white border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium" />
                            </label>
                          </div>
                          
                          <div className="pt-2">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Insurance Information</span>
                              <button 
                                type="button"
                                onClick={() => updateCurrentProject({ insurances: [...(currentProject.insurances || []), { provider: "", policyNumber: "" }] })}
                                className="text-[10px] font-bold text-[#0B5B3E] hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <Plus size={12} /> Add Insurance
                              </button>
                            </div>
                            {(currentProject.insurances || []).length === 0 && (
                              <p className="text-[11px] text-stone-500 italic">No insurance records added.</p>
                            )}
                            <div className="space-y-3">
                              {(currentProject.insurances || []).map((ins, idx) => (
                                <div key={idx} className="flex gap-3 items-end">
                                  <label className="flex-1 block">
                                    <span className="text-[10px] font-bold text-stone-500 mb-1 block">Provider</span>
                                    <input value={ins.provider} onChange={e => {
                                      const newIns = [...(currentProject.insurances || [])];
                                      newIns[idx].provider = e.target.value;
                                      updateCurrentProject({ insurances: newIns });
                                    }} className="w-full bg-white border border-stone-200/80 rounded-xl px-3 py-2.5 text-[12px] font-medium outline-none focus:border-[#0B5B3E]" placeholder="e.g. RSSB" />
                                  </label>
                                  <label className="flex-1 block">
                                    <span className="text-[10px] font-bold text-stone-500 mb-1 block">Policy Number</span>
                                    <input value={ins.policyNumber} onChange={e => {
                                      const newIns = [...(currentProject.insurances || [])];
                                      newIns[idx].policyNumber = e.target.value;
                                      updateCurrentProject({ insurances: newIns });
                                    }} className="w-full bg-white border border-stone-200/80 rounded-xl px-3 py-2.5 text-[12px] font-medium outline-none focus:border-[#0B5B3E]" placeholder="e.g. 12345678" />
                                  </label>
                                  <button type="button" onClick={() => {
                                    const newIns = [...(currentProject.insurances || [])];
                                    newIns.splice(idx, 1);
                                    updateCurrentProject({ insurances: newIns });
                                  }} className="h-10 w-10 shrink-0 bg-red-50 border border-red-200 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors cursor-pointer">
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (currentProject.firstName || currentProject.lastName) ? (
                        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 flex gap-5 animate-fade-in">
                          {currentProject.mockImage && (
                            <img src={currentProject.mockImage} alt="Patient" className="w-16 h-16 rounded-full border-2 border-stone-200 object-cover shrink-0" />
                          )}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                            <div>
                              <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">First Name</span>
                              <p className="text-[13px] font-bold text-stone-800 mt-1">{currentProject.firstName}</p>
                            </div>
                            <div>
                              <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Last Name</span>
                              <p className="text-[13px] font-bold text-stone-800 mt-1">{currentProject.lastName}</p>
                            </div>
                            <div>
                              <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Gender</span>
                              <p className="text-[13px] font-bold text-stone-800 mt-1">{currentProject.gender}</p>
                            </div>
                            <div>
                              <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Age</span>
                              <p className="text-[13px] font-bold text-stone-800 mt-1">{currentProject.age}</p>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      <label className="block">
                        <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Weight (kg)</span>
                        <input 
                          type="number"
                          value={currentProject.weightKg || ""}
                          onChange={e => updateCurrentProject({ weightKg: e.target.value })}
                          className="mt-2 w-full md:w-1/2 bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium outline-none focus:border-[#0B5B3E] focus:bg-white transition-all shadow-sm"
                          placeholder="e.g. 70" 
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-6 animate-fade-in">
                      <label className="block">
                        <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Anonymous Indicator / Alias</span>
                        <input 
                          value={currentProject.anonymousIndicator || ""}
                          onChange={e => updateCurrentProject({ anonymousIndicator: e.target.value, title: e.target.value })}
                          className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium outline-none focus:border-[#0B5B3E] focus:bg-white transition-all shadow-sm"
                          placeholder="e.g. Accident Victim A or John Doe" 
                        />
                      </label>
                      <label className="block">
                        <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2 block">Estimated Age Range</span>
                        <div className="flex flex-wrap gap-2">
                          {["0-12 (Child)", "13-17 (Teen)", "18-35 (Young Adult)", "36-60 (Adult)", "60+ (Senior)"].map(range => (
                            <button
                              key={range}
                              type="button"
                              onClick={() => updateCurrentProject({ ageRange: range })}
                              className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all border-2 ${
                                currentProject.ageRange === range
                                  ? "bg-[#0B5B3E] text-white border-[#0B5B3E] shadow-md shadow-[#0B5B3E]/20"
                                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
                              }`}
                            >
                              {range}
                            </button>
                          ))}
                        </div>
                      </label>
                      <label className="block">
                        <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Weight (kg)</span>
                        <input 
                          type="number"
                          value={currentProject.weightKg || ""}
                          onChange={e => updateCurrentProject({ weightKg: e.target.value })}
                          className="mt-2 w-full md:w-1/2 bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium outline-none focus:border-[#0B5B3E] focus:bg-white transition-all shadow-sm"
                          placeholder="e.g. 70" 
                        />
                      </label>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: Triage & Vitals */}
              {currentStep === 1 && (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* Epidemic Screening */}
                  <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
                    <h4 className="text-[12px] font-black text-stone-800 uppercase tracking-widest mb-4">Patient Screening (Before A&E)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => updateCurrentProject({ epidemicFever: !currentProject.epidemicFever })}
                        className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${
                          currentProject.epidemicFever
                            ? "bg-orange-50 border-orange-500 shadow-md shadow-orange-500/20"
                            : "bg-stone-50 border-stone-200 hover:border-orange-300"
                        }`}
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 ${currentProject.epidemicFever ? "bg-orange-500 border-orange-500 text-white" : "border-stone-300 bg-white"}`}>
                          {currentProject.epidemicFever && <CheckCircle size={14} />}
                        </div>
                        <div>
                          <span className={`block text-[13px] font-bold ${currentProject.epidemicFever ? "text-orange-900" : "text-stone-700"}`}>Fever Present</span>
                          <span className="block text-[11px] text-stone-500 mt-1 leading-tight">Patient has a fever now or in the past 3 days.</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => updateCurrentProject({ epidemicTravel: !currentProject.epidemicTravel })}
                        className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${
                          currentProject.epidemicTravel
                            ? "bg-orange-50 border-orange-500 shadow-md shadow-orange-500/20"
                            : "bg-stone-50 border-stone-200 hover:border-orange-300"
                        }`}
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 ${currentProject.epidemicTravel ? "bg-orange-500 border-orange-500 text-white" : "border-stone-300 bg-white"}`}>
                          {currentProject.epidemicTravel && <CheckCircle size={14} />}
                        </div>
                        <div>
                          <span className={`block text-[13px] font-bold ${currentProject.epidemicTravel ? "text-orange-900" : "text-stone-700"}`}>Epidemic Exposure</span>
                          <span className="block text-[11px] text-stone-500 mt-1 leading-tight">Positive travel history or known epidemic contact.</span>
                        </div>
                      </button>
                    </div>
                    {currentProject.epidemicFever && currentProject.epidemicTravel && (
                      <div className="mt-4 p-4 bg-red-100 text-red-800 text-[12px] font-bold rounded-xl flex items-center gap-3 border border-red-200 shadow-sm animate-fade-in">
                        <ShieldAlert size={18} className="shrink-0" />
                        <span>CRITICAL: Contact Infection Control immediately and transport patient to isolation!</span>
                      </div>
                    )}
                  </div>

                  {/* Emergency Signs */}
                  {!(currentProject.epidemicFever && currentProject.epidemicTravel) && (
                    <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
                      <h4 className="text-[12px] font-black text-stone-800 uppercase tracking-widest mb-1">1. Emergency Signs (Evaluate For)</h4>
                      <p className="text-[11px] text-stone-500 mb-4">Select any critical signs present. Checking any sign instantly flags as RED priority.</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          "Not Breathing / Obstructed",
                          "Severe Respiratory Distress",
                          "Cardiac Arrest",
                          "Hemorrhage - uncontrolled",
                          "Current convulsion/seizure",
                          "Coma (Unresponsive)",
                          "Hypoglycemia (<3 mmol/L)",
                          "Burn to face / inhalation"
                        ].map(sign => {
                          const isActive = (currentProject.emergencySigns || []).includes(sign);
                          return (
                            <button 
                              key={sign} 
                              type="button"
                              onClick={() => {
                                const signs = currentProject.emergencySigns || [];
                                if (!isActive) updateCurrentProject({ emergencySigns: [...signs, sign] });
                                else updateCurrentProject({ emergencySigns: signs.filter(s => s !== sign) });
                              }}
                              className={`p-3 rounded-xl border-2 text-left transition-all flex flex-col ${
                                isActive 
                                  ? "bg-red-50 border-red-500 shadow-md shadow-red-500/20" 
                                  : "bg-stone-50 border-stone-200 hover:border-red-300"
                              }`}
                            >
                              <div className="flex justify-between items-start mb-2 w-full">
                                <Activity size={14} className={isActive ? "text-red-500" : "text-stone-400"} />
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isActive ? "bg-red-500 border-red-500 text-white" : "border-stone-300 bg-white"}`}>
                                  {isActive && <CheckCircle size={10} />}
                                </div>
                              </div>
                              <span className={`block text-[11px] font-bold leading-snug ${isActive ? "text-red-900" : "text-stone-700"}`}>{sign}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Vitals and TEWS */}
                  {!(currentProject.epidemicFever && currentProject.epidemicTravel) && (!currentProject.emergencySigns || currentProject.emergencySigns.length === 0) && (
                    <div className="space-y-6">
                      <div className="bg-white border border-stone-200 rounded-xl p-5">
                        <h4 className="text-[12px] font-black text-stone-800 uppercase tracking-widest mb-4">2. Vital Signs</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <label className="block">
                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">HR (bpm)</span>
                            <input value={currentProject.vitals?.heartRate || ""} onChange={e => updateCurrentProject({ vitals: { ...currentProject.vitals!, heartRate: e.target.value } })} className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium" placeholder="e.g. 75" />
                          </label>
                          <label className="block">
                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">BP (mmHg)</span>
                            <input value={currentProject.vitals?.bloodPressure || ""} onChange={e => updateCurrentProject({ vitals: { ...currentProject.vitals!, bloodPressure: e.target.value } })} className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium" placeholder="e.g. 120/80" />
                          </label>
                          <label className="block">
                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Temp (°C)</span>
                            <input value={currentProject.vitals?.temperature || ""} onChange={e => updateCurrentProject({ vitals: { ...currentProject.vitals!, temperature: e.target.value } })} className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium" placeholder="e.g. 36.5" />
                          </label>
                          <label className="block">
                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">RR (breaths/min)</span>
                            <input value={currentProject.vitals?.respiratoryRate || ""} onChange={e => updateCurrentProject({ vitals: { ...currentProject.vitals!, respiratoryRate: e.target.value } })} className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium" placeholder="e.g. 16" />
                          </label>
                          <label className="block">
                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">O2 SAT %</span>
                            <input value={currentProject.vitals?.o2Saturation || ""} onChange={e => updateCurrentProject({ vitals: { ...currentProject.vitals!, o2Saturation: e.target.value } })} className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium" placeholder="e.g. 98" />
                          </label>
                          <label className="block">
                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Pain /10</span>
                            <input value={currentProject.vitals?.painScore || ""} onChange={e => updateCurrentProject({ vitals: { ...currentProject.vitals!, painScore: e.target.value } })} className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium" placeholder="e.g. 2" />
                          </label>
                        </div>
                      </div>

                      <div className="bg-white border border-stone-200 rounded-xl p-5">
                        <h4 className="text-[12px] font-black text-stone-800 uppercase tracking-widest mb-4">3. TEWS Assessment</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <label className="block">
                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Mobility</span>
                            <select value={currentProject.tewsData?.mobility || "Walking"} onChange={e => updateCurrentProject({ tewsData: { ...currentProject.tewsData!, mobility: e.target.value } })} className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium">
                              <option value="Walking">Walking</option>
                              <option value="Wheelchair">Wheelchair</option>
                              <option value="Stretcher">Stretcher</option>
                            </select>
                          </label>
                          <label className="block">
                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">AVPU</span>
                            <select value={currentProject.tewsData?.avpu || "A"} onChange={e => updateCurrentProject({ tewsData: { ...currentProject.tewsData!, avpu: e.target.value } })} className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium">
                              <option value="A">Alert</option>
                              <option value="V">Voice</option>
                              <option value="P">Pain</option>
                              <option value="U">Unresponsive</option>
                            </select>
                          </label>
                          <label className="block">
                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Trauma</span>
                            <select value={currentProject.tewsData?.trauma || "No"} onChange={e => updateCurrentProject({ tewsData: { ...currentProject.tewsData!, trauma: e.target.value } })} className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium">
                              <option value="No">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Triage Result Display */}
                  <div className={`mt-6 p-5 rounded-xl border-2 flex items-center justify-between ${
                    currentProject.triageLevel === "Red" ? "border-red-500 bg-red-50" :
                    currentProject.triageLevel === "Orange" ? "border-orange-500 bg-orange-50" :
                    currentProject.triageLevel === "Yellow" ? "border-yellow-500 bg-yellow-50" :
                    "border-emerald-500 bg-emerald-50"
                  }`}>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-500">Calculated Triage Level</h4>
                      <p className={`text-[18px] font-black uppercase mt-1 ${
                        currentProject.triageLevel === "Red" ? "text-red-700" :
                        currentProject.triageLevel === "Orange" ? "text-orange-700" :
                        currentProject.triageLevel === "Yellow" ? "text-yellow-700" :
                        "text-emerald-700"
                      }`}>{currentProject.triageLevel} PRIORITY</p>
                    </div>
                    {currentProject.tewsScore !== undefined && (
                      <div className="text-right">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-500">TEWS Score</h4>
                        <p className="text-[24px] font-black text-stone-900">{currentProject.tewsScore}</p>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* STEP 3: Preliminary Diagnostics */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <label className="block">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-2">Nurse Observations</span>
                    <textarea 
                      value={currentProject.nurseObservations || ""}
                      onChange={e => updateCurrentProject({ nurseObservations: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium outline-none focus:border-[#0B5B3E] focus:bg-white transition-all shadow-sm min-h-[120px]"
                      placeholder="Enter chief complaint, visible symptoms, and initial nurse notes..." 
                    />
                  </label>

                  <div className="block">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-2">Required Tests (Optional)</span>
                    <div className="flex flex-wrap gap-2">
                      {["CBC", "X-Ray", "CT Scan", "Urinalysis", "ECG", "Ultrasound", "COVID-19"].map(test => (
                        <button
                          key={test}
                          type="button"
                          onClick={() => toggleTest(test)}
                          className={`px-4 py-2 rounded-lg border text-[11px] font-bold transition-all ${
                            (currentProject.requiredTests || []).includes(test)
                              ? "bg-[#0B5B3E] text-white border-[#0B5B3E]"
                              : "bg-white text-stone-500 border-stone-200 hover:border-stone-300"
                          }`}
                        >
                          {test}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Ward Assignment */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Assign Ward</span>
                      <select 
                        value={currentProject.assignedWard || ""}
                        onChange={e => updateCurrentProject({ assignedWard: e.target.value })}
                        className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium outline-none focus:border-[#0B5B3E] focus:bg-white transition-all shadow-sm cursor-pointer"
                      >
                        <option value="">Select Ward...</option>
                        <option value="Emergency Room">Emergency Room (ER)</option>
                        <option value="Intensive Care Unit">Intensive Care Unit (ICU)</option>
                        <option value="General Ward">General Ward</option>
                        <option value="Maternity">Maternity</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Surgery">Surgery / OR</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Bed Number (Optional)</span>
                      <input 
                        value={currentProject.assignedBed || ""}
                        onChange={e => updateCurrentProject({ assignedBed: e.target.value })}
                        className="mt-2 w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium outline-none focus:border-[#0B5B3E] focus:bg-white transition-all shadow-sm"
                        placeholder="e.g. Bed 12" 
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-2">Final Admission Notes</span>
                    <textarea 
                      value={currentProject.admissionNotes || ""}
                      onChange={e => updateCurrentProject({ admissionNotes: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3 text-[12px] font-medium outline-none focus:border-[#0B5B3E] focus:bg-white transition-all shadow-sm min-h-[80px]"
                      placeholder="Any additional instructions for the receiving ward..." 
                    />
                  </label>
                </div>
              )}

            </div>

            {/* Bottom Actions */}
            <div className="bg-stone-50 border-t border-stone-200/80 px-8 py-5 flex items-center justify-between">
              {currentStep > 0 ? (
                <button 
                  onClick={prevStep}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-[12px] font-bold hover:bg-white transition-colors"
                >
                  Back
                </button>
              ) : <div />}
              
              <button 
                onClick={() => {
                  const isEarlySubmit = currentStep === 1 && currentProject.triageLevel === "Red";
                  if (isEarlySubmit) {
                    showToastMsg("EMERGENCY: Patient Sent Immediately to Doctor!");
                    setTimeout(() => onNavigate && onNavigate("dashboard"), 1500);
                  } else if (currentStep < WIZARD_STEPS.length - 1) {
                    nextStep();
                  } else {
                    showToastMsg("Patient Admitted Successfully!");
                    setTimeout(() => onNavigate && onNavigate("dashboard"), 1500);
                  }
                }}
                className={`px-6 py-2.5 rounded-xl text-white text-[12px] font-bold transition-all shadow-md ${
                  currentStep === 1 && currentProject.triageLevel === "Red"
                    ? "bg-red-600 hover:bg-red-700 shadow-red-600/20"
                    : "bg-[#0B5B3E] hover:bg-[#0B5B3E]/90 shadow-[#0B5B3E]/20"
                }`}
              >
                {currentStep === 1 && currentProject.triageLevel === "Red" ? "Submit to Doctor (Emergency)" : currentStep === WIZARD_STEPS.length - 1 ? "Complete Admission" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSubmission;
