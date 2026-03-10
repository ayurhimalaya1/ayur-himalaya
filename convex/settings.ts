import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getSettings = query({
    args: {},
    handler: async (ctx) => {
        const settings = await ctx.db.query("storeSettings").first();
        if (!settings) {
            // Return default gracefully 
            return {
                heroHeading: "Discover Pure Altitude Awakening",
                heroSubtext: "Ayurvedic formulations born in the pure high-altitude air of the Himalayas.",
                heroImage: "/products/kutki_premium_1773167646028.png",
                promoBannerActive: true,
                promoBannerText: "Free Himalayan Shipping on all orders over ₹5,000",
                razorpayKeyId: "",
                razorpayKeySecret: "",
                razorpayActive: false,
            };
        }
        return settings;
    },
});

export const updateSettings = mutation({
    args: {
        heroHeading: v.string(),
        heroSubtext: v.string(),
        heroImage: v.string(),
        promoBannerActive: v.boolean(),
        promoBannerText: v.string(),
        razorpayKeyId: v.optional(v.string()),
        razorpayKeySecret: v.optional(v.string()),
        razorpayActive: v.boolean(),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db.query("storeSettings").first();

        if (existing) {
            await ctx.db.patch(existing._id, args);
        } else {
            await ctx.db.insert("storeSettings", args);
        }

        return { success: true };
    },
});
