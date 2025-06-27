import * as dotenv from 'dotenv';
dotenv.config();

export const value = {

        'Тестового Игрока': process.env.USER_EMAIL,
        'Пароль Игрока': process.env.USER_PASSWORD,

        'Оператора LEGZO': process.env.ADMIN_LEGZO_EMAIL,
        'Оператора JET': process.env.ADMIN_JET_EMAIL,
        'Оператора SOL': process.env.ADMIN_SOL_EMAIL,
        'Оператора FRESH': process.env.ADMIN_FRESH_EMAIL,
        'Оператора STARDA': process.env.ADMIN_STARDA_EMAIL,
        'Оператора IZZI': process.env.ADMIN_IZZI_EMAIL,
        'Оператора DRIP': process.env.ADMIN_DRIP_EMAIL,
        'Оператора MONRO': process.env.ADMIN_MONRO_EMAIL,
        'Оператора LEX': process.env.ADMIN_LEX_EMAIL,
        'Оператора GIZBO': process.env.ADMIN_GIZBO_EMAIL,
        'Оператора ROX': process.env.ADMIN_ROX_EMAIL,
        'Оператора VOLNA': process.env.ADMIN_VOLNA_EMAIL,
        'Оператора 1GO': process.env.ADMIN_1GO_EMAIL,
        'Оператора IRWIN': process.env.ADMIN_IRWIN_EMAIL,
        'Оператора FLAGMAN': process.env.ADMIN_FLAGMAN_EMAIL,
        'Оператора MARTIN': process.env.ADMIN_MARTIN_EMAIL,

        'Пароль оператора':process.env.ADMIN_PASSWORD
};

