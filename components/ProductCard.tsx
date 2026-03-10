"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

interface ProductCardProps {
    id: string;
    name: string;
    slug: string;
    price: number;
    dosha: string;
    images: string[];
    stock: number;
}

export default function ProductCard({ id, name, slug, price, dosha, images, stock }: ProductCardProps) {
    const primaryImage = images[0] || "/placeholder-1.jpg";
    const secondaryImage = images[1] || primaryImage;

    return (
        <Link href={`/product/${slug}`} className="block">
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-xl bg-white/30 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(27,48,34,0.05)] transition-all duration-300 hover:backdrop-blur-2xl cursor-pointer group flex flex-col h-full"
            >
                <div className="relative h-80 w-full overflow-hidden">
                    {/* Primary Image */}
                    <motion.img
                        layoutId={`product-image-${id}`}
                        src={primaryImage}
                        alt={name}
                        className="absolute inset-0 object-cover w-full h-full transition-opacity duration-500 group-hover:opacity-0 group-hover:scale-105"
                    />
                    {/* Secondary (Lifestyle) Image */}
                    <motion.img
                        src={secondaryImage}
                        alt={`${name} lifestyle`}
                        className="absolute inset-0 object-cover w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:scale-105"
                    />

                    {/* Dosha Tag */}
                    <div className="absolute top-4 right-4 bg-white/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-[0_4px_16px_0_rgba(27,48,34,0.05)] z-10">
                        <span className="text-xs font-sans tracking-widest text-[#1B3022] uppercase">{dosha}</span>
                    </div>

                    {/* Low Stock Indicator */}
                    {stock > 0 && stock <= 5 && (
                        <div className="absolute bottom-4 left-4 bg-[#D4AF37]/90 backdrop-blur-md px-3 py-1 rounded-md shadow-md z-10">
                            <span className="text-xs font-sans text-white uppercase tracking-wider font-semibold">Low Stock: {stock} left</span>
                        </div>
                    )}
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between bg-white/10 backdrop-blur-md">
                    <div>
                        <h3 className="font-serif text-2xl text-[#1B3022] mb-2">{name}</h3>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="font-sans font-medium text-lg text-[#1B3022]">₹{price.toFixed(2)}</span>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                useCartStore.getState().addItem({
                                    id,
                                    name,
                                    price,
                                    image: primaryImage,
                                    quantity: 1,
                                    dosha
                                });
                            }}
                            className="bg-transparent border border-[#1B3022] text-[#1B3022] font-sans tracking-widest text-xs uppercase px-6 py-2 rounded-full hover:bg-[#1B3022] hover:text-[#F9F7F2] transition-colors"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
