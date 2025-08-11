import { json } from "express";
import connectCloudinary from "../config/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
      storeAdminId: req.adminId,
    };

    const product = new productModel(productData);

    await product.save();

    res
      .status(200)
      .json({ success: true, message: "product added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
//for admin
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({ storeAdminId: req.adminId});
    res
      .status(200)
      .json({
        success: true,
        products,
        message: "products listed successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
//for user
const listUserProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res
      .status(200)
      .json({
        success: true,
        products,
        message: "products listed successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById({ _id: req.body.id, storeAdminId: req.adminId });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }
    await productModel.findByIdAndDelete(req.body.id);
    res
      .status(200)
      .json({ success: true, message: "product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
const singleProduct = async (req, res) => {
  try {
    const {productId} =req.body;
    const product = await productModel.findById(productId);
    res
      .status(200)
      .json({
        success: true,
        product,
        message: "product fetched successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct,listUserProducts };
