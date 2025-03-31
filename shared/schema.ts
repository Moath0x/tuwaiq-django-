import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (kept from original template)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Story schema
export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary").notNull(),
  imageUrl: text("image_url").notNull(),
  ageGroup: text("age_group").notNull(), // e.g., "3-5", "6-8", "9-11", "12+"
  readingTime: integer("reading_time").notNull(), // in minutes
  theme: text("theme").notNull(), // e.g., "adventure", "family", "animals"
  isFeatured: boolean("is_featured").default(false),
  rating: integer("rating").default(5), // 1-5 rating scale
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertStorySchema = createInsertSchema(stories).omit({
  id: true,
  createdAt: true,
});

// Age Group schema
export const ageGroups = pgTable("age_groups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // e.g., "الصغار", "المبتدئين"
  range: text("range").notNull(), // e.g., "3-5", "6-8"
  color: text("color").notNull(), // CSS color for the category
});

export const insertAgeGroupSchema = createInsertSchema(ageGroups).omit({
  id: true,
});

// Theme schema
export const themes = pgTable("themes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // e.g., "مغامرات", "حيوانات" 
  icon: text("icon").notNull(), // SVG icon code
  color: text("color").notNull(), // CSS color for the theme
});

export const insertThemeSchema = createInsertSchema(themes).omit({
  id: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertStory = z.infer<typeof insertStorySchema>;
export type Story = typeof stories.$inferSelect;

export type InsertAgeGroup = z.infer<typeof insertAgeGroupSchema>;
export type AgeGroup = typeof ageGroups.$inferSelect;

export type InsertTheme = z.infer<typeof insertThemeSchema>;
export type Theme = typeof themes.$inferSelect;
