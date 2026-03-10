import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Journal() {
    const articles = [
        {
            id: 1,
            title: "Demystifying Shilajit: The Destroyer of Weakness",
            excerpt: "Found only in the sheer rock faces of the High Himalayas, the black resin known as Shilajit is Ayurveda’s most potent adaptogen...",
            category: "Botanicals",
            readTime: "5 min read",
            image: "/products/shilajit_premium_1773167629811.png",
            date: "Oct 12, 2026",
        },
        {
            id: 2,
            title: "Aligning Your Diet with the Lunar Cycle",
            excerpt: "Ancient texts suggest that the gravitational pull of the moon affects not just the tides, but the water within our own bodies...",
            category: "Rituals",
            readTime: "8 min read",
            image: "/products/seabuckthorn_tea_premium_1773167662649.png",
            date: "Sep 28, 2026",
        },
        {
            id: 3,
            title: "Ashwagandha: Why Altitude Matters",
            excerpt: "Not all Ashwagandha is created equal. We explore the phytochemical differences between low-valley farmed root and wild high-altitude harvests...",
            category: "Sourcing",
            readTime: "4 min read",
            image: "/products/meetha_atish_premium_1773167596536.png",
            date: "Sep 15, 2026",
        },
        {
            id: 4,
            title: "The Pitta Pacifying Morning Routine",
            excerpt: "If you are experiencing acid reflux, irritability, or skin inflammation, your Pitta dosha may be aggravated. Here is how to cool the fire...",
            category: "Wellness",
            readTime: "6 min read",
            image: "/products/kutki_premium_1773167646028.png",
            date: "Aug 30, 2026",
        }
    ];

    return (
        <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <header className="mb-20 text-center">
                    <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4 block">
                        Editorial
                    </span>
                    <h1 className="font-serif text-5xl md:text-6xl text-[#1B3022] mb-6">
                        The Himalayan Journal
                    </h1>
                    <p className="font-sans text-[#2D2D2D]/60 max-w-2xl mx-auto leading-relaxed">
                        Research, rituals, and reflections on living an Ayurvedic life in the modern world.
                    </p>
                </header>

                {/* Featured Article */}
                <div className="mb-24 relative rounded-2xl overflow-hidden group cursor-pointer block">
                    <div className="relative h-[60vh] min-h-[500px] w-full">
                        <Image
                            src="/products/yarsagumba_premium_1773167614035.png"
                            alt="Featured Article"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3022]/90 via-[#1B3022]/40 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-[#F9F7F2]">
                        <span className="inline-block bg-[#D4AF37] text-[#1B3022] font-sans text-[10px] tracking-widest uppercase px-3 py-1 mb-4">
                            Spotlight
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl mb-4 max-w-3xl leading-tight">
                            Yarsagumba: The Enigmatic Himalayan Gold That Commands Its Weight in Gold
                        </h2>
                        <div className="flex items-center gap-4 font-sans text-sm text-[#F9F7F2]/70">
                            <span>12 min read</span>
                            <span>&bull;</span>
                            <span>Oct 24, 2026</span>
                        </div>
                    </div>
                </div>

                {/* Article Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {articles.map((article) => (
                        <article key={article.id} className="group cursor-pointer flex flex-col h-full">
                            <div className="relative aspect-[4/3] w-full overflow-hidden mb-6 rounded-xl">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-sans text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase">
                                    {article.category}
                                </span>
                                <span className="font-sans text-xs text-[#2D2D2D]/50">
                                    {article.date} &bull; {article.readTime}
                                </span>
                            </div>
                            <h3 className="font-serif text-2xl text-[#1B3022] mb-3 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                                {article.title}
                            </h3>
                            <p className="font-sans text-sm text-[#2D2D2D]/70 leading-relaxed mb-6 line-clamp-3 flex-grow">
                                {article.excerpt}
                            </p>
                            <div className="flex items-center gap-2 text-[#1B3022] font-sans text-xs tracking-widest uppercase mt-auto group-hover:text-[#D4AF37] transition-colors">
                                Read Article <ArrowRight size={14} />
                            </div>
                        </article>
                    ))}
                </div>

                {/* Newsletter Sub */}
                <div className="mt-32 border-t border-[#1B3022]/10 pt-24 text-center">
                    <h3 className="font-serif text-3xl text-[#1B3022] mb-4">Join The Inner Circle</h3>
                    <p className="font-sans text-[#2D2D2D]/60 mb-8 max-w-md mx-auto text-sm">
                        Receive monthly musings on Ayurvedic rhythms, holistic habits, and exclusive early access to rare seasonal harvests.
                    </p>
                    <form className="max-w-md mx-auto flex gap-2">
                        <input
                            type="email"
                            placeholder="Your Email Address"
                            className="flex-1 bg-white border border-[#1B3022]/20 px-6 py-4 font-sans text-sm focus:outline-none focus:border-[#D4AF37] transition-colors rounded-none"
                        />
                        <button
                            type="button"
                            className="bg-[#1B3022] text-[#F9F7F2] font-sans tracking-[0.2em] text-xs uppercase px-8 hover:bg-black transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
