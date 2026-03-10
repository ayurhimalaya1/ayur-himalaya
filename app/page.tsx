import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/lib/mockProducts";

export default function Home() {
    // Temporary mock data until Convex is fully integrated
    const featuredProducts = mockProducts;

    return (
        <>
            <Hero />

            <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-ayur-bg">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <span className="font-sans text-xs tracking-[0.3em] text-ayur-gold uppercase mb-3 block">
                                Targeted Wellness
                            </span>
                            <h2 className="font-serif text-4xl text-ayur-forest">
                                Curated Collections
                            </h2>
                        </div>
                        <p className="font-sans text-ayur-charcoal/70 max-w-md text-sm leading-relaxed">
                            Explore our highest-potency blends, sourced responsibly from the Himalayan mountains to balance your unique energetic constitution.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {featuredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                slug={product.slug}
                                price={product.price}
                                stock={product.stock}
                                dosha={product.dosha}
                                images={product.images}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center mt-12">
                        <Link href="/collections">
                            <button className="bg-transparent border border-[#1B3022] text-[#1B3022] font-sans tracking-[0.2em] text-xs uppercase px-12 py-4 hover:bg-[#1B3022] hover:text-[#F9F7F2] transition-colors rounded-full">
                                View All 34+ Formulations
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Highlight Section */}
            <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
                    <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px] overflow-hidden rounded-2xl">
                        <img
                            src="/products/meetha_atish_premium_1773167596536.png"
                            alt="Himalayan Ashwagandha"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute top-6 left-6 bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
                            <span className="text-xs font-sans tracking-[0.2em] text-[#1B3022] uppercase font-semibold">Award Winning</span>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4 block">
                            The Daily Anchor
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-[#1B3022] mb-6 leading-tight">
                            Himalayan Ashwagandha Root
                        </h2>
                        <p className="font-sans text-[#2D2D2D]/80 text-lg mb-8 max-w-lg leading-relaxed">
                            Wild-harvested at 10,000 feet, our potent adaptogenic blend is clinically proven to lower cortisol levels by 24% while restoring natural vitality and deep, restorative sleep patterns.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {['Reduces Cortisol', 'Improves Sleep Quality', 'Balances Vata Energy'].map((benefit, i) => (
                                <li key={i} className="flex items-center gap-4 text-[#2D2D2D]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                                    <span className="font-sans text-sm tracking-wide">{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="self-start bg-transparent border border-[#1B3022] text-[#1B3022] font-sans tracking-[0.2em] text-xs uppercase px-10 py-4 hover:bg-[#1B3022] hover:text-[#F9F7F2] transition-colors rounded-full">
                            Explore the Root
                        </button>
                    </div>
                </div>
            </section>

            {/* Sourcing & Ingredients Editorial Carousel equivalent */}
            <section className="py-16 md:py-32 px-6 md:px-12 lg:px-24 bg-[#1B3022] text-[#F9F7F2] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                    <img src="/products/shilajit_premium_1773167629811.png" alt="Texture" className="w-full h-full object-cover" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4 block">
                            Beyond Organic
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6">
                            Sourced from the Source
                        </h2>
                        <p className="font-sans text-[#F9F7F2]/70 max-w-xl mx-auto text-sm leading-relaxed block">
                            We bypass commercial farms, partnering directly with 4th-generation Himalayan foragers to bring you Ayurvedic botanicals in their most biologically active state.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "High Altitude Potency", desc: "Plants grown above 8,000ft produce more active compounds to survive harsh conditions.", img: "/products/seabuckthorn_tea_premium_1773167662649.png" },
                            { title: "Lunar Harvesting", desc: "Botanicals are collected during specific moon phases when sap and vitality are highest.", img: "/products/yarsagumba_premium_1773167614035.png" },
                            { title: "Vedic Processing", desc: "Formulated using traditional 5000-year-old methods that modern science now validates.", img: "/products/madua_flour_premium_1773167678327.png" }
                        ].map((step, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="relative h-80 rounded-xl overflow-hidden mb-6">
                                    <div className="absolute inset-0 bg-[#1B3022]/40 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                                    <img src={step.img} alt={step.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                                    <div className="absolute bottom-6 left-6 z-20">
                                        <span className="font-serif text-4xl text-[#F9F7F2]/40">0{i + 1}</span>
                                    </div>
                                </div>
                                <h3 className="font-serif text-2xl mb-3 text-[#D4AF37]">{step.title}</h3>
                                <p className="font-sans text-sm text-[#F9F7F2]/70 leading-relaxed pr-6">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits / Why Us */}
            <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-ayur-bg border-b border-[#1B3022]/10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {[
                        { title: "Cruelty Free", desc: "Never tested on animals." },
                        { title: "Wild Harvested", desc: "Sourced from pristine environments." },
                        { title: "Third-Party Tested", desc: "Verified for purity and potency." },
                        { title: "Carbon Neutral", desc: "Reinvesting in the Himalayas." }
                    ].map((benefit, i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-6">
                            <div className="w-16 h-16 rounded-full border border-[#D4AF37] flex items-center justify-center mb-6 text-[#D4AF37]">
                                <span className="font-serif text-2xl">{i + 1}</span>
                            </div>
                            <h4 className="font-sans text-sm tracking-[0.2em] uppercase text-[#1B3022] mb-3">{benefit.title}</h4>
                            <p className="font-sans text-xs text-[#2D2D2D]/60 max-w-[200px] leading-relaxed">{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="relative py-24 md:py-32 bg-ayur-forest text-ayur-bg overflow-hidden flex items-center justify-center text-center px-6">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="/products/kutki_premium_1773167646028.png"
                        alt="Mountains"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <span className="font-sans text-xs tracking-[0.3em] text-ayur-gold uppercase mb-6 block">
                        Our Philosophy
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-8">
                        "True wellness is not the absence of disease, but the vibrant presence of life force."
                    </h2>
                    <button className="bg-transparent border border-ayur-bg text-ayur-bg font-sans tracking-[0.2em] text-xs uppercase px-8 py-3 hover:bg-ayur-bg hover:text-ayur-forest transition-colors">
                        Read Our Story
                    </button>
                </div>
            </section>
        </>
    );
}
