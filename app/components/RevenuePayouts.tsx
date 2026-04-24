"use client";

import React from "react";
import { DollarSign, CheckCircle2, Clock, Banknote, Inbox } from "lucide-react";

const DEMO_PAYOUTS = {
  summary: { total_received: 450000, pending: 120000, escrowed: 1850000 },
  history: [
    { id: "tx_1", date: "2026-03-28T14:30:00Z", project: "Kigali Heights Residences", tx_hash: "0x7a2...4f9c", amount: 150000 },
    { id: "tx_2", date: "2026-03-15T09:15:00Z", project: "Nyarutarama Green Villas", tx_hash: "0x3b1...8e2a", amount: 200000 },
    { id: "tx_3", date: "2026-02-20T11:45:00Z", project: "Kigali Heights Residences", tx_hash: "0x9d5...1c6b", amount: 100000 },
  ]
};

const RevenuePayouts = () => {
  const data = DEMO_PAYOUTS;
  const totalReceived = data.summary.total_received;
  const history = data.history;

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
              { label: "Pending milestones", value: `$${data.summary.pending.toLocaleString()}`, icon: <Clock size={18} />, accent: "bg-amber-500" },
              { label: "Total Escrowed", value: `$${data.summary.escrowed.toLocaleString()}`, icon: <Banknote size={18} />, accent: "bg-stone-700" },
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
                        <p className="text-[12px] font-bold text-stone-600">{new Date(tx.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenuePayouts;
