// products.js
// База данных товаров для веб-приложения

const PRODUCTS = {
    hoodies: [
        {
            id: 1,
            name: "Худи Berserk",
            price: "7000 руб",
            priceNum: 7000,
            images: [
                "https://malofei.github.io/gutsenj_bot_html/images/hoodie1.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/hoodie2.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/hoodie3.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/hoodie4.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/hoodie5.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/hoodie6.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/hoodie7.jpg"
            ]
        },
        {
            id: 2,
            name: "Худи Berserk 2",
            price: "7000 руб",
            priceNum: 7000,
            images: [
                "https://malofei.github.io/gutsenj_bot_html/images/hoddie_grif_1.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/hoddie_grif_2.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/hoddie_grif_3.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/hoddie_grif_4.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/hoddie_grif_5.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/hoddie_grif_6.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/hoddie_grif_7.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/hoddie_grif_8.jpg"
            ]
        }
    ],
    tshirts: [
        {
            id: 3,
            name: "Футболка Berserk 1",
            price: "4600 руб",
            priceNum: 4600,
            images: [
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_berserk_1.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_berserk_2.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_berserk_3.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_berserk_4.jpg"
            ]
        },
        {
            id: 4,
            name: "Футболка Berserk 2",
            price: "3000 руб",
            priceNum: 3000,
            images: [
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_grif_1.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_grif_2.jpg"
            ]
        },
        {
            id: 5,
            name: "Футболка Berserk 3",
            price: "3600 руб",
            priceNum: 3600,
            images: [
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_berserk_21.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_berserk_22.jpg"
            ]
        },
        {
            id: 6,
            name: "Футболка Ведьмак",
            price: "4000 руб",
            priceNum: 4000,
            images: [
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_witcher_1.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_witcher_2.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_witcher_3.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_witcher_4.jpg"
            ]
        },
        {
            id: 7,
            name: "Футболка Bleach 1",
            price: "4500 руб",
            priceNum: 4500,
            images: [
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_urahara_1.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_urahara_2.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_urahara_3.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_urahara_4.jpg"
            ]
        },
        {
            id: 8,
            name: "Футболка Bleach 2",
            price: "4500 руб",
            priceNum: 4500,
            images: [
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_kyoraku_1.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_kyoraku_2.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_kyoraku_3.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_kyoraku_4.jpg"
            ]
        },
        {
            id: 9,
            name: "Футболка DMC 1",
            price: "4500 руб",
            priceNum: 4500,
            images: [
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_dmc_1.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_dmc_2.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_dmc_3.jpg",
                "https://malofei.github.io/gutsenj_bot_html/images/tshka_dmc_4.jpg"
            ]
        }
    ],
    themes: {
        berserk: [1, 2, 3, 4, 5], // ID товаров
        bleach: [7, 8],
        jujutsu: [],
        hollow: [],
        dmc: [9],
        witcher: [6]
    }
};

const THEME_INFO = {
    tshirts: {
        title: "Футболки",
        info: "Состав: Хлопок 92% / Эластан 8%\nПлотность: 240гр.\nКрой: прямой\n\nВ цену входит доставка по СПб"
    },
    hoodies: {
        title: "Худи",
        info: "Состав: Хлопок 100%\nПлотность 280гр./320гр.\n\nВ цену входит доставка по СПб"
    },
    berserk: {
        title: "Берсерк",
        info: "Коллекция по мотивам манги Берсерк"
    },
    bleach: {
        title: "Блич",
        info: "Коллекция по мотивам аниме Блич"
    },
    jujutsu: {
        title: "Магическая битва",
        info: "Коллекция Jujutsu Kaisen"
    },
    hollow: {
        title: "Hollow Knight",
        info: "Коллекция по мотивам игры Hollow Knight"
    },
    dmc: {
        title: "Devil May Cry",
        info: "Коллекция по мотивам игр серии Devil May Cry"
    },
    witcher: {
        title: "Ведьмак",
        info: "Коллекция по мотивам Ведьмака"
    }
};

// Функции для работы с товарами
function getAllProducts() {
    return [...PRODUCTS.hoodies, ...PRODUCTS.tshirts];
}

function getProductById(id) {
    const allProducts = getAllProducts();
    return allProducts.find(p => p.id === id);
}

function getProductsByTheme(theme) {
    const themeIds = PRODUCTS.themes[theme];
    if (!themeIds) return [];

    const allProducts = getAllProducts();
    return themeIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
}