import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            unique: true,
            trim: true,
            minlength: [1, "Category name must be at least 1 characters long"],
            maxlength: [50, "Category name must be at most 50 characters long"],
        },
        // subcategories string array
        subcategories: {
            type: [String],
            required: false,
            default: [],
        },
    },
    { timestamps: true }
);

// add unique validator plugin
CategorySchema.plugin(uniqueValidator, {
    message: "{PATH} must be unique",
});

// export the model

export default mongoose.model("Category", CategorySchema);

