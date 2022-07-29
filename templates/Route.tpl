import express from "express";
const router = express.Router();

import {  getAll[Models], get[Model], add[Model], update[Model], delete[Model] } from '../Controllers/[Model]Controller.js';


router.get('/[models]', getAll[Models]);
router.get('/[model]/:id', get[Model]);
router.post('/[model]', add[Model]);
router.put('/[model]/:id', update[Model]);
router.delete('/[model]/:id', delete[Model]);


export default router;