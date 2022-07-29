import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    editMe: {
        type: String,
        required: true,
    },

}, { timestamps: true });

export default mongoose.model("Book", BookSchema);