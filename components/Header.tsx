"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useConvexAuth } from "convex/react";

// Categories matching the scraped lists
const featuredCollections = [
    { name: "Himalayan Herbal Treasury", handle: "herbal-treasury" },
    { name: "Spices & Salts", handle: "spices-salts" },
    { name: "Alpine Flours & Pulses", handle: "alpine-pantry" },
    { name: "Teas & Wellness Supplements", handle: "teas-supplements" },
];

export default function Header() {
    const { isAuthenticated, isLoading } = useConvexAuth();
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-md border-b border-white/20 shadow-[0_4px_32px_0_rgba(27,48,34,0.02)]"
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group flex flex-col items-start justify-center">
                    <span className="font-serif text-2xl md:text-3xl text-[#1B3022] tracking-wide leading-none group-hover:text-[#D4AF37] transition-colors duration-500">
                        Ayur Himalaya
                    </span>
                    <span className="font-sans text-[8px] md:text-[9px] tracking-[0.3em] uppercase text-[#D4AF37] mt-1 pl-1">
                        High Altitude Wellness
                    </span>
                </Link>

                {/* Mega-Nav Trigger Area */}
                <nav className="hidden md:flex gap-8 group h-full items-center">
                    <div className="relative h-full flex items-center">
                        <span className="font-sans text-sm tracking-widest text-[#2D2D2D] uppercase cursor-pointer hover:text-[#1B3022] transition-colors">
                            Shop Collections
                        </span>

                        {/* Mega Dropdown */}
                        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-screen max-w-4xl bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 rounded-b-2xl overflow-hidden flex">
                            <div className="w-1/3 bg-[#F9F7F2]/50 p-8 border-r border-[#1B3022]/10">
                                <h3 className="font-serif text-xl text-[#1B3022] mb-4">Featured</h3>
                                <ul className="space-y-3">
                                    {featuredCollections.map((col) => (
                                        <li key={col.handle}>
                                            <Link href={`/collections/${col.handle}`} className="font-sans text-sm text-[#2D2D2D] hover:text-[#D4AF37] transition-colors">
                                                {col.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="w-2/3 p-8 flex items-center bg-[url('/images/himalaya-mega-menu.jpg')] bg-cover bg-center">
                                <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl max-w-sm">
                                    <h4 className="font-serif text-lg text-[#1B3022] mb-2">The Daily Ritual</h4>
                                    <p className="font-sans text-xs text-[#2D2D2D]">Discover the essential trio for profound balance.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link href="/our-story" className="font-sans text-sm tracking-widest text-[#2D2D2D] uppercase hover:text-[#1B3022] transition-colors">
                        Our Story
                    </Link>
                    <Link href="/journal" className="font-sans text-sm tracking-widest text-[#2D2D2D] uppercase hover:text-[#1B3022] transition-colors">
                        Journal
                    </Link>
                </nav>

                {/* Cart & Account */}
                <div className="flex items-center gap-6">
                    {isLoading ? (
                        <div className="w-16 h-4 bg-gray-100 animate-pulse rounded"></div>
                    ) : (
                        <Link href={isAuthenticated ? "/account" : "/login"} className="font-sans text-sm tracking-widest text-[#2D2D2D] uppercase hover:text-[#D4AF37] transition-colors">
                            {isAuthenticated ? "Account" : "Login"}
                        </Link>
                    )}
                    <button
                        onClick={useCartStore((state) => state.openCart)}
                        className="font-sans text-sm tracking-widest text-[#2D2D2D] uppercase hover:text-[#D4AF37] transition-colors flex items-center gap-2 group"
                    >
                        Cart
                        <span className="bg-[#1B3022] text-[#F9F7F2] text-[10px] w-5 h-5 flex items-center justify-center rounded-full group-hover:bg-[#D4AF37] transition-colors">
                            {useCartStore((state) => state.itemCount())}
                        </span>
                    </button>
                </div>
            </div>
        </motion.header>
    );
}
