import { Router } from "express";
import { supabase } from "../supabaseClient.js";
import { asyncHander } from "../middleware/asyncHandler.js";
import { validate, productScheme, productUpdateScheme } from "../middleware/validate.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();


// Get all products
router.get("/", asyncHander(async(req, res) => {
  const { category_id } = req.query;
  const query = supabase.from("products").select("*");

  if (category_id) {
    query.eq("category_id", parseInt(category_id));
  }

  const { data, error } = await query;

  if (error) {
    if (error.code === "PGRST116") {
      return res.status(404).json({ error: "Product not found in the given category" });
    }
    throw error; // Let the error handler middleware catch it
  }
  return res.status(200).json(data);
}));

// Get one product by ID
router.get("/:id", asyncHander(async (req, res) => {
  const { id: productId } = req.params;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId);

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({ error: "Product not found" });
      }
      throw error; // Let the error handler middleware catch it
    }

    return res.status(200).json(data);
}));

// Add product 🍔
router.post("/", authenticate, validate(productScheme), asyncHander(async (req, res) => {
  const { name, description, price, category_id } = req.body;

  const { data, error } = await supabase
    .from("products")
    .insert({ name, description, price, category_id })
    .select()
    .single();

  if (error) {
    throw error; // Let the error handler middleware catch it
  }

  return res.status(201).json(data);
}));

// Update product by product ID
router.put("/:id", authenticate, validate(productUpdateScheme), asyncHander(async (req, res) => {
  const { id: productId } = req.params;
  const { name, description, price, category_id } = req.body;

  const updates = Object.fromEntries(Object.entries({ name, description, price, category_id})
    .filter(([_, value]) => value !== undefined && value !== null && value !== ""));

  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", productId)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return res.status(404).json({ error: "Product not found" });
    }
    throw error; // Let the error handler middleware catch it
  }

  return res.status(200).json(data);
}));

// Delete product by product ID
router.delete("/:id", authenticate, asyncHander(async (req, res) => {
  const { id: productId } = req.params;

  if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return res.status(404).json({ error: "Product not found" });
    }
    throw error; // Let the error handler middleware catch it
  }

  return res.status(200).json(data);
}));

export default router;
