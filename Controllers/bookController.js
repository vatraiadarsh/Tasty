import Book from "../models/Book.js";

/**
 @desc    Get all Books
 @route   GET /api/v1/books
 @access  Public
*/
export const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 @desc    Get a Book by id
 @route   GET /api/v1/book/:id
 @access  Public
*/
export const getBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 @desc    Create new Book
 @route   POST /api/v1/book
 @access  Public
*/
export const createBook = async (req, res, next) => {
    const newBook = new Book(req.body);
    try {
        const savedBook = await newBook.save();
        res.status(200).json(savedBook);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 @desc    Update a Book
 @route   PUT /api/v1/book/:id
 @access  Public
*/
export const updateBook = async (req, res, next) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 @desc    Delete a Book
 @route   DELETE /api/v1/book/:id
 @access  Public
*/
export const deleteBook = async (req, res, next) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json("Book deleted Successfully");
    } catch (error) {
        res.status(500).json(error);
    }
};

