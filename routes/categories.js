import { Router } from "express";
import { supabase } from "../supabaseClient.js";
import { asyncHander } from "../middleware/asyncHandler.js";

const router = Router();

// Get all categories
router.get("/", asyncHander(async (req, res) => {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
}));

// Get one category by ID
router.get("/:id", asyncHander(async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("categories").select("*").eq("id", id).single();

  if (error) {
    if (error.code === "PGRST116") {
      return res.status(404).json({ error: "Category not found" });
    }
    throw error; // Let the error handler middleware catch it
  }

  return res.json(data);
}));

// Create category
router.post("/", asyncHander(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required" });
  }

  const { data, error } = await supabase
    .from("categories")
    .insert({ name, description })
    .select()
    .single();
  
  if (error) {
    throw error; // Let the error handler middleware catch it
  }

  return res.status(201).json(data);
}));

export default router;
