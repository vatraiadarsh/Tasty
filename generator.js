import fs from 'fs';
import pluralize from 'pluralize';

function transformModel(modelName) {
	// [book] -> [model]
	let modelNameSingularLowerCase = pluralize.singular(modelName.toLowerCase());
	// [books] -> [models]
	let modelNamePluralLowerCase = pluralize.plural(modelName.toLowerCase());
	// [Book] -> [Model]
	let modelNameSingularUpperCaseFirst =
		modelNameSingularLowerCase.charAt(0).toUpperCase() + modelNameSingularLowerCase.slice(1);
	// [Books]  -> [Models]
	let modelNamePluralUpperCaseFirst =
		modelNamePluralLowerCase.charAt(0).toUpperCase() + modelNamePluralLowerCase.slice(1);

	return {
		modelNameSingularLowerCase,
		modelNamePluralLowerCase,
		modelNameSingularUpperCaseFirst,
		modelNamePluralUpperCaseFirst,
	};
}

function makeController(modelName) {
	let crudTemplate = fs.readFileSync('./core/templates/Controller.tpl', 'utf8');

	let {
		modelNameSingularLowerCase,
		modelNamePluralLowerCase,
		modelNameSingularUpperCaseFirst,
		modelNamePluralUpperCaseFirst,
	} = transformModel(modelName);

	crudTemplate = crudTemplate.replace(/\[model\]/g, modelNameSingularLowerCase);
	crudTemplate = crudTemplate.replace(/\[models\]/g, modelNamePluralLowerCase);
	crudTemplate = crudTemplate.replace(/\[Model\]/g, modelNameSingularUpperCaseFirst);
	crudTemplate = crudTemplate.replace(/\[Models\]/g, modelNamePluralUpperCaseFirst);

	if (!fs.existsSync(`./Controllers`)) {
		fs.mkdirSync(`./Controllers`);
	}

	fs.writeFileSync(`./Controllers/${modelName}Controller.js`, crudTemplate);
}

function makeRoute(modelName) {
	let routeTemplate = fs.readFileSync('./core/templates/Route.tpl', 'utf8');

	let {
		modelNameSingularLowerCase,
		modelNamePluralLowerCase,
		modelNameSingularUpperCaseFirst,
		modelNamePluralUpperCaseFirst,
	} = transformModel(modelName);

	routeTemplate = routeTemplate.replace(/\[model\]/g, modelNameSingularLowerCase);
	routeTemplate = routeTemplate.replace(/\[models\]/g, modelNamePluralLowerCase);
	routeTemplate = routeTemplate.replace(/\[Model\]/g, modelNameSingularUpperCaseFirst);
	routeTemplate = routeTemplate.replace(/\[Models\]/g, modelNamePluralUpperCaseFirst);

	if (!fs.existsSync(`./Routes`)) {
		fs.mkdirSync(`./Routes`);
	}

	fs.writeFileSync(`./Routes/${modelName}Route.js`, routeTemplate);
}

function makeModel(modelName) {
	let modelTemplate = fs.readFileSync('./core/templates/Model.tpl', 'utf8');

	let { modelNameSingularUpperCaseFirst } = transformModel(modelName);
	modelTemplate = modelTemplate.replace(/\[Model\]/g, modelNameSingularUpperCaseFirst);

	if (!fs.existsSync(`./Models`)) {
		fs.mkdirSync(`./Models`);
	}

	fs.writeFileSync(`./Models/${modelNameSingularUpperCaseFirst}.js`, modelTemplate);
}

function appendToRouter(modelName) {
	let routerFile = fs.readFileSync('./router.js', 'utf8');

	let { modelNameSingularUpperCaseFirst } = transformModel(modelName);
	const routerImport = `import ${modelNameSingularUpperCaseFirst}Route from './routes/${modelName}Route.js';`;

	// check the router import statement, if it exists, do nothing
	if (routerFile.includes(routerImport)) {
		return;
	}

	routerFile = routerImport + '\n' + routerFile;
	fs.writeFileSync('./router.js', routerFile);

	const routerUse = `app.use('/api/v1/', ${modelNameSingularUpperCaseFirst}Route);`;
	routerFile = routerFile.replace('}', routerUse + '\n}');
	fs.writeFileSync('./router.js', routerFile);
}

function makeValidator(modelName) {
	let validatorTemplate = fs.readFileSync('./core/templates/Validator.tpl', 'utf8');

	let { modelNameSingularLowerCase } = transformModel(modelName);
	validatorTemplate = validatorTemplate.replace(/\[model\]/g, modelNameSingularLowerCase);

	if (!fs.existsSync(`./Validators`)) {
		fs.mkdirSync(`./Validators`);
	}

	fs.writeFileSync(`./Validators/${modelNameSingularLowerCase}Validator.js`, validatorTemplate);
}

function printStatement(modelName) {
	let { modelNameSingularUpperCaseFirst, modelNameSingularLowerCase } = transformModel(modelName);
	console.log(`
		\x1b[32m✔\x1b[0m Generated ${modelNameSingularUpperCaseFirst}.js
		\x1b[32m✔\x1b[0m Generated ${modelName}Controller.js
		\x1b[32m✔\x1b[0m Configured ${modelNameSingularLowerCase}Validator.js
		\x1b[32m✔\x1b[0m Generated ${modelName}Route.js
		\x1b[32m✔\x1b[0m Configured ${modelName}Route to Router.js
		`);
}

function automate(modelName) {
	makeModel(modelName);
	makeController(modelName);
	makeValidator(modelName);
	makeRoute(modelName);
	appendToRouter(modelName);
	printStatement(modelName);
}

if (process.argv.length === 3) {
	const modelName = pluralize.singular(process.argv[2].toLowerCase());
	automate(modelName);
} else if (process.argv.length > 3) {
	const modelNames = process.argv.slice(2).map((modelName) => pluralize.singular(modelName.toLowerCase()));
	modelNames.forEach((modelName) => {
		automate(modelName);
	});
} else {
	const usageText = `
	generator helps you to automate the creation of models, controllers, validators and configures the routes.
  
	usage:
	  node generator <command>
  
	commands can be:
  
	[modelName] : used to create a new model, controller, validator & configures the route to router.js file
	[modelName] [modelName] [modelName] ... : used to create multiple model, controller, validator & configures all the routes to router.js file
	`;

	console.log('\x1b[34m' + usageText + '\x1b[0m');
	process.exit(1);
}

// node generator make Controller:UserController

