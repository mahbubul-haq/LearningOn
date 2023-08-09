import Category from "../models/Category.js";

const addCategory = async (req, res) => {
    try {
        const newCategory = new Category({ ...req.body });
        const savedCategory = await newCategory.save();
        res.status(201).json({
            success: true,
            category: savedCategory,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            errors: { ...error.errors },
        });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({
            success: true,
            categories: categories,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            errors: { ...error.errors },
        });
    }
};

export { addCategory, getCategories };

