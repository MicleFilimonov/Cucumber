import reporter from 'multiple-cucumber-html-reporter';
import open from 'open';
import path from 'path';
import fs from 'fs';
import stripAnsi from 'strip-ansi';

const reportsDir = path.resolve('./reports');
const env = process.env.ENV || 'DEV';

const fileProjectMap = {
  'report-legzo-web.json': `LEGZO WEB`,
  'report-sol-web.json': `SOL WEB`,
  'report-fresh-web.json': `FRESH WEB`,
  'report-jet-web.json': `JET WEB`,
  'report-izzi-web.json': `IZZI WEB`,
  'report-starda-web.json': `STARDA WEB`,
  'report-lex-web.json': `LEX WEB`,
  'report-drip-web.json': `DRIP WEB`,
  'report-monro-web.json': `MONRO WEB`,
  'report-gizbo-web.json': `GIZBO WEB`,
  'report-irwin-web.json': `IRWIN WEB`,
  'report-flagman-web.json': `FLAGMAN WEB`,
  'report-martin-web.json': `MARTIN WEB`,
  'report-1go-web.json': `1GO Web`,
  'report-rox-web.json': `ROX WEB`,
  'report-volna-web.json': `VOLNA WEB`,
  'report-nika-web.json': `NIKA WEB`,

  'report-legzo-mobile.json': `LEGZO MOBILE`,
  'report-sol-mobile.json': `SOL MOBILE`,
  'report-fresh-mobile.json': `FRESH MOBILE`,
  'report-jet-mobile.json': `JET MOBILE`,
  'report-izzi-mobile.json': `IZZI MOBILE`,
  'report-starda-mobile.json': `STARDA MOBILE`,
  'report-lex-mobile.json': `LEX MOBILE`,
  'report-drip-mobile.json': `DRIP MOBILE`,
  'report-monro-mobile.json': `MONRO MOBILE`,
  'report-gizbo-mobile.json': `GIZBO MOBILE`,
  'report-irwin-mobile.json': `IRWIN MOBILE`,
  'report-flagman-mobile.json': `FLAGMAN MOBILE`,
  'report-martin-mobile.json': `MARTIN MOBILE`,
  'report-1go-mobile.json': `1GO MOBILE`,
  'report-rox-mobile.json': `ROX MOBILE`,
  'report-volna-mobile.json': `VOLNA MOBILE`,
  'report-nika-mobile.json': `NIKA MOBILE`,
};

// ------------------ функция очистки ANSI ------------------
function cleanAnsiInCucumberJson(jsonDir) {
  const files = fs.readdirSync(jsonDir).filter(f => f.endsWith('.json'));

  files.forEach(file => {
    const filePath = path.join(jsonDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    content.forEach(feature => {
      if (!feature.elements) return;
      feature.elements.forEach(scenario => {
        if (!scenario.steps) return;
        scenario.steps.forEach(step => {
          if (step.result?.error_message) {
            step.result.error_message = stripAnsi(step.result.error_message);
          }
        });
      });
    });

    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
  });
}

// ------------------ Переименование фич и добавление метаданных ------------------
function renameFeatureInReports() {
  Object.entries(fileProjectMap).forEach(([fileName, project]) => {
    const filePath = path.join(reportsDir, fileName);
    if (!fs.existsSync(filePath)) {
      console.log(`Файл не найден: ${fileName}`);
      return;
    }

    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const isMobile = fileName.includes('-mob');
    const device = isMobile ? 'iPhone 13 Pro' : 'Desktop';
    const browserName = 'chrome';
    const browserVersion = '124';
    const platformName = 'Windows';
    const platformVersion = '11';

    content.forEach(feature => {
     if (feature.name) {
        // проверяем, есть ли уже суффикс с проектом
        const suffix = ` - ${project}`;
        if (!feature.name.endsWith(suffix)) {
          feature.name = feature.name + suffix;
        }
      }

      feature.metadata = {
        browser: { name: browserName, version: browserVersion },
        device: device,
        platform: { name: platformName, version: platformVersion },
      };
    });

    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  });
}

// ------------------ Выполняем всё ------------------
renameFeatureInReports();

// Очищаем ANSI перед генерацией отчёта
cleanAnsiInCucumberJson(reportsDir);

const reportPath = path.resolve('./reports/html/index.html');

reporter.generate({
  jsonDir: './reports',
  reportPath: './reports/html',
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
