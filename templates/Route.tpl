import express from "express";
const router = express.Router();

const [Model] = require('../models/[model]Model');

const {  getAll[Models], get[Model], add[Model], update[Model], delete[Model] } = require('../Controllers/[Model]Controller');


router.get('/[models]', getAll[Models]);
router.get('/[model]/:id', get[Model]);
router.post('/[model]', add[Model]);
router.put('/[model]/:id', update[Model]);
router.delete('[model]/:id', delete[Model]);


export default router;