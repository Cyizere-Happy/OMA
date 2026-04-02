"use client";

import React from "react";
import { Wallet, Plus, Inbox } from "lucide-react";

const FundRequests = () => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Fund requests</h2>
            <p className="text-[13px] text-gray-500">
              Request releases when a verified milestone is complete. Funds move from escrow after admin + notary sign-off.
            </p>
          </div>
          <button type="button"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1E3A5F] text-white text-[12px] font-bold rounded-full shadow-md hover:shadow-lg shrink-0">
            <Plus size={16} /> New fund request
          </button>
        </div>

        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
            <Inbox size={48} strokeWidth={1} />
            <p className="mt-4 font-semibold text-[15px]">No fund requests yet</p>
            <p className="text-[12px] mt-1">Submit a fund request once your project milestone has been verified.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundRequests;
