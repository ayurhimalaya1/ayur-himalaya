export default function ShippingReturnsPage() {
    return (
        <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-32">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <header className="mb-24 text-center">
                    <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4 block">
                        Logistics & Integrity
                    </span>
                    <h1 className="font-serif text-5xl md:text-6xl text-[#1B3022] mb-6">
                        Shipping & Returns
                    </h1>
                </header>

                <div className="prose prose-lg prose-p:font-sans prose-p:text-[#2D2D2D]/70 prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-[#1B3022] mx-auto">
                    <h3>Temperature Controlled Logistics</h3>
                    <p>
                        Ayurvedic botanical extractions contain delicate, heat-sensitive compounds. A jar of pure, wild-harvested Shilajit left in a 40°C delivery truck for two days will lose a significant portion of its bioavailable fulvic acid.
                    </p>
                    <p>
                        To ensure that the "prana" of the mountain reaches your door completely intact, we utilize a specialized temperature-controlled supply chain. This is why our domestic shipping (within India) takes a standard 3-5 business days, as we do not use standard commercial freight unequipped for botanical preservation.
                    </p>

                    <div className="my-12 w-full h-px bg-[#1B3022]/10"></div>

                    <h3>Our "Efficacy First" Return Policy</h3>
                    <p>
                        We do not sell fast-moving consumer goods; we sell potent medicinal tools. As such, once a seal is broken, we cannot restock or resell the product.
                    </p>
                    <p>
                        However, if a jar arrives damaged due to logistics, or if you suspect a seal was compromised during transit, please initiate a return request within <strong>48 hours of delivery</strong> at <a href="mailto:support@ayurhimalaya.com" className="text-[#D4AF37] hover:underline">support@ayurhimalaya.com</a>. We will immediately dispatch a courier to retrieve the compromised jar and send a pristine replacement from our mountain facility.
                    </p>

                    <div className="my-12 w-full h-px bg-[#1B3022]/10"></div>

                    <h3>International Exports</h3>
                    <p>
                        We have paused all direct-to-consumer international shipping. The altitude drops and un-regulated holding temperatures in global customs warehouses repeatedly destroyed the efficacy of our blends. We are actively working with specialized cold-chain logistics partners and will announce international availability to our newsletter subscribers first.
                    </p>
                </div>
            </div>
        </div>
    );
}
