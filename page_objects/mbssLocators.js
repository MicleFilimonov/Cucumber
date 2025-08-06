import * as dotenv from 'dotenv';
dotenv.config();

export const mbssLocator = {

        // Локаторы  в виджете
        'Виджет MBSS': '//*[@id="mbss-main-view"]',
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
        "Test SOL":'//*[text()= "Test SOL"]',
        "Test FRESH":'//*[text()= "Test FRESH"]',
        "Test JET":'//*[text()= "Test JET"]',
        "Test IZZI":'//*[text()= "Test IZZI"]',
        "Test STARDA":'//*[text()= "Test STARDA"]',
        "Test DRIP":'//*[text()= "Test DRIP"]',
        "Test LEX":'//*[text()= "Test LEX"]',
        "Test MONRO":'//*[text()= "Test MONRO"]',
        "Test IRWIN":'//*[text()= "Test IRWIN"]',
        "Test 1GO":'//*[text()= "Test 1GO"]',
        "Test GIZBO":'//*[text()= "Test GIZBO"]',
        "Test FLAGMAN":'//*[text()= "Test FLAGMAN"]',
        "Test MARTIN":'//*[text()= "Test MARTIN"]',
        "Test ROX":'//*[text()= "Test ROX"]',
        "Test VOLNA":'//*[text()= "Test VOLNA"]',
        "Test LEGZO":'//*[text()= "Test LEGZO"]',

        "Системное оператор общается LEGZO": `//*[text()= "С вами общается legzo_operator"]`,
        "Системное оператор общается SOL": `//*[text()= "С вами общается sol_operator"]`,
        "Системное оператор общается FRESH": `//*[text()= "С вами общается fresh_operator"]`,
        "Системное оператор общается JET": `//*[text()= "С вами общается jet_operator"]`,
        "Системное оператор общается IZZI": `//*[text()= "С вами общается izzi_operator"]`,
        "Системное оператор общается STARDA": `//*[text()= "С вами общается starda_operator"]`,
        "Системное оператор общается DRIP": `//*[text()= "С вами общается drip_operator"]`,
        "Системное оператор общается LEX": `//*[text()= "С вами общается lex_operator"]`,
        "Системное оператор общается MONRO": `//*[text()= "С вами общается monro_operator"]`,
        "Системное оператор общается IRWIN": `//*[text()= "С вами общается irwin_operator"]`,
        "Системное оператор общается 1GO": `//*[text()= "С вами общается 1go_operator"]`,
        "Системное оператор общается GIZBO": `//*[text()= "С вами общается gizbo_operator"]`,
        "Системное оператор общается FLAGMAN": `//*[text()= "С вами общается flagman_operator"]`,
        "Системное оператор общается MARTIN": `//*[text()= "С вами общается martin_operator"]`,
        "Системное оператор общается ROX": `//*[text()= "С вами общается rox_operator"]`,
        "Системное оператор общается VOLNA": `//*[text()= "С вами общается volna_operator"]`,
        
        "Системное оператор завершил LEGZO": `//*[text()= "legzo_operator завершил чат"]`,
        "Системное оператор завершил SOL": `//*[text()= "sol_operator завершил чат"]`,
        "Системное оператор завершил FRESH": `//*[text()= "fresh_operator завершил чат"]`,
        "Системное оператор завершил JET": `//*[text()= "jet_operator завершил чат"]`,
        "Системное оператор завершил IZZI": `//*[text()= "izzi_operator завершил чат"]`,
        "Системное оператор завершил STARDA": `//*[text()= "starda_operator завершил чат"]`,
        "Системное оператор завершил DRIP": `//*[text()= "drip_operator завершил чат"]`,
        "Системное оператор завершил LEX": `//*[text()= "lex_operator завершил чат"]`,
        "Системное оператор завершил MONRO": `//*[text()= "monro_operator завершил чат"]`,
        "Системное оператор завершил IRWIN": `//*[text()= "irwin_operator завершил чат"]`,
        "Системное оператор завершил 1GO": `//*[text()= "1go_operator завершил чат"]`,
        "Системное оператор завершил GIZBO": `//*[text()= "gizbo_operator завершил чат"]`,
        "Системное оператор завершил FLAGMAN": `//*[text()= "flagman_operator завершил чат"]`,
        "Системное оператор завершил MARTIN": `//*[text()= "martin_operator завершил чат"]`,
        "Системное оператор завершил ROX": `//*[text()= "rox_operator завершил чат"]`,
        "Системное оператор завершил VOLNA": `//*[text()= "volna_operator завершил чат"]`,

        //Локаторы пре-форм 
        //LEGZO
        "Обязательный вопрос пре-формы LEGZO STAGE": '//*[@data-message-id="38" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы LEGZO STAGE": '//*[@data-message-id="38_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы LEGZO STAGE": '//*[@data-message-id="38_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы LEGZO STAGE": '//*[@data-message-id="39" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы LEGZO STAGE": '//*[@data-message-id="39_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы LEGZO STAGE": '//*[@data-message-id="39_1" and .//span[text()="Ответ 4"]]',
        "Обязательный вопрос пре-формы LEGZO MASTER": '//*[@data-message-id="305" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы LEGZO MASTER": '//*[@data-message-id="305_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы LEGZO MASTER": '//*[@data-message-id="305_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы LEGZO MASTER": '//*[@data-message-id="306" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы LEGZO MASTER": '//*[@data-message-id="306_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы LEGZO MASTER": '//*[@data-message-id="306_1" and .//span[text()="Ответ 4"]]',
        
        //FRESH
        "Обязательный вопрос пре-формы FRESH STAGE": '//*[@data-message-id="40" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы FRESH STAGE": '//*[@data-message-id="40_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы FRESH STAGE": '//*[@data-message-id="40_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы FRESH STAGE": '//*[@data-message-id="41" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы FRESH STAGE": '//*[@data-message-id="41_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы FRESH STAGE": '//*[@data-message-id="41_1" and .//span[text()="Ответ 4"]]',
        "Обязательный вопрос пре-формы FRESH MASTER": '//*[@data-message-id="307" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы FRESH MASTER": '//*[@data-message-id="307_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы FRESH MASTER": '//*[@data-message-id="307_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы FRESH MASTER": '//*[@data-message-id="308" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы FRESH MASTER": '//*[@data-message-id="308_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы FRESH MASTER": '//*[@data-message-id="308_1" and .//span[text()="Ответ 4"]]',

        //ROX
        "Обязательный вопрос пре-формы ROX STAGE": '//*[@data-message-id="43" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы ROX STAGE": '//*[@data-message-id="43_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы ROX STAGE": '//*[@data-message-id="43_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы ROX STAGE": '//*[@data-message-id="44" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы ROX STAGE": '//*[@data-message-id="44_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы ROX STAGE": '//*[@data-message-id="44_1" and .//span[text()="Ответ 4"]]',
        
        //MARTIN
        "Обязательный вопрос пре-формы MARTIN STAGE": '//*[@data-message-id="45" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы MARTIN STAGE": '//*[@data-message-id="45_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы MARTIN STAGE": '//*[@data-message-id="45_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы MARTIN STAGE": '//*[@data-message-id="46" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы MARTIN STAGE": '//*[@data-message-id="46_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы MARTIN STAGE": '//*[@data-message-id="46_1" and .//span[text()="Ответ 4"]]',
        
        //DRIP
        "Обязательный вопрос пре-формы DRIP STAGE": '//*[@data-message-id="159" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы DRIP STAGE": '//*[@data-message-id="159_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы DRIP STAGE": '//*[@data-message-id="159_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы DRIP STAGE": '//*[@data-message-id="160" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы DRIP STAGE": '//*[@data-message-id="160_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы DRIP STAGE": '//*[@data-message-id="160_1" and .//span[text()="Ответ 4"]]',

        //SOL
        "Обязательный вопрос пре-формы SOL STAGE": '//*[@data-message-id="161" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы SOL STAGE": '//*[@data-message-id="161_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы SOL STAGE": '//*[@data-message-id="161_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы SOL STAGE": '//*[@data-message-id="162" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы SOL STAGE": '//*[@data-message-id="162_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы SOL STAGE": '//*[@data-message-id="162_1" and .//span[text()="Ответ 4"]]',

        //IZZI
        "Обязательный вопрос пре-формы IZZI STAGE": '//*[@data-message-id="163" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы IZZI STAGE": '//*[@data-message-id="163_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы IZZI STAGE": '//*[@data-message-id="163_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы IZZI STAGE": '//*[@data-message-id="164" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы IZZI STAGE": '//*[@data-message-id="164_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы IZZI STAGE": '//*[@data-message-id="164_1" and .//span[text()="Ответ 4"]]',

        //VOLNA
        "Обязательный вопрос пре-формы VOLNA STAGE": '//*[@data-message-id="167" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы VOLNA STAGE": '//*[@data-message-id="167_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы VOLNA STAGE": '//*[@data-message-id="167_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы VOLNA STAGE": '//*[@data-message-id="168" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы VOLNA STAGE": '//*[@data-message-id="168_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы VOLNA STAGE": '//*[@data-message-id="168_1" and .//span[text()="Ответ 4"]]',

        //STARDA
        "Обязательный вопрос пре-формы STARDA STAGE": '//*[@data-message-id="169" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы STARDA STAGE": '//*[@data-message-id="169_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы STARDA STAGE": '//*[@data-message-id="169_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы STARDA STAGE": '//*[@data-message-id="170" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы STARDA STAGE": '//*[@data-message-id="170_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы STARDA STAGE": '//*[@data-message-id="170_1" and .//span[text()="Ответ 4"]]',

        //MONRO
        "Обязательный вопрос пре-формы MONRO STAGE": '//*[@data-message-id="171" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы MONRO STAGE": '//*[@data-message-id="171_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы MONRO STAGE": '//*[@data-message-id="171_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы MONRO STAGE": '//*[@data-message-id="172" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы MONRO STAGE": '//*[@data-message-id="172_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы MONRO STAGE": '//*[@data-message-id="172_1" and .//span[text()="Ответ 4"]]',

        //1GO
        "Обязательный вопрос пре-формы 1GO STAGE": '//*[@data-message-id="173" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы 1GO STAGE": '//*[@data-message-id="173_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы 1GO STAGE": '//*[@data-message-id="173_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы 1GO STAGE": '//*[@data-message-id="174" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы 1GO STAGE": '//*[@data-message-id="174_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы 1GO STAGE": '//*[@data-message-id="174_1" and .//span[text()="Ответ 4"]]',

        //LEX
        "Обязательный вопрос пре-формы LEX STAGE": '//*[@data-message-id="175" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы LEX STAGE": '//*[@data-message-id="175_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы LEX STAGE": '//*[@data-message-id="175_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы LEX STAGE": '//*[@data-message-id="176" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы LEX STAGE": '//*[@data-message-id="176_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы LEX STAGE": '//*[@data-message-id="176_1" and .//span[text()="Ответ 4"]]',

        //GIZBO
        "Обязательный вопрос пре-формы GIZBO STAGE": '//*[@data-message-id="34" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы GIZBO STAGE": '//*[@data-message-id="34_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы GIZBO STAGE": '//*[@data-message-id="34_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы GIZBO STAGE": '//*[@data-message-id="177" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы GIZBO STAGE": '//*[@data-message-id="177_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы GIZBO STAGE": '//*[@data-message-id="177_1" and .//span[text()="Ответ 4"]]',

        //IRWIN
        "Обязательный вопрос пре-формы IRWIN STAGE": '//*[@data-message-id="178" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы IRWIN STAGE": '//*[@data-message-id="178_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы IRWIN STAGE": '//*[@data-message-id="178_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы IRWIN STAGE": '//*[@data-message-id="179" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы IRWIN STAGE": '//*[@data-message-id="179_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы IRWIN STAGE": '//*[@data-message-id="179_1" and .//span[text()="Ответ 4"]]',

        //FLAGMAN
        "Обязательный вопрос пре-формы FLAGMAN STAGE": '//*[@data-message-id="180" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы FLAGMAN STAGE": '//*[@data-message-id="180_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы FLAGMAN STAGE": '//*[@data-message-id="180_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы FLAGMAN STAGE": '//*[@data-message-id="181" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы FLAGMAN STAGE": '//*[@data-message-id="181_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы FLAGMAN STAGE": '//*[@data-message-id="181_1" and .//span[text()="Ответ 4"]]',
        
        //JET
        "Обязательный вопрос пре-формы JET STAGE": '//*[@data-message-id="165" and .//span[text()="Обязательный вопрос"]]',
        "Ответ 1 обязательной пре-формы JET STAGE": '//*[@data-message-id="165_0" and .//span[text()="Ответ 1"]]',
        "Ответ 2 обязательной пре-формы JET STAGE": '//*[@data-message-id="165_1" and .//span[text()="Ответ 2"]]',
        "Не обязательный вопрос пре-формы JET STAGE": '//*[@data-message-id="166" and .//span[text()="Не обязательный вопрос"]]',
        "Ответ 1 не обязательной пре-формы JET STAGE": '//*[@data-message-id="166_0" and .//span[text()="Ответ 3"]]',
        "Ответ 2 не обязательной пре-формы JET STAGE": '//*[@data-message-id="166_1" and .//span[text()="Ответ 4"]]',


        // Функциональные локаторы 
        'Локатор': (text) => `//*[text() = "${text}"]`,
        'Спецсимвольное сообщение': (text) => `text=${text}`,
        'ЛокаторФайла': (fileName) => `//*[img and normalize-space(.)="${fileName}"]`,
        'Отправленное изображение': '//img[contains(@src, ".jpg")]', //Проверяю первый отображаемый локатор(так как может )

};











