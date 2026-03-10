"use client";

import { CreditCard, Search, Filter, Download } from "lucide-react";

export default function OrdersPage() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-2 block">
                        Sales Management
                    </span>
                    <h1 className="font-serif text-4xl text-[#1B3022]">Orders & Revenue</h1>
                    <p className="font-sans text-[#2D2D2D]/60 mt-2">
                        Track customer purchases, fulfillment status, and payment processing.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-white border border-[#1B3022]/20 text-[#1B3022] px-6 py-3 rounded-lg font-sans text-sm tracking-wider uppercase hover:bg-[#FAFAFA] transition-colors shadow-sm">
                    <Download size={16} /> Export CSV
                </button>
            </header>

            {/* Controls Bar */}
            <div className="bg-white p-4 rounded-xl border border-[#1B3022]/10 mb-6 flex flex-col md:flex-row gap-4 justify-between shadow-sm">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1B3022]/40" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Order ID, Customer, or Email..."
                        className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg text-sm font-sans focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-[#1B3022]/20 rounded-lg text-sm font-sans text-[#1B3022] hover:bg-[#FAFAFA] transition-colors">
                        <Filter size={16} /> Payment Status
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-[#1B3022]/20 rounded-lg text-sm font-sans text-[#1B3022] hover:bg-[#FAFAFA] transition-colors">
                        <Filter size={16} /> Fulfillment
                    </button>
                </div>
            </div>

            {/* Empty State / Coming Soon Layout */}
            <div className="bg-white rounded-xl border border-[#1B3022]/10 shadow-sm p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-16 h-16 bg-[#1B3022]/5 rounded-full flex items-center justify-center mb-6 text-[#D4AF37]">
                    <CreditCard size={32} />
                </div>
                <h2 className="font-serif text-2xl text-[#1B3022] mb-3">Awaiting First Orders</h2>
                <p className="font-sans text-[#1B3022]/60 max-w-md text-sm mb-8 leading-relaxed">
                    Once you securely integrate Clerk Authentication and initialize Razorpay payments, your incoming customer orders will appear here in real-time.
                </p>
            </div>
        </div>
    );
}
