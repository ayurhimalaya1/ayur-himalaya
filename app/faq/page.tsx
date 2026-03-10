export default function FAQPage() {
    return (
        <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-32">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <header className="mb-24 text-center">
                    <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4 block">
                        Support
                    </span>
                    <h1 className="font-serif text-5xl md:text-6xl text-[#1B3022] mb-6">
                        Frequently Asked Questions
                    </h1>
                </header>

                <div className="space-y-4">
                    {[
                        { q: "Are your products certified organic?", a: "Most of our botanicals are 'wild-harvested' directly from the mountain forests. While they are far cleaner than farmed organic products, wild forests cannot technically receive an 'organic' certification. However, any cultivated ingredients we use are certified organic." },
                        { q: "How long until I see results?", a: "Unlike immediate pharmaceutical suppressants, Ayurvedic adaptogens work by systematically retraining your internal stress response. Most practitioners recommend consistent daily use for 4 to 6 weeks to experience profound, lasting shifts." },
                        { q: "Can I take multiple formulations together?", a: "Yes. Our collections are designed to be synergistic. For example, a morning Pitta-pacifying blend pairs beautifully with a grounding Vata routine in the evening." },
                        { q: "Do you ship internationally?", a: "Currently, we only ship within India to ensure our delicate extractions arrive without temperature shock or delays. We are actively working on a cold-chain international freight solution." }
                    ].map((faq, i) => (
                        <div key={i} className="bg-white border border-[#1B3022]/10 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-serif text-2xl text-[#1B3022] mb-3">{faq.q}</h3>
                            <p className="font-sans text-[#2D2D2D]/70 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
