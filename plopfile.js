export default function (plop) {
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name of a new component (e.g., BaseCard)',
        validate: (value) => {
          if (!value) return 'Component name is required'
          if (!/^[A-Z]/.test(value)) return 'Component name must start with uppercase letter'
          return true
        }
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/components/{{pascalCase name}}',
        templateFiles: 'plop-templates/component/*',
        base: 'plop-templates/component'
      },
      {
        type: 'append',
        path: 'src/components/index.ts',
        pattern: /$/,
        template: "export * from './{{pascalCase name}}'"
      },
      {
        type: 'run',
        command: 'node scripts/generate-exports.js'
      }
    ]
  })
}

