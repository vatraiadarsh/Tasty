import logger from './logger.js';

export const server = (app) => {
	const { PORT, HTTP_HOST } = process.env;

	const port = PORT || 5000;
	app.listen(port, () => {
		logger.info(`Running on ${HTTP_HOST}:${port}`);
	});
};
