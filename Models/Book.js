import mongoose from "mongoose";

const BOOKSchema = new mongoose.Schema({
    editMe: {
        type: String,
        required: true,
    },

}, { timestamps: true });

export default mongoose.model("BOOK", BOOKSchema);