"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function LeadPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addLead = useMutation(api.leads.add);

    useEffect(() => {
        // Check if the user has already seen the popup or submitted
        const hasSeenPopup = localStorage.getItem("ayur-lead-popup");
        if (!hasSeenPopup) {
            // Wait 5 seconds before showing the popup
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem("ayur-lead-popup", "dismissed");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length >= 10) {
            setIsSubmitting(true);
            try {
                // Send the phone number to Convex
                await addLead({
                    phone: phone,
                    offerCode: "HIMALAYA20", // Static promo code matching the text
                    hasPurchased: false,
                });

                setSubmitted(true);
                localStorage.setItem("ayur-lead-popup", "submitted");

                // Auto close after showing success message
                setTimeout(() => {
                    setIsOpen(false);
                }, 3000);
            } catch (error) {
                console.error("Failed to submit lead", error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-[#1B3022]/60 backdrop-blur-sm"
                    />

                    {/* Popup Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="relative w-full max-w-md bg-[#F9F7F2] rounded-2xl shadow-[0_32px_64px_-12px_rgba(27,48,34,0.3)] overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-[#F9F7F2] hover:bg-white/40 transition-colors"
                        >
                            <X size={18} strokeWidth={2} />
                        </button>

                        {/* Image Header */}
                        <div className="relative h-48 w-full bg-[#1B3022]">
                            <img
                                src="/products/meetha_atish_premium_1773167596536.png"
                                alt="Ayur Himalaya Botanical"
                                className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#F9F7F2] to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="p-8 pt-0 text-center relative z-10 -mt-8">
                            {!submitted ? (
                                <>
                                    <div className="inline-block bg-[#1B3022] text-[#D4AF37] font-sans text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mb-6 shadow-xl">
                                        Exclusive Access
                                    </div>
                                    <h2 className="font-serif text-3xl text-[#1B3022] mb-3 leading-tight">
                                        Unlock 20% Off Your First Ritual
                                    </h2>
                                    <p className="font-sans text-sm text-[#2D2D2D]/70 mb-8 leading-relaxed px-4">
                                        Join our inner circle for priority access to rare Himalayan harvests and exclusive wellness insights.
                                    </p>

                                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="Enter your mobile number"
                                                className="w-full bg-white border border-[#1B3022]/20 rounded-full px-6 py-4 text-sm font-sans focus:outline-none focus:border-[#D4AF37] transition-colors shadow-inner"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-[#1B3022] text-[#F9F7F2] font-sans tracking-[0.2em] text-xs uppercase py-4 rounded-full hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                                        >
                                            {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Unlocking...</> : "Claim 20% Off"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleClose}
                                            className="mt-2 text-[#2D2D2D]/50 font-sans text-xs hover:text-[#1B3022] transition-colors"
                                        >
                                            No thanks, I prefer full price
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12"
                                >
                                    <div className="w-16 h-16 rounded-full bg-[#1B3022]/10 flex items-center justify-center mx-auto mb-6">
                                        <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] flex items-center justify-center relative">
                                            <div className="w-4 h-4 rounded-full bg-[#1B3022]" />
                                        </div>
                                    </div>
                                    <h2 className="font-serif text-3xl text-[#1B3022] mb-3">Welcome to the Source.</h2>
                                    <p className="font-sans text-sm text-[#2D2D2D]/70 leading-relaxed px-4">
                                        We've sent your 20% off code via SMS. Your Himalayan wellness journey begins now.
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
