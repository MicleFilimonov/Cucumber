import { Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageObjects } from '../../page_objects/pageObjects.js';
import fs from 'fs';
import path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

setDefaultTimeout(60 * 1000)

// вижу или не вижу какой то элемент 
Then('Я {string} {string}', async function (activity, element) {

    // Пробуем найти локатор с указанием проекта (например: "Меню поддержки LEGZO")
    const projectSpecificKey1 = `${element} ${this.project} ${this.env}`;
    const projectSpecificKey2 = `${element} ${this.project}`;

    let locator
    // Генерация локатора с использованием global.generatedMessage
    if (element === 'Тестовое сообщение') {
        locator = `//*[contains(text(), "${global.generatedMessage}")]`;
    } else if (pageObjects.locator[projectSpecificKey1]) {
        locator = pageObjects.locator[projectSpecificKey1];
    } else if (pageObjects.locator[projectSpecificKey2]) {
        locator = pageObjects.locator[projectSpecificKey2];
    } else if (pageObjects.locator[element]) {
        locator = pageObjects.locator[element];
    } else {
        throw new Error(`Локатор не найден ни для "${projectSpecificKey1}", "${projectSpecificKey2}", ни для "${element}"`);
    }

    const givenElement = this.page.locator(locator)

    if (activity === 'не вижу') {
        await expect(givenElement).not.toBeVisible();
    } else if (activity === "вижу") {
        await expect(givenElement).toBeVisible();

        const box = await givenElement.boundingBox();
        expect(box?.width).toBeGreaterThan(0);
        expect(box?.height).toBeGreaterThan(0);
    }
})

// вижу или не вижу элемент 1 и элемент 2
Then('Я {string} {string} и {string}', async function (activity, element1, element2) {

    const locator1 = pageObjects.locator[element1];
    const locator2 = pageObjects.locator[element2]
    const givenElement1 = this.page.locator(locator1)
    const givenElement2 = this.page.locator(locator2)

    if (activity === 'не вижу') {
        await expect(givenElement1).not.toBeVisible();
        await expect(givenElement2).not.toBeVisible();

    } else if (activity === "вижу") {
        await expect(givenElement1).toBeVisible();
        await expect(givenElement2).toBeVisible();

        const box1 = await givenElement1.boundingBox();
        const box2 = await givenElement2.boundingBox();

        if (!box1 || !box2) {
            throw new error('Один из элементов не имеет размеров в пикселях')
        }
        expect(box1?.width).toBeGreaterThan(0);
        expect(box2?.width).toBeGreaterThan(0);
        expect(box1?.height).toBeGreaterThan(0);
        expect(box2?.height).toBeGreaterThan(0);
    }
})

// вижу или не вижу элемент с переданным текстом 
Then('Я {string} {string} с текстом {string}', async function (activity, element, text) {

    /*
    typeof - возвращает true/false учитывая условие, если строка - false, если функция - true 
    isDynamicLocator - хранит в себе конечный тип
    locatorValue - хранит в себе конечный локатор, который будет использоваться 
    если локатор функция - используется, то в локатор будет прокидываться текст
    если локатор строка - используется локатор как есть
    */
    let locatorValue;

    // Проверяем, является ли локатор функцией или строкой
    if (typeof pageObjects.locator[element] === 'function') {
        locatorValue = pageObjects.locator[element](text); // Если функция, вызываем с аргументом text
    } else {
        locatorValue = pageObjects.locator[element]; // Если строка, используем как есть
    }

    const givenElement = this.page.locator(locatorValue);
    const options = { timeout: 20000 }

    if (activity === 'не вижу') {
        await expect(givenElement).not.toBeVisible(options);
    } else if (activity === "вижу") {
        await expect(givenElement).toBeVisible(options);
    }

    const elementText = await givenElement.innerText();
    if (!elementText.includes(text)) {
        throw new Error(
            `Текст элемента "${element}" не совпадает. Ожидалось: "${text}", получено: "${elementText}"`
        );
    }

    /*
Шаг для проверки системных сообщений и элементов, которые содержат определенный текст 
На данный момент работает только для локатора "Системное сообщение", так как в нем
записана функция, которая передает в локатор текст из шага при необходимости можно 
изменить название на более универсальное
*/

});

// проверка конкретного элемента в админке, так как комнаты возвращаются массивом
Then('В админке отображается {string}', async function (element) {

    const locator = this.page.locator(pageObjects.locator[element]);

    /* Проверка добавлена для админки, так как для комнат приходит массив 
    элементов и новая созданная комната всегда является первым 
    элементом массива. Такой шаг помогает корректно обрабатывать как 
    единичные локаторы без массива, так и первые в массиве */

    if (await locator.count() > 1) {
        await locator.first().waitFor({ state: 'visible' });
        await expect(locator.first()).toBeVisible();
    } else {
        await locator.waitFor({ state: 'visible' });
        await expect(locator).toBeVisible();
    }
    // await this.page.waitForSelector(locator);
    // await expect(this.page.locator(locator)).toBeVisible();

    /* 
Шаг для проверки отображения только в админке 
так как комнаты приходят массивом и их может быть несколько 
В этом шаге мы проверяем самый первый элемент, так как новая комната 
всегда будет возвращаться первым элементом в массиве 
*/
});

