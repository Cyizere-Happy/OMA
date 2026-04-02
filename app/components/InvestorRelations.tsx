"use client";

import React, { useState, useEffect } from "react";
import { Users, Globe, Wallet, TrendingUp, Inbox, Loader2 } from "lucide-react";
import { api } from "../../lib/api";

interface Investor {
  id: string;
  name: string;
  email: string;
  diaspora: boolean;
  kyc_status: string;
  total_invested: number;
  projects: string;
}

const InvestorRelations = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/owner/investors")
      .then(res => setInvestors(res.data || []))
      .catch(err => console.error("Failed to load investors", err))
      .finally(() => setLoading(false));
  }, []);

  const totalRaised = investors.reduce((sum, inv) => sum + inv.total_invested, 0);
  const diasporaCount = investors.filter(inv => inv.diaspora).length;
  const avgInvestment = investors.length > 0 ? totalRaised / investors.length : 0;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F0EFEC]">
      <div className="bg-white border-b border-stone-200 px-8 py-6 z-10 sticky top-0">
        <h2 className="text-2xl font-black text-stone-900 tracking-tight shrink-0">Investor Relations</h2>
        <p className="text-[13px] text-stone-500 font-medium mt-1">
          View who invested in your projects and communicate with stakeholders.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total investors", value: investors.length, icon: <Users size={18} /> },
              { label: "Diaspora investors", value: diasporaCount, icon: <Globe size={18} /> },
              { label: "Total raised", value: `$${totalRaised.toLocaleString()}`, icon: <Wallet size={18} /> },
              { label: "Avg. investment", value: `$${Math.round(avgInvestment).toLocaleString()}`, icon: <TrendingUp size={18} /> },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                <div className="p-2 bg-[#1E3A5F]/10 rounded-lg w-fit mb-3 text-[#1E3A5F]">{s.icon}</div>
                <p className="text-[20px] font-black text-stone-900">{s.value}</p>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-stone-100 bg-stone-50">
              <h3 className="text-[14px] font-black text-stone-900">Your investors</h3>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-20"><Loader2 className="animate-spin text-[#1E3A5F]" size={32} /></div>
            ) : investors.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-stone-400">
                <Inbox size={56} strokeWidth={1} />
                <p className="mt-4 font-black text-[15px] text-stone-600">No investors yet</p>
                <p className="text-[12px] mt-1 text-stone-500">Investors who purchase shares in your projects will appear here.</p>
              </div>
            ) : (
              <div className="w-full overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-stone-100 text-[10px] font-black text-stone-400 uppercase tracking-widest">
                      <th className="px-6 py-4 font-bold">Investor Name</th>
                      <th className="px-6 py-4 font-bold">Projects Funded</th>
                      <th className="px-6 py-4 font-bold">Type</th>
                      <th className="px-6 py-4 font-bold text-right">Total Invested</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investors.map((inv, i) => (
                      <tr key={inv.id} className={`border-b border-stone-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'} hover:bg-stone-50`}>
                        <td className="px-6 py-4">
                          <p className="text-[13px] font-black text-stone-900">{inv.name}</p>
                          <p className="text-[11px] text-stone-500 mt-0.5">{inv.email}</p>
                        </td>
                        <td className="px-6 py-4 max-w-[200px]">
                          <p className="text-[12px] font-semibold text-stone-600 truncate">{inv.projects}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-black tracking-widest px-2 py-1 rounded-md uppercase ${inv.diaspora ? 'bg-indigo-100 text-indigo-700' : 'bg-stone-100 text-stone-600'}`}>
                            {inv.diaspora ? 'Diaspora' : 'Local'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <p className="text-[14px] font-black text-[#1E3A5F]">${inv.total_invested.toLocaleString()}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorRelations;
