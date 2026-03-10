"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, RefreshCcw } from "lucide-react";
import { mockProducts } from "@/lib/mockProducts";

// Standard Ayurvedic Assessment Questions
const quizQuestions = [
    {
        question: "How would you describe your physical build?",
        options: [
            { text: "Slender, light, I find it hard to gain weight.", dosha: "Vata" },
            { text: "Medium, athletic, I build muscle easily.", dosha: "Pitta" },
            { text: "Solid, broad, I gain weight easily.", dosha: "Kapha" }
        ]
    },
    {
        question: "Which best describes your skin?",
        options: [
            { text: "Dry, rough, prone to coldness.", dosha: "Vata" },
            { text: "Warm, oily, prone to freckles or inflammation.", dosha: "Pitta" },
            { text: "Thick, smooth, well-hydrated.", dosha: "Kapha" }
        ]
    },
    {
        question: "How is your digestion and appetite?",
        options: [
            { text: "Irregular, sometimes I forget to eat, prone to bloating.", dosha: "Vata" },
            { text: "Strong, sharp, I get irritable if I skip meals.", dosha: "Pitta" },
            { text: "Steady but slow, I can easily skip a meal.", dosha: "Kapha" }
        ]
    },
    {
        question: "How do you typically react to stress?",
        options: [
            { text: "With anxiety, worry, or fear.", dosha: "Vata" },
            { text: "With frustration, anger, or impatience.", dosha: "Pitta" },
            { text: "With stubbornness, withdrawal, or lethargy.", dosha: "Kapha" }
        ]
    },
    {
        question: "How would you describe your sleep patterns?",
        options: [
            { text: "Light, easily interrupted, I often wake up tired.", dosha: "Vata" },
            { text: "Moderate, I sleep well but need less than 8 hours.", dosha: "Pitta" },
            { text: "Deep, heavy, I have trouble waking up in the morning.", dosha: "Kapha" }
        ]
    },
    {
        question: "What is your preferred climate?",
        options: [
            { text: "Warm and humid. I hate the cold and wind.", dosha: "Vata" },
            { text: "Cool and well-ventilated. I overheat easily.", dosha: "Pitta" },
            { text: "Warm and dry. I dislike cold, damp weather.", dosha: "Kapha" }
        ]
    },
    {
        question: "How would you describe your memory?",
        options: [
            { text: "I learn quickly but forget quickly.", dosha: "Vata" },
            { text: "I have a sharp memory and hold onto details.", dosha: "Pitta" },
            { text: "I learn slowly but I never forget.", dosha: "Kapha" }
        ]
    }
];