// проверка на доступен/недоступен тестируемый элемент
Then('Элемент {string} {string}', async function (element, state) {
    const locator = pageObjects.locator[element];
    let givenElement = this.page.locator(locator)

    if (state === 'недоступен для нажатия') {
        const cursor = await givenElement.evaluate(el => getComputedStyle(el).cursor);
        expect(cursor).toBe('not-allowed');
    } else if (state === "доступен для нажатия") {
        await expect(givenElement).toBeEnabled();
        const cursor = await givenElement.evaluate(el => getComputedStyle(el).cursor);
        expect(cursor).not.toBe('not-allowed');
    }
})

// Проверка для отобажения и взаимодействия с миниатюрами отправленных файлов и другими элементами
Then('Элемент {string} {string} зарендерился и кликабелен', async function (fileName, activity) {
    const locatorValue = pageObjects.locator['ЛокаторФайла'](fileName);
    const givenElement = this.page.locator(locatorValue);
    const image = givenElement.locator('img');

    if (activity === "успешно") {
        await expect(image).toBeVisible();

        const box = await image.boundingBox();
        const width = box.width;
        const height = box.height;

        await expect(width).toBeGreaterThan(0);
        await expect(height).toBeGreaterThan(0);

        const isClickable = async () => {
            try {
                await image.click({ trial: true });
                return true;
            } catch {
                return false;
            }
        };
        await expect(await isClickable()).toBe(true);
    } else if (activity === "не успешно") {
        await expect(image).not.toBeVisible();
    }
});

Then('Я получаю хедеры запроса {string} и сравниваю с присвоенным токеном', async function (endpoint) {
    // Ищем в заголовках запросов токен, который был сохранён ранее
    const requestHeaders = this.capturedRequests.find(request => request.url.includes(endpoint))?.headers;

    if (!requestHeaders) {
        throw new Error(`Запрос с URL "${endpoint}" не был найден`);
    }

    // Извлекаем токен из заголовков, поле 'x-authorization' может содержать 'Bearer <token>'
    // Разделяем 'Bearer <token>' и получаем только токен
    const tokenFromHeaders = requestHeaders['x-authorization']?.split(' ')[1];

    if (!tokenFromHeaders) {
        throw new Error('Токен не найден в заголовках');
    }

    // Сравниваем токены
    if (this.token !== tokenFromHeaders) {
        throw new Error(`Токен из ответа запроса не совпадает с токеном из заголовков: ${this.token} !== ${tokenFromHeaders}`);
    } else {
        console.log('Токен совпал');
    }
});

Then('Я проверяю верстку {string}', async function (element) {

    // Пробуем найти локатор с указанием проекта (например: "Меню поддержки LEGZO")
    const projectSpecificKey1 = `${element} ${this.project} ${this.env}`;
    const projectSpecificKey2 = `${element} ${this.project}`;

    let locator
    // Генерация локатора с использованием global.generatedMessage
    if (pageObjects.locator[projectSpecificKey1]) {
        locator = pageObjects.locator[projectSpecificKey1];
    } else if (pageObjects.locator[projectSpecificKey2]) {
        locator = pageObjects.locator[projectSpecificKey2];
    } else if (pageObjects.locator[element]) {
        locator = pageObjects.locator[element];
    } else {
        throw new Error(`Локатор не найден ни для "${projectSpecificKey1}", "${projectSpecificKey2}", ни для "${element}"`);
    }

    const givenElement = this.page.locator(locator)

    // Папка для эталонов
    const baselineDir = path.resolve('visual-baseline');
    if (!fs.existsSync(baselineDir)) {
        fs.mkdirSync(baselineDir);
    }

    const screenshotPath = path.join(baselineDir, `${element} ${this.project} ${this.env} ${this.device}.png`);
    const currentImage = await givenElement.screenshot();

    if (!fs.existsSync(screenshotPath) || process.env.UPDATE_SNAPSHOTS === '1') {
        // Сохраняем эталон, если его нет или если явно попросили обновить
        fs.writeFileSync(screenshotPath, currentImage);
        console.log(`📸 Сохранён эталон: ${screenshotPath}`);
        return;
    }

    // Сравнение
    const baselineImage = PNG.sync.read(fs.readFileSync(screenshotPath));
    const currentImageParsed = PNG.sync.read(currentImage);

    if (
        baselineImage.width !== currentImageParsed.width ||
        baselineImage.height !== currentImageParsed.height
    ) {
        throw new Error(`Размеры скриншота не совпадают с эталоном для ${element}`);
    }

    const diff = new PNG({ width: baselineImage.width, height: baselineImage.height });

    const mismatchedPixels = pixelmatch(
        baselineImage.data,
        currentImageParsed.data,
        diff.data,
        baselineImage.width,
        baselineImage.height,
        { threshold: 0.1 }
    );

    if (mismatchedPixels > 0) {
        const diffPath = path.join(baselineDir, `${element} ${this.project} ${this.env} ${this.device}-diff.png`);
        fs.writeFileSync(diffPath, PNG.sync.write(diff));
        // Прикрепляем текущий эталон и diff именно для этого шага
        this.currentBaseline = screenshotPath;  // путь эталона
        this.currentDiff = diffPath;
        throw new Error(
            `Скриншот не совпадает с эталоном! См. diff: ${diffPath} (${mismatchedPixels} отличий)`
        );
    }

    console.log(`✅ Скриншот совпал с эталоном: ${element}`);
})










