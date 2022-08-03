import [Model] from '../models/[Model].js';

/**
 @desc    Get all [Models]
 @route   GET /api/v1/[models]
 @access  Public
*/
export const getAll[Models] = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await [Model].countDocuments();

        const [models] = await [Model].find()
            .skip(startIndex)
            .limit(limit);
        res.status(200).json(paginate([models], total, limit, page, endIndex, startIndex, req));


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
export const add[Model] = async (req, res, next) => {
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
        res.status(200).json('[Model] deleted Successfully');
    } catch (error) {
        res.status(500).json(error);
    }
};




/**
 @desc    Search a [Model] by editMe
 @route   GET /api/v1/[models]/:search
 @access  Public
*/
export const search[Model] = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const search = req.params.search;
        const total = await [Model].countDocuments({
            $or: [
                { editMe: { $regex: search, $options: 'i' } }
            ]
        });

        const [models] = await [Model].find({
            $or: [
                { editMe: { $regex: search, $options: 'i' } }
            ]
        })
            .skip(startIndex)
            .limit(limit);
        res.status(200).json(paginateAfterSearch([models], total, search, limit, page, endIndex, startIndex, req));
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 @desc    Delete many [Models] by [ids]
 @route   DELETE /api/v1/[models]
 @access  Public
*/
export const deleteMultiple[Models] = async (req, res, next) => {
    try{
        const ids = req.body.ids;
        const deleted[Models] = await [Model].deleteMany({_id: {$in: ids}});
        res.status(200).json(deleted[Models]);
    }catch(error){
        res.status(500).json(error);
    }

}

function paginate([models], total, limit, page, endIndex, startIndex, req) {
    return {
        data: [models],
        total: total,
        perPage: limit,
        currentPage: page,
        lastPage: Math.ceil(total / limit),
        firstPageUrl: `http://localhost:5000/api/v1/[models]?page=1&limit=${limit}`,
        lastPageUrl: `http://localhost:5000/api/v1/[models]?page=${Math.ceil(total / limit)}&limit=${limit}`,
        nextPageUrl: endIndex < total ? `http://localhost:5000/api/v1/[models]?page=${page + 1}&limit=${limit}` : null,
        prevPageUrl: startIndex > 0 ? `http://localhost:5000/api/v1/[models]?page=${page - 1}&limit=${limit}` : null,
        path: req.originalUrl,
        from: startIndex + 1,
        to: endIndex < total ? endIndex : total
    };
};

function paginateAfterSearch([models], total, search, limit, page, endIndex, startIndex, req) {
    return {
        data: [models],
        total: total,
        perPage: limit,
        currentPage: page,
        lastPage: Math.ceil(total / limit),
        firstPageUrl: `http://localhost:5000/api/v1/[models]/${search}?page=1&limit=${limit}`,
		lastPageUrl: `http://localhost:5000/api/v1/[models]/${search}?page=${Math.ceil(total / limit)}&limit=${limit}`,
		nextPageUrl: endIndex < total ? `http://localhost:5000/api/v1/[models]/${search}?page=${page + 1}&limit=${limit}` : null,
		prevPageUrl: startIndex > 0 ? `http://localhost:5000/api/v1/[models]/${search}?page=${page - 1}&limit=${limit}` : null,
        path: req.originalUrl,
        from: startIndex + 1,
        to: endIndex < total ? endIndex : total
    };
};

