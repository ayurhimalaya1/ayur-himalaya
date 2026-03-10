"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { ArrowRight, Phone, ShieldCheck, Timer, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
    const { signIn } = useAuthActions();
    const [step, setStep] = useState<"phone" | "code">("phone");
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            // Ensure phone starts with +91 if not present
            const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;
            await signIn("fast2sms", { phone: formattedPhone });
            setStep("code");
        } catch (err: any) {
            setError(err.message || "Failed to send code. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;
            await signIn("fast2sms", { phone: formattedPhone, code });
            // Automatic redirect on success (handled by ConvexAuthProvider if configured, 
            // or we can manually window.location.href = "/account")
            window.location.href = "/account";
        } catch (err: any) {
            setError(err.message || "Invalid code. Please check and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9F7F2] flex flex-col items-center justify-center p-6 pt-32 pb-20">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#1B3022]/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(27,48,34,0.05)] border border-[#1B3022]/5 p-8 md:p-12 relative z-10"
            >
                <div className="text-center mb-10">
                    <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] mb-4 block font-bold">
                        Pure Altitude Awakening
                    </span>
                    <h1 className="font-serif text-4xl text-[#1B3022] mb-3">Welcome Home</h1>
                    <p className="font-sans text-[#2D2D2D]/60 text-sm leading-relaxed">
                        Access your Himalayan ritual sanctuary.
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {step === "phone" ? (
                        <motion.form
                            key="phone-step"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleSendCode}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-[#1B3022]/60 font-bold ml-1">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B3022]/40">
                                        <Phone size={18} />
                                    </div>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="Enter 10-digit number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-[#F9F7F2] border border-[#1B3022]/10 rounded-2xl py-4 pl-12 pr-4 font-sans text-base focus:outline-none focus:border-[#D4AF37] transition-all"
                                    />
                                </div>
                                <p className="font-sans text-[10px] text-[#2D2D2D]/40 ml-1">
                                    Include +91 for Indian numbers, or we'll add it automatically.
                                </p>
                            </div>

                            {error && (
                                <p className="text-red-500 text-xs font-sans text-center bg-red-50 py-3 rounded-xl border border-red-100 italic">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading || phone.length < 10}
                                className="w-full bg-[#1B3022] text-[#F9F7F2] rounded-2xl py-4 font-sans text-xs tracking-[0.3em] uppercase font-bold hover:bg-black transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 group"
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>
                                        Receive Sacred Code <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="code-step"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleVerifyCode}
                            className="space-y-6"
                        >
                            <div className="space-y-2 text-center">
                                <div className="mx-auto w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] mb-4">
                                    <ShieldCheck size={24} />
                                </div>
                                <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-[#1B3022]/60 font-bold">
                                    Verification Code
                                </label>
                                <p className="font-sans text-xs text-[#2D2D2D]/60 mb-4">
                                    A 6-digit code has been sent to {phone}.
                                </p>
                                <div className="flex justify-center gap-2">
                                    <input
                                        type="text"
                                        required
                                        maxLength={6}
                                        placeholder="000000"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                                        className="w-full max-w-[200px] bg-[#F9F7F2] border border-[#1B3022]/10 rounded-2xl py-4 text-center font-mono text-2xl tracking-[0.5em] focus:outline-none focus:border-[#D4AF37] transition-all"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {error && (
                                <p className="text-red-500 text-xs font-sans text-center bg-red-50 py-3 rounded-xl border border-red-100 italic">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading || code.length !== 6}
                                className="w-full bg-[#1B3022] text-[#F9F7F2] rounded-2xl py-4 font-sans text-xs tracking-[0.3em] uppercase font-bold hover:bg-black transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>Verify & Enter Sanctuary</>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep("phone")}
                                className="w-full text-center font-sans text-[10px] uppercase tracking-[0.2em] text-[#1B3022]/40 hover:text-[#1B3022] transition-colors"
                            >
                                Wrong number? Try again.
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>

                <div className="mt-12 pt-8 border-t border-[#1B3022]/5 text-center">
                    <p className="font-sans text-[10px] text-[#2D2D2D]/40 leading-relaxed uppercase tracking-widest">
                        By entering, you connect with the ancient <br /> wisdom of the Himalayas.
                    </p>
                </div>
            </motion.div>

            <Link href="/" className="mt-8 font-sans text-[10px] uppercase tracking-[0.3em] text-[#1B3022]/40 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                <ArrowRight size={12} className="rotate-180" /> Back to Home
            </Link>
        </div>
    );
}
