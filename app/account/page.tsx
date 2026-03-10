"use client";

import { useState, useEffect } from "react";
import { Package, User, Settings, LogOut, ArrowRight, UploadCloud, MapPin } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";

export default function AccountPage() {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const { signOut } = useAuthActions();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("orders");
    const [profileImg, setProfileImg] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isLoading, isAuthenticated, router]);

    const [addressForm, setAddressForm] = useState({
        fullName: "",
        streetAddress: "",
        city: "",
        state: "",
        pincode: "",
        phone: ""
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // For now, create a local preview URL
            setProfileImg(URL.createObjectURL(file));
        }
    };
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1B3022]"></div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="bg-white rounded-xl border border-[#1B3022]/10 p-6 shadow-sm sticky top-32">
                        <div className="mb-8">
                            <div className="w-16 h-16 rounded-full bg-[#1B3022]/5 flex items-center justify-center text-[#D4AF37] mb-4">
                                <User size={24} />
                            </div>
                            <h2 className="font-serif text-2xl text-[#1B3022]">Explorer</h2>
                            <p className="font-sans text-[#2D2D2D]/60 text-sm mt-1">Himalayan Ritualist</p>
                        </div>

                        <nav className="flex flex-col space-y-2">
                            <button
                                onClick={() => setActiveTab("orders")}
                                className={`flex items-center w-full gap-3 px-4 py-3 rounded-lg font-sans text-sm tracking-wide transition-colors ${activeTab === "orders" ? "bg-[#1B3022]/5 text-[#1B3022] font-semibold" : "text-[#2D2D2D]/60 hover:bg-[#1B3022]/5 hover:text-[#1B3022]"}`}
                            >
                                <Package size={18} /> Order History
                            </button>
                            <button
                                onClick={() => setActiveTab("settings")}
                                className={`flex items-center w-full gap-3 px-4 py-3 rounded-lg font-sans text-sm tracking-wide transition-colors ${activeTab === "settings" ? "bg-[#1B3022]/5 text-[#1B3022] font-semibold" : "text-[#2D2D2D]/60 hover:bg-[#1B3022]/5 hover:text-[#1B3022]"}`}
                            >
                                <Settings size={18} /> Account Settings
                            </button>
                            <button
                                onClick={() => signOut()}
                                className="flex items-center w-full gap-3 px-4 py-3 rounded-lg text-red-500/80 hover:bg-red-50 hover:text-red-600 font-sans text-sm tracking-wide transition-colors mt-auto pt-8 border-t border-[#1B3022]/10"
                            >
                                <LogOut size={18} /> Sign Out
                            </button>
                        </nav>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1">
                    {activeTab === "orders" ? (
                        <div className="animate-in fade-in duration-500">
                            <header className="mb-10">
                                <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4 block">
                                    Your Rituals
                                </span>
                                <h1 className="font-serif text-4xl text-[#1B3022]">Order History</h1>
                                <p className="font-sans text-[#2D2D2D]/60 mt-2">
                                    View and manage your Ayurvedic formulations and Himalayan harvests.
                                </p>
                            </header>

                            <div className="bg-white rounded-xl border border-[#1B3022]/10 shadow-sm p-12 md:p-16 flex flex-col items-center justify-center text-center mt-8 min-h-[400px]">
                                <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#1B3022]/20 flex items-center justify-center text-[#D4AF37] mb-6 relative">
                                    <Package size={28} className="absolute inline-block text-[#1B3022]/20" />
                                </div>
                                <h3 className="font-serif text-2xl text-[#1B3022] mb-3">No Orders Yet</h3>
                                <p className="font-sans text-[#2D2D2D]/60 text-sm max-w-md mx-auto leading-relaxed mb-8">
                                    Your journey begins here. Explore our pure altitude formulations to discover profound internal balance.
                                </p>
                                <a href="/collections" className="inline-flex items-center gap-2 bg-[#1B3022] text-[#F9F7F2] font-sans tracking-[0.2em] text-xs uppercase px-8 py-4 hover:bg-black transition-colors rounded-full shadow-lg">
                                    Explore Botanicals <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-500">
                            <header className="mb-10">
                                <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4 block">
                                    Preferences
                                </span>
                                <h1 className="font-serif text-4xl text-[#1B3022]">Account Settings</h1>
                                <p className="font-sans text-[#2D2D2D]/60 mt-2">
                                    Manage your profile details and primary shipping destination.
                                </p>
                            </header>

                            <div className="space-y-8">
                                {/* Profile Picture Upload */}
                                <div className="bg-white rounded-xl border border-[#1B3022]/10 p-8 shadow-sm">
                                    <h3 className="font-serif text-2xl text-[#1B3022] mb-6 border-b border-[#1B3022]/10 pb-4">Personal Identity</h3>
                                    <div className="flex items-center gap-8">
                                        <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-[#1B3022]/10 overflow-hidden relative shrink-0">
                                            {profileImg ? (
                                                <img src={profileImg} alt="Profile preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center bg-[#FAFAFA] text-[#1B3022]/40">
                                                    <User size={32} />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="relative inline-block">
                                                <button className="flex items-center gap-2 bg-white border border-[#1B3022]/20 text-[#1B3022] px-6 py-2.5 rounded-lg font-sans text-xs tracking-wider uppercase hover:bg-[#FAFAFA] transition-colors shadow-sm">
                                                    <UploadCloud size={16} /> Upload New Photo
                                                </button>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                            </div>
                                            <p className="font-sans text-xs text-[#2D2D2D]/50 mt-3">Square, High-Resolution JPG or PNG.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Address */}
                                <div className="bg-white rounded-xl border border-[#1B3022]/10 p-8 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6 border-b border-[#1B3022]/10 pb-4">
                                        <MapPin className="text-[#D4AF37]" size={24} />
                                        <h3 className="font-serif text-2xl text-[#1B3022]">Primary Delivery Address</h3>
                                    </div>

                                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                                        <div className="md:col-span-2">
                                            <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                value={addressForm.fullName}
                                                onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                                                className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                                                placeholder="Recipient Name"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">Street Address</label>
                                            <input
                                                type="text"
                                                value={addressForm.streetAddress}
                                                onChange={(e) => setAddressForm({ ...addressForm, streetAddress: e.target.value })}
                                                className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                                                placeholder="House/Flat No, Building, Street, Area"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">City</label>
                                            <input
                                                type="text"
                                                value={addressForm.city}
                                                onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                                                className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                                                placeholder="City"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">State</label>
                                            <input
                                                type="text"
                                                value={addressForm.state}
                                                onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                                                className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                                                placeholder="State"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">Pincode</label>
                                            <input
                                                type="text"
                                                maxLength={6}
                                                value={addressForm.pincode}
                                                onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                                                className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-mono text-sm tracking-widest focus:outline-none focus:border-[#D4AF37] transition-colors"
                                                placeholder="000 000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={addressForm.phone}
                                                onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                                                className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                                                placeholder="+91"
                                            />
                                        </div>

                                        <div className="md:col-span-2 flex justify-end mt-4">
                                            <button type="button" className="bg-[#1B3022] text-[#F9F7F2] px-8 py-3 rounded-lg font-sans text-xs tracking-widest uppercase hover:bg-black transition-colors shadow-md">
                                                Save Address
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