export default function DoshaQuizPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [scores, setScores] = useState({ Vata: 0, Pitta: 0, Kapha: 0 });
    const [result, setResult] = useState<string | null>(null);

    const handleAnswer = (dosha: string) => {
        const newScores = { ...scores, [dosha]: scores[dosha as keyof typeof scores] + 1 };
        setScores(newScores);

        if (currentStep < quizQuestions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Calculate Result
            const highestDosha = Object.keys(newScores).reduce((a, b) =>
                newScores[a as keyof typeof newScores] > newScores[b as keyof typeof newScores] ? a : b
            );
            setResult(highestDosha);
        }
    };

    const resetQuiz = () => {
        setCurrentStep(0);
        setScores({ Vata: 0, Pitta: 0, Kapha: 0 });
        setResult(null);
    };

    // Find a recommended product based on Dosha. 
    // Fallback to a general product if exact match isn't found in mock data.
    const recommendedProduct = result
        ? mockProducts.find(p => p.dosha.includes(result)) || mockProducts[0]
        : null;

    return (
        <div className="bg-[#1B3022] text-[#F9F7F2] min-h-screen pt-32 pb-32">
            <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">

                {!result ? (
                    // Quiz Active State
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4 block">
                            Internal Ecosystem
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl mb-4">
                            Discover Your Dosha
                        </h1>
                        <p className="font-sans text-[#F9F7F2]/60 text-sm mb-12">
                            Question {currentStep + 1} of {quizQuestions.length}
                        </p>

                        <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-sm shadow-2xl relative overflow-hidden">
                            {/* Progress Bar */}
                            <div className="absolute top-0 left-0 h-1 bg-white/5 w-full">
                                <div
                                    className="h-full bg-[#D4AF37] transition-all duration-500 ease-out"
                                    style={{ width: `${((currentStep) / quizQuestions.length) * 100}%` }}
                                ></div>
                            </div>

                            <h2 className="font-serif text-2xl md:text-3xl mb-10 text-[#F9F7F2] leading-tight max-w-xl mx-auto">
                                {quizQuestions[currentStep].question}
                            </h2>

                            <div className="flex flex-col gap-4">
                                {quizQuestions[currentStep].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(option.dosha)}
                                        className="group w-full bg-transparent border border-[#F9F7F2]/20 p-6 rounded-xl hover:bg-[#F9F7F2] hover:text-[#1B3022] hover:border-[#F9F7F2] transition-all duration-300 text-left flex items-center justify-between"
                                    >
                                        <span className="font-sans text-sm md:text-base tracking-wide text-[#F9F7F2]/80 group-hover:text-[#1B3022] transition-colors pr-6">
                                            {option.text}
                                        </span>
                                        <div className="w-8 h-8 rounded-full border border-[#F9F7F2]/30 flex items-center justify-center shrink-0 group-hover:bg-[#1B3022] group-hover:border-[#1B3022] transition-colors">
                                            <ArrowRight size={14} className="text-[#F9F7F2]/50 group-hover:text-[#F9F7F2] transition-colors" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    // Results State
                    <div className="animate-in fade-in zoom-in-95 duration-1000">
                        <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4 block">
                            Your Primary State
                        </span>
                        <h1 className="font-serif text-6xl md:text-7xl mb-8 text-[#D4AF37]">
                            {result} Dominant
                        </h1>
                        <p className="font-sans text-[#F9F7F2]/80 leading-relaxed mb-12 max-w-xl mx-auto">
                            Based on your assessment, your constitution is primarily guided by the {result} dosha.
                            {result === "Vata" && " Maintaining warmth, grounding routines, and deep hydration will bring you back into balance."}
                            {result === "Pitta" && " Cooling herbs, moderate exercise, and avoiding spicy or fermented foods will cool your internal fire."}
                            {result === "Kapha" && " Vigorous movement, warm spices, and light, dry foods will help disperse stagnation."}
                        </p>

                        {recommendedProduct && (
                            <div className="mt-16 text-left bg-white/5 border border-[#D4AF37]/30 rounded-2xl p-8 backdrop-blur-md">
                                <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-[#F9F7F2]/50 mb-6 text-center">
                                    Prescribed Formulations For You
                                </h3>
                                <div className="flex flex-col md:flex-row gap-8 items-center bg-black/20 p-6 rounded-xl border border-white/5">
                                    <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden shrink-0 bg-[#F9F7F2]">
                                        <Image
                                            src={recommendedProduct.images[0]}
                                            alt={recommendedProduct.name}
                                            fill
                                            className="object-cover mix-blend-multiply p-4"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="text-[10px] tracking-widest uppercase border border-[#D4AF37]/50 text-[#D4AF37] px-2 py-1 rounded inline-block">
                                                {recommendedProduct.dosha}
                                            </span>
                                            <span className="text-[10px] tracking-widest uppercase border border-white/20 text-white/70 px-2 py-1 rounded inline-block">
                                                {recommendedProduct.benefit}
                                            </span>
                                        </div>
                                        <h4 className="font-serif text-3xl mb-2">{recommendedProduct.name}</h4>
                                        <p className="font-sans text-sm text-[#F9F7F2]/60 mb-6 leading-relaxed">
                                            {recommendedProduct.editorialDescription}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <Link
                                                href={`/product/${recommendedProduct.slug}`}
                                                className="bg-[#D4AF37] text-[#1B3022] font-sans tracking-[0.2em] text-xs uppercase px-8 py-3 hover:bg-[#F9F7F2] transition-colors rounded shadow-lg"
                                            >
                                                View Efficacy
                                            </Link>
                                            <span className="font-serif text-xl tracking-wide">
                                                ₹{recommendedProduct.price.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={resetQuiz}
                            className="mt-12 flex items-center justify-center gap-2 mx-auto font-sans text-xs tracking-widest uppercase text-[#F9F7F2]/50 hover:text-[#F9F7F2] transition-colors"
                        >
                            <RefreshCcw size={14} /> Retake Assessment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
