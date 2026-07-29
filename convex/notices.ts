import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listNotices = query({
  handler: async (ctx) => {
    return await ctx.db.query("notices").order("desc").collect();
  },
});

export const createNotice = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    author: v.optional(v.string()),
    is_important: v.optional(v.number()),
    attachment_name: v.optional(v.union(v.string(), v.null())),
    attachment_url: v.optional(v.union(v.string(), v.null())),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    return await ctx.db.insert("notices", {
      title: args.title,
      content: args.content,
      author: args.author || "관리자",
      views: 0,
      is_important: args.is_important || 0,
      attachment_name: args.attachment_name || null,
      attachment_url: args.attachment_url || null,
      created_at: now,
      updated_at: now,
    });
  },
});
