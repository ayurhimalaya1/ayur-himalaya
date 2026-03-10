"use client";

import Link from "next/link";
import { LayoutDashboard, Package, Users, Tag, Settings, CreditCard, LogOut } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const router = useRouter();
    const { signOut } = useAuthActions();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[#F9F7F2]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1B3022]"></div>
            </div>
        );
    }

    if (!isAuthenticated) return null;
    return (
        <div className="flex h-screen bg-ayur-bg overflow-hidden font-sans text-ayur-charcoal">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-[#1B3022] text-[#F9F7F2] shrink-0 flex flex-col border-r border-[#1B3022]/10 shadow-[8px_0_32px_0_rgba(27,48,34,0.1)] z-20 hidden md:flex">
                <div className="p-8 border-b border-white/10 shrink-0">
                    <span className="font-sans text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase mb-2 block">
                        Control Center
                    </span>
                    <h1 className="font-serif text-2xl tracking-wide">
                        Ayur Himalaya
                    </h1>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 scrollbar-hide">
                    <Link href="/admin" className="flex items-center gap-4 px-4 py-3 rounded-lg bg-white/10 text-white font-medium transition-colors">
                        <LayoutDashboard size={18} />
                        <span className="text-sm tracking-wide">Overview</span>
                    </Link>

                    <Link href="/admin/products" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors">
                        <Package size={18} />
                        <span className="text-sm tracking-wide">Products & Inventory</span>
                    </Link>

                    <Link href="/admin/orders" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors">
                        <CreditCard size={18} />
                        <span className="text-sm tracking-wide">Orders & Revenue</span>
                    </Link>

                    <Link href="/admin/leads" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors">
                        <Tag size={18} />
                        <span className="text-sm tracking-wide">Popup Leads</span>
                    </Link>

                    <Link href="/admin/users" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors">
                        <Users size={18} />
                        <span className="text-sm tracking-wide">Customers</span>
                    </Link>

                    <Link href="/admin/settings" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors">
                        <Settings size={18} />
                        <span className="text-sm tracking-wide">Site Settings</span>
                    </Link>
                </div>

                <div className="p-6 border-t border-white/10 shrink-0">
                    <button
                        onClick={() => signOut()}
                        className="flex w-full items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors"
                    >
                        <LogOut size={18} />
                        <span className="text-sm tracking-wide">Exit Admin</span>
                    </button>
                    <div className="mt-6 flex items-center gap-3 px-4">
                        <div className="w-8 h-8 rounded-full bg-[#D4AF37] border-2 border-[#1B3022] flex items-center justify-center font-serif text-[#1B3022]">
                            A
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-medium tracking-wide text-white">Admin User</span>
                            <span className="text-[10px] text-white/50">admin@ayurhimalaya.com</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Workspace Area */}
            <main className="flex-1 flex flex-col h-full bg-[#FAFAFA] relative overflow-y-auto">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800')] opacity-[0.02] bg-fixed pointer-events-none" />
                <div className="relative z-10 p-8 md:p-12 max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
