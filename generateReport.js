import reporter from 'multiple-cucumber-html-reporter';
import open from 'open';
import path from 'path';
import fs from 'fs';

const reportsDir = path.resolve('./reports');
const env = process.env.ENV || 'DEV'

const fileProjectMap = {

  'report-legzo-web.json': `LEGZO WEB`,
  'report-sol-web.json': `SOL WEB`,
  'report-fresh-web.json': `FRESH WEB`,
  'report-jet-web.json': `JET WEB`,
  'report-izzi-web.json': `IZZI WEB`,
  'report-starda-web.json':`STARDA WEB`,
  'report-lex-web.json': `LEX WEB`,
  'report-drip-web.json': `DRIP WEB`,
  'report-monro-web.json': `MONRO WEB`,
  'report-gizbo-web.json': `GZIBO WEB`,
  'report-irwin-web.json': `IRWIN WEB`,
  'report-flagman-web.json': `FLAGMAN WEB`,
  'report-martin-web.json': `MARTIN WEB`,
  'report-1go-web.json': `1GO Web`,
  'report-rox-web.json': `ROX WEB`,
  'report-volna-web.json': `VOLNA WEB`,
  'report-nika-web.json': `NIKA WEB`,

  'report-legzo-mob.json': `LEGZO MOBILE`,
  'report-sol-mob.json': `SOL MOBILE`,
  'report-fresh-mob.json': `FRESH Web`,
  'report-jet-mob.json': `JET MOBILE`,
  'report-izzi-mob.json': `IZZI MOBILE`,
  'report-starda-mob.json':`STARDA MOBILE`,
  'report-lex-mob.json': `LEX MOBILE`,
  'report-drip-mob.json': `DRIP MOBILE`,
  'report-monro-mob.json': `MONRO MOBILE`,
  'report-gizbo-mob.json': `GZIBO MOBILE`,
  'report-irwin-mob.json': `IRWIN MOBILE`,
  'report-flagman-mob.json': `FLAGMAN MOBILE`,
  'report-martin-mob.json': `MARTIN MOBILE`,
  'report-1go-mob.json': `1GO MOBILE`,
  'report-rox-mob.json': `ROX MOBILE`,
  'report-volna-mob.json': `VOLNA MOBILE`,
  'report-nika-mob.json': `NIKA MOBILE`,

  'report-legzo-dev.json': `LEGZO DEVELOP, окружение: ${env}`,
  'report-sol-dev.json': `SOL DEVELOP, окружение: ${env}`,
  'report-fresh-dev.json': `FRESH DEVELOP, окружение: ${env}`,
  'report-jet-dev.json': `JET DEVELOP, окружение: ${env}`,
  'report-izzi-dev.json': `IZZI DEVELOP, окружение: ${env}`,
  'report-starda-dev.json':`STARDA DEVELOP, окружение: ${env}`,
  'report-lex-dev.json': `LEX DEVELOP, окружение: ${env}`,
  'report-drip-dev.json': `DRIP DEVELOP, окружение: ${env}`,
  'report-monro-dev.json': `MONRO DEVELOP, окружение: ${env}`,
  'report-gizbo-dev.json': `GZIBO DEVELOP, окружение: ${env}`,
  'report-irwin-dev.json': `IRWIN DEVELOP, окружение: ${env}`,
  'report-flagman-dev.json': `FLAGMAN DEVELOP, окружение: ${env}`,
  'report-martin-dev.json': `MARTIN DEVELOP, окружение: ${env}`,
  'report-1go-dev.json': `1GO DEVELOP, окружение: ${env}`,
  'report-rox-dev.json': `ROX DEVELOP, окружение: ${env}`,
  'report-volna-dev.json': `VOLNA DEVELOP, окружение: ${env}`,
  'report-nika-dev.json': `NIKA DEVELOP, окружение: ${env}`,
};

function renameFeatureInReports() {
  Object.entries(fileProjectMap).forEach(([fileName, project]) => {
    const filePath = path.join(reportsDir, fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`Файл не найден: ${fileName}`);
      return;
    }

    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const isMobile = fileName.includes('-mob');
    const device = isMobile ? 'iPhone 13 Pro' : 'Desktop';

    const browserName = 'chrome';
    const browserVersion = '124'; // можно тянуть из Playwright: await page.browser().version()
    const platformName = 'Windows';
    const platformVersion = '10';
    
    content.forEach(feature => {
      if (feature.name) {
        feature.name = `${feature.name} - ${project}`;
      }

      feature.metadata = {
        browser: {
          name: browserName,
          version: browserVersion,
        },
        device: device,
        platform: {
          name: platformName,
          version: platformVersion,
        },
      };
    });

    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  });
}
renameFeatureInReports();

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
