import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import StoreAdmin from "../models/storeAdminModel.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, storeName } = req.body;

    const existingAdmin = await StoreAdmin.findOne({ email });
    if (existingAdmin) {
      return res.json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new StoreAdmin({
      name,
      email,
      password: hashedPassword,
      storeName
    });
    await newAdmin.save();

    res.json({ success: true, message: "Store admin registered successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await StoreAdmin.findOne({ email });
    if (!admin) return res.json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { adminId: admin._id, storeName: admin.storeName },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

router.get("/adminprofile", adminAuth, async (req, res) => {
  try {
    const admin = await StoreAdmin.findById(req.adminId).select("-password");
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }
    res.json({ success: true, admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
