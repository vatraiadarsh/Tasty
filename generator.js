import fs from 'fs';
import pluralize from 'pluralize';
import prompt from 'prompt';
prompt.start();

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

// make this function synchronous

async function makeModel(modelName) {
	let modelTemplate = fs.readFileSync('./templates/Model.tpl', 'utf8');

	let { modelNameSingularUpperCaseFirst } = transformModel(modelName);
	modelTemplate = modelTemplate.replace(/\[Model\]/g, modelNameSingularUpperCaseFirst);

	if (!fs.existsSync(`./Models`)) {
		fs.mkdirSync(`./Models`);
	}

	fs.writeFileSync(`./Models/${modelNameSingularUpperCaseFirst}.js`, modelTemplate);

	const fields = [
		{
			name: 'fieldName',
			message: 'What is the name of the field? (ex. name, age)',
			required: true,
			validator: /^[a-zA-Z]+$/,
			warning: 'Name must contain only letters',
		},
		{
			name: 'fieldType',
			message: 'What is the type of the field? (ex. String, Number)',
			required: true,
			validator: /^[a-zA-Z]+$/,
			warning: 'Type must contain only letters',
		},
		{
			name: 'required',
			message: 'Is the field required? (yes/no)',
			required: true,
			validator: /^(yes|no)$/,
			warning: 'Please enter yes or no',
		},
	];

	prompt.get(fields, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			// add the field to the model
			addFieldToModel(modelName, result.fieldName, result.fieldType, result.required);
			printStatement(modelName);
		}
	});
}

function addFieldToModel(modelName, fieldName, fieldType, required) {
	let modelTemplate = fs.readFileSync(`./Models/${modelName}.js`, 'utf8');
	let fieldNameUpperCaseFirst = fieldName.charAt(0).toUpperCase() + fieldName.slice(1).toLowerCase();
	let fieldTypeUpperCaseFirst = fieldType.charAt(0).toUpperCase() + fieldType.slice(1).toLowerCase();
	let requiredLowerCase = required.toLowerCase();

	modelTemplate = modelTemplate.replace(/\[fieldName\]/g, fieldNameUpperCaseFirst);
	modelTemplate = modelTemplate.replace(/\[fieldType\]/g, fieldTypeUpperCaseFirst);

	if (requiredLowerCase === 'yes' || requiredLowerCase === 'y') {
		modelTemplate = modelTemplate.replace(/\[required\]/g, 'required:true');
	} else {
		modelTemplate = modelTemplate.replace(/\[required\]/g, '');
	}
	fs.writeFileSync(`./Models/${modelName}.js`, modelTemplate);

	// const field = [
	// 	{
	// 		name: 'addAnotherField',
	// 		message: 'Would you like to add another field to the model? (yes/no)',
	// 		required: true,
	// 		validator: /^(yes|no)$/,
	// 		warning: 'Please enter yes or no',
	// 	},
	// ];
	// prompt.get(field, (err, result) => {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		if (result.addAnotherField === 'yes' || result.addAnotherField === 'y') {
	// 			let addFieldTemplate = fs.readFileSync('./templates/AddField.tpl', 'utf8');

	// 			addFieldTemplate = addFieldTemplate.replace(/\[fieldName\]/g, fieldNameUpperCaseFirst);
	// 			addFieldTemplate = addFieldTemplate.replace(/\[fieldType\]/g, fieldTypeUpperCaseFirst);

	// 			if (requiredLowerCase === 'yes' || requiredLowerCase === 'y') {
	// 				addFieldTemplate = addFieldTemplate.replace(/\[required\]/g, 'required:true');
	// 			} else {
	// 				addFieldTemplate = addFieldTemplate.replace(/\[required\]/g, '');
	// 			}

	// 			fs.appendFileSync(`./Models/${modelName}.js`, addFieldTemplate);

	// 		} else {
	// 			console.log('bye!');
	// 		}
	// 	}
	// }
	// );
}

function appendToRouter(modelName) {
	let routerFile = fs.readFileSync('./router.js', 'utf8');

	let { modelNameSingularUpperCaseFirst } = transformModel(modelName);
	const routerImport = `import ${modelNameSingularUpperCaseFirst}Route from './routes/${modelName}Route.js';`;

	// check the router import statement, if it exists, do nothing
	if (routerFile.includes(routerImport)) {
		return;
	}

	// append to top of router.js
	routerFile = routerImport + '\n' + routerFile;
	fs.writeFileSync('./router.js', routerFile);

	const routerUse = `app.use('/api/v1/', ${modelNameSingularUpperCaseFirst}Route);`;
	routerFile = routerFile.replace('}', routerUse + '\n}');
	fs.writeFileSync('./router.js', routerFile);
}

function printStatement(modelName) {
	let { modelNameSingularUpperCaseFirst } = transformModel(modelName);
	console.log(`
		\x1b[32m✔\x1b[0m Generated ${modelName}Controller.js
		\x1b[32m✔\x1b[0m Generated ${modelName}Route.js
		\x1b[32m✔\x1b[0m Generated ${modelNameSingularUpperCaseFirst}.js
		\x1b[32m✔\x1b[0m Configured ${modelName}Route to Router.js
		`);
}

function automate(modelName) {
	makeModel(modelName);
	makeController(modelName);
	makeRoute(modelName);
	appendToRouter(modelName);
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
	console.log('usage: node generator.js [modelName]');
	console.log('usage: node generator.js [modelName] [modelName] [modelName] ...');
	process.exit(1);
}
