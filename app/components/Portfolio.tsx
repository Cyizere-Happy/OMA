"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Calendar, 
  MessageSquare, 
  Phone, 
  Mail, 
  Hash, 
  User, 
  Plus, 
  MoreHorizontal, 
  ArrowUpRight, 
  Check, 
  Paperclip, 
  Smile, 
  Image as ImageIcon,
  Send,
  Clock,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Layout,
  FileText
} from "lucide-react";

const initialWorklist = [
  { id: 1, name: "Jessica Caballero", role: "Investor - Premium", level: "Premium", active: true, image: "/jessica.png" },
  { id: 2, name: "Jane Doe", role: "Investor - Gold", level: "Gold", active: false, image: "/jessica.png" },
  { id: 3, name: "Jack Donovan", role: "Investor - Silver", level: "Silver", active: false, image: "/jessica.png" },
  { id: 4, name: "Barry White", role: "Investor - Basic", level: "Basic", active: false, image: "/jessica.png" },
];

const timeline = [
  { 
    id: 1, 
    date: "12 May", 
    title: "Document Verified by Compliance", 
    desc: "Investment agreement for Kigali Heights Plaza has been signed and verified.", 
    user: "Marty C.", 
    status: "Verified",
    icon: <Check size={14} />,
    statusColor: "bg-[#1E3A5F]/10 text-[#1E3A5F]"
  },
  { 
    id: 2, 
    date: "15 May", 
    title: "Gathering additional information", 
    desc: "The compliance team is reviewing your updated residential address docs.", 
    user: "Marty C.", 
    status: "Reviewing",
    icon: <MessageSquare size={14} />,
    statusColor: "bg-[#1E3A5F]/5 text-[#1E3A5F]/60"
  }
];

