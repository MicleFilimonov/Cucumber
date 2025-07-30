import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import reporter from 'cucumber-html-reporter';

const reportsDir = './reports';

const jsonFiles = readdirSync(reportsDir).filter(file =>
  file.startsWith('report-') && file.endsWith('.json')
);

if (jsonFiles.length === 0) {
  console.error('❌ JSON-отчёты не найдены в папке reports/');
  process.exit(1);
}

let mergedData = [];

for (const file of jsonFiles) {
  const filePath = join(reportsDir, file);
  const content = JSON.parse(readFileSync(filePath, 'utf-8'));

  if (Array.isArray(content)) {
    mergedData.push(...content);
  } else {
    console.warn(`⚠️ Файл ${file} не является массивом — пропущен`);
  }
}

const mergedJsonPath = join(reportsDir, 'merged-report.json');
writeFileSync(mergedJsonPath, JSON.stringify(mergedData, null, 2));

console.log(`✅ Объединённый JSON создан: ${mergedJsonPath}`);

// Генерация HTML-отчета
reporter.generate({
  theme: 'bootstrap',
  jsonFile: mergedJsonPath,
  output: './reports/portable-report.html',
  reportSuiteAsScenarios: true,
  launchReport: false,
  storeScreenshots: true,
  screenshotsDirectory: './reports/screenshots/',
  noInlineScreenshots: false,
  metadata: {
    Platform: 'Windows 11',
    Executed: 'Local',
  },
});
