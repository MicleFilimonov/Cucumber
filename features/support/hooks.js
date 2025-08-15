import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';

let page;


Before(async function () {
  this.capturedRequests = [];

  if (process.env.DEVICE === 'mobile') {
    await this.openMobileBrowser();
  } else {
    await this.openWebBrowser();
  }

  this.page.setDefaultTimeout(50 * 1000)//Рабочий таймаут

  // Подписка на события в консоле браузера при работе теста 
  this.page.on('console', msg => {
    const type = msg.type().toUpperCase();
    const text = msg.text();
    const { url, lineNumber, columnNumber } = msg.location()
    // Покарска для наглядности 
    let color;
    if (type === 'ERROR') color = 'red';
    else if (type === 'WARNING') color = 'orange';
    else color = 'black';
    if (type === 'WARNING' || type === 'ERROR' || type === 'INFO' || type === 'LOG') {
      this.consoleLogs.push(
        `<span style="color:${color}">[${type}] ${text} : (${url}:${lineNumber}:${columnNumber})</span>`
      );
    }
  });


  //Подписка на получение хедеров запроса для последующей проверки 
  this.page.on('requestfinished', (request) => {
    const headers = request.headers();  // Получаем заголовки запроса
    this.capturedRequests.push({
      url: request.url(),
      headers
    });  // Сохраняем URL и хедеры запроса
  });
});


After(async function (scenario) {


  // Прикрепление скриншотов к отчету в случае, если тест упал
  /*
  Описание - проверяется условием на то, выполнился ли тест, и в случае, если 
  тест упал (получил статус FAILED), то последовательно происходят следующие действия
  1. Создание папки со скриншотами, если таковая отсутствует 
  2. Создание пути сохранения скриншота с присваиваение уникального имени 
  3. Создание самого скриншота 
  4. Прикрепление через attach скриншота к отчету
   */
  if (scenario.result.status === 'FAILED') {

    // Прикрепление логов консоли к отчету 
    /*
    Описание - проверяется условием на то, пустой ли массив, который должен
    хранить логи браузера, и в случае, если массив не пустой, то срабатывает 
    функция cucumber attach, которая крепит логи в отчету. 
     */
    if (this.consoleLogs.length > 0) {
      await this.attach(
        '===== Логи консоли браузера =====\n' + this.consoleLogs.join('\n'),
        'text/plain'
      );
    }

    // Создаем папку для скриншотов, если ее нет
    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots');
    }
    //Генерация пути сохранения скриншота с уникальным именем
    const screenshotPath = path.join(
      'screenshots',
      `${scenario.pickle.name.replace(/\s+/g, '_')}_${Date.now()}.png`
    );
    // Делаем скриншот
    try {
      if (this.page) {
        await this.page.screenshot({
          path: screenshotPath,
          timeout: 5000,
          animations: 'disabled',
          waitForFonts: false
        });

        const screenshotData = fs.readFileSync(screenshotPath);
        await this.attach(screenshotData, 'image/png');
      }
    } catch (err) {
      console.error('Ошибка при создании скриншота:', err);
    }
  }

  //Закрытие браузера
  await this.closeBrowsers();
});

export { page };