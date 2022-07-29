# Express js custom mvc framework
## _Automates your whole api development process_


 ✅ Generates following  Controllers


/**
 @desc    Get all [Models]
 @route   GET /api/v1/[models]?page=[pageNo]&limit=[limit]
 @access  Public
*/


/**
 @desc    Get a [Model] by id
 @route   GET /api/v1/[model]/:id
 @access  Public
*/

/**
 @desc    Create new [Model]
 @route   POST /api/v1/[model]
 @access  Public
*/

/**
 @desc    Update a [Model]
 @route   PUT /api/v1/[model]/:id
 @access  Public
*/

/**
 @desc    Delete a [Model]
 @route   DELETE /api/v1/[model]/:id
 @access  Public
*/


/**
 @desc    Search a [Model] by editMe
 @route   GET /api/v1/[models]/:search?page=[pageNo]&limit=[limit]
 @access  Public
*/


 
 ✅ Generates following  Routes
 

router.get('/[models]', getAll[Models]);
router.get('/[model]/:id', get[Model]);
router.post('/[model]', add[Model]);
router.put('/[model]/:id', update[Model]);
router.delete('/[model]/:id', delete[Model]);
router.get('/[models]/:search', search[Model]);

 
 ✅ Generates following  Models
 
 
 
const [Model]Schema = new mongoose.Schema({
    editMe: {
        type: String,
        required: true,
    },

}, { timestamps: true });


## Installation

Requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
node generator.js [modelName]
node generator.js book
```


## License

MIT

**Free Software, Hell Yeah!**
