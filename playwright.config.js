import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false,
    viewport: { width: 1366, height: 768 },
    actionTimeout: 20000, // Таймаут для каждой отдельной операции (клик, ввод и т.д.)
    navigationTimeout: 30000, // Таймаут для операций навигации (page.goto)
  },
  timeout: 60000, // Устанавливает общий таймаут для всех тестов (в миллисекундах)
  expect: {
    timeout: 11000
  },
  // Настройки для cucumber
  cucumberOpts: {
    require: [
      './step-definitions/given.js',
      './step-definitions/when.js',
      './step-definitions/then.js'
    ],
    waitforTimeout: 30000, 
    headless: true,
    timeout: 60000, // Таймаут для шагов тестов
    failFast: false, // Останавливать тесты при первой ошибке
    snippets: true, // Показывать недостающие фрагменты шагов
    source: true, // Показывать исходный код шагов
    strict: false, // Не останавливать выполнение, если есть неопределенные шаги
    ignoreUndefinedDefinitions: false, // Ожидать, что все шаги будут определены
  },
  reporter: [
    ["html"]
  ],
});
