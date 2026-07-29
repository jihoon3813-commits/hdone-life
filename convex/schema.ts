import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  site_config: defineTable({
    site_name: v.string(),
    company_kr_name: v.string(),
    phone: v.string(),
    email: v.string(),
    address: v.string(),
    business_number: v.string(),
    ceo_name: v.string(),
    privacy_officer: v.string(),
    hours: v.string(),
    map_lat: v.number(),
    map_lng: v.number(),
    updated_at: v.string(),
  }),

  users: defineTable({
    email: v.string(),
    password: v.string(),
    name: v.string(),
    phone: v.string(),
    role: v.string(),
    created_at: v.string(),
  }).index("by_email", ["email"]),

  main_slides: defineTable({
    title: v.string(),
    subtitle: v.string(),
    bg_image: v.string(),
    link_url: v.string(),
    is_active: v.number(),
    display_order: v.number(),
    created_at: v.string(),
  }),

  notices: defineTable({
    title: v.string(),
    content: v.string(),
    author: v.string(),
    views: v.number(),
    is_important: v.number(),
    attachment_name: v.union(v.string(), v.null()),
    attachment_url: v.union(v.string(), v.null()),
    created_at: v.string(),
    updated_at: v.string(),
  }),

  qnas: defineTable({
    title: v.string(),
    content: v.string(),
    author: v.string(),
    password: v.optional(v.union(v.string(), v.null())),
    views: v.number(),
    is_secret: v.number(),
    is_answered: v.number(),
    answer: v.union(v.string(), v.null()),
    answer_at: v.union(v.string(), v.null()),
    created_at: v.string(),
  }),

  galleries: defineTable({
    title: v.string(),
    content: v.string(),
    author: v.string(),
    views: v.number(),
    main_image: v.string(),
    images_json: v.string(),
    created_at: v.string(),
  }),

  inquiries: defineTable({
    name: v.string(),
    phone: v.string(),
    email: v.union(v.string(), v.null()),
    type: v.string(),
    interest_product: v.union(v.string(), v.null()),
    title: v.string(),
    content: v.string(),
    attachment_url: v.union(v.string(), v.null()),
    is_agreed: v.number(),
    status: v.string(),
    admin_note: v.union(v.string(), v.null()),
    created_at: v.string(),
  }),

  popups: defineTable({
    title: v.string(),
    content_html: v.union(v.string(), v.null()),
    image_url: v.union(v.string(), v.null()),
    link_url: v.union(v.string(), v.null()),
    width: v.number(),
    height: v.number(),
    top_pos: v.number(),
    left_pos: v.number(),
    is_active: v.number(),
    created_at: v.string(),
  }),
});
