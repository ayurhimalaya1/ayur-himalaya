import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
    ...authTables,
    collections: defineTable({
        name: v.string(),
        handle: v.string(),
        description: v.optional(v.string()),
        image: v.optional(v.string()),
    }),

    products: defineTable({
        name: v.string(),
        slug: v.string(),
        category: v.string(),
        price: v.number(),
        images: v.array(v.string()),
        stock: v.number(),
        dosha: v.string(),
        benefit: v.string(),
        editorialDescription: v.string(),
        collectionId: v.optional(v.id("collections")),
    }).index("by_slug", ["slug"]),

    orders: defineTable({
        userId: v.id("users"), // Convex Auth user ID
        items: v.array(v.object({
            productId: v.id("products"),
            quantity: v.number(),
            priceAtPurchase: v.number(),
        })),
        totalAmount: v.number(),
        status: v.string(), // e.g., "pending", "shipped", "delivered"
        shippingAddress: v.object({
            name: v.string(),
            street: v.string(),
            city: v.string(),
            state: v.string(),
            zip: v.string(),
        }),
    }),

    storeSettings: defineTable({
        heroHeading: v.string(),
        heroSubtext: v.string(),
        heroImage: v.string(),
        promoBannerActive: v.boolean(),
        promoBannerText: v.string(),
        razorpayKeyId: v.optional(v.string()),
        razorpayKeySecret: v.optional(v.string()),
        razorpayActive: v.boolean(),
    }),

    leads: defineTable({
        phone: v.string(),
        offerCode: v.string(),
        hasPurchased: v.boolean(),
    }),
});
