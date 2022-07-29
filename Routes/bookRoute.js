import express from "express";
const router = express.Router();

import { getAllBooks, getBook, addBook, updateBook, deleteBook, searchBook, deleteMultipleBooks } from '../Controllers/BookController.js';


router.get('/books', getAllBooks);
router.get('/book/:id', getBook);
router.post('/book', addBook);
router.put('/book/:id', updateBook);
router.delete('/book/:id', deleteBook);
router.get('/books/:search', searchBook);
router.delete('/books', deleteMultipleBooks);


export default router;