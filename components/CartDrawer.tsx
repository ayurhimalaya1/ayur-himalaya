"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";

export default function CartDrawer() {
    const { isOpen, closeCart, items, removeItem, updateQuantity, cartTotal } = useCartStore();

    const SHIPPING_THRESHOLD = 100;
    const currentTotal = cartTotal();
    const progressPercentage = Math.min((currentTotal / SHIPPING_THRESHOLD) * 100, 100);
    const amountToFreeShipping = Math.max(SHIPPING_THRESHOLD - currentTotal, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-[#1B3022]/40 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#F9F7F2] shadow-2xl z-50 flex flex-col border-l border-[#1B3022]/10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[#1B3022]/10 bg-white/50 backdrop-blur-md">
                            <h2 className="font-serif text-2xl text-[#1B3022]">Your Ritual</h2>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-[#1B3022]/5 rounded-full transition-colors text-[#2D2D2D]"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Shipping Progress Indicator */}
                        <div className="p-6 bg-[#1B3022]/5 border-b border-[#1B3022]/10">
                            <p className="font-sans text-xs text-[#2D2D2D] mb-3 text-center tracking-wide">
                                {amountToFreeShipping > 0
                                    ? `You're ₹${amountToFreeShipping.toFixed(2)} away from Himalayan Delivery (Free)`
                                    : "You've unlocked Himalayan Delivery (Free)"}
                            </p>
                            <div className="h-1.5 w-full bg-[#1B3022]/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercentage}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="h-full bg-[#D4AF37]"
                                />
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-[#2D2D2D]/50 gap-4">
                                    <ShoppingBag size={48} strokeWidth={1} />
                                    <p className="font-sans text-sm tracking-widest uppercase text-center">Your ritual space <br />is currently empty.</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={item.id}
                                        className="flex gap-4 bg-white/60 p-4 rounded-xl border border-white/40 shadow-sm"
                                    >
                                        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-[#F9F7F2] shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="flex flex-col flex-1 justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-serif text-lg text-[#1B3022] leading-tight pr-4">{item.name}</h3>
                                                    <button onClick={() => removeItem(item.id)} className="text-[#2D2D2D]/40 hover:text-[#1B3022] transition-colors">
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                                <span className="font-sans text-[10px] tracking-widest text-[#D4AF37] uppercase">{item.dosha}</span>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-3 bg-[#F9F7F2] rounded-full px-3 py-1 border border-[#1B3022]/10">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="text-[#2D2D2D] hover:text-[#1B3022] transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="font-sans text-xs w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="text-[#2D2D2D] hover:text-[#1B3022] transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <span className="font-sans font-medium text-[#1B3022]">₹{(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 bg-white/80 backdrop-blur-xl border-t border-[#1B3022]/10">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-sans text-sm tracking-wider uppercase text-[#2D2D2D]">Subtotal</span>
                                    <span className="font-serif text-2xl text-[#1B3022]">₹{currentTotal.toFixed(2)}</span>
                                </div>
                                <button className="w-full bg-[#1B3022] text-[#F9F7F2] font-sans tracking-[0.2em] text-xs uppercase py-4 rounded-full hover:bg-[#2D2D2D] transition-colors shadow-xl">
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
