"use client";

import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AdminProductsPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const products = useQuery(api.products.get);
    const safeProducts = products || [];

    const filteredProducts = safeProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (products === undefined) {
        return (
            <div className="flex h-[60vh] w-full items-center justify-center">
                <Loader2 className="animate-spin text-[#D4AF37]" size={32} />
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-2 block">
                        Inventory Management
                    </span>
                    <h1 className="font-serif text-4xl text-[#1B3022]">Product Catalog</h1>
                    <p className="font-sans text-[#2D2D2D]/60 mt-2">
                        Manage your live formulations, stock levels, and editorial content.
                    </p>
                </div>
                <Link href="/admin/products/add">
                    <button className="flex items-center gap-2 bg-[#1B3022] text-[#F9F7F2] px-6 py-3 rounded-lg font-sans text-sm tracking-wider uppercase hover:bg-black transition-colors shadow-sm">
                        <Plus size={16} /> Add Formulation
                    </button>
                </Link>
            </header>

            {/* Controls Bar */}
            <div className="bg-white p-4 rounded-xl border border-[#1B3022]/10 mb-6 flex flex-col md:flex-row gap-4 justify-between shadow-sm">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1B3022]/40" size={18} />
                    <input
                        type="text"
                        placeholder="Search formulations by name or handle..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg text-sm font-sans focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-[#1B3022]/20 rounded-lg text-sm font-sans text-[#1B3022] hover:bg-[#FAFAFA] transition-colors">
                        <Filter size={16} /> Category
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-[#1B3022]/20 rounded-lg text-sm font-sans text-[#1B3022] hover:bg-[#FAFAFA] transition-colors">
                        <Filter size={16} /> Stock Status
                    </button>
                </div>
            </div>

            {/* Product Data Table */}
            <div className="bg-white rounded-xl border border-[#1B3022]/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-sm whitespace-nowrap">
                        <thead className="bg-[#FAFAFA] border-b border-[#1B3022]/10">
                            <tr className="text-[#1B3022]/60 uppercase tracking-wider text-xs">
                                <th className="px-6 py-4 font-medium">Formulation</th>
                                <th className="px-6 py-4 font-medium">Dosha</th>
                                <th className="px-6 py-4 font-medium">Price</th>
                                <th className="px-6 py-4 font-medium">Available Stock</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1B3022]/5">
                            {filteredProducts.map((product) => (
                                <tr key={product._id} className="hover:bg-[#1B3022]/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-[#1B3022]/10">
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    width={48}
                                                    height={48}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-[#1B3022]">{product.name}</span>
                                                <span className="text-xs text-[#1B3022]/50">{product.slug}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1B3022]/5 border border-[#1B3022]/10 text-[10px] uppercase tracking-wider text-[#1B3022]">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                                            {product.dosha}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[#1B3022]">₹{product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`font-medium ${product.stock < 10 ? 'text-red-600' : 'text-[#1B3022]'}`}>
                                                {product.stock} units
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider ${product.stock > 0 ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                                            }`}>
                                            {product.stock > 0 ? 'Active' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-[#1B3022]/40 hover:text-[#1B3022] hover:bg-[#1B3022]/5 rounded-lg transition-colors">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
