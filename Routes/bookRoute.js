import express from "express";
const router = express.Router();

const Book = require('../models/bookModel');

const { addBook, deleteBook, getAllBooks, getBook, updateBook } = require('../controllers/BookController');


router.get('/books', getAllBooks);
router.get('/book/:id', getBook);
router.post('/book', addBook);
router.put('/book/:id', updateBook);
router.delete('book/:id', deleteBook);


export default router;