import { When } from '@cucumber/cucumber';
import { pageObjects } from '../../page_objects/pageObjects.js';

// const locator = this.resolveLocator(element);



// Шаг для открытия саппорта по прямой ссылке (основной для работы тестов) 
When('Я открываю саппорт', async function () {

    const postfix = "/support/chat"
    const siteName = `${this.project} ${this.env}`;
    const mainUrl = pageObjects.url[siteName];

    const baseUrl = mainUrl.split('/sign')[0];
    const siteUrl = baseUrl + postfix


    await this.page.goto(siteUrl, { waitUntil: 'domcontentloaded' }); // Переходим на указанный URL
});

// Шаг для ожидания полной загрузки всей страницы - картинки, скрипты, стили
When('Я жду полной загрузки страницы', async function () {
    // дождаться события полной загрузки
    // load — страница и все ресурсы (картинки, скрипты, стили) загружены.
    await this.page.waitForLoadState('load');

});

// заполняю элемент данными в определенном месте (из за общих названий локаторов)
When('Я заполняю {string} данными {string}', async function (element, initValue) {

    const locator = this.resolveLocator(element);

    const projectSpecificKey1 = `${initValue} ${this.project} ${this.env}`;
    const projectSpecificKey2 = `${initValue} ${this.project}`;
    let givenValue

    if (initValue === 'Тестовое сообщение') {
        givenValue = this.generateMessage(); // Генерация сообщения  
    }
    else if (pageObjects.value[projectSpecificKey1]) {
        givenValue = pageObjects.value[projectSpecificKey1]
    } else if (pageObjects.value[projectSpecificKey2]) {
        givenValue = pageObjects.value[projectSpecificKey2]
    } else if (pageObjects.value && pageObjects.value[initValue]) {
        givenValue = pageObjects.value[initValue]; //Используеться указанное значение, если в initValue было передано не "Тестовое сообщение"
    } else {
        givenValue = initValue
    }

    await this.page.fill(locator, givenValue);
});

// Нажатие на определенный элемент
When('Я нажимаю на {string}', async function (element) {

    const locator = this.resolveLocator(element);
    await this.page.click(locator);

});

// Шаг для нажатия по локатором, которые можно найти по содержащемуся в них тексту
When('Я нажимаю на {string} с текстом {string}', async function (element, text) {

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
    const locator = this.page.locator(locatorValue);


    await locator.click();

    /*
Шаг для проверки системных сообщений и элементов, которые содержат определенный текст 
На данный момент работает только для локатора "Системное сообщение", так как в нем
записана функция, которая передает в локатор текст из шага при необходимости можно 
изменить название на более универсальное
*/

});

// Ожидание появления/скрытия элемента для прохождения дальнейших шагов
When('Я ожидаю, что {string} {string}', async function (element, activity) {

    const locator = this.resolveLocator(element);
    const givenElement = this.page.locator(locator)

    if (activity === 'отображается') {
        // Ожидаем, что хотя бы один элемент станет видимым
        await givenElement.first().waitFor({ state: 'visible' });
    } else if (activity === 'не отображается') {
        await this.page.waitForTimeout(5000);
        const count = await givenElement.count(); // сколько элементов
        for (let i = 0; i < count; i++) {
            await givenElement.nth(i).waitFor({ state: 'hidden' }); // каждый должен быть скрыт
        }
    }
});

// Ожидание отображения локатора с определенным текстом
When('Я ожидаю, что {string} с текстом {string} {string}', async function (element, text, activity) {

    let locatorValue;

    // Проверяем, является ли локатор функцией или строкой
    if (typeof pageObjects.locator[element] === 'function') {
        locatorValue = pageObjects.locator[element](text); // Если функция, вызываем с аргументом text
    } else {
        locatorValue = pageObjects.locator[element]; // Если строка, используем как есть
    }
    const locator = this.page.locator(locatorValue);

    if (activity === 'не отображается') {
        await locator.waitFor({ state: 'hidden' });
    } else if (activity === 'отображается') {
        await locator.waitFor({ state: 'visible' });
    }

});

// Шаг для перезагрузки страницы
When('Я перезагружаю текущую страницу', async function () {
    await this.page.reload({ waitUntil: 'domcontentloaded' })
});

// Шаг для указания ожидания в секундах 
When('Я жду {string} секунд\\(ы)', { timeout: 500 * 1000 }, async function (seconds) {
    const milliseconds = Number(seconds) * 1000
    await this.page.waitForTimeout(milliseconds);
});

// Шаг для открытия страницы в новой вкладке текущего браузера
When('Я открываю {string} в новой вкладке', async function (location) {

    const siteUrl = pageObjects.url[`${location} ${this.cluster} ${this.env}`]; // Получаем URL

    await this.openNewTab();
    await this.newPage.goto(siteUrl); // Переходим на указанный URL
    this.page = this.newPage; // Устанавливаем новую вкладку как текущую

});

// Возвращение на указанную вкладку
When('Я возвращаюсь на {string} вкладку', async function (currentPage) {
    const pages = await this.page.context().pages(); // Получаем список вкладок
    let pageIndex;
    if (currentPage === 'первую') {
        pageIndex = 0
    } else if (currentPage === 'вторую') {
        pageIndex = 1
    } else {

    };
    this.page = pages[pageIndex]; // Устанавливаем вторую вкладку как текущую
    await this.page.bringToFront(); // Переходим в нужную вкладку
});

