"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Search, SlidersHorizontal, Map as MapIcon, Building2 } from "lucide-react";
import type { OwnerSiteMarker } from "./OwnerLeafletMap";

const OwnerLeafletMap = dynamic(() => import("./OwnerLeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[320px] bg-stone-100 flex items-center justify-center rounded-2xl border border-stone-200 text-stone-500 text-sm font-semibold">
      Loading map…
    </div>
  ),
});

const ownerSites: OwnerSiteMarker[] = [
  {
    id: "1",
    name: "Kigali Heights Expansion",
    location: "Kacyiru, Kigali",
    status: "Live — fundraising",
    funding: "85%",
    lat: -1.9441,
    lng: 30.0891,
    image: "/retail.png",
  },
  {
    id: "2",
    name: "Vision City Phase II",
    location: "Gacuriro, Kigali",
    status: "Under admin review",
    funding: "0%",
    lat: -1.9312,
    lng: 30.1256,
    image: "/villa.png",
  },
  {
    id: "3",
    name: "Nyagatare Trade Center",
    location: "Nyagatare, Eastern",
    status: "Live — fundraising",
    funding: "34%",
    lat: -1.3,
    lng: 30.4,
    image: "/office.png",
  },
  {
    id: "4",
    name: "Draft — Gahanga parcel",
    location: "Kicukiro, Kigali",
    status: "Draft",
    funding: "—",
    lat: -2.0305,
    lng: 30.1012,
    image: "/villa.png",
  },
];

const OwnerSitesMap = () => {
  const [showMap, setShowMap] = useState(true);
  const [query, setQuery] = useState("");

  const filtered = ownerSites.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F0EFEC] min-h-0">
      <div className="bg-white border-b border-stone-200 px-6 sm:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0 z-30">
        <div className="flex items-center gap-3 flex-1 min-w-0 max-w-2xl">
          <div className="relative flex-1 min-w-0">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your sites by name or district…"
              className="w-full bg-stone-50 border border-stone-200 focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F]/25 focus:bg-white rounded-lg py-2 pl-10 pr-4 outline-none transition-all text-[13px] font-medium text-stone-800 placeholder:text-stone-400"
            />
          </div>
          <button
            type="button"
            className="p-2 bg-stone-50 hover:bg-[#1E3A5F] hover:text-white rounded-lg transition-all text-stone-600 border border-stone-200 shrink-0"
            aria-label="Filters"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <MapIcon size={14} className="text-stone-400" />
            <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest">Show map</span>
            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              className={`relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner ${
                showMap ? "bg-[#1E3A5F]" : "bg-stone-200"
              }`}
              aria-pressed={showMap}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${
                  showMap ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          <div className="h-6 w-px bg-stone-200 hidden sm:block" />
          <p className="text-[11px] font-black text-stone-500 uppercase tracking-widest">
            {filtered.length} site{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0">
        <div
          className={`flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 transition-all duration-500 ${
            showMap ? "lg:max-w-[42%] xl:max-w-[38%]" : "max-w-5xl mx-auto w-full"
          }`}
        >
          <div className={`grid gap-4 ${showMap ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
            {filtered.map((site) => (
              <article
                key={site.id}
                className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-[0_2px_0_rgba(28,25,23,0.04)] hover:shadow-md hover:border-stone-300 transition-all group"
              >
                <div className="h-28 relative overflow-hidden">
                  <img
                    src={site.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 text-[9px] font-black uppercase tracking-wider bg-white/90 text-[#1E3A5F] px-2 py-0.5 rounded border border-stone-200">
                    {site.funding === "—" ? "Draft" : "On map"}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-start gap-2">
                    <Building2 size={16} className="text-[#1E3A5F] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <h3 className="text-[14px] font-black text-stone-900 leading-tight truncate">{site.name}</h3>
                      <p className="text-[11px] font-semibold text-stone-500 mt-1">{site.location}</p>
                      <p className="text-[11px] text-stone-600 mt-2 line-clamp-2">{site.status}</p>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-stone-100">
                        <span className="text-[9px] font-black text-stone-400 uppercase">Funding</span>
                        <span className="text-[13px] font-black text-[#1E3A5F]">{site.funding}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-stone-500 text-sm py-12">No sites match your search.</p>
          )}
        </div>

        {showMap && (
          <div className="flex-1 min-w-0 bg-stone-100 border-l border-stone-200 p-3 sm:p-4 relative shadow-[inset_8px_0_24px_-12px_rgba(0,0,0,0.06)]">
            <div className="absolute inset-3 sm:inset-4 rounded-2xl overflow-hidden border border-stone-200 shadow-inner bg-white">
              <OwnerLeafletMap sites={filtered} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerSitesMap;
