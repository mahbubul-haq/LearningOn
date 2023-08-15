import Category from "../models/Category.js";

const addCategory = async (req, res) => {
    try {
        let category = await Category.findOne({
            name: req.body.name,
        });

        if (!category) {
            category = new Category({
                name: req.body.name,
            });
            await category.save();
        }

        //copilot not working!!!

        if (req.body.subcategory.length > 0) {
            req.body.subcategory.forEach(async (subcategory) => {
                //check if subcategory inside category.subcategories

                if (!category.subcategories.includes(subcategory)) {
                    category.subcategories.push(subcategory);
                    await category.save();
                }
            });
        }

        res.status(201).json({
            success: true,
            category: category,
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
        // sort the categories ascending order by name
        // sort the subcategories ascending order by name

        const categories = await Category.find().sort({ name: 1 }).exec();

        // sort the subcategories ascending order by name
        categories.forEach((category) => {
            category.subcategories.sort();
        });
        

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