// Шаг для скролла в зону элемента 
When('Я скроллю до {string}', async function (element) {

    const locator = this.page.locator(this.resolveLocator(element));
    const count = await locator.count()

    if (count > 0) {
        await locator.scrollIntoViewIfNeeded();
    } else {
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight)
        })
        await this.page.waitForTimeout(500)
    }
});

// Ручной скролл вниз 
When('Я скроллю вниз', async function () {

    await this.page.mouse.wheel(0, 5000);

});

// Шаг для загрзуки файлов через системное окно 
When('Я загружаю файл {string} в {string}', async function (filePath, element) {

    const fileInput = this.page.locator(this.resolveLocator(element));

    await fileInput.setInputFiles(filePath);
});

// Шаг для наведения курсора на элемент 
When('Я навожу на {string}', async function (element) {

    const locator = this.page.locator(this.resolveLocator(element));

    await locator.hover();

});

// Шаг для получения данных из ответа любого запроса в формате JSON 
When('Я отслеживаю и получаю ответ запроса {string}', async function (endpoint) {
    this.token = null;

    this.page.on('response', async (response) => {
        const url = response.url();
        if (url.includes(endpoint)) {
            try {
                const json = await response.json();
                if (json?.data?.token) {
                    /*
                    В файла world можно добавить любой параметр, который нам необходимо
                    распарсить и найти в ответе (пример this id = null), после добавления 
                    в world прописать сюда ниже и в начало то, что требуется достать из ответа, 
                    например this id - json.data.id и использовать в дальнейшем
                    */
                    this.token = json.data.token;
                    //console.log("Токен из зпроса ", this.token)
                }
            } catch (e) {
                console.error('Ошибка при парсинге данных:', e);
            }
        }
    });
});

// Шаг для мобильных проверок - открывает админку в новом брузере нормального размера
When('Я открываю {string} в новом браузере', async function (location) {

    const siteName = `${location} ${this.cluster} ${this.env}`;
    const siteUrl = pageObjects.url[siteName]; // Получаем URL

    // Открытие нового браузера для desktop
    await this.openWebBrowser();

    // Переход на нужную страницу
    await this.desktopPage.goto(siteUrl);

    // Переключаемся на открытую десктопную страницу
    this.switchToDesktop();
});

// Шаг для мобильных проверок-  переключение между открытыми браузерами (мобильным и нормального размера)
When('Я переключаюсь на {string} браузер', async function (target) {
    if (target === 'мобильный') {
        this.switchToMobile();
    } else if (target === 'десктопный') {
        this.switchToDesktop();
    }
});

// Шаги для технических кейсов 
// ----------------------------------------------------------------------------------

// Шаг для активации чек-боксов в админке с проверкой активирован/неактивирован
When('Я активирую {string}', async function (elementName) {
    const wrapperLocator = pageObjects.locator[elementName];
    const wrapper = this.page.locator(wrapperLocator);

    // находим input внутри чекбокса
    const checkboxInput = wrapper.locator('input[type="checkbox"]');

    await checkboxInput.waitFor({ state: 'attached' });

    const isChecked = await checkboxInput.isChecked();

    if (!isChecked) {
        await wrapper.click();
        console.log(`[INFO] Чекбокс "${elementName}" был неактивен — кликаем.`);
    } else {
        console.log(`[INFO] Чекбокс "${elementName}" уже активирован — пропускаем клик.`);
    }
});

// Шаг для деактивации чек-боксов в админке
When('Я деактивирую {string}', async function (elementName) {
    const wrapperLocator = pageObjects.locator[elementName];
    const wrapper = this.page.locator(wrapperLocator);

    // находим input внутри чекбокса
    const checkboxInput = wrapper.locator('input[type="checkbox"]');

    await checkboxInput.waitFor({ state: 'attached' });

    const isChecked = await checkboxInput.isChecked();

    if (isChecked) {
        await wrapper.click();
        console.log(`[INFO] Чекбокс "${elementName}" был активен — кликаем, чтобы деактивировать`);
    } else {
        console.log(`[INFO] Чекбокс "${elementName}" уже деактивирован — пропускаем клик.`);
    }
});

// Шаг для ввода в input указанного значения в шаге 
When('Я ввожу в {string} {string}', async function (element, initValue) {

    const input = this.page.locator(this.resolveLocator(element));

    let givenValue;

    if (initValue === 'Тестовое сообщение') {
        givenValue = this.generateMessage();
    } else if (pageObjects.value && pageObjects.value[initValue]) {
        givenValue = pageObjects.value[initValue];
    } else {
        givenValue = initValue;
    }

    // Получаем текущее значение поля
    const currentValue = await input.inputValue();

    // Если значение уже "1", то ничего не делаем
    if (currentValue === '1') {
        return;
    }

    // Иначе — заполняем новым значением
    await input.fill(givenValue);
});

// Нажатие на элемент админки (сделан из за не самой очевидной реализации элемента)
When('Я жму на {string}', async function (element) {

    const button = this.page.locator(this.resolveLocator(element));

    const ariaDisabled = await button.getAttribute('aria-disabled');
    const Disabled = await button.getAttribute('disabled');

    if (ariaDisabled !== 'true') {
        await button.click();
    } else {
        console.log(`[INFO] Кнопка "${element}" отключена (aria-disabled="true"), пропускаем клик.`);
    }
});
