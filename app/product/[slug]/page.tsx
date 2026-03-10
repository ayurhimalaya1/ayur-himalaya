"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCartStore } from "@/store/cartStore";
import { Plus, Minus } from "lucide-react";
import { mockProducts } from "@/lib/mockProducts";

export default function ProductPage({ params }: { params: { slug: string } }) {
    // In a real app we would use useQuery(api.products.getBySlug, { slug: params.slug })
    const product = mockProducts.find(p => p.slug === params.slug) || mockProducts[2]; // Fallback to Shilajit if not found


    const addItem = useCartStore((state) => state.addItem);
    const [activeImage, setActiveImage] = useState(0);

    const [openAccordion, setOpenAccordion] = useState<string | null>("ingredients");

    const toggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center bg-ayur-bg">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-ayur-bg pt-24 pb-32">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">

                {/* LEFT COLUMN: Gallery (60% equivalent on lg) */}
                <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-6">
                    {/* Vertical Thumbnail List */}
                    <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible w-full md:w-24 shrink-0 pb-4 md:pb-0 scrollbar-hide">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`relative w-24 h-32 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-[#D4AF37] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            >
                                <img src={img} alt={`${product.name} View ${idx + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>

                    {/* Main Image with Framer Motion Zoom */}
                    <div className="relative w-full h-[60vh] md:h-[85vh] rounded-2xl overflow-hidden bg-white/40 backdrop-blur-md">
                        <motion.img
                            key={activeImage}
                            initial={{ scale: 1.05, opacity: 0.8 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            src={product.images[activeImage]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* RIGHT COLUMN: Sticky Info (40% equivalent on lg) */}
                <div className="lg:col-span-5 relative">
                    <div className="sticky top-32">

                        {/* Dosha Badge */}
                        <div className="mb-6 inline-flex items-center gap-2 bg-[#1B3022]/5 px-4 py-1.5 rounded-full border border-[#1B3022]/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                            <span className="font-sans tracking-[0.2em] text-[10px] uppercase text-[#1B3022] font-semibold">{product.dosha}</span>
                        </div>

                        {/* Title & Price */}
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1B3022] mb-6 leading-[1.1]">{product.name}</h1>
                        <p className="font-sans text-2xl text-[#1B3022] mb-10 font-light">₹{product.price}</p>

                        {/* Editorial Description with Parallax Background Hint */}
                        <div className="relative p-8 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(27,48,34,0.03)] mb-10 overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800')] opacity-5 bg-fixed"></div>
                            <p className="relative z-10 font-sans text-[#2D2D2D]/80 leading-relaxed text-sm">
                                {product.editorialDescription}
                            </p>
                        </div>

                        {/* Real-Time Stock */}
                        <p className="font-sans text-xs tracking-widest text-[#D4AF37] uppercase mb-8 flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
                            </span>
                            Only {product.stock} packs remaining in Munsiari
                        </p>

                        {/* Add to Cart Button (Luxury Hover) */}
                        <button
                            onClick={() => addItem({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.images[0],
                                quantity: 1,
                                dosha: product.dosha
                            })}
                            className="w-full bg-[#1B3022] text-[#F9F7F2] font-sans tracking-[0.2em] text-xs uppercase py-5 rounded-full hover:bg-black transition-all relative overflow-hidden group mb-12 shadow-xl"
                        >
                            <span className="relative z-10">Add To Essential Ritual — ₹{product.price}</span>
                            {/* Gold border-bottom glow effect on hover */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#D4AF37] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>

                        {/* Minimalist Accordions */}
                        <div className="border-t border-[#1B3022]/10">
                            {[
                                { id: "ingredients", title: "Ingredients", content: product.ingredients },
                                { id: "sourcing", title: "Sourcing", content: product.sourcing },
                                { id: "ritual", title: "The Ritual", content: product.ritual }
                            ].map((section) => (
                                <div key={section.id} className="border-b border-[#1B3022]/10">
                                    <button
                                        onClick={() => toggleAccordion(section.id)}
                                        className="w-full flex items-center justify-between py-6 group"
                                    >
                                        <span className="font-serif text-lg text-[#1B3022] group-hover:text-[#D4AF37] transition-colors">{section.title}</span>
                                        <span className="text-[#1B3022]/60">
                                            {openAccordion === section.id ? <Minus size={18} strokeWidth={1} /> : <Plus size={18} strokeWidth={1} />}
                                        </span>
                                    </button>
                                    <motion.div
                                        initial={false}
                                        animate={{ height: openAccordion === section.id ? "auto" : 0, opacity: openAccordion === section.id ? 1 : 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-6 font-sans text-sm text-[#2D2D2D]/70 leading-relaxed pr-8">
                                            {section.content}
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* Immersive Product Banner */}
            <section className="relative w-full h-[60vh] md:h-[70vh] mt-24 overflow-hidden">
                <div className="absolute inset-0 bg-[#1B3022]/40 z-10" />
                <Image
                    src={product.images[1] || product.images[0]}
                    alt={`${product.name} Lifestyle`}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#F9F7F2] mb-6 max-w-3xl leading-tight">
                            Experience the Purity of the Himalayas
                        </h2>
                        <p className="font-sans text-[#F9F7F2]/80 max-w-xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                            Ethically sourced and traditionally prepared to preserve maximum maximum potency and authentic essence.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Detailed Benefits Grid */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-32">
                <div className="text-center mb-20">
                    <span className="font-sans text-[#D4AF37] tracking-widest text-sm uppercase font-semibold block mb-4">Why {product.name}</span>
                    <h2 className="font-serif text-3xl md:text-5xl text-[#1B3022]">The Ayurvedic Advantage</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-col items-center text-center group"
                    >
                        <div className="w-20 h-20 rounded-full bg-[#1B3022]/5 flex items-center justify-center mb-8 group-hover:bg-[#1B3022]/10 transition-colors">
                            <div className="w-8 h-8 rounded-full border border-[#1B3022] opacity-50" />
                        </div>
                        <h3 className="font-serif text-2xl text-[#1B3022] mb-4">Pure & Untouched</h3>
                        <p className="font-sans text-[#2D2D2D]/70 leading-relaxed text-sm md:text-base">Harvested directly from high-altitude regions, ensuring zero contamination or modern pollution.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col items-center text-center group"
                    >
                        <div className="w-20 h-20 rounded-full bg-[#1B3022]/5 flex items-center justify-center mb-8 group-hover:bg-[#1B3022]/10 transition-colors">
                            <div className="w-8 h-8 border-2 border-[#D4AF37] rotate-45 opacity-80" />
                        </div>
                        <h3 className="font-serif text-2xl text-[#1B3022] mb-4">Maximum Potency</h3>
                        <p className="font-sans text-[#2D2D2D]/70 leading-relaxed text-sm md:text-base">Processed using gentle, traditional Ayurvedic methods that protect the delicate active compounds and energetics.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col items-center text-center group"
                    >
                        <div className="w-20 h-20 rounded-full bg-[#1B3022]/5 flex items-center justify-center mb-8 group-hover:bg-[#1B3022]/10 transition-colors">
                            <div className="w-8 h-8 border-t-2 border-r-2 border-[#1B3022] rotate-45 opacity-50" />
                        </div>
                        <h3 className="font-serif text-2xl text-[#1B3022] mb-4">Dosha Balance</h3>
                        <p className="font-sans text-[#2D2D2D]/70 leading-relaxed text-sm md:text-base">Targeted to bring harmony to your mind and body, aligning with your unique doshic constitution: {product.dosha}.</p>
                    </motion.div>
                </div>
            </section>

            {/* Mobile Floating Action Bar */}
            <div className="fixed bottom-0 left-0 w-full p-4 lg:hidden z-40">
                <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_-8px_32px_0_rgba(27,48,34,0.1)] rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="font-serif text-[#1B3022] font-medium">{product.name}</span>
                        <span className="font-sans text-sm text-[#1B3022]/60">₹{product.price}</span>
                    </div>
                    <button
                        onClick={() => addItem({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.images[0],
                            quantity: 1,
                            dosha: product.dosha
                        })}
                        className="bg-[#1B3022] text-[#F9F7F2] px-6 py-3 rounded-full font-sans text-xs tracking-widest uppercase"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
