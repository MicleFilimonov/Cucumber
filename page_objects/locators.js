import * as dotenv from 'dotenv';
dotenv.config();


export const pageObjects = {

    locator: {
        // Локаторы сайта 
        'Кнопка входа': '//*[@data-test="main_signin"]',
        'Поле почты': '//*[@data-test="email_field"]',
        'Поле пароля': '//*[@data-test="password-field"]',
        'Кнопка авторизации': '//*[@data-test="auth-form-btn"]',
        'Окно кассы': '//div[@data-test="payment-modal_deposit-form"]',
        'Оверлей кассы': '//div[@id="popup-deposit"]',
        'Закрыть кассу': '//div[@data-test="modal_close"]',
        'Закрыть кассу Fresh': '//div[@data-test="modal-close"]',
        
        // локаторы MBSS
        'Виджет MBSS': '//*[@id="mbss-main-view"]',
        'Активатор': '//*[@class="activator-button"]',
        'Сворачивание виджета': '//*[@id="mbss-collapse-view-btn"]',
        'Отправку сообщения': '//*[@id="mbss-send-message-btn"]',
        'Поле ввода сообщения': '//*[@id="mbss-message-text-input"]',
        'Закрытие комнаты': '//*[@id="mbss-close-chat-btn"]',
        'Кнопку подтверждения': '//*[@id="mbss-close-confirmation-btn"]',
        'Восстановить чат': '//*[@id="mbss-bottom-action-btn"]',
        'Тестовое сообщение': '//*[contains(text(),"Тестовое сообщение")]'
    },
    value: {
        'Игрока Легзо': process.env.USER_EMAIL_LEGZO,
        'Игрока Джет': process.env.USER_EMAIL_JET,
        'Игрока Фреш': process.env.USER_EMAIL_FRESH,
        'Игрока Сол': process.env.USER_EMAIL_SOL,
        'Пароль Игрока Легзо': process.env.USER_PASSWORD_LEGZO,
        'Пароль Игрока Джет': process.env.USER_PASSWORD_JET,
        'Пароль Игрока Фреш': process.env.USER_PASSWORD_FRESH,
        'Пароль Игрока Сол': process.env.USER_PASSWORD_SOL,
        'Тестовое сообщение': 'Тестовое сообщение'
    },
    sitePages: {
        'LEGZO DEV': process.env.LEGZO_DEV,
        'JET DEV': process.env.JET_DEV,
        'FRESH DEV': process.env.FRESH_DEV,
        'SOL DEV': process.env.SOL_DEV,
        'STARDA DEV': process.env.STARDA_DEV,

        'LEGZO DEV': process.env.LEGZO_STAGE,
        'JET DEV': process.env.JET_STAGE,
        'FRESH DEV': process.env.FRESH_STAGE,
        'SOL DEV': process.env.SOL_STAGE,
        'STARDA DEV': process.env.STARDA_STAGE,

        'LEGZO DEV': process.env.LEGZO_PROD,
        'JET DEV': process.env.JET_PROD,
        'FRESH DEV': process.env.FRESH_PROD,
        'SOL DEV': process.env.SOL_PROD,
        'STARDA DEV': process.env.STARDA_PROD,
    },
    adminPage: {
        'Админка DEV': process.env.ADMIN_PANEL_DEV,
        'Админка STAGE': process.env.ADMIN_PANEL_DEV,
        'Админка PROD': process.env.ADMIN_PANEL_DEV
    }

};
