import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema(
	{
		Name: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Book', BookSchema);
