import Image from "next/image";

export default function OurStory() {
    return (
        <div className="bg-[#F9F7F2] min-h-screen pt-24 pb-32">
            {/* Hero Section */}
            <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden mb-24">
                <Image
                    src="/banners/munsiyari_hero.png" // Reusing the mountain view for the hero background here as a placeholder for roots
                    alt="Himalayan Heritage"
                    fill
                    className="object-cover opacity-90"
                    priority
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative z-10 text-center px-4 max-w-3xl">
                    <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4 block drop-shadow-md">
                        Our Heritage
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl text-[#F9F7F2] drop-shadow-lg">
                        Return to the <br /> Source.
                    </h1>
                </div>
            </section>

            {/* Introduction */}
            <section className="max-w-4xl mx-auto px-6 md:px-12 text-center mb-32">
                <p className="font-sans text-xl md:text-2xl text-[#1B3022]/80 leading-relaxed font-light">
                    Ayur Himalaya was not founded in a laboratory. It was born at 12,000 feet,
                    where the air is thin, the soil is pure, and the knowledge of generations
                    is spoken through the hands of those who tend the earth.
                </p>
                <div className="w-12 h-px bg-[#D4AF37] mx-auto mt-12 block"></div>
            </section>

            {/* Split Content */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
                <div className="order-2 md:order-1 flex flex-col justify-center">
                    <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-3 block">
                        The Foragers
                    </span>
                    <h2 className="font-serif text-4xl text-[#1B3022] mb-6">
                        4th Generation Keepers of the Mountain
                    </h2>
                    <p className="font-sans text-[#2D2D2D]/70 leading-relaxed mb-6">
                        We work exclusively with local indigenous communities in Uttarakhand and Himachal Pradesh.
                        These families possess an intimate, generational understanding of the alpine ecosystem.
                        They know precisely when to harvest a root based on the lunar cycle to ensure its
                        highest medicinal potency, a practice modern science is only just beginning to validate.
                    </p>
                    <p className="font-sans text-[#2D2D2D]/70 leading-relaxed">
                        By bypassing commercial supply chains, we guarantee that our ingredients are never degraded
                        by warehouses or mass agricultural practices. Every formulation you receive was touched
                        by hands that respect the mountain.
                    </p>
                </div>
                <div className="order-1 md:order-2 h-[600px] relative rounded-t-[100px] rounded-b-xl overflow-hidden shadow-2xl">
                    <Image
                        src="/products/shilajit_premium_1773167629811.png"
                        alt="Harvesting Shilajit"
                        fill
                        className="object-cover"
                    />
                </div>
            </section>

            {/* Philosophy Grid */}
            <section className="bg-[#1B3022] py-24 px-6 md:px-12 text-[#F9F7F2]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl mb-6">The Ayurvedic Triad</h2>
                        <p className="font-sans text-[#F9F7F2]/60 max-w-2xl mx-auto">
                            Ayurveda teaches that health is the delicate balance of three fundamental energies (Doshas).
                            Our formulations are crafted to realign these internal rhythms.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: "Vata", desc: "The energy of movement. When balanced, it promotes creativity and vitality. When aggravated, it causes anxiety and dryness. Our grounding roots calm Vata.", symbol: "🌬️" },
                            { title: "Pitta", desc: "The energy of transformation. It governs digestion and metabolism. Excess Pitta leads to inflammation. We use cooling alpine herbs to soothe it.", symbol: "🔥" },
                            { title: "Kapha", desc: "The energy of structure. It provides stamina and immunity. Sluggish Kapha causes lethargy. Our warming, aromatic spices invigorate the system.", symbol: "💧" }
                        ].map((dosha, i) => (
                            <div key={i} className="border border-[#F9F7F2]/10 p-8 pt-12 relative hover:bg-white/5 transition-colors">
                                <div className="absolute -top-6 left-8 w-12 h-12 bg-[#F9F7F2] rounded-full flex items-center justify-center text-xl shadow-lg">
                                    {dosha.symbol}
                                </div>
                                <h3 className="font-serif text-2xl mb-4 text-[#D4AF37]">{dosha.title}</h3>
                                <p className="font-sans text-sm text-[#F9F7F2]/70 leading-relaxed">
                                    {dosha.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
