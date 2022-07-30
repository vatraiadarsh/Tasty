import { mongoose } from 'mongoose';
import logger from './logger.js';

export const databaseConnection = async () => {
	const { DATABASE_URL } = process.env;
	try {
		const conn = await mongoose.connect(DATABASE_URL);
		logger.info(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		logger.error(`Error: ${error.message}`);
		process.exit(1);
	}
};
