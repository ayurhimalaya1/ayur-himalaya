"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, UploadCloud, X } from "lucide-react";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function AddProductPage() {
    const router = useRouter();
    const createProduct = useMutation(api.products.create);
    const generateUploadUrl = useMutation(api.images.generateUploadUrl);
    const getUrlMutation = useMutation(api.images.getUrlMutation);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        category: "Treasury",
        price: "",
        stock: "100",
        dosha: "Vata, Pitta, Kapha",
        benefit: "General Wellness",
        editorialDescription: "A rare and potent Himalayan formulation.",
        images: [] as string[],
    });

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            await createProduct({
                name: formData.name,
                slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                category: formData.category,
                price: parseFloat(formData.price) || 0,
                stock: parseInt(formData.stock) || 0,
                dosha: formData.dosha,
                benefit: formData.benefit,
                editorialDescription: formData.editorialDescription,
                images: formData.images.length > 0 ? formData.images : ["/products/shilajit_premium_1773167629811.png"],
            });

            router.push("/admin/products");
        } catch (error) {
            console.error("Failed to create product:", error);
            setIsSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setIsUploadingImage(true);
        try {
            const uploadedUrls: string[] = [];

            for (const file of files) {
                // 1. Get a short-lived upload URL from Convex
                const postUrl = await generateUploadUrl();

                // 2. HTTP POST the file to that URL
                const result = await fetch(postUrl, {
                    method: "POST",
                    headers: { "Content-Type": file.type },
                    body: file,
                });
                const { storageId } = await result.json();

                // 3. Resolve the public URL using our mutation
                const fullUrl = await getUrlMutation({ storageId: storageId as Id<"_storage"> });
                if (fullUrl) {
                    uploadedUrls.push(fullUrl);
                }
            }

            if (uploadedUrls.length > 0) {
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, ...uploadedUrls].slice(0, 4) // max 4
                }));
            }
        } catch (error) {
            console.error("Failed to upload images", error);
        } finally {
            setIsUploadingImage(false);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <Link href="/admin/products" className="text-[#1B3022]/60 hover:text-[#1B3022] flex items-center gap-2 font-sans text-sm mb-4 transition-colors">
                        <ArrowLeft size={16} /> Back to Catalog
                    </Link>
                    <h1 className="font-serif text-4xl text-[#1B3022]">Add Formulation</h1>
                    <p className="font-sans text-[#2D2D2D]/60 mt-2">
                        Create a new product listing in your live database.
                    </p>
                </div>

                <button
                    onClick={handleSave}
                    disabled={isSaving || !formData.name || !formData.price}
                    className="flex items-center gap-2 bg-[#1B3022] text-[#F9F7F2] px-6 py-3 rounded-lg font-sans text-sm tracking-wider uppercase hover:bg-black transition-colors shadow-sm disabled:opacity-50"
                >
                    {isSaving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Publish Formulation</>}
                </button>
            </header>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-white rounded-xl border border-[#1B3022]/10 p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <h2 className="font-serif text-2xl text-[#1B3022] mb-6 border-b border-[#1B3022]/10 pb-4">Core Identity</h2>
                    </div>

                    <div>
                        <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">Product Name *</label>
                        <input
                            type="text" required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                            className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">URL Slug</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-mono text-xs focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">Price (INR) *</label>
                        <input
                            type="number" required min="0" step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">Initial Stock</label>
                        <input
                            type="number" min="0"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                    </div>
                </div>

                {/* Ayurvedic Metadata */}
                <div className="bg-white rounded-xl border border-[#1B3022]/10 p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <h2 className="font-serif text-2xl text-[#1B3022] mb-6 border-b border-[#1B3022]/10 pb-4">Ayurvedic Profile</h2>
                    </div>

                    <div>
                        <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                        >
                            <option value="Treasury">Himalayan Herb Treasury</option>
                            <option value="Spices">Spices & Salts</option>
                            <option value="Teas">Teas & Pickles</option>
                            <option value="Pulses">Himalayan Pulses & Grains</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">Dosha Balancing</label>
                        <input
                            type="text"
                            value={formData.dosha}
                            onChange={(e) => setFormData({ ...formData, dosha: e.target.value })}
                            className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">Primary Benefit Banner</label>
                        <input
                            type="text"
                            value={formData.benefit}
                            onChange={(e) => setFormData({ ...formData, benefit: e.target.value })}
                            className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">Editorial Description</label>
                        <textarea
                            rows={4}
                            value={formData.editorialDescription}
                            onChange={(e) => setFormData({ ...formData, editorialDescription: e.target.value })}
                            className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                        />
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white rounded-xl border border-[#1B3022]/10 p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 border-b border-[#1B3022]/10 pb-4">
                        <ImageIcon className="text-[#D4AF37]" size={24} />
                        <h2 className="font-serif text-2xl text-[#1B3022]">Product Imagery</h2>
                    </div>

                    <div>
                        <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">Product Images</label>
                        <div className="flex flex-wrap gap-4 mb-4">
                            {formData.images.map((img, idx) => (
                                <div key={idx} className="w-24 h-24 rounded-lg overflow-hidden border border-[#1B3022]/20 relative group bg-gray-100">
                                    <img src={img} alt={`Product view ${idx + 1}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))}
                                        className="absolute top-1 right-1 bg-white/90 p-1.5 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
                                    >
                                        <X size={12} strokeWidth={3} />
                                    </button>
                                </div>
                            ))}
                            {formData.images.length < 4 && (
                                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-[#1B3022]/20 bg-[#FAFAFA] flex flex-col items-center justify-center relative hover:bg-gray-50 transition-colors cursor-pointer">
                                    <UploadCloud size={20} className="text-[#1B3022]/40 mb-1" />
                                    <span className="font-sans text-[10px] text-[#1B3022]/50 tracking-wide text-center">Add<br />Image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        disabled={isUploadingImage}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-wait"
                                    />
                                </div>
                            )}
                        </div>
                        {isUploadingImage && (
                            <span className="inline-flex items-center gap-2 text-xs font-sans text-[#D4AF37] tracking-wider uppercase mb-2">
                                <Loader2 size={12} className="animate-spin" /> Uploading to Secure Storage...
                            </span>
                        )}
                        <p className="mt-2 font-sans text-xs text-[#1B3022]/50">Upload up to 4 high-quality images. The first image will be the primary thumbnail.</p>
                    </div>
                </div>
            </form>
        </div>
    );
}
