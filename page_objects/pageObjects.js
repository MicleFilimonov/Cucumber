import * as dotenv from 'dotenv';
dotenv.config();
import { mbssLocator } from './mbssLocators.js'
import { value } from './values.js'
import { siteLocator } from './sitePageLocators.js'
import { url } from './urls.js'
import { adminLocator } from './adminLocators.js'
import { messengerLocator } from './messengerLocators.js';

export const pageObjects = {
    /* 
    сюда имопртировать новые файлы с данными при их появлении
    указывать через запятую - указывать название переменной
    */
    locator: {
        ...mbssLocator,
        ...siteLocator,
        ...adminLocator,
        ...messengerLocator
    },
    value: {
        ...value
    },
    url: {
        ...url
    }
};
