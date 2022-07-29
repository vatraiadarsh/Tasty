import Book from "../models/Book.js";

/**
 @desc    Get all Books
 @route   GET /api/v1/books
 @access  Public
*/

export const getAllBooks = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Book.countDocuments();

        const books = await Book.find()
            .skip(startIndex)
            .limit(limit);
        res.status(200).json({
            data: books,
            total: total,
            perPage: limit,
            currentPage: page,
            lastPage: Math.ceil(total / limit),
            firstPageUrl: `http://localhost:5000/api/v1/books?page=1&limit=${limit}`,
            lastPageUrl: `http://localhost:5000/api/v1/books?page=${Math.ceil(total / limit)}&limit=${limit}`,
            nextPageUrl: endIndex < total ? `http://localhost:5000/api/v1/books?page=${page + 1}&limit=${limit}` : null,
            prevPageUrl: startIndex > 0 ? `http://localhost:5000/api/v1/books?page=${page - 1}&limit=${limit}` : null,
            path: req.originalUrl,
            from: startIndex + 1,
            to: endIndex < total ? endIndex : total
        });


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
export const addBook = async (req, res, next) => {
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




/**
 @desc    Search a Book by editMe
 @route   GET /api/v1/books/:search
 @access  Public
*/

export const searchBook = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const search = req.params.search;
        const total = await Book.countDocuments({
            $or: [
                { editMe: { $regex: search, $options: 'i' } }
            ]
        });

        const books = await Book.find({
            $or: [
                { editMe: { $regex: search, $options: 'i' } }
            ]
        })
            .skip(startIndex)
            .limit(limit);
        res.status(200).json({
            data: books,
            total: total,
            perPage: limit,
            currentPage: page,
            lastPage: Math.ceil(total / limit),
            firstPageUrl: `http://localhost:5000/api/v1/books?page=1&limit=${limit}`,
            lastPageUrl: `http://localhost:5000/api/v1/books?page=${Math.ceil(total / limit)}&limit=${limit}`,
            nextPageUrl: endIndex < total ? `http://localhost:5000/api/v1/books?page=${page + 1}&limit=${limit}` : null,
            prevPageUrl: startIndex > 0 ? `http://localhost:5000/api/v1/books?page=${page - 1}&limit=${limit}` : null,
            path: req.originalUrl,
            from: startIndex + 1,
            to: endIndex < total ? endIndex : total
        });
    } catch (error) {
        res.status(500).json(error);
    }
};


