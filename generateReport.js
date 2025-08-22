import reporter from 'multiple-cucumber-html-reporter';
import open from 'open';
import path from 'path';
import fs from 'fs';

const reportsDir = path.resolve('./reports');
const env = process.env.ENV || 'DEV'

const fileProjectMap = {

  'report-legzo-web.json': `LEGZO WEB, окружение: ${env}`,
  'report-sol-web.json': `SOL WEB, окружение: ${env}`,
  'report-fresh-web.json': `FRESH WEB, окружение: ${env}`,
  'report-jet-web.json': `JET WEB, окружение: ${env}`,
  'report-izzi-web.json': `IZZI WEB, окружение: ${env}`,
  'report-starda-web.json':`STARDA WEB, окружение: ${env}`,
  'report-lex-web.json': `LEX WEB, окружение: ${env}`,
  'report-drip-web.json': `DRIP WEB, окружение: ${env}`,
  'report-monro-web.json': `MONRO WEB, окружение: ${env}`,
  'report-gizbo-web.json': `GZIBO WEB, окружение: ${env}`,
  'report-irwin-web.json': `IRWIN WEB, окружение: ${env}`,
  'report-flagman-web.json': `FLAGMAN WEB, окружение: ${env}`,
  'report-martin-web.json': `MARTIN WEB, окружение: ${env}`,
  'report-1go-web.json': `1GO Web, окружение: ${env}`,
  'report-rox-web.json': `ROX WEB, окружение: ${env}`,
  'report-volna-web.json': `VOLNA WEB, окружение: ${env}`,

  'report-legzo-mob.json': `LEGZO MOBILE, окружение: ${env}`,
  'report-sol-mob.json': `SOL MOBILE, окружение: ${env}`,
  'report-fresh-mob.json': `FRESH Web, окружение: ${env}`,
  'report-jet-mob.json': `JET MOBILE, окружение: ${env}`,
  'report-izzi-mob.json': `IZZI MOBILE, окружение: ${env}`,
  'report-starda-mob.json':`STARDA MOBILE, окружение: ${env}`,
  'report-lex-mob.json': `LEX MOBILE, окружение: ${env}`,
  'report-drip-mob.json': `DRIP MOBILE, окружение: ${env}`,
  'report-monro-mob.json': `MONRO MOBILE, окружение: ${env}`,
  'report-gizbo-mob.json': `GZIBO MOBILE, окружение: ${env}`,
  'report-irwin-mob.json': `IRWIN MOBILE, окружение: ${env}`,
  'report-flagman-mob.json': `FLAGMAN MOBILE, окружение: ${env}`,
  'report-martin-mob.json': `MARTIN MOBILE, окружение: ${env}`,
  'report-1go-mob.json': `1GO MOBILE, окружение: ${env}`,
  'report-rox-mob.json': `ROX MOBILE, окружение: ${env}`,
  'report-volna-mob.json': `VOLNA MOBILE, окружение: ${env}`,

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
