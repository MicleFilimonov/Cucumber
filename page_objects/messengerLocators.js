import * as dotenv from 'dotenv';
dotenv.config();


export const messengerLocator = {
    
    'Колокольчик':'//*[@id="messenger_button"]',
    'Окно мессенджера':'//*[@id="messenger-dropdown"]',
    'Закрыть мессенджер':'//*[@data-test="messenger_close"]',
    'Категория Предложения':'//*[@data-test="messenger_offers_tab"]',
    'Категория Системные':'//*[@data-test="messenger_system_tab"]',
    'Очистить список':'//*[@data-test="messenger_clear_list"]',
    'Прочитать список':'//*[@data-test="messenger_read_list"]',
    'Плейсхолдер':'//div[text() = "Нет входящих сообщений"]',
    
};
