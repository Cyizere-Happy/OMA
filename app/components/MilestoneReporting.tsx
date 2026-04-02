"use client";

import React from "react";
import { Inbox } from "lucide-react";

const MilestoneReporting = () => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Milestone reporting</h2>
        <p className="text-[13px] text-gray-500 mb-8">
          Submit progress evidence for each funded stage. Admins and notaries verify before the next tranche is released.
        </p>

        <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
          <Inbox size={48} strokeWidth={1} />
          <p className="mt-4 font-semibold text-[15px]">No milestones to report</p>
          <p className="text-[12px] mt-1">Once your project is funded, milestones will appear here for you to submit progress reports.</p>
        </div>
      </div>
    </div>
  );
};

export default MilestoneReporting;
