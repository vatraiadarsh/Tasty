import mongoose from 'mongoose';

const [Model]Schema = new mongoose.Schema({
    [fieldName]: {
        type: [fieldType],
        [required]
    },

}, { timestamps: true });

export default mongoose.model('[Model]', [Model]Schema);