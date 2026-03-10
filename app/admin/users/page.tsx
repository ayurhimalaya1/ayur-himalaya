"use client";

import { Users as UsersIcon, Search } from "lucide-react";

export default function UsersPage() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-10">
                <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-2 block">
                    User Management
                </span>
                <h1 className="font-serif text-4xl text-[#1B3022] mb-2">Customers</h1>
                <p className="font-sans text-[#2D2D2D]/60">
                    Manage registered users and view order history after Clerk authentication is integrated.
                </p>
            </header>

            <div className="bg-white rounded-xl border border-[#1B3022]/10 shadow-sm p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-16 h-16 bg-[#1B3022]/5 rounded-full flex items-center justify-center mb-6 text-[#D4AF37]">
                    <UsersIcon size={32} />
                </div>
                <h2 className="font-serif text-2xl text-[#1B3022] mb-3">Clerk Auth Required</h2>
                <p className="font-sans text-[#1B3022]/60 max-w-md text-sm mb-8 leading-relaxed">
                    Customer management relies on the Clerk Authentication provider. Once Clerk is wired up, all registered buyers will sync to this dashboard.
                </p>
            </div>
        </div>
    );
}
