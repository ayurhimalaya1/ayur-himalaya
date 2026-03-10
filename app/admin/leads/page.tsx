"use client";

import { MessageSquare, Download, Loader2 } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function LeadsPage() {
    const leads = useQuery(api.leads?.getAll || (() => [])); // Safe fallback if API not ready

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-2 block">
                        Marketing
                    </span>
                    <h1 className="font-serif text-4xl text-[#1B3022]">SMS Leads</h1>
                    <p className="font-sans text-[#2D2D2D]/60 mt-2">
                        View phone numbers captured from the 20% Off Popup offer.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-white border border-[#1B3022]/20 text-[#1B3022] px-6 py-3 rounded-lg font-sans text-sm tracking-wider uppercase hover:bg-[#FAFAFA] transition-colors shadow-sm">
                    <Download size={16} /> Export CSV
                </button>
            </header>

            <div className="bg-white rounded-xl border border-[#1B3022]/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#FAFAFA] border-b border-[#1B3022]/10 font-sans text-xs tracking-wider uppercase text-[#1B3022]/60">
                                <th className="px-6 py-4 font-medium">Entered Phone Number</th>
                                <th className="px-6 py-4 font-medium">Date Captured</th>
                                <th className="px-6 py-4 font-medium">Offer Code</th>
                                <th className="px-6 py-4 font-medium">Conversion Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads === undefined ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <Loader2 className="animate-spin text-[#D4AF37] mx-auto" size={24} />
                                    </td>
                                </tr>
                            ) : leads?.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-[#1B3022]/50 font-sans text-sm">
                                        No leads captured yet.
                                    </td>
                                </tr>
                            ) : (
                                leads?.map((lead: any) => (
                                    <tr key={lead._id} className="border-b border-[#1B3022]/5 hover:bg-[#1B3022]/[0.02] transition-colors">
                                        <td className="px-6 py-4 font-mono text-sm text-[#1B3022]">{lead.phone}</td>
                                        <td className="px-6 py-4 font-sans text-sm text-[#2D2D2D]">
                                            {new Date(lead._creationTime).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs font-bold text-[#D4AF37]">{lead.offerCode}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-sans tracking-wide ${lead.hasPurchased ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {lead.hasPurchased ? "Converted" : "Pending"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
