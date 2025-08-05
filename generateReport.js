import reporter from 'multiple-cucumber-html-reporter';
import open from 'open';
import path from 'path';
import fs from 'fs';

const reportsDir = path.resolve('./reports');

const fileProjectMap = {
  'report-legzo-web.json': 'LEGZO Web',
  'report-sol-web.json': 'SOL Web',
  'report-fresh-web.json': 'FRESH Web',
  'report-jet-web.json': 'JET Web',
  'report-izzi-web.json': 'IZZI Web',
  'report-starda-web.json': 'STARDA Web',
  'report-lex-web.json': 'LEX Web',
  'report-drip-web.json': 'DRIP Web',
  'report-monro-web.json': 'MONRO Web',
  'report-gizbo-web.json': 'GIZBO Web',
  'report-irwin-web.json': 'IRWIN Web',
  'report-flagman-web.json': 'FLAGMAN Web',
  'report-martin-web.json': 'MARTIN Web',
  'report-1go-web.json': '1GO Web',
  'report-rox-web.json': 'ROX Web',
  'report-volna-web.json': 'VOLNA Web',

  'report-legzo-mob.json': 'LEGZO Mobile',
  'report-sol-mob.json': 'SOL Mobile',
  'report-fresh-mob.json': 'FRESH Mobile',
  'report-jet-mob.json': 'JET Mobile',
  'report-izzi-mob.json': 'IZZI Mobile',
  'report-starda-mob.json': 'STARDA Mobile',
  'report-lex-mob.json': 'LEX Mobile',
  'report-drip-mob.json': 'DRIP Mobile',
  'report-monro-mob.json': 'MONRO Mobile',
  'report-gizbo-mob.json': 'GIZBO Mobile',
  'report-irwin-mob.json': 'IRWIN Mobile',
  'report-flagman-mob.json': 'FLAGMAN Mobile',
  'report-martin-mob.json': 'MARTIN Mobile',
  'report-1go-mob.json': '1GO Mobile',
  'report-rox-mob.json': 'ROX Mobile',
  'report-volna-mob.json': 'VOLNA Mobile',

  'report-legzo-dev.json': 'LEGZO DEV',
  'report-sol-dev.json': 'SOL DEV',
  'report-fresh-dev.json': 'FRESH DEV',
  'report-jet-dev.json': 'JET DEV',
  'report-izzi-dev.json': 'IZZI DEV',
  'report-starda-dev.json': 'STARDA DEV',
  'report-lex-dev.json': 'LEX DEV',
  'report-drip-dev.json': 'DRIP DEV',
  'report-monro-dev.json': 'MONRO DEV',
  'report-gizbo-dev.json': 'GIZBO DEV',
  'report-irwin-dev.json': 'IRWIN DEV',
  'report-flagman-dev.json': 'FLAGMAN DEV',
  'report-martin-dev.json': 'MARTIN DEV',
  'report-1go-dev.json': '1GO DEV',
  'report-rox-dev.json': 'ROX DEV',
  'report-volna-dev.json': 'VOLNA DEV',
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
    const platformVersion = '11';

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