const Portfolio = () => {
  const [message, setMessage] = useState("");
  const [worklistItems, setWorklistItems] = useState(initialWorklist);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FDFDFD] overflow-hidden">
      
      {/* 3-Column Layout Container */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Side: Worklist Sidebar (White) */}
        <aside className="w-52 bg-[#F9F9F9] border-r border-gray-100 flex flex-col p-3 overflow-y-auto no-scrollbar pt-6 transition-all duration-300">
          <div className="grid grid-cols-2 gap-1.5 mb-6">
            <div className="bg-white p-2.5 rounded-xl border border-gray-100 relative overflow-hidden group hover:border-[#1E3A5F]/30 transition-all cursor-pointer shadow-sm">
               <div className="w-1.5 h-1.5 rounded-full border border-[#1E3A5F] mb-1 shadow-[0_0_8px_rgba(30,58,95,0.2)]" />
               <p className="text-gray-900 text-base font-black leading-none">6</p>
               <p className="text-gray-400 text-[7.5px] font-bold uppercase tracking-wider mt-0.5">Portfolio</p>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-gray-100 hover:border-red-500/30 transition-all cursor-pointer shadow-sm">
               <div className="w-1.5 h-1.5 rounded-full border border-red-500 mb-1" />
               <p className="text-gray-900 text-base font-black leading-none">27</p>
               <p className="text-gray-400 text-[7.5px] font-bold uppercase tracking-wider mt-0.5">New Leads</p>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-gray-100 hover:border-blue-500/30 transition-all cursor-pointer shadow-sm">
               <div className="w-1.5 h-1.5 rounded-full border border-blue-500 mb-1" />
               <p className="text-gray-900 text-base font-black leading-none">22</p>
               <p className="text-gray-400 text-[7.5px] font-bold uppercase tracking-wider mt-0.5">Updates</p>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-gray-100 hover:border-purple-500/30 transition-all cursor-pointer shadow-sm">
               <div className="w-1.5 h-1.5 rounded-full border border-purple-500 mb-1" />
               <p className="text-gray-900 text-base font-black leading-none">3</p>
               <p className="text-gray-400 text-[7.5px] font-bold uppercase tracking-wider mt-0.5">Assigned</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3 px-1">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border border-gray-200" />
                <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Active Assets</h3>
             </div>
             <ChevronDown size={12} className="text-gray-300" />
          </div>

          <div className="space-y-1.5">
            {worklistItems.map((item) => (
              <div 
                key={item.id}
                onClick={() =>
                  setWorklistItems((prev) => prev.map((i) => ({ ...i, active: i.id === item.id })))
                }
                className={`p-2.5 rounded-xl cursor-pointer transition-all duration-300 relative group ${
                  item.active ? 'bg-[#1E3A5F] text-white shadow-[0_4px_15px_rgba(30,58,95,0.3)] scale-[1.02]' : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="w-8 h-8 rounded-full border border-gray-100" />
                    <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border-2 ${item.active ? 'border-[#1E3A5F]' : 'border-white'} ${
                      item.level === 'Premium' ? 'bg-[#D9F443]' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className={`text-[11px] font-black truncate ${item.active ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4>
                    <p className={`text-[8px] font-bold ${item.active ? 'text-white/60' : 'text-gray-400'}`}>{item.role}</p>
                  </div>
                  <ArrowUpRight size={10} className={`ml-auto ${item.active ? 'text-white/40' : 'text-gray-200'}`} />
                </div>
                {item.active && (
                  <div className="mt-2.5 flex items-center justify-between">
                   <div className="flex items-center gap-1 bg-white/20 px-1.5 py-0.5 rounded-lg border border-white/10">
                      <FileText size={9} className="text-white" />
                      <span className="text-[7.5px] font-black text-white leading-none">Awaiting yield</span>
                   </div>
                   <span className="bg-red-500 text-white text-[7.5px] font-black px-1.5 py-0.5 rounded-full shadow-sm">High</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Center: Main Content (Profile + Feed) */}
        <main className="flex-1 flex flex-col bg-[#FDFDFD] relative overflow-hidden transition-all duration-300">
          
          {/* Top Profile Header */}
          <div className="p-6 pt-8 flex items-start justify-between">
            <div className="flex gap-5">
              <div className="w-16 h-16 rounded-full border-[4px] border-white shadow-lg overflow-hidden shrink-0">
                <img src="/jessica.png" alt="Jessica Caballero" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tighter mb-1 leading-none pt-1">Jessica Caballero</h1>
                <div className="flex items-center gap-4 text-gray-500">
                  <div className="text-[10px]">
                    <p className="font-bold">Portfolio Manager • Microsoft (22k empl)</p>
                    <p className="opacity-60">211B Thompson Cir, Syracuse, NY</p>
                  </div>
                  <div className="w-px h-6 bg-gray-200" />
                  <div className="text-[10px]">
                    <p className="font-bold">(201) 555-0100</p>
                    <p className="opacity-60">michelle.rivera@example.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full border border-gray-100 p-0.5">
                  <img src="/jessica.png" alt="" className="w-full h-full rounded-full" />
                </div>
                <div className="text-right">
                   <p className="text-[9px] font-black text-gray-900 leading-none">Manager</p>
                   <p className="text-[8px] font-bold text-gray-400">Marty C.</p>
                </div>
                <MoreHorizontal size={14} className="text-gray-300 ml-1" />
              </div>
              <div className="flex gap-1.5">
                <span className="bg-red-500 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg shadow-red-500/20 uppercase tracking-widest">High</span>
                <span className="bg-yellow-400 text-black text-[9px] font-black px-3 py-1 rounded-full shadow-lg shadow-yellow-400/20 uppercase tracking-widest">Warm</span>
              </div>
            </div>
          </div>

          {/* Action Icons Bar */}
          <div className="px-6 flex items-center justify-between mb-4">
            <div className="flex gap-1">
              {[
                { icon: <Phone size={14} />, color: "bg-[#1E3A5F] text-white" },
                { icon: <MessageSquare size={14} />, color: "bg-[#1E3A5F]/10 text-[#1E3A5F]" },
                { icon: <Mail size={14} />, color: "bg-[#1E3A5F]/10 text-[#1E3A5F]" },
                { icon: <Calendar size={14} />, color: "bg-[#1E3A5F]/10 text-[#1E3A5F]" },
              ].map((btn, i) => (
                <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all ${btn.color}`}>
                  {btn.icon}
                </div>
              ))}
              <button className="w-7 h-7 bg-white text-gray-400 rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                 <Plus size={13} />
              </button>
            </div>

            <div className="bg-white/50 backdrop-blur-md rounded-full p-0.5 flex gap-0.5 border border-white/20 shadow-sm">
               {["Summary", "Analytics", "Details", "Files", "History"].map((tab, i) => (
                 <button key={tab} className={`px-4 py-1 rounded-full text-[10px] font-black transition-all ${i === 0 ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-900'}`}>
                   {tab === "Summary" && <span className="mr-1.5">💼</span>}
                   {tab}
                 </button>
               ))}
            </div>
          </div>

          {/* Activity Feed Container scrollable */}
          <div className="flex-1 overflow-y-auto px-6 pb-20 custom-scrollbar">
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-[32px] p-5 shadow-2xl relative">
              <div className="flex items-center justify-center gap-5 mb-6 text-gray-400">
                 <Filter size={14} />
                 <Calendar size={14} />
                 <Search size={14} />
              </div>

              {/* Timeline Items */}
              <div className="space-y-6 relative">
                <div className="absolute left-[13px] top-4 bottom-4 w-px bg-gray-200" />
                
                {timeline.map((item) => (
                  <div key={item.id} className="flex gap-4 relative z-10">
                    <div className="flex flex-col items-center">
                       <div className="w-7 h-7 rounded-full bg-blue-400/10 flex items-center justify-center text-blue-500 mb-0.5">
                          {item.icon}
                       </div>
                       <p className="text-[8px] font-black text-gray-400 uppercase tracking-tighter w-max">{item.date}</p>
                    </div>
                    <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex-1 group hover:shadow-md transition-all relative cursor-pointer">
                       <div className="flex items-center justify-between mb-1.5">
                          <h4 className="text-[12px] font-black text-gray-900">{item.title}</h4>
                          <div className="flex items-center gap-1.5">
                             <img src="/jessica.png" alt="" className="w-4 h-4 rounded-full" />
                             <span className="text-[9px] font-bold text-gray-400">{item.user}</span>
                             <div className="w-px h-2.5 bg-gray-200" />
                             <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${item.statusColor}`}>
                               {item.status}
                             </span>
                          </div>
                       </div>
                       <p className="text-[10.5px] font-bold text-gray-500 leading-snug">{item.desc}</p>
                       <div className="absolute top-3 right-3 text-gray-200 group-hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-all">
                          <ArrowUpRight size={12} />
                       </div>
                    </div>
                  </div>
                ))}

                {/* Chat Section */}
                <div className="flex gap-4 relative z-10 pt-2">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                      <MessageSquare size={13} />
                    </div>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-[24px] p-3 flex-1 shadow-sm">
                    <div className="flex items-center gap-1.5 mb-3 px-1">
                       <div className="relative">
                          <img src="/jessica.png" alt="" className="w-5 h-5 rounded-full" />
                          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-green-500 rounded-full border border-white" />
                       </div>
                       <span className="text-[10px] font-black text-gray-900">Jessica Caballero</span>
                    </div>

                    <div className="space-y-2 mb-4 px-1">
                       <div className="flex justify-end">
                          <div className="bg-white border border-gray-100 rounded-xl p-2 shadow-sm max-w-[70%]">
                             <p className="text-[10.5px] font-bold text-gray-700 leading-tight">Hey, how are you?</p>
                          </div>
                       </div>
                       <div className="flex justify-end">
                          <div className="bg-white border border-gray-100 rounded-xl p-2 shadow-sm max-w-[85%]">
                             <p className="text-[10.5px] font-bold text-gray-700 leading-snug">
                               We discussed your wishes with the team in the production department and prepared a proposal.
                             </p>
                          </div>
                       </div>
                       <div className="flex justify-end">
                          <div className="bg-white border border-gray-100 rounded-xl p-2 shadow-sm max-w-[70%] text-right relative">
                             <p className="text-[10.5px] font-bold text-gray-700 leading-tight">Sending it to you, I hope it meets your wishes.</p>
                             <span className="text-[7px] text-gray-300 font-bold block mt-0.5">9:30 am</span>
                          </div>
                       </div>
                       <div className="flex justify-start">
                          <div className="bg-black text-white rounded-xl p-2 shadow-lg max-w-[85%]">
                             <p className="text-[10.5px] font-bold leading-tight">Great, looking forward to it. I'll talk to our finance guy and give you an answer.</p>
                             <span className="text-[7px] text-white/40 font-bold block mt-0.5 text-right">9:31 am</span>
                          </div>
                       </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl p-1.5 flex items-center gap-2">
                       <input 
                         type="text" 
                         value={message}
                         onChange={(e) => setMessage(e.target.value)}
                         placeholder="Enter message..." 
                         className="flex-1 bg-transparent border-none outline-none px-1.5 text-[11px] font-bold"
                       />
                       <div className="flex items-center gap-1.5 pr-1">
                         <button className="text-gray-300 hover:text-gray-900 transition-colors"><ImageIcon size={14} /></button>
                         <button className="text-gray-300 hover:text-gray-900 transition-colors"><Paperclip size={14} /></button>
                          <button className="w-7 h-7 bg-[#1E3A5F] text-white rounded-lg flex items-center justify-center shadow-md hover:scale-105 transition-all border border-white/10">
                             <Send size={12} />
                          </button>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Side: Analysis Sidebar */}
        <aside className="w-68 bg-[#FDFDFD] border-l border-gray-100 flex flex-col p-4 gap-4 overflow-y-auto custom-scrollbar transition-all duration-300">
          {/* Profit Prediction Card */}
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 relative overflow-hidden group">
             <div className="absolute top-3 right-3 text-gray-300 group-hover:text-black cursor-pointer">
                <ArrowUpRight size={14} />
             </div>
             <h3 className="text-base font-black text-gray-900 mb-4 leading-tight">Interested in <br/>Kigali Heights</h3>
             
             <div className="flex gap-2 mb-6">
                <button className="px-4 py-1.5 bg-[#1E3A5F] text-white border border-[#1E3A5F] rounded-full text-[11px] font-black shadow-md">
                   Negotiation
                </button>
                <button className="px-4 py-1.5 bg-gray-50 text-gray-400 border border-gray-100 rounded-full text-[11px] font-black hover:bg-gray-100">
                   Close
                </button>
             </div>

             <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Potential profit:</p>
             <p className="text-3xl font-black text-gray-900 mb-6">$ 25,000</p>

             <div className="space-y-3 mb-8">
              {[
                { label: "Client's portrait", checked: true },
                { label: "Successful cases", checked: true },
                { label: "Low budget", checked: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${item.checked ? 'bg-[#1E3A5F] text-white' : 'border-2 border-gray-100 text-transparent'}`}>
                    <Check size={8} strokeWidth={4} />
                  </div>
                  <span className={`text-[11px] font-black ${item.checked ? 'text-gray-900' : 'text-gray-300'}`}>{item.label}</span>
                </div>
              ))}
           </div>

             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />
          </div>

          {/* Task Card */}
          <div className="bg-[#1E3A5F] rounded-[24px] p-5 shadow-xl flex flex-col items-center text-center relative overflow-hidden group border border-white/10">
             <h3 className="text-[15px] font-black text-white mb-0.5">Task</h3>
             <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-4 leading-none text-center">SEND OUR PROPOSAL</p>
             
             <div className="bg-white/10 border border-white/10 rounded-xl p-2 w-full flex items-center justify-between mb-6 backdrop-blur-md">
                <div className="flex items-center gap-2">
                   <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-white">
                      <FileText size={13} />
                   </div>
                   <p className="text-[11px] font-black text-white">Proposal</p>
                </div>
                <button className="text-white/40 hover:text-white">
                   <Plus size={14} />
                </button>
             </div>

             <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">THE CUSTOMER CHOOSES BETWEEN</p>
             <div className="flex gap-2 w-full mb-6">
                <button className="flex-1 bg-white/10 border border-white/10 rounded-lg py-1.5 text-[10px] font-black text-white hover:bg-white/20">Us</button>
                <button className="flex-1 bg-white/10 border border-white/10 rounded-lg py-1.5 text-[10px] font-black text-white hover:bg-white/20">Alberto's</button>
             </div>

             <div className="flex items-center gap-2 mb-6">
                <div className="w-4 h-4 bg-[#D9F443] text-black rounded-full flex items-center justify-center shadow-lg">
                   <Check size={10} strokeWidth={4} />
                </div>
                <span className="text-[11px] font-black text-white">Trusted name, Good support</span>
             </div>

             <div className="flex gap-2 w-full">
                <button className="flex-1 bg-black text-white h-9 rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-all text-sm font-black border border-white/10">
                   <Send size={14} />
                </button>
                <button className="w-9 h-9 bg-white/10 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all text-white">
                   <Check size={14} />
                </button>
             </div>
          </div>
        </aside>

      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
