export default function ContactPage() {
    return (
        <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                    <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4 block">
                        Get in Touch
                    </span>
                    <h1 className="font-serif text-5xl md:text-6xl text-[#1B3022] mb-8">
                        Connect with the Mountain
                    </h1>
                    <p className="font-sans text-[#2D2D2D]/60 max-w-sm leading-relaxed mb-12 text-sm">
                        Whether you need guidance on selecting the right botanical for your Dosha, or wish to inquire about our wholesale partnerships, our team of Ayurvedic practitioners is here to assist.
                    </p>

                    <div className="space-y-8 font-sans text-sm text-[#1B3022]">
                        <div>
                            <strong className="block tracking-[0.2em] uppercase text-xs text-[#2D2D2D]/50 mb-1">Email Inquiry</strong>
                            <a href="mailto:namaste@ayurhimalaya.com" className="hover:text-[#D4AF37] transition-colors">namaste@ayurhimalaya.com</a>
                        </div>
                        <div>
                            <strong className="block tracking-[0.2em] uppercase text-xs text-[#2D2D2D]/50 mb-1">Practitioner Line</strong>
                            <a href="tel:+918001234567" className="hover:text-[#D4AF37] transition-colors">+91 800 123 4567</a><br />
                            <span className="text-[#2D2D2D]/50 mt-1 block">Mon-Fri, 9am - 5pm IST</span>
                        </div>
                        <div>
                            <strong className="block tracking-[0.2em] uppercase text-xs text-[#2D2D2D]/50 mb-1">The Sanctuary (by appointment)</strong>
                            <p className="leading-relaxed mt-1">
                                Ayur Himalaya Basecamp<br />
                                12 Mountain Road, Village Munsiyari<br />
                                Uttarakhand, India 262554
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-12 rounded-xl shadow-lg border border-[#1B3022]/10">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-sans text-xs uppercase tracking-widest text-[#1B3022]/60 mb-2">First Name</label>
                                <input type="text" className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
                            </div>
                            <div>
                                <label className="block font-sans text-xs uppercase tracking-widest text-[#1B3022]/60 mb-2">Last Name</label>
                                <input type="text" className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
                            </div>
                        </div>
                        <div>
                            <label className="block font-sans text-xs uppercase tracking-widest text-[#1B3022]/60 mb-2">Email Address</label>
                            <input type="email" className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
                        </div>
                        <div>
                            <label className="block font-sans text-xs uppercase tracking-widest text-[#1B3022]/60 mb-2">Subject</label>
                            <select className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none">
                                <option>Product Inquiry</option>
                                <option>Order Status</option>
                                <option>Wholesale</option>
                                <option>Ayurvedic Consultation</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-sans text-xs uppercase tracking-widest text-[#1B3022]/60 mb-2">Message</label>
                            <textarea rows={5} className="w-full bg-[#FAFAFA] border border-[#1B3022]/20 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"></textarea>
                        </div>
                        <button type="button" className="w-full bg-[#1B3022] text-[#F9F7F2] tracking-[0.2em] font-sans text-xs uppercase py-4 rounded-lg hover:bg-black transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
