import { Router } from "express";
import { supabase } from "../supabaseClient.js";
import { asyncHander } from "../middleware/asyncHandler.js";

const router = Router();

// Signup route
router.post("/signup", asyncHander(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw error;
  }

  return res.status(201).json({
    message: "User created successfully",
    user: {
      id: data.user.id,
      email: data.user.email,
      ...data.user
    }
  });
}));

// Login route
router.post("/login", asyncHander(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("Login error:", error);
    return res.status(401).json({ error: "Invalid email or password" });
  }

  return res.status(200).json({
    message: "Login successful",
    session: {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_in: data.session.expires_in,
    },
    user: {
      id: data.user.id,
      email: data.user.email,
    }
  });
}));

export default router;
