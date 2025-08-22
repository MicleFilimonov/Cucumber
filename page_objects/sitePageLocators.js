import * as dotenv from 'dotenv';
dotenv.config();

export const siteLocator = {

        // COMMON
        'Окно кассы': '//div[@data-test="payment-modal_deposit-form"]',
        'Оверлей кассы': '//div[@id="popup-deposit"]',
        'Закрыть кассу': '//div[@data-test="modal_close"]',
        'Закрыть кассу Fresh': '//div[@data-test="modal-close"]',
        'Контакты': '//*[@data-test="footer-contacts-link"]',
        'Начать чат в контактах': '//*[@data-test="contacts_chat"]',
        
        'Кнопка входа на сайте': '//*[@data-test="main_signin"]',
        'Поле почты на сайте': '//*[@data-test="email_field"]',
        'Поле пароля на сайте': '//*[@data-test="password-field"]',
        'Кнопка авторизации на сайте': '//*[@data-test="auth-form-btn"]',
        'Закрыть модалку': '//*[@data-test="modal-close"]',
        'Иконка мессенджера': '//*[@id="top-bar-messenger-btn-icon"]',
        'Меню поддержки': '//*[@data-test="top-menu-support"]',
        'MBSS поддержка': '//*[@data-test="support-livechat"]', //Вероятно с раскаткой MBSS измениться - проверить после полной интеграции на всех проектах

        'Активатор': '//*[@class="activator-button"]',
        'Лого сайта': '//*[@data-test="logo_casino"]',


        // MOBILE
        'Ботом меню моб': '//*[@data-test="bottom_menu-home"]',
        'Пункт поддержка моб': '//*[@data-test="top-menu-support"]', 
        'MBSS моб': '//*[@data-test="support-livechat"]', 

        //LEGZO
        'Боковое меню': '//*[@data-test="menu"]',
        'Меню поддержки LEGZO': '(//*[@data-test="submenu-item" and contains(@class, "support")])[2]',
        'MBSS поддержка LEGZO': '(//*[@data-test="support-livechat"])[2]', //Вероятно с раскаткой MBSS измениться - проверить после полной интеграции на всех проектах

        // FRESH
        'MBSS поддержка FRESH': '//*[@data-test="support-livechat"]',

        // ROX
        'Поле пароля на сайте ROX': '//*[@data-test="passwd_field"]',
        'Боковое меню ROX': '//*[@id="hamburger"]',
        'Меню информации ROX': '//*[text()="информация"]',
        'Контакты ROX': '//li[@class="footer-menu__li"]//*[text()="контакты"]',
        'Меню поддержки ROX': '//*[@class="multipl-list multipl-list--support"]',
        'MBSS поддержка ROX': '//*[text()="связаться через чат"]',
        'Активатор ROX': '//div[@class="main-top-line__help-chat"]',


        //MARTIN 
        'Виджет MARTIN': '//div[@class="support-widget__button"]',
        'Боковое меню MARTIN': '//div[@class="top-bar__burger flex-center"]',
        'Начать чат в контактах MARTIN': '//a[@href="/ru/support/chat"]',
        'Активатор MBSS MARTIN': '//span[@class="support-widget__item-wr"]//*[@class="icon support-widget__item-icon"]',
        'MBSS поддержка MARTIN': '//div[contains(@to,"/support/chat")]',

        // VOLNA 
        'Поле пароля на сайте VOLNA': '//*[@data-test="passwd_field"]',
        'Активатор VOLNA': '//a[@class="live_chat"]',
        'Контакты ROX': '//li[@class="list__item"]//a[normalize-space(.)="Контакты"]',


        // 1GO 
        'Меню поддержки 1GO': '//div[@class="menu-support"]',
        'MBSS поддержка 1GO': '//span[@class="menu-text" and text()="LiveChat"]',


        // IZZI
        'Закрыть модалку IZZI': '//button[@class="general-auth-form__close"]',

        // STARDA
        'Боковое меню STARDA':'//button[@data-test="menu"]',

        // IRWIN 
        'Начать чат в контактах IRWIN': '//a[contains(@href, "/support") and .//span[contains(text(), "Live Chat")]]'
};

