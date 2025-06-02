import * as dotenv from 'dotenv';
dotenv.config();

export const mbssLocator = {

        // Локаторы  в виджете
        'Виджет MBSS': '//*[@id="mbss-main-view"]',
        'Активатор': '//*[@class="activator-button"]',
        'Сворачивание виджета': '//*[@id="mbss-collapse-view-btn"]',
        'Возобновить чат': '//*[@id="mbss-bottom-action-btn"]',      
        'Аватар оператора': '//*[@id="mbss-avatar-manager"]',
        'Каунтер': '//*[@id="mbss-text-message-counter"]',
        'Имя оператора': '//*[@id="mbss-action-bar-heading"]',
        'Прикрепить': '//*[@id="mbss-attach-btn"]',
        "Запрос звонка": '//*[@id="mbss-call-btn-in-action-bar"]',
        "Запросить":  '//*[@id="mbss-request-btn-in-action-bar"]',
        "Отменить запрос": '//*[@id="mbss-cancel-call-btn-in-action-bar"]',
        "Закрыть форму загрузки": '//*[@id="mbss-close-button-for-attach-files"]',
        "Загрузить еще": '//*[@id="mbss-load-more-button-for-attach-files"]',
        "Отправить с дополнениями": '//*[@id="mbss-send-button-for-attach-files"]',
        "Поле ввода сообщения в форме загрузки": '//*[@id="mbss-input-for-attach-files"]',
        "Далее в пре-форме": '//div[@id="mbss-bottom-action-btn" and .//span[text()="Далее"]]',
        "Начать чат": '//div[@id="mbss-bottom-action-btn" and .//span[text()="Начать чат"]]',
        'Заголовок-заглушка хедера': '//*[@id="mbss-action-bar-heading"]',
        'Аватар-заглушка хедера': '//*[@id="mbss-avatar-manager"]',
        'Отправку сообщения в виджете': '//*[@id="mbss-send-message-btn"]',
        'Поле ввода сообщения в виджете': '//*[@id="mbss-message-text-input"]',
        'Закрыть комнату в виджете': '//*[@id="mbss-close-chat-btn"]',
        'Кнопка подтверждения в виджете': '//*[@id="mbss-close-confirmation-btn"]',

        //Локаторы пре-формы
        "Обязательный вопрос пре-формы Legzo": '//*[@data-message-id="38" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы Legzo": '//*[@data-message-id="38_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы Legzo": '//*[@data-message-id="38_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы Legzo": '//*[@data-message-id="39" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы Legzo": '//*[@data-message-id="39_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы Legzo": '//*[@data-message-id="39_1" and .//span[text()="Ответ 4"]]',
        
        "Обязательный вопрос пре-формы FRESH": '//*[@data-message-id="40" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы FRESH": '//*[@data-message-id="40_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы FRESH": '//*[@data-message-id="40_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы FRESH": '//*[@data-message-id="41" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы FRESH": '//*[@data-message-id="41_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы FRESH": '//*[@data-message-id="41_1" and .//span[text()="Ответ 4"]]',

        // Функциональные локаторы 
        'Локатор': (text) => `//*[text()="${text}"]`,
        'Спецсимвольное сообщение': (text) => `text=${text}`,
        'ЛокаторФайла': (fileName) => `//*[img and normalize-space(.)="${fileName}"]`,
        'Отправленное изображение': '//img[contains(@src, ".jpg")]', //Проверяю первый отображаемый локатор(так как может )

};











