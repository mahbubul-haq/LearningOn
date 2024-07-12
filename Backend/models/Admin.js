import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            default: "",
            required: true,
        },
        email: {
            type: String,
            default: "",
            required: true,
        },
        password: {
            type: String,
            default: "",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
