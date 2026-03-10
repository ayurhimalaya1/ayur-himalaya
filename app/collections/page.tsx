import { mockProducts } from "@/lib/mockProducts";
import ProductCard from "@/components/ProductCard";

export default function CollectionsPage() {
    return (
        <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <header className="mb-20 text-center">
                    <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4 block">
                        Our Apothecary
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl text-[#1B3022] mb-6">
                        Shop All Formulations
                    </h1>
                    <p className="font-sans text-[#2D2D2D]/60 max-w-2xl mx-auto leading-relaxed">
                        Pure altitude botanicals, responsibly harvested to balance your Dosha.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {mockProducts.map((product) => (
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
            </div>
        </div>
    );
}
