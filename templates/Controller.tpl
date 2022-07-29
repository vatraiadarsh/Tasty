import [Model] from "../models/[Model].js";

/**
 @desc    Get all [Models]
 @route   GET /api/v1/[models]
 @access  Public
*/
export const get[Models] = async (req, res, next) => {
    try {
        const [models] = await [Model].find();
        res.status(200).json([models])
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 @desc    Get a [Model] by id
 @route   GET /api/v1/[model]/:id
 @access  Public
*/
export const get[Model] = async (req, res, next) => {
    try {
        const [model] = await [Model].findById(req.params.id);
        res.status(200).json([model]);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 @desc    Create new [Model]
 @route   POST /api/v1/[model]
 @access  Public
*/
export const create[Model] = async (req, res, next) => {
    const new[Model] = new [Model](req.body);
    try {
        const saved[Model] = await new[Model].save();
        res.status(200).json(saved[Model]);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 @desc    Update a [Model]
 @route   PUT /api/v1/[model]/:id
 @access  Public
*/
export const update[Model] = async (req, res, next) => {
    try {
        const updated[Model] = await [Model].findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updated[Model]);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 @desc    Delete a [Model]
 @route   DELETE /api/v1/[model]/:id
 @access  Public
*/
export const delete[Model] = async (req, res, next) => {
    try {
        await [Model].findByIdAndDelete(req.params.id);
        res.status(200).json("[Model] deleted Successfully");
    } catch (error) {
        res.status(500).json(error);
    }
};

