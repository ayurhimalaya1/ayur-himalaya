"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon, Save, CheckCircle, CreditCard, Loader2, UploadCloud } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function SettingsPage() {
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    // Fetch live settings from Convex
    const liveSettings = useQuery(api.settings.getSettings);
    const updateSettingsMutation = useMutation(api.settings.updateSettings);
    const generateUploadUrl = useMutation(api.images.generateUploadUrl);
    const getUrlMutation = useMutation(api.images.getUrlMutation);

    const [formData, setFormData] = useState({
        heroHeading: "",
        heroSubtext: "",
        heroImage: "",
        promoBannerActive: false,
        promoBannerText: "",
        razorpayKeyId: "",
        razorpayKeySecret: "",
        razorpayActive: false,
    });

    // Sync form data once query loads
    useEffect(() => {
        if (liveSettings) {
            setFormData({
                heroHeading: liveSettings.heroHeading || "",
                heroSubtext: liveSettings.heroSubtext || "",
                heroImage: liveSettings.heroImage || "",
                promoBannerActive: liveSettings.promoBannerActive || false,
                promoBannerText: liveSettings.promoBannerText || "",
                razorpayKeyId: liveSettings.razorpayKeyId || "",
                razorpayKeySecret: liveSettings.razorpayKeySecret || "",
                razorpayActive: liveSettings.razorpayActive || false,
            });
        }
    }, [liveSettings]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            await updateSettingsMutation({
                heroHeading: formData.heroHeading,
                heroSubtext: formData.heroSubtext,
                heroImage: formData.heroImage,
                promoBannerActive: formData.promoBannerActive,
                promoBannerText: formData.promoBannerText,
                razorpayKeyId: formData.razorpayKeyId,
                razorpayKeySecret: formData.razorpayKeySecret,
                razorpayActive: formData.razorpayActive,
            });

            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error("Failed to save settings", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingImage(true);
        try {
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
                setFormData(prev => ({ ...prev, heroImage: fullUrl }));
            }
        } catch (error) {
            console.error("Failed to upload image", error);
        } finally {
            setIsUploadingImage(false);
        }
    };

    if (liveSettings === undefined) {
        return (
            <div className="flex h-[60vh] w-full items-center justify-center">
                <Loader2 className="animate-spin text-[#D4AF37]" size={32} />
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-2 block">
                        Control Center
                    </span>
                    <h1 className="font-serif text-4xl text-[#1B3022]">Site Settings</h1>
                    <p className="font-sans text-[#2D2D2D]/60 mt-2">
                        Control the live text, banners, and payment integrations across Ayur Himalaya.
                    </p>
                </div>

                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-[#1B3022] text-[#F9F7F2] px-6 py-3 rounded-lg font-sans text-sm tracking-wider uppercase hover:bg-black transition-colors disabled:opacity-70 shadow-sm"
                >
                    {isSaving ? "Publishing..." : saved ? <><CheckCircle size={16} /> Live Now</> : <><Save size={16} /> Publish Changes</>}
                </button>
            </header>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Payment Gateway Integration */}
                <div className="bg-white rounded-xl border border-[#1B3022]/10 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6 border-b border-[#1B3022]/10 pb-4">
                        <div className="flex items-center gap-3">
                            <CreditCard className="text-[#D4AF37]" size={24} />
                            <h2 className="font-serif text-2xl text-[#1B3022]">Payment Gateway</h2>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={formData.razorpayActive}
                                onChange={(e) => setFormData({ ...formData, razorpayActive: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B3022]"></div>
                            <span className="ms-3 text-sm font-sans tracking-widest uppercase text-[#1B3022]/60">Razorpay Active</span>
                        </label>
                    </div>

                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300 ${formData.razorpayActive ? "opacity-100" : "opacity-50"}`}>
                        <div>
                            <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">Razorpay Key ID</label>
                            <input
                                type="text"
                                placeholder="rzp_test_..."
                                value={formData.razorpayKeyId}
                                onChange={(e) => setFormData({ ...formData, razorpayKeyId: e.target.value })}
                                disabled={!formData.razorpayActive}
                                className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-mono text-sm text-[#2D2D2D] focus:outline-none focus:border-[#D4AF37] transition-colors disabled:bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">Razorpay Key Secret</label>
                            <input
                                type="password"
                                placeholder="**********************"
                                value={formData.razorpayKeySecret}
                                onChange={(e) => setFormData({ ...formData, razorpayKeySecret: e.target.value })}
                                disabled={!formData.razorpayActive}
                                className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-mono text-sm text-[#2D2D2D] focus:outline-none focus:border-[#D4AF37] transition-colors disabled:bg-gray-100"
                            />
                        </div>
                    </div>
                </div>

                {/* Homepage Hero Section Control */}
                <div className="bg-white rounded-xl border border-[#1B3022]/10 p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 border-b border-[#1B3022]/10 pb-4">
                        <ImageIcon className="text-[#D4AF37]" size={24} />
                        <h2 className="font-serif text-2xl text-[#1B3022]">Homepage Hero</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">Main Heading</label>
                            <input
                                type="text"
                                value={formData.heroHeading}
                                onChange={(e) => setFormData({ ...formData, heroHeading: e.target.value })}
                                className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-serif text-xl text-[#1B3022] focus:outline-none focus:border-[#D4AF37] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">Supporting Text</label>
                            <textarea
                                value={formData.heroSubtext}
                                onChange={(e) => setFormData({ ...formData, heroSubtext: e.target.value })}
                                rows={3}
                                className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-sans text-[#2D2D2D] focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                            />
                        </div>

                        <div>
                            <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">Hero Image</label>
                            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                                {formData.heroImage ? (
                                    <div className="w-48 h-32 shrink-0 rounded-lg overflow-hidden border-2 border-[#1B3022]/10 bg-gray-100 relative group text-center cursor-pointer">
                                        <img src={formData.heroImage} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <span className="text-white font-sans tracking-wide text-xs">Replace Image</span>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={isUploadingImage}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-wait"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-48 h-32 shrink-0 rounded-lg border-2 border-dashed border-[#1B3022]/20 bg-[#FAFAFA] flex flex-col items-center justify-center relative hover:bg-gray-50 transition-colors cursor-pointer">
                                        <UploadCloud size={24} className="text-[#1B3022]/40 mb-2" />
                                        <span className="font-sans text-xs text-[#1B3022]/50 tracking-wide">Upload Image</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={isUploadingImage}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-wait"
                                        />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <p className="font-sans text-xs text-[#1B3022]/50 leading-relaxed mb-3">
                                        Upload a high-resolution Himalayan showcase image (16:9 ratio). We handle hosting securely on Convex storage.
                                    </p>
                                    {isUploadingImage && (
                                        <span className="inline-flex items-center gap-2 text-xs font-sans text-[#D4AF37] tracking-wider uppercase">
                                            <Loader2 size={12} className="animate-spin" /> Uploading to Secure Storage...
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Promotional Top Bar */}
                <div className="bg-white rounded-xl border border-[#1B3022]/10 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6 border-b border-[#1B3022]/10 pb-4">
                        <h2 className="font-serif text-2xl text-[#1B3022]">Global Promo Banner</h2>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={formData.promoBannerActive}
                                onChange={(e) => setFormData({ ...formData, promoBannerActive: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B3022]"></div>
                            <span className="ms-3 text-sm font-sans tracking-widest uppercase text-[#1B3022]/60">Active</span>
                        </label>
                    </div>

                    <div className={`transition-opacity duration-300 ${formData.promoBannerActive ? "opacity-100" : "opacity-50"}`}>
                        <label className="block font-sans text-sm uppercase tracking-wider text-[#1B3022]/60 mb-2">Banner Message</label>
                        <input
                            type="text"
                            value={formData.promoBannerText}
                            onChange={(e) => setFormData({ ...formData, promoBannerText: e.target.value })}
                            disabled={!formData.promoBannerActive}
                            className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-sans text-sm text-[#2D2D2D] focus:outline-none focus:border-[#D4AF37] transition-colors text-center disabled:bg-gray-100"
                        />
                        {formData.promoBannerActive && (
                            <div className="mt-4 p-3 bg-[#1B3022] text-[#D4AF37] text-xs font-sans tracking-[0.2em] uppercase text-center w-full rounded-sm">
                                Preview: {formData.promoBannerText}
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
