import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route prefix
  const apiPrefix = "/api";
  
  // Get all stories endpoint
  app.get(`${apiPrefix}/stories`, async (req, res) => {
    try {
      const stories = await storage.getAllStories();
      res.json(stories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stories" });
    }
  });
  
  // Get featured stories
  app.get(`${apiPrefix}/stories/featured`, async (req, res) => {
    try {
      const featuredStories = await storage.getFeaturedStories();
      res.json(featuredStories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured stories" });
    }
  });
  
  // Get stories by age group
  app.get(`${apiPrefix}/stories/age/:ageGroup`, async (req, res) => {
    try {
      const ageGroup = req.params.ageGroup;
      const stories = await storage.getStoriesByAgeGroup(ageGroup);
      res.json(stories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stories by age group" });
    }
  });
  
  // Get stories by theme
  app.get(`${apiPrefix}/stories/theme/:theme`, async (req, res) => {
    try {
      const theme = req.params.theme;
      const stories = await storage.getStoriesByTheme(theme);
      res.json(stories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stories by theme" });
    }
  });
  
  // Get recent stories with limit
  app.get(`${apiPrefix}/stories/recent/:limit`, async (req, res) => {
    try {
      const limit = parseInt(req.params.limit) || 4; // Default to 4 if not provided
      const recentStories = await storage.getRecentStories(limit);
      res.json(recentStories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent stories" });
    }
  });
  
  // Get a single story by ID - Moved after specific routes to avoid conflicts
  app.get(`${apiPrefix}/stories/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid story ID" });
      }
      
      const story = await storage.getStoryById(id);
      if (!story) {
        return res.status(404).json({ error: "Story not found" });
      }
      
      res.json(story);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch story" });
    }
  });
  
  // Get all age groups
  app.get(`${apiPrefix}/age-groups`, async (req, res) => {
    try {
      const ageGroups = await storage.getAllAgeGroups();
      res.json(ageGroups);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch age groups" });
    }
  });
  
  // Get all themes
  app.get(`${apiPrefix}/themes`, async (req, res) => {
    try {
      const themes = await storage.getAllThemes();
      res.json(themes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch themes" });
    }
  });
  
  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
