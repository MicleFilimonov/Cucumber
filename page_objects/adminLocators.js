import * as dotenv from 'dotenv';
dotenv.config();


export const adminLocator = {

    'Принимать чаты': '//*[@id="start_accepting_chats_btn"]',
    'Профиль': '//*[@id="profile_data"]', //кнопка с профилем в правом верхнем углу
    'Выход': 'xpath=/html/body/div[2]/div[1]/div/div[1]/div/ul/li[5]',
    'Пункт Chats': '//*[@id="left_menu_Chats"]',
    'Выпадающее меню': '//*[@id="active_room_button"]',
    'Remove': '//*[@id="active_room_remove"]',
    'Каунтер распределения': '//*[text()="My chats (1)"]',
    'Тестовая комната': '.vac-room-item',
    'Чек-бокс автозакрытия': '//*[@id="auto_close_checkbox"]/parent::span',
    'Инпут автозакрытия': '//*[@id="auto_close_value"]',
    'Сохранить изменения': '//button[span[text()="Save changes"]]',
    'Список преформ': '//*[@class="el-input__suffix-inner"]',
    'Чек-бокс преформ': '//*[@id="auto_close_checkbox"]/parent::span',
    'Загрузить файл в админке': 'input[type="file"]',
    'Поле ввода сообщения в админке': '//*[@id="message_field"]',
    'Отправку сообщения в админке': '//*[@id="send_message_btn"]',
    'Кнопка подтверждения в админке': '//*[text()="да"]',
    'Поле почты в админке': '//*[@id="email_field"]',
    'Поле пароля в админке': '//*[@id="password_field"]',
    'Кнопка авторизации в админке': '//*[@id="auth_form_btn"]',
    'Закрыть комнату в админке': '//*[@id="active_room_closeRoom"]',
    'Лоадер превью файла': '//div[@id="vac-circle" and ancestor::div[contains(@class, "vac-room-file-container")]]'
};
