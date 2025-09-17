#!/usr/bin/env node
import { execSync } from 'child_process';
import { testScripts, projects, defaultEnv, defaultCluster, defaultDevice } from './scripts.js';

// ---------- Парсим аргументы ----------
const args = process.argv.slice(2);

let selectedProjects = [];
let featureType = '';
let device = defaultDevice.toUpperCase();
let env = defaultEnv;
let cluster = defaultCluster;

args.forEach(arg => {
    const argUpper = arg.toUpperCase();

    if (argUpper === 'DEV') featureType = 'DEV';
    else if (argUpper === 'MSGR') featureType = 'MSGR';
    else if (arg.startsWith('DEVICE=')) device = arg.split('=')[1].toUpperCase();
    else if (arg.startsWith('ENV=')) env = arg.split('=')[1];
    else if (arg.startsWith('CLUSTER=')) cluster = arg.split('=')[1];
    else if (argUpper === 'ALL') selectedProjects = [...projects];
    else selectedProjects = arg.split(',').map(p => p.toUpperCase());
});

// Если проекты не указаны, запускаем все
if (selectedProjects.length === 0) selectedProjects = [...projects];

// Очистка артефактов перед каждым прогоном конкретного девайса
execSync(
    `npx rimraf --glob "visual-baseline/*-diff.png" "visual-baseline/*-current.png" "reports/report-*-*.json" "reports/html" "reports/*.html" "reports/screenshots" "screenshots/*"`,
    { stdio: 'inherit' }
);


// ---------- Функция запуска ----------
function runTests(typeToRun, dev) {
    const featureFile = testScripts[typeToRun];

    console.log(`🚀 Запуск [${typeToRun}] для [${selectedProjects.join(', ')}], DEVICE=${dev}, ENV=${env}, CLUSTER=${cluster}`);

    for (const project of selectedProjects) {
        try {
            // 👈 Важно! Устанавливаем реальный DEVICE, чтобы шаги this.device видели его
            process.env.DEVICE = dev;

            execSync(
                `cross-env PROJECT=${project} ENV=${env} CLUSTER=${cluster} DEVICE=${dev} npx cucumber-js ${featureFile} --format json:./reports/report-${project.toLowerCase()}-${dev.toLowerCase()}.json`,
                { stdio: 'inherit' }
            );
        } catch (err) {
            console.error(`❌ Ошибка на ${project} ${dev} (${typeToRun})`);
        }
    }
}

// ---------- Основной запуск ----------
let devices = [];
if (device === 'ALL') {
    devices = ['WEB', 'MOBILE'];
} else {
    devices = [device];
}

// Запуск поочерёдно для каждого девайса
for (const dev of devices) {
    let typeToRun

    if (featureType === 'DEV') {
        typeToRun = 'DEV'
    } else if (featureType === 'MSGR') {
        typeToRun = 'MSGR'
    }else if (featureType === 'MOBILE') {
        typeToRun = 'MOBILE'   
    } else typeToRun = 'WEB'
    // const typeToRun = featureType === 'DEV' ? 'DEV' : (dev === 'MOBILE' ? 'MOBILE' : 'WEB');
    console.log(`\n📱💻 Запуск тестов на ${dev}`);
    runTests(typeToRun, dev);
}

// Генерация отчёта один раз после всех запусков
execSync(`node generateReport.js`, { stdio: 'inherit' });
