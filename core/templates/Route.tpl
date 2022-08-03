import express from 'express';
const router = express.Router();

import {  getAll[Models], get[Model], add[Model], update[Model], delete[Model], search[Model], deleteMultiple[Models] } 
from '../Controllers/[Model]Controller.js';

import { [model]Validator } from '../validators/[model]Validator.js';
import { validate } from '../validators/validate.js';


router.get('/[models]', getAll[Models]);
router.get('/[model]/:id', get[Model]);
router.post('/[model]', [model]Validator, validate ,add[Model]);
router.put('/[model]/:id', [model]Validator, validate, update[Model]);
router.delete('/[model]/:id', delete[Model]);
router.get('/[models]/:search', search[Model]);
router.delete('/[models]', deleteMultiple[Models]);


export default router;