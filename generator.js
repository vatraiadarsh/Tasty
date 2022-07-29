import fs from 'fs';
import pluralize from 'pluralize';

function makeController(modelName) {
    let crud = fs.readFileSync('./templates/Controller.tpl', 'utf8');

    // [book] -> [model]
    let modelNameSingularLowerCase = pluralize.singular(modelName.toLowerCase());
    // [books] -> [models]
    let modelNamePluralLowerCase = pluralize.plural(modelName.toLowerCase());
    // [Book] -> [Model]
    let modelNameSingularCapitalized = modelNameSingularLowerCase.charAt(0).toUpperCase() + modelNameSingularLowerCase.slice(1);
    // [Books]  -> [Models]
    let modelNamePluralCapitalized = modelNamePluralLowerCase.charAt(0).toUpperCase() + modelNamePluralLowerCase.slice(1);

   
    crud = crud.replace(/\[model\]/g, modelNameSingularLowerCase);
    crud = crud.replace(/\[models\]/g, modelNamePluralLowerCase);
    crud = crud.replace(/\[Model\]/g, modelNameSingularCapitalized);
    crud = crud.replace(/\[Models\]/g, modelNamePluralCapitalized);

    // make a folder for the controller if it doesn't exist
    if (!fs.existsSync(`./Controllers`)) {
        fs.mkdirSync(`./Controllers`);
    }
   
    fs.writeFileSync(`./controllers/${modelName}Controller.js`, crud);
};


function makeRoute(modelName) {
    let route = fs.readFileSync('./templates/Route.tpl', 'utf8');

   
    fs.writeFileSync(`./routes/${modelName}Route.js`, route);
};

makeController(process.argv[2].toLowerCase());
// makeRoute(process.argv[2].toLowerCase());
