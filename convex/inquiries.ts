import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listInquiries = query({
  handler: async (ctx) => {
    return await ctx.db.query("inquiries").order("desc").collect();
  },
});

export const createInquiry = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.union(v.string(), v.null())),
    type: v.string(),
    interest_product: v.optional(v.union(v.string(), v.null())),
    title: v.string(),
    content: v.string(),
    attachment_url: v.optional(v.union(v.string(), v.null())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("inquiries", {
      name: args.name,
      phone: args.phone,
      email: args.email || null,
      type: args.type,
      interest_product: args.interest_product || null,
      title: args.title,
      content: args.content,
      attachment_url: args.attachment_url || null,
      is_agreed: 1,
      status: "접수대기",
      admin_note: null,
      created_at: new Date().toISOString(),
    });
  },
});

export const updateInquiryStatus = mutation({
  args: {
    id: v.id("inquiries"),
    status: v.string(),
    admin_note: v.optional(v.union(v.string(), v.null())),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      admin_note: args.admin_note || null,
    });
    return true;
  },
});
