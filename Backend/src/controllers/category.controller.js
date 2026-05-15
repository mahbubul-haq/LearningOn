import Category from "../models/Category.js";
import redisClient from "../configs/redisClient.js";

const addCategory = async (req, res) => {

    let category = await Category.findOne({
        name: req.body.name,
    });

    if (!category) {
        category = new Category({
            name: req.body.name,
            subcategories: []
        });
    }


    req.body.subcategory?.forEach((subcategory) => {
        const normalized = subcategory.trim().toLowerCase();
        if (!category.subcategories.some(s => s.toLowerCase() === normalized)) {
            category.subcategories.push(subcategory.trim());
        }
    });
    await category.save();

    const categories = await Category.find().select("name subcategories").sort({ name: 1 }).lean();

    // sort the subcategories ascending order by name
    categories.forEach((category1) => {
        category1.subcategories = (category1.subcategories || []).sort();
    });

    await redisClient.set("categories", JSON.stringify(categories));


    res.status(201).json({
        success: true,
        category: category,
    });

};

const getCategories = async (req, res) => {

    const cachedCategories = await redisClient.get("categories");
    if (cachedCategories) {
        return res.status(200).json({
            success: true,
            categories: JSON.parse(cachedCategories),
        });
    }

    const categories = await Category.find().select("name subcategories").sort({ name: 1 }).lean();

    // sort the subcategories ascending order by name
    categories.forEach((category) => {
        category.subcategories = (category.subcategories || []).sort();
    });

    await redisClient.set("categories", JSON.stringify(categories));

    res.status(200).json({
        success: true,
        categories: categories,
    });

};

export {
    addCategory,
    getCategories
}