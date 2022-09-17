"use strict";

// Создание каталога (из предыдущего дз):
const catalog = {
    catalogListBlock: null,
    cart: null,
    list: [
        {
            id_product: 121,
            product_name: "Ручка",
            price: 50,
            quantity: 1
        },

        {
            id_product: 358,
            product_name: "Тетрадь",
            price: 70,
            quantity: 1
        },

        {
            id_product: 268,
            product_name: "Карандаш",
            price: 20,
            quantity: 1
        }
    ],

    // Сделать инизиализацию каталога: 
    /**
     * Инициализация каталога
     * @param catalogListBlock - блок каталога
     * @param cart - корзина
     */

    init(catalogListBlock, cart) {
        this.catalogListBlock = document.querySelector(`.${catalogListBlock}`);
        this.cart = cart;
        this.render();
        this.addEventHandlers(); //обработка событий
    },

    render() {
        if (this.getCatalogList() > 0) {
            this.renderCatalogList();
        } else {
            this.renderEmptyCatalog();
        }
    },

    addEventHandlers() {
        this.catalogListBlock.addEventListener('click', event => this.addToBasket(event));
    },


    //  Добавление товара в корзину
    addToBasket(event) {
        if (!event.target.classList.contains('item_cart')) return;
        const id_product = +event.target.dataset.id_product;
        const productToAdd = this.list.find((product) => product.id_product === id_product);
        this.cart.addToBasket(productToAdd);
    },

    // Количество товаров в каталоге
    getCatalogList() {
        return this.list.length;
    },

    renderCatalogList() {
        this.catalogListBlock.innerHTML = '';
        this.list.forEach(item => {
            this.catalogListBlock.insertAdjacentHTML('beforeend', this.renderCatalogItem(item));
        });
    },

    /**
     * Рендер товара из списка
     * @param item - товар
     * @returns {string} - сгенерированая строка разметки
     */
    renderCatalogItem(item) {
        return `<div class="product">
                <h3>${item.product_name}</h3>
                <p>${item.price} руб.</p>
                <button class="item_cart" data-id_product="${item.id_product}">Купить</button>
            </div>`;
    },


    renderEmptyCatalog() {
        this.catalogListBlock.innerHTML = '';
        this.catalogListBlock.textContent = 'Каталог товаров пуст.';
    },
};

// Объект корзины
const cart = {
    cartBlock: null,
    clrCartButton: null,
    goods: [
        {
            id_product: 121,
            product_name: "Ручка",
            price: 50,
            quantity: 4
        },
        {
            id_product: 358,
            product_name: "Тетрадь",
            price: 70,
            quantity: 1
        },

        {
            id_product: 268,
            product_name: "Карандаш",
            price: 20,
            quantity: 1
        }
    ],

    /**
     * Метод инициальзации корзины
     * @param cartBlockClass - блок корзины
     * @param clrCartButton - кнопка очистки корзины
     */
    init(cartBlockClass, clrCartButton) {
        this.cartBlock = document.querySelector(`.${cartBlockClass}`);
        this.clrCartButton = document.querySelector(`.${clrCartButton}`);

        this.addEventHandlers();
        this.render();
    },

    addEventHandlers() {
        this.clrCartButton.addEventListener('click', this.dropCart.bind(this));
    },

    // Метод очистки корзины
    dropCart() {
        this.goods = [];
        this.render();
    },

    // Рендер корзины
    render() {
        if (this.getCartGoodsLength() > 0) {
            this.renderCartList();
        } else {
            this.renderEmptyCart();
        }
    },

    // Добавить товар
    addToBasket(product) {
        if (product) {
            const findInBasket = this.goods.find((item) => product.id_product === item.id_product);
            if (findInBasket) {
                findInBasket.quantity++;
            } else {
                this.goods.push({ ...product, quantity: 1 });
            }
            this.render();
        } else {
            alert('Ошибка!');
        }
    },

    // Получение количества товаров в корзине
    getCartGoodsLength() {
        return this.goods.length;
    },

    // Рендер пустой корзины
    renderEmptyCart() {
        this.cartBlock.innerHTML = '';
        this.cartBlock.textContent = 'Корзина пуста';
    },

    // Рендер списка товаров в корзине
    renderCartList() {
        this.cartBlock.innerHTML = '';
        this.goods.forEach(item => {
            this.cartBlock.insertAdjacentHTML('beforeend', this.renderCartItem(item));
        });
    },

    // Рендер отдельного товара в корзине
    renderCartItem(item) {
        return `<div>
                <h3>${item.product_name}</h3>
                <p>${item.price} руб.</p>
                <p>${item.quantity} шт.</p>
            </div>`;
    },


    // 1. Реализовать страницу корзины:
    // a. Добавить возможность не только смотреть состав корзины, но и редактировать его,
    // обновляя общую стоимость или выводя сообщение «Корзина пуста».
    // https://qna.habr.com/q/583495Э
    // https://github.com/rah-emil/angry-cart.js


    getPriceBasket() {
        let allPrice = null;
        this.goods.forEach(elem => {
            allPrice += elem.price * elem.quantity;
        })
        cart.renderCart(allPrice);
    },

    renderCart(allPrice) {
        const cartBlock = document.querySelector(".cart")
        if (cartBlock == 0) {
            cartBlock.textContent = "Корзина пуста"
        } else {

            cartBlock.insertAdjacentHTML("beforeend", `<span class="all-price"></span>`)
            let allPriceEl = cartBlock.querySelector(".all-price")
            if (cartBlock.contains(allPriceEl)) {
                allPriceEl.textContent = `Общая цена : ${allPrice}`;
            }
        };
    },
};

document.querySelector(".cart").addEventListener("click", event => {
    if (event.target.classList.contains("min-count")) {

        cart.goods.forEach(el => {
            if (event.target.closest(".cartBlock").children[0].textContent == el.name) {
                el.count--
                if (el.count == 0) {

                    cart.goods.splice(cart.goods.indexOf(el), 1)
                }
            }
        })
    } else if (event.target.classList.contains("plus-count")) {
        cart.products.forEach(el => {
            if (event.target.closest(".cartBlock").children[0].textContent == el.name) {

                el.count++
            };
        });
    };
    window.localStorage.setItem("cartBlock", JSON.stringify(cartBlock))
})


// Подключение каталога и корзины
catalog.init('catalog', cart);
cart.init('cart', 'cart-btn');
cart.getPriceBasket();



