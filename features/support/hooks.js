import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';

setDefaultTimeout(60 * 1000); // Установка таймаута для шагов теста
let page;


Before(async function () {
    this.capturedRequests = [];

    if (process.env.DEVICE === 'mobile') {
        await this.openMobileBrowser();
      } else {
        await this.openWebBrowser();
      }

    this.page.on('requestfinished', (request) => {
        const headers = request.headers();  // Получаем заголовки запроса
        this.capturedRequests.push({
            url: request.url(),
            headers
        });  // Сохраняем URL и хедеры запроса
    });
});


After(async function (scenario) {
    if (scenario.result.status === 'FAILED') {
        // Создаем папку для скриншотов, если ее нет
        if (!fs.existsSync('screenshots')) {
            fs.mkdirSync('screenshots');
        }

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
