import { generate } from 'multiple-cucumber-html-reporter';

generate({
    jsonDir: './cucumber-json', // Директория, где находятся JSON отчеты
    reportPath: './reports', // Директория для HTML-отчета
    metadata: {
        browser: {
            name: 'chromium',
            version: 'latest',
        },
        device: 'Local Test Machine',
        platform: {
            name: 'Windows',
            version: '11',
        },
    },
});
