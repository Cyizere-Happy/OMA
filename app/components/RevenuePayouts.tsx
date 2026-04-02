"use client";

import React, { useState, useEffect } from "react";
import { DollarSign, CheckCircle2, Clock, Banknote, Inbox, Loader2 } from "lucide-react";
import { api } from "../../lib/api";

const RevenuePayouts = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/owner/payouts")
      .then(res => setData(res.data))
      .catch(err => console.error("Failed to load payouts", err))
      .finally(() => setLoading(false));
  }, []);

  const totalReceived = data?.summary?.total_received || 0;
  const history = data?.history || [];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F0EFEC]">
      <div className="bg-white border-b border-stone-200 px-8 py-6 z-10 sticky top-0">
        <h2 className="text-2xl font-black text-stone-900 tracking-tight shrink-0">Revenue &amp; Payouts</h2>
        <p className="text-[13px] text-stone-500 font-medium mt-1">
          Track escrow milestone sweeps and historically delivered payouts.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total received", value: `$${totalReceived.toLocaleString()}`, icon: <DollarSign size={18} />, accent: "bg-[#1E3A5F]" },
              { label: "Pending milestones", value: "—", icon: <Clock size={18} />, accent: "bg-amber-500" },
              { label: "Total Escrowed", value: "—", icon: <Banknote size={18} />, accent: "bg-stone-700" },
              { label: "Payouts logged", value: history.length.toString(), icon: <CheckCircle2 size={18} />, accent: "bg-emerald-600" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                <div className={`${s.accent} text-white p-2 rounded-lg w-fit mb-3`}>{s.icon}</div>
                <p className="text-[20px] font-black text-stone-900">{s.value}</p>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-stone-100 bg-stone-50">
              <h3 className="text-[14px] font-black text-stone-900">Payout History</h3>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-20"><Loader2 className="animate-spin text-[#1E3A5F]" size={32} /></div>
            ) : history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-stone-400">
                <Inbox size={56} strokeWidth={1} />
                <p className="mt-4 font-black text-[15px] text-stone-600">No payouts received yet</p>
                <p className="text-[12px] mt-1 text-stone-500">Payouts released from escrow will appear here once construction milestones are verified.</p>
              </div>
            ) : (
              <div className="w-full overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-stone-100 text-[10px] font-black text-stone-400 uppercase tracking-widest">
                      <th className="px-6 py-4 font-bold">Date Sent</th>
                      <th className="px-6 py-4 font-bold">Project source</th>
                      <th className="px-6 py-4 font-bold">Verification Ref</th>
                      <th className="px-6 py-4 font-bold text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((tx: any, i: number) => (
                      <tr key={tx.id} className={`border-b border-stone-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'} hover:bg-stone-50`}>
                        <td className="px-6 py-4">
                          <p className="text-[12px] font-bold text-stone-600">{new Date(tx.date).toLocaleString()}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-[13px] font-black text-stone-900">{tx.project}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-[11px] font-mono text-stone-500 truncate max-w-[120px]">{tx.tx_hash}</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <p className="text-[14px] font-black text-emerald-700">+${parseFloat(tx.amount).toLocaleString()}</p>
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

export default RevenuePayouts;
