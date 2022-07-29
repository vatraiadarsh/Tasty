# Express js custom mvc framework
## _Automates your whole api development process_


 ✅ Generates following Controller with all the CRUD operations, searching, sorting and pagination

```sh
/**
 @desc    Get all [Models]
 @route   GET /api/v1/[models]?page=[pageNo]&limit=[limit]
 @access  Public
*/
```

```sh
Example Pagination
    "total": 11,
    "perPage": 3,
    "currentPage": 1,
    "lastPage": 4,
    "firstPageUrl": "http://localhost:5000/api/v1/books?page=1&limit=3",
    "lastPageUrl": "http://localhost:5000/api/v1/books?page=4&limit=3",
    "nextPageUrl": "http://localhost:5000/api/v1/books?page=2&limit=3",
    "prevPageUrl": null,
    "path": "/api/v1/books",
    "from": 1,
    "to": 3
```


```sh
/**
 @desc    Get a [Model] by id
 @route   GET /api/v1/[model]/:id
 @access  Public
*/
```

```sh
/**
 @desc    Create new [Model]
 @route   POST /api/v1/[model]
 @access  Public
*/
```

```sh
/**
 @desc    Update a [Model]
 @route   PUT /api/v1/[model]/:id
 @access  Public
*/
```

```sh
/**
 @desc    Delete a [Model]
 @route   DELETE /api/v1/[model]/:id
 @access  Public
*/
```


```sh
/**
 @desc    Search a [Model] by editMe
 @route   GET /api/v1/[models]/:search?page=[pageNo]&limit=[limit]
 @access  Public
*/
```

```sh
/**
 @desc    Delete many [Models] by [ids]
 @route   DELETE /api/v1/[models]
 @access  Public
*/
 pass the array of ids as body
    {
    "ids":["62e37eabc48776dd36f435af","62e37eb5c48776dd36f435b1"]
    }
```



 
 ✅ Generates following  Routes
 
```sh
router.get('/[models]', getAll[Models]);
router.get('/[model]/:id', get[Model]);
router.post('/[model]', add[Model]);
router.put('/[model]/:id', update[Model]);
router.delete('/[model]/:id', delete[Model]);
router.get('/[models]/:search', search[Model]);
router.delete('/[models]', deleteMany[Models]);
```
 
 ✅ Generates following  Models
 
 
```sh
const [Model]Schema = new mongoose.Schema({
    editMe: {
        type: String,
        required: true,
    },

}, { timestamps: true });
```

 ✅ Configures [model]Route to Router.js

```sh
# base template
export const router = (app)  => {
    
}


```

## Installation

Requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
node generator.js [modelName]
node generator.js book 

[NOTE]: When the model is provided plural or singular, Upper case or lower case,
it will be converted to singular Title Case.
```






## License

[MIT](https://opensource.org/licenses/MIT).

**Free Software, Hell Yeah!**
