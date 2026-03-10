import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        // Generate an upload URL for the frontend to POST files directly to Convex Storage
        return await ctx.storage.generateUploadUrl();
    },
});

export const getUrl = query({
    args: { storageId: v.id("_storage") },
    handler: async (ctx, args) => {
        // Retrieve the public URL for a stored file
        return await ctx.storage.getUrl(args.storageId);
    },
});

export const getUrlMutation = mutation({
    args: { storageId: v.id("_storage") },
    handler: async (ctx, args) => {
        // Resolve URL immediately after uploading via a Mutation hook
        return await ctx.storage.getUrl(args.storageId);
    },
});
