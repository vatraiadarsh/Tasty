import fs from 'fs';
import pluralize from 'pluralize';



function makeController(modelName) {
    let crudTemplate = fs.readFileSync('./templates/Controller.tpl', 'utf8');

    // [book] -> [model]
    let modelNameSingularLowerCase = pluralize.singular(modelName.toLowerCase());
    // [books] -> [models]
    let modelNamePluralLowerCase = pluralize.plural(modelName.toLowerCase());
    // [Book] -> [Model]
    let modelNameSingularCapitalized = modelNameSingularLowerCase.charAt(0).toUpperCase() + modelNameSingularLowerCase.slice(1);
    // [Books]  -> [Models]
    let modelNamePluralCapitalized = modelNamePluralLowerCase.charAt(0).toUpperCase() + modelNamePluralLowerCase.slice(1);

    crudTemplate = crudTemplate.replace(/\[model\]/g, modelNameSingularLowerCase);
    crudTemplate = crudTemplate.replace(/\[models\]/g, modelNamePluralLowerCase);
    crudTemplate = crudTemplate.replace(/\[Model\]/g, modelNameSingularCapitalized);
    crudTemplate = crudTemplate.replace(/\[Models\]/g, modelNamePluralCapitalized);

    if (!fs.existsSync(`./Controllers`)) {
        fs.mkdirSync(`./Controllers`);
    }

    fs.writeFileSync(`./Controllers/${modelName}Controller.js`, crudTemplate);
};


function makeRoute(modelName) {
    let routeTemplate = fs.readFileSync('./templates/Route.tpl', 'utf8');

    // [book] -> [model]
    let modelNameSingularLowerCase = pluralize.singular(modelName.toLowerCase());
    // [books] -> [models]
    let modelNamePluralLowerCase = pluralize.plural(modelName.toLowerCase());
    // [Book] -> [Model]
    let modelNameSingularCapitalized = modelNameSingularLowerCase.charAt(0).toUpperCase() + modelNameSingularLowerCase.slice(1);
    // [Books]  -> [Models]
    let modelNamePluralCapitalized = modelNamePluralLowerCase.charAt(0).toUpperCase() + modelNamePluralLowerCase.slice(1);

    routeTemplate = routeTemplate.replace(/\[model\]/g, modelNameSingularLowerCase);
    routeTemplate = routeTemplate.replace(/\[models\]/g, modelNamePluralLowerCase);
    routeTemplate = routeTemplate.replace(/\[Model\]/g, modelNameSingularCapitalized);
    routeTemplate = routeTemplate.replace(/\[Models\]/g, modelNamePluralCapitalized);

    if (!fs.existsSync(`./Routes`)) {
        fs.mkdirSync(`./Routes`);
    }

    fs.writeFileSync(`./Routes/${modelName}Route.js`, routeTemplate);
};

function makeModel(modelName) {
    let modelTemplate = fs.readFileSync('./templates/Model.tpl', 'utf8');

    // [Book] -> [Model]
    let modelNameCapitalized = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    modelTemplate = modelTemplate.replace(/\[Model\]/g, modelNameCapitalized);

    if (!fs.existsSync(`./Models`)) {
        fs.mkdirSync(`./Models`);
    }

    fs.writeFileSync(`./Models/${modelName}.js`, modelTemplate);
}


function appendToRouter(modelName) {
    let routerFile = fs.readFileSync('./router.js', 'utf8');
    // capitalize first letter of model name
    let modelNameCapitalized = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const routerImport = `import ${modelNameCapitalized}Route from './routes/${modelName}Route.js'`;
    // append to top of router.js
    routerFile = routerImport + '\n' + routerFile;
    fs.writeFileSync('./router.js', routerFile);

    const routerUse = `app.use('/api/v1/', ${modelNameCapitalized}Route);`;
    routerFile = routerFile.replace('}', routerUse + '\n}');
    fs.writeFileSync('./router.js', routerFile);

}


if (process.argv.length !== 3) {
    console.log('usage: node generator.js [modelName]');
    process.exit(1);

} else {
    const modelName = pluralize.singular(process.argv[2].toLowerCase())
    makeController(modelName);
    makeRoute(modelName);
    makeModel(modelName);
    appendToRouter(modelName);
    console.log(`✅ Generated ${modelName}Controller.js \r\n✅ Generated ${modelName}Route.js \r\n✅ Generated ${modelName}Model.js \r\n✅ Configured ${modelName}Route to Router.js`);
}

