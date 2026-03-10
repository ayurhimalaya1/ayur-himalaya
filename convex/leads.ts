import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("leads").order("desc").collect();
    },
});

export const add = mutation({
    args: {
        phone: v.string(),
        offerCode: v.string(),
        hasPurchased: v.boolean(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("leads", args);
    },
});
