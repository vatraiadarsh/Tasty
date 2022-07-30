import mongoose from 'mongoose';

const [Model]Schema = new mongoose.Schema({
    editMe: {
        type: String,
        required: true,
    },

}, { timestamps: true });

export default mongoose.model('[Model]', [Model]Schema);