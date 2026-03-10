import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#1B3022] text-[#F9F7F2] py-20 px-6 md:px-12 lg:px-24 border-t border-[#F9F7F2]/10 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 mb-20">

                    {/* Brand & Newsletter */}
                    <div className="md:col-span-5 lg:col-span-4">
                        <Link href="/" className="group flex flex-col items-start mb-8">
                            <span className="font-serif text-4xl text-[#F9F7F2] tracking-wide leading-none group-hover:text-[#D4AF37] transition-colors duration-500">
                                Ayur Himalaya
                            </span>
                            <span className="font-sans text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] mt-2 pl-1 opacity-80">
                                High Altitude Wellness
                            </span>
                        </Link>
                        <p className="font-sans text-[#F9F7F2]/70 text-sm leading-relaxed mb-8 max-w-sm">
                            Discover the profound balance of high-altitude Ayurvedic formulations. Join our community for exclusive access to new harvests and wellness rituals.
                        </p>

                        <form className="relative max-w-sm group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-transparent border-b border-[#F9F7F2]/30 py-3 pr-10 font-sans text-sm text-[#F9F7F2] placeholder-[#F9F7F2]/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
                                required
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#F9F7F2]/50 group-hover:text-[#D4AF37] transition-colors"
                            >
                                <ArrowRight size={20} strokeWidth={1.5} />
                            </button>
                        </form>
                    </div>

                    {/* Navigation Links */}
                    <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] mb-6">Shop</h4>
                            <ul className="space-y-4">
                                <li><Link href="/collections" className="font-sans text-sm text-[#F9F7F2]/80 hover:text-[#D4AF37] transition-colors">All Products</Link></li>
                                <li><Link href="/collections/vata" className="font-sans text-sm text-[#F9F7F2]/80 hover:text-[#D4AF37] transition-colors">Vata Collection</Link></li>
                                <li><Link href="/collections/pitta" className="font-sans text-sm text-[#F9F7F2]/80 hover:text-[#D4AF37] transition-colors">Pitta Collection</Link></li>
                                <li><Link href="/collections/kapha" className="font-sans text-sm text-[#F9F7F2]/80 hover:text-[#D4AF37] transition-colors">Kapha Collection</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] mb-6">Explore</h4>
                            <ul className="space-y-4">
                                <li><Link href="/our-story" className="font-sans text-sm text-[#F9F7F2]/80 hover:text-[#D4AF37] transition-colors">Our Story</Link></li>
                                <li><Link href="/sourcing" className="font-sans text-sm text-[#F9F7F2]/80 hover:text-[#D4AF37] transition-colors">Sourcing</Link></li>
                                <li><Link href="/journal" className="font-sans text-sm text-[#F9F7F2]/80 hover:text-[#D4AF37] transition-colors">Journal</Link></li>
                                <li><Link href="/quiz" className="font-sans text-sm text-[#F9F7F2]/80 hover:text-[#D4AF37] transition-colors">Dosha Quiz</Link></li>
                            </ul>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] mb-6">Support</h4>
                            <ul className="space-y-4">
                                <li><Link href="/contact" className="font-sans text-sm text-[#F9F7F2]/80 hover:text-[#D4AF37] transition-colors">Contact Us</Link></li>
                                <li><Link href="/shipping-and-returns" className="font-sans text-sm text-[#F9F7F2]/80 hover:text-[#D4AF37] transition-colors">Shipping & Returns</Link></li>
                                <li><Link href="/faq" className="font-sans text-sm text-[#F9F7F2]/80 hover:text-[#D4AF37] transition-colors">FAQ</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#F9F7F2]/10 gap-6">
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-[#F9F7F2]/60 hover:text-[#F9F7F2] transition-colors"><Instagram size={18} /></Link>
                        <Link href="#" className="text-[#F9F7F2]/60 hover:text-[#F9F7F2] transition-colors"><Twitter size={18} /></Link>
                        <Link href="#" className="text-[#F9F7F2]/60 hover:text-[#F9F7F2] transition-colors"><Facebook size={18} /></Link>
                    </div>

                    <div className="flex items-center gap-6 text-[11px] font-sans tracking-widest uppercase text-[#F9F7F2]/50">
                        <Link href="#" className="hover:text-[#F9F7F2] transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-[#F9F7F2] transition-colors">Terms</Link>
                        <span>&copy; {new Date().getFullYear()} Ayur Himalaya</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
