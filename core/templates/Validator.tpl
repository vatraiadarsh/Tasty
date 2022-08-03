import { body } from 'express-validator';

export const [model]Validator = [
    body('editMe').toLowerCase().isLength({ min: 3 }).withMessage('editMe must be at least 3 characters long'),
];