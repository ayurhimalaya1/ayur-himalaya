import Image from "next/image";

export default function SourcingPage() {
    return (
        <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4 block">
                    Our Supply Chain
                </span>
                <h1 className="font-serif text-5xl md:text-6xl text-[#1B3022] mb-12">
                    Transparent Sourcing
                </h1>

                <div className="relative w-full h-[60vh] min-h-[500px] mb-16 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                        src="/products/meetha_atish_premium_1773167596536.png"
                        alt="High Altitude Sourcing"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="max-w-3xl mx-auto text-left space-y-8 font-sans text-[#2D2D2D]/80 leading-relaxed text-lg pb-16 border-b border-[#1B3022]/10 mb-16">
                    <p>
                        The efficacy of Ayurveda rests entirely on the quality of the raw botanical. A root grown in a hydroponic greenhouse will never possess the same resilience, phytochemical density, or "prana" (life force) as a root that had to survive harsh Himalayan winters at 10,000 feet.
                    </p>
                    <p>
                        <strong>We do not use brokers, wholesalers, or white-labeled ingredients.</strong>
                        Our team spends three months of the year in the upper valleys of Uttarakhand and Himachal Pradesh, coordinating harvest schedules directly with village elders.
                    </p>
                    <p>
                        This direct-trade model ensures that the cultivators are paid 3x the market rate for their expertise, and guarantees that our extractions begin within 72 hours of harvest, preserving volatile aromatic compounds and heat-sensitive alkaloids.
                    </p>
                </div>
            </div>
        </div>
    );
}
