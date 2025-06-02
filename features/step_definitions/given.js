import { Given } from '@cucumber/cucumber';
import * as dotenv from 'dotenv';
dotenv.config();
import { pageObjects } from '../../page_objects/pageObjects.js';


Given('Я нахожусь на странице {string}', async function (siteName) {
  const siteUrl = pageObjects.url[siteName];

  // Если еще нет браузера, открываем новый
  if (!this.page) {
    if (process.env.DEVICE === 'mobile') {
      await this.openMobileBrowser();
      await this.mobilePage.goto(siteUrl, { waitUntil: 'domcontentloaded' });
    } else {
      await this.openWebBrowser();
      await this.page.goto(siteUrl, { waitUntil: 'domcontentloaded' });
    }
  } else {
    // Если браузер уже открыт, просто переходим на нужный сайт
    await this.page.goto(siteUrl, { waitUntil: 'domcontentloaded' });
  }
});



