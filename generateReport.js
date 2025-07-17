// generateReport.js
import reporter from 'multiple-cucumber-html-reporter';
import open from 'open';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const reportPath = path.resolve('./reports/html/index.html');

reporter.generate({
  jsonDir: './reports',
  reportPath: './reports/html',
  metadata: {
    browser: {
      name: 'chrome',
      version: '134',
    },
    device: process.env.DEVICE || 'web',
    platform: {
      name: 'Windows',
      version: '10',
    },
  },
  customData: {
    title: 'Информация о тестах',
    data: [
      { label: 'Проект', value: process.env.PROJECT },
      { label: 'Окружение', value: process.env.ENV },
      { label: 'Дата', value: new Date().toLocaleString('ru-RU') },
    ],
  },
});

// Открываем отчет в браузере после генерации
open(reportPath).catch(err => {
  console.error('Не удалось открыть отчет автоматически:', err);
});
