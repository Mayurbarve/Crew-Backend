import foodModel from "../models/foodModel.js";
import fs from 'fs'
import cloudinary from '../config/cloudinary.js';


// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// add food
const addFood = async (req, res) => {
    try {
        const image_url = req.file.path; // Cloudinary-hosted URL
        const cloudinary_id = req.file.filename; // Cloudinary's public_id

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_url,
            cloudinary_id: cloudinary_id, // Save public_id
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error("Add Food Error:", error); // ✅ Log full error
        res.status(500).json({ success: false, message: error.message });
    }

};


// delete food
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        // Delete from Cloudinary using public_id
        if (food.cloudinary_id) {
            await cloudinary.uploader.destroy(food.cloudinary_id);
        }

        // Delete from MongoDB
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


export { listFood, addFood, removeFood }