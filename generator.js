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
	let crudTemplate = fs.readFileSync('./templates/Controller.tpl', 'utf8');

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
	let routeTemplate = fs.readFileSync('./templates/Route.tpl', 'utf8');

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
	let modelTemplate = fs.readFileSync('./templates/Model.tpl', 'utf8');

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
	// append to top of router.js
	routerFile = routerImport + '\n' + routerFile;
	fs.writeFileSync('./router.js', routerFile);

	const routerUse = `app.use('/api/v1/', ${modelNameSingularUpperCaseFirst}Route);`;
	routerFile = routerFile.replace('}', routerUse + '\n}');
	fs.writeFileSync('./router.js', routerFile);
}
if (process.argv.length === 3) {
	const modelName = pluralize.singular(process.argv[2].toLowerCase());
	const { modelNameSingularUpperCaseFirst } = transformModel(modelName);
	makeController(modelName);
	makeRoute(modelName);
	makeModel(modelName);
	appendToRouter(modelName);
	console.log(`
	\x1b[32m✔\x1b[0m Generated ${modelName}Controller.js
	\x1b[32m✔\x1b[0m Generated ${modelName}Route.js
	\x1b[32m✔\x1b[0m Generated ${modelNameSingularUpperCaseFirst}.js
	\x1b[32m✔\x1b[0m Configured ${modelName}Route to Router.js
	`);
} else if (process.argv.length > 3) {
	process.argv.slice(2).forEach((modelName) => {
		const { modelNameSingularUpperCaseFirst } = transformModel(modelName);
		makeController(modelName);
		makeRoute(modelName);
		makeModel(modelName);
		appendToRouter(modelName);
		console.log(`
		\x1b[32m✔\x1b[0m Generated ${modelName}Controller.js
		\x1b[32m✔\x1b[0m Generated ${modelName}Route.js
		\x1b[32m✔\x1b[0m Generated ${modelNameSingularUpperCaseFirst}.js
		\x1b[32m✔\x1b[0m Configured ${modelName}Route to Router.js
		`);
	});
} else {
	console.log('usage: node generator.js [modelName]');
	console.log('usage: node generator.js [modelName] [modelName] [modelName] ...');
	process.exit(1);
}

