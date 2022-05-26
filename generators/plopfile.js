module.exports = function (plop) {
  plop.setGenerator('module', {
    description: 'application module logic',

    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'module name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/modules/{{pascalCase name}}/{{pascalCase name}}Controller.ts',
        templateFile: 'templates/controller.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/modules/{{pascalCase name}}/{{pascalCase name}}DTO.ts',
        templateFile: 'templates/domain.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/modules/{{pascalCase name}}/{{pascalCase name}}Routes.ts',
        templateFile: 'templates/routes.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/modules/{{pascalCase name}}/schema.ts',
        templateFile: 'templates/schema.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/modules/{{pascalCase name}}/T{{pascalCase name}}.ts',
        templateFile: 'templates/type.ts.hbs',
      },
    ],
  });
};
