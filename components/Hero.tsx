"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative w-full md:h-screen min-h-[600px] flex flex-col md:flex-row bg-[#F9F7F2] overflow-hidden pt-20">
            {/* Left Side - Mountain Imagery */}
            <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full md:w-[60%] h-[40vh] md:h-full relative order-2 md:order-1"
            >
                <Image
                    src="/banners/munsiyari_hero.png"
                    alt="Munsiyari Uttarakhand Mountain Landscape"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Subtle Glass Overlay for texture */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1B3022]/10 to-transparent mix-blend-overlay"></div>
            </motion.div>

            {/* Right Side - Typography & CTA */}
            <div className="w-full md:w-[40%] flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-[#F9F7F2] order-1 md:order-2 z-10 py-12 md:py-0">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4 block">
                        Pure Altitude Awakening
                    </span>
                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#1B3022] leading-[1.1] mb-6">
                        Elevate Your <br /> Internal <br /> Ecosystem.
                    </h1>
                    <p className="font-sans text-[#2D2D2D]/80 text-base md:text-lg mb-10 max-w-md leading-relaxed">
                        Discover Ayurvedic formulations born in the pure high-altitude air of the Himalayas. Designed to restore profound balance and natural vitality to your daily life.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <button className="bg-[#1B3022] text-[#F9F7F2] font-sans tracking-[0.2em] text-sm uppercase px-10 py-4 hover:bg-[#2D2D2D] transition-colors relative overflow-hidden group">
                            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-full block">Start Your Ritual</span>
                            <span className="absolute inset-0 z-10 flex items-center justify-center translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-[#D4AF37]">Start Your Ritual</span>
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative vertical border/text like Ayur Himalaya */}
            <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-16 border-l border-[#1B3022]/10 items-center justify-center">
                <span className="font-sans text-[10px] tracking-[0.4em] text-[#1B3022] uppercase transform rotate-90 whitespace-nowrap">
                    Ayur Himalaya — Est. 2026
                </span>
            </div>
        </section>
    );
}
