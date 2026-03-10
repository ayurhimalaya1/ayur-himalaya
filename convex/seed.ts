import { mutation } from "./_generated/server";

const productsToSeed = [
    // Herbs
    {
        name: "Pure Himalayan Shilajit", slug: "pure-himalayan-shilajit", category: "Herbs", price: 1300, stock: 15,
        dosha: "Strength", benefit: "Vitality & Energy",
        editorialDescription: "Sourced from the pristine altitudes of the Himalayas, our Pure Shilajit is a potent resin rich in fulvic acid and trace minerals.",
        images: ["https://www.ayurhimalaya.com/cdn/shop/files/Shilajit.jpg"]
    },
    {
        name: "Aconitum Heterophyllum Root", slug: "aconitum-heterophyllum", category: "Herbs", price: 800, stock: 5,
        dosha: "Healing", benefit: "Rare Wellness Elixir",
        editorialDescription: "A revered herb in traditional Ayurveda, known for its profound healing properties and sourced directly from high-altitude foragers.",
        images: ["https://www.ayurhimalaya.com/cdn/shop/files/Aconitum.jpg"]
    },
    {
        name: "Jatamansi (Spikenard)", slug: "jatamansi", category: "Herbs", price: 400, stock: 20,
        dosha: "Vata Balancing", benefit: "Calms the Mind",
        editorialDescription: "Known as the 'calming herb', Jatamansi natural roots are wild-harvested to promote deep rest and neurological balance.",
        images: ["https://www.ayurhimalaya.com/cdn/shop/files/Jatamansi_Herb.jpg"]
    },
    {
        name: "Kutki (Liver Miracle)", slug: "kutki", category: "Herbs", price: 200, stock: 45,
        dosha: "Pitta Cooling", benefit: "Liver Detoxification",
        editorialDescription: "An exceptional bitter tonic that naturally cools Pitta dosha and supports liver function and detoxification.",
        images: ["https://www.ayurhimalaya.com/cdn/shop/files/Kutki_Herb.jpg"]
    },
    {
        name: "Meetha Atish", slug: "meetha-atish", category: "Herbs", price: 200, stock: 12,
        dosha: "Tridoshic", benefit: "Nature's Sweet Elixir",
        editorialDescription: "A unique, sweet-tasting alpine herb traditionally used to support digestion and vital energy.",
        images: ["https://www.ayurhimalaya.com/cdn/shop/files/Meetha_Atish.jpg"]
    },

    // Pulses (GI Tagged)
    {
        name: "Munsyari White Rajma", slug: "munsyari-white-rajma", category: "Pulses", price: 130, stock: 100,
        dosha: "Kapha Grounding", benefit: "High-Protein Heritage",
        editorialDescription: "GI Tagged premium white kidney beans grown in the pure glacial waters of the Munsyari region.",
        images: ["https://www.ayurhimalaya.com/cdn/shop/files/White_Rajma.jpg"]
    },
    {
        name: "Munsyari Red Rajma", slug: "munsyari-red-rajma", category: "Pulses", price: 130, stock: 85,
        dosha: "Kapha Grounding", benefit: "Nutrient Dense",
        editorialDescription: "Famous high-altitude red kidney beans offering unparalleled taste and nutritional density.",
        images: ["https://www.ayurhimalaya.com/cdn/shop/files/Red_Rajma.jpg"]
    },
    {
        name: "Pahadi Kala Bhatt", slug: "pahadi-kala-bhatt", category: "Pulses", price: 150, stock: 60,
        dosha: "Tridoshic", benefit: "Rich in Iron",
        editorialDescription: "Black soybeans indigenous to the Himalayas, traditionally consumed for their deep restorative properties.",
        images: ["https://www.ayurhimalaya.com/cdn/shop/files/Black_Soy_Bhatt.jpg"]
    },

    // Spices
    {
        name: "Jambu (Faran)", slug: "jambu-faran", category: "Spices", price: 150, stock: 34,
        dosha: "Vata Balancing", benefit: "Traditional Alpine Flavor",
        editorialDescription: "An essential Himalayan culinary herb that brings a unique, earthy aroma to warming dishes.",
        images: ["https://www.ayurhimalaya.com/cdn/shop/files/Jambu_Spice.jpg"]
    },
    {
        name: "Timur (Sichuan Pepper)", slug: "timur-pepper", category: "Spices", price: 150, stock: 22,
        dosha: "Kapha Balancing", benefit: "Zesty & Aromatic",
        editorialDescription: "Wild-harvested Himalayan Sichuan pepper, known for its citrus notes and tingling sensation.",
        images: ["https://www.ayurhimalaya.com/cdn/shop/files/Timur_Pepper.jpg"]
    },
    {
        name: "Himalayan Turmeric Powder", slug: "himalayan-turmeric", category: "Spices", price: 50, stock: 200,
        dosha: "Tridoshic", benefit: "High-Curcumin Healing",
        editorialDescription: "Deeply pigmented, high-curcumin turmeric grown in the crisp mountain air without chemical interference.",
        images: ["https://www.ayurhimalaya.com/cdn/shop/files/Turmeric_Powder.jpg"]
    },

    // Teas
    {
        name: "Sea Buckthorn Tea", slug: "sea-buckthorn-tea", category: "Teas", price: 300, stock: 40,
        dosha: "Pitta Balancing", benefit: "Sacred Immunity Sip",
        editorialDescription: "Infused with the Vitamin-C rich super-berries of the high altitudes, this tea is a daily immunity armor.",
        images: ["https://www.ayurhimalaya.com/cdn/shop/files/Seabuckthorn_Tea.jpg"]
    },
    {
        name: "Stinging Nettle Tea", slug: "stinging-nettle-tea", category: "Teas", price: 200, stock: 55,
        dosha: "Kapha Balancing", benefit: "Nourishing Infusion",
        editorialDescription: "Wildcrafted stinging nettle leaves dried delicately to preserve their mineral-rich, detoxifying profile.",
        images: ["https://www.ayurhimalaya.com/cdn/shop/files/Nettle_Tea.jpg"]
    }
];

export default mutation({
    handler: async (ctx) => {
        // Delete existing products (optional, for clean slate)
        const existingProducts = await ctx.db.query("products").collect();
        for (const product of existingProducts) {
            await ctx.db.delete(product._id);
        }

        // Insert new seeded products
        for (const product of productsToSeed) {
            await ctx.db.insert("products", product);
        }

        return "Seed complete!";
    },
});
