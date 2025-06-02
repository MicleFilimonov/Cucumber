export default {
  default: {
    require: [
      './step-definitions/given.js',
      './step-definitions/when.js',
      './step-definitions/then.js'
    ],
    backtrace: true,
    headless: true,
    requireModule: [],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: '',
    timeout: 60000,  // Таймаут для шагов
    actionTimeout: 30000, // Таймаут для каждой отдельной операции (клик, ввод и т.д.)
    navigationTimeout: 40000, // Таймаут для операций навигации (page.goto)
    ignoreUndefinedDefinitions: false,
    format: [
      'json:./cucumber-json/report.json', // Генерация JSON отчета
      '@cucumber/html-formatter',
    ],
    language: 'ru',

    formatOptions: {
      colorsEnabled: true,
      output: 'reports/cucumber_report.html', // Путь для сохранения HTML-отчета
    },
    tagExpression: '@smoke and not @slow',
    parallel: 4,
    worldParameters: {},
  },
  smoke: {
    require: ['./step-definitions/**/*.js'],
    tagExpression: '@smoke',
    timeout: 60000,
  }
};
