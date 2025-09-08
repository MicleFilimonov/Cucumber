import { setWorldConstructor } from '@cucumber/cucumber';
import { devices, chromium } from 'playwright';

const isMobile = process.env.DEVICE === 'mobile';
const mobileDevice = devices['iPhone 13 Pro'];

class World {
  constructor({ attach }) {
    this.mobileBrowser = null; // Экземпляр мобильного браузера
    this.mobileContext = null; // Контекст мобильного браузера
    this.mobilePage = null; // Вкладка мобильного браузера 
    this.browser = null; // Экземпляр браузера
    this.page = null; // Текущая вкладка
    this.newPage = null; // Новая вкладка 
    this.consoleLogs = []; // Массив для сбора логов консоли бразуера
    this.generatedMessage = ''; // Переменная для хранения сообщения
    this.token = null; // Определение токена
    this.requestHeaders = null; //Опреление заголовков
    this.capturedRequests = [] // Массив для хранения реквестов
    this.attach = attach; // Определение прикрепленных файлов для отчета
    this.project = (process.env.PROJECT || '').toUpperCase();//переменная проекта для скрипта запуска
    this.env = (process.env.ENV || '').toUpperCase();//переменная окружения для скрипта запуска
    this.device = (process.env.DEVICE || 'web').toLowerCase();//переменная устройства для скрипта запуска
    this.cluster = (process.env.CLUSTER || 'MBSS').toUpperCase();//переменная кластера для скрипта запуска

  }

  // Инициализация бразуера в мобильном разрешении (изменяется в завимисости от указанного устройства)
  async openMobileBrowser() {
    // Инициализация экземпляра браузера
    this.mobileBrowser = await chromium.launch({ headless: false });
    // Инициализация контекста браузера (передаем константу mobileDevice для мобильной версии)
    this.mobileContext = await this.mobileBrowser.newContext({
      ...mobileDevice
    });
    // Инициализация страницы в браузере
    this.mobilePage = await this.mobileContext.newPage();
    this.page = this.mobilePage;
    this.attachPageListeners(this.mobilePage); // подкдючение листенеров для снятия данных

  }

  // Инициализация бразуера в разрешении 1366х768
  async openWebBrowser() {
    this.desktopBrowser = await chromium.launch({ headless: false });
    this.desktopContext = await this.desktopBrowser.newContext({
      viewport: { width: 1366, height: 768 }
    });
    this.desktopPage = await this.desktopContext.newPage();
    this.page = this.desktopPage;
    this.browser = this.desktopBrowser;
    // не переключаемся сразу, можно вручную через шаг
    this.attachPageListeners(this.desktopPage); // подкдючение листенеров для снятия данных
  }

  // Открытие новой вкладки в текущем окне браузера
  async openNewTab() {
    const desktopContext = await this.browser.newContext(); // новый контекст
    this.desktopContext.setDefaultTimeout(50 * 1000);
    this.newPage = await this.desktopContext.newPage(); // новая веб-вкладка
    this.attachPageListeners(this.newPage);// подключение листенеров для снятия данных 
  }

  //Закрытие вкладки в текущем окне браузера
  async closeNewTab() {
    if (this.newPage) {
      await this.newPage.close(); // Закрываем открытую ранее вкладку
      this.newPage = null;
    }
  }

  // Переключение фокуса на мобильный браузер
  switchToMobile() {
    this.page = this.mobilePage;
  }

  // Переключение фокуса на веб браузер (1366х768)
  switchToDesktop() {
    this.page = this.desktopPage;
  }

  //Закрытие всех браузеров
  async closeBrowsers() {
    if (this.mobileBrowser) await this.mobileBrowser.close();
    if (this.desktopBrowser) await this.desktopBrowser.close();
  }

  // Генерация тестового сообщения
  generateMessage() {
    const dateNow = new Date().getTime();
    this.generatedMessage = `Тестовое сообщение ${dateNow}`;
    global.generatedMessage = this.generatedMessage;
    return this.generatedMessage;
  }

  attachPageListeners(page) {

    if (!page) return
    // Подписка на события в консоле браузера при работе теста 
    page.on('console', msg => {
      const type = msg.type().toUpperCase();
      const text = msg.text();
      const { url, lineNumber, columnNumber } = msg.location()
      // Покраска для наглядности 
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
    page.on('requestfinished', (request) => {
      const headers = request.headers();  // Получаем заголовки запроса
      this.capturedRequests.push({
        url: request.url(),
        headers
      });  // Сохраняем URL и хедеры запроса
    });
  }

}


setWorldConstructor(World);
