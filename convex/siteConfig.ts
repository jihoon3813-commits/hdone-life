import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getConfig = query({
  handler: async (ctx) => {
    return await ctx.db.query("site_config").first();
  },
});

export const updateConfig = mutation({
  args: {
    site_name: v.string(),
    company_kr_name: v.string(),
    phone: v.string(),
    email: v.string(),
    address: v.string(),
    business_number: v.string(),
    ceo_name: v.string(),
    privacy_officer: v.string(),
    hours: v.string(),
  },
  handler: async (ctx, args) => {
    const config = await ctx.db.query("site_config").first();
    const updated_at = new Date().toISOString();
    if (config) {
      await ctx.db.patch(config._id, {
        ...args,
        updated_at,
      });
      return config._id;
    } else {
      return await ctx.db.insert("site_config", {
        ...args,
        map_lat: 37.6108,
        map_lng: 127.0772,
        updated_at,
      });
    }
  },
});
