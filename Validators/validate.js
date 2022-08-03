import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = errors.array().map((err) => err.msg);
		return res.status(422).json({ errors: error });
	}
	next();
};
