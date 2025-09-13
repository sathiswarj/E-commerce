import mongoose from "mongoose";

const producctSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: [String],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        subCategory: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        sizes: {
            type: Array,
            required: true,
        },
        bestSeller: {
            type: Boolean,
            default: false,
        },
        date: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);

const productModel = mongoose.models.product || mongoose.model("products", producctSchema);

export default productModel;