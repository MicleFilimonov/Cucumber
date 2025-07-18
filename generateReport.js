import reporter from 'multiple-cucumber-html-reporter';
import open from 'open';
import path from 'path';
import fs from 'fs';

const reportsDir = path.resolve('./reports');

const fileProjectMap = {
  'report-legzo.json': 'LEGZO',
  'report-sol.json': 'SOL',
  'report-fresh.json': 'FRESH',
  'report-jet.json': 'JET',
  'report-izzi.json': 'IZZI',
  'report-starda.json': 'STARDA',
  'report-lex.json': 'LEX',
  'report-drip.json': 'DRIP',
  'report-monro.json': 'MONRO',
  'report-gizbo.json': 'GIZBO',
  'report-irwin.json': 'IRWIN',
  'report-flagman.json': 'FLAGMAN',
  'report-martin.json': 'MARTIN',
  'report-1go.json': '1GO',
  'report-rox.json': 'ROX',
  'report-volna.json': 'VOLNA',
};

function renameFeatureInReports() {
  Object.entries(fileProjectMap).forEach(([fileName, project]) => {
    const filePath = path.join(reportsDir, fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`Файл не найден: ${fileName}`);
      return;
    }
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    content.forEach(feature => {
      if (feature.name) {
        feature.name = `${feature.name} - ${project}`;
      }
    });

    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  });
}

renameFeatureInReports();

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
      { label: 'Окружение', value: process.env.ENV },
      { label: 'Дата', value: new Date().toLocaleString('ru-RU') },
    ],
  },
});

open(reportPath).catch(err => {
  console.error('Не удалось открыть отчет автоматически:', err);
});
