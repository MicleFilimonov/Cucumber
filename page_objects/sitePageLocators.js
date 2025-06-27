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
        'Поле пароля на сайте ROX': '//*[@data-test="passwd_field"]',
        'Кнопка авторизации на сайте': '//*[@data-test="auth-form-btn"]',

        // MOBILE
        'Ботом меню моб': '//*[@data-test="bottom_menu-home"]',
        'Пункт поддержка моб': '//*[@data-test="top-menu-support"]', 
        'MBSS моб': '//*[@data-test="support-livechat"])', 

        //LEGZO
        'Боковое меню': '//*[@data-test="menu"]',
        'Меню поддержки LEGZO': '(//*[@data-test="submenu-item" and contains(@class, "support")])[2]',
        'MBSS поддержка LEGZO': '(//*[@data-test="support-livechat"])[2]', //Вероятно с раскаткой MBSS измениться - проверить после полной интеграции на всех проектах
        'Закрыть модалку LEGZO': '//*[@data-test="modal-close"]',

        // FRESH
        'Меню поддержки FRESH': '//*[@data-test="top-menu-support"]',
        'MBSS поддержка FRESH': '//*[@data-test="support-livechat"]',
        'Закрыть модалку FRESH': '//*[@data-test="modal-close"]',

        // ROX
        'Активатор ROX': '//*[@class="main-top-line__help-chat-inner"]',
        'Боковое меню ROX': '//*[@id="hamburger"]',
        'Меню информации ROX': '//*[text()="информация"]',
        'Контакты ROX': '//li[@data-role="accordion-item"]//*[text()="контакты"]',
        'Меню поддержки ROX': '//*[@class="multipl-list multipl-list--support"]',
        'MBSS поддержка ROX': '//*[text()="связаться через чат"]',
        'Закрыть модалку ROX': '//*[@data-test="modal-close"]',

        //MARTIN 
        'Виджет MARTIN': '//div[@class="support-widget__button"]',
        'Боковое меню MARTIN': '//div[@class="top-bar__burger flex-center"]',
        'Начать чат в контактах MARTIN': '//a[@href="/ru/support/chat"]',
        'Активатор MBSS MARTIN': '//span[@class="support-widget__item-wr"]//*[@class="icon support-widget__item-icon"]',
        'Меню поддержки MARTIN': '//*[@data-test="top-menu-support"]',
        'MBSS поддержка MARTIN': '//div[contains(@to,"/support/chat")]',
        'Закрыть модалку MARTIN': '//*[@data-test="modal-close"]'
};
