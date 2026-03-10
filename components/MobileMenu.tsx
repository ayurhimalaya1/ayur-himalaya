"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ShoppingBag, User } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { useCartStore } from "@/store/cartStore";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    collections: { name: string; handle: string }[];
}

const menuVariants: any = {
    closed: {
        x: "100%",
        transition: {
            duration: 0.6,
            ease: "easeInOut",
        },
    },
    open: {
        x: "0%",
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

const linkVariants: any = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.2 + i * 0.1,
            duration: 0.5,
            ease: "easeOut",
        },
    }),
};

export default function MobileMenu({ isOpen, onClose, collections }: MobileMenuProps) {
    const { isAuthenticated } = useConvexAuth();
    const openCart = useCartStore((state) => state.openCart);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] lg:hidden"
                    />

                    {/* Menu Panel */}
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] lg:hidden shadow-2xl flex flex-col p-8"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-12">
                            <span className="font-serif text-xl text-[#1B3022]">Explore</span>
                            <button onClick={onClose} className="p-2 -mr-2 text-[#1B3022]">
                                <X size={24} strokeWidth={1} />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex flex-col gap-8 mb-auto">
                            <div className="space-y-6">
                                <motion.div variants={linkVariants} custom={0}>
                                    <Link href="/" onClick={onClose} className="font-serif text-3xl text-[#1B3022] hover:text-[#D4AF37] transition-colors">
                                        Home
                                    </Link>
                                </motion.div>
                                <motion.div variants={linkVariants} custom={1}>
                                    <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] block mb-4">
                                        Formulations
                                    </span>
                                    <ul className="space-y-4 ml-2">
                                        {collections.map((col, idx) => (
                                            <li key={col.handle}>
                                                <Link
                                                    href={`/collections/${col.handle}`}
                                                    onClick={onClose}
                                                    className="font-sans text-base text-[#2D2D2D]/80 hover:text-[#1B3022] transition-colors"
                                                >
                                                    {col.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                                <motion.div variants={linkVariants} custom={2}>
                                    <Link href="/our-story" onClick={onClose} className="font-serif text-3xl text-[#1B3022] hover:text-[#D4AF37] transition-colors">
                                        Our Story
                                    </Link>
                                </motion.div>
                                <motion.div variants={linkVariants} custom={3}>
                                    <Link href="/journal" onClick={onClose} className="font-serif text-3xl text-[#1B3022] hover:text-[#D4AF37] transition-colors">
                                        Journal
                                    </Link>
                                </motion.div>
                            </div>
                        </nav>

                        {/* Bottom Actions */}
                        <div className="pt-8 border-t border-[#1B3022]/10 space-y-4">
                            <motion.div variants={linkVariants} custom={4}>
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={isAuthenticated ? "/account" : "/login"}
                                        onClick={onClose}
                                        className="flex items-center gap-3 font-sans text-sm tracking-widest text-[#1B3022] uppercase"
                                    >
                                        <User size={18} strokeWidth={1.5} />
                                        {isAuthenticated ? "My Account" : "Login"}
                                    </Link>
                                    <button
                                        onClick={() => {
                                            onClose();
                                            openCart();
                                        }}
                                        className="flex items-center gap-3 font-sans text-sm tracking-widest text-[#1B3022] uppercase"
                                    >
                                        <ShoppingBag size={18} strokeWidth={1.5} />
                                        Cart
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Aesthetic Footer */}
                        <div className="mt-12 opacity-30">
                            <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-[#D4AF37]">
                                Ayur Himalaya — Munsiyari
                            </span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
