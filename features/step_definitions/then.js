import { Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageObjects } from '../../page_objects/pageObjects.js';
import fs from 'fs';
import path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import sharp from 'sharp';

// вижу или не вижу какой то элемент 
Then('Я {string} {string}', async function (activity, element) {

    const locator = this.resolveLocator(element);
    const givenElement = this.page.locator(locator)

    if (activity === 'не вижу') {
        await expect(givenElement).not.toBeVisible();

    } else if (activity === "вижу") {
        await expect(givenElement).toBeVisible();
        await givenElement.hover({ timeout: 5000 });
    }
})

// вижу или не вижу элемент 1 и элемент 2
Then('Я {string} {string} и {string}', async function (activity, element1, element2) {

    const locator1 = this.resolveLocator(element1);
    const locator2 = this.resolveLocator(element2);
    const givenElement1 = this.page.locator(locator1)
    const givenElement2 = this.page.locator(locator2)

    if (activity === 'не вижу') {
        await expect(givenElement1).not.toBeVisible();
        await expect(givenElement2).not.toBeVisible();

    } else if (activity === "вижу") {
        await expect(givenElement1).toBeVisible();
        await expect(givenElement2).toBeVisible();
        await expect(givenElement1).toBeEnabled();
        await expect(givenElement2).toBeEnabled();
        await givenElement1.hover({ timeout: 5000 });
        await givenElement2.hover({ timeout: 5000 });

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

    // Такая конструкция (через page.locator) нужна для получения кол-ва значений что 
    // бы далее вызвать метод count
    const locator = this.page.locator(this.resolveLocator(element));

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
    const locator = this.resolveLocator(element);
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

// Проверка полученных хедеров в запросе (прямой сравнение)
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

// Шаг для тестировани верстки элемента
Then('Я проверяю верстку {string}', async function (element) {

    const locator = this.resolveLocator(element);
    //Складываем полученный элемент в переменную, к которой будем обращаться в дальнейшем
    const givenElement = this.page.locator(locator)

    await expect(givenElement).toBeVisible();
    /*
    Далее складываем путь к папке, в которой будут сохраняться эталоны при необходимости 
    и скриншоты для сравнения при тестировании 
    В случае, если папки нету - условие if создает такую папку 
    */
    const baselineDir = path.resolve('visual-baseline');
    if (!fs.existsSync(baselineDir)) {
        fs.mkdirSync(baselineDir);
    }

    /*
    Создание имени для будущего скриншота 
    В аргументах к join передается: 
    - путь к папке 
    - имя, состоящее из названия локатора, проекта, окружения и платформы
    - разрешение .png
    */
    const screenshotPath = path.join(baselineDir, `${element} ${this.project} ${this.env} ${this.device}.png`);

    // Складываем в переменную текущий скриншот, сделанный с помощью команды screenshot()
    let currentImage
    if (this.device === 'MOBILE') {
        currentImage = await givenElement.screenshot()
    } else if (this.device === 'WEB') {
        const box = await givenElement.boundingBox();
        if (!box) {
            throw new Error(`Элемент "${element}" не имеет размеров.`);
        }

        // Делаем скриншот всей страницы
        const fullPageImage = await this.page.screenshot();
        // Обрезаем скриншот с помощью Sharp, используя точные координаты
        currentImage = await sharp(fullPageImage)
            .extract({
                left: Math.round(box.x),
                top: Math.round(box.y),
                width: Math.round(box.width),
                height: Math.round(box.height)
            })
            .toBuffer();
    }
    // Получаем точные координаты элемента



    /* 
    Условие говорит о том, что если скриншот c таким имененм отсутствует, 
    или явно было запрошено обновить эталоны, то мы сохраняем скриншот без сравнения 
    Это условие обязательно, так как оно проверяет наличие эталонных скринов, которые создаются 
    при первичном прогоне кейсов с этим шагом 
    Если эталон есть - читает информацию из него
    */
    if (!fs.existsSync(screenshotPath) || process.env.UPDATE_SNAPSHOTS === '1') {
        fs.writeFileSync(screenshotPath, currentImage);
        console.log(`📸 Сохранён эталон: ${screenshotPath}`);
        return;
    }
    const baselineImage = PNG.sync.read(fs.readFileSync(screenshotPath));
    const currentImageParsed = PNG.sync.read(currentImage);

    // Сравнение высоты и ширины скриншота, ошибка и падение теста, если не совпадают
    if (
        baselineImage.width !== currentImageParsed.width ||
        baselineImage.height !== currentImageParsed.height
    ) {

        // Сохраняем текущее изображение элемента для дебага
        const currentPath = path.join(
            baselineDir,
            `${element} ${this.project} ${this.env} ${this.device}-current.png`
        );
        fs.writeFileSync(currentPath, currentImage);

        // Сохраняем пути для After-хука, что бы скрины прикрепились к отчету 
        this.currentBaseline = screenshotPath;
        this.currentDiff = currentPath;

        throw new Error(
            `Размеры скриншота не совпадают с эталоном для ${element}. ` +
            `Эталон: ${baselineImage.width}x${baselineImage.height}, ` +
            `Текущий: ${currentImageParsed.width}x${currentImageParsed.height}`
        );
    }

    /*
    Создание скриншота DIFF - карты отличий между эталоном и сделанным скриншотом
    такого же размера, как и эталон и последующий вызов pixelmatch 
    */
    const diff = new PNG({ width: baselineImage.width, height: baselineImage.height });

    // Записывает параметры сделанного скриншота для последующего сравнения
    const mismatchedPixels = pixelmatch(
        baselineImage.data,
        currentImageParsed.data,
        diff.data,
        baselineImage.width,
        baselineImage.height,
        // для UI тестов параметр от 0.1 до 0.15, не выше
        { threshold: 0.15 }
    );


    /*
    Далее проверка на отклонение 
    Если "промахнувшихся" пикселей больше 0, то происходит создание (запись) текущего скриншота 
    под новым именем с суффиксом diff и задаются имена для прекрепления в отчет посредством 
    after хука
    */
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
