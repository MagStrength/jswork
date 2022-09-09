"use strict";

const cartItem = {
    render(good) {
        return `<div class="good">
                    <div><b>Наименование</b>: ${good.product_name}</div>
                    <div><b>Цена за шт.</b>: ${good.price}</div>
                    <div><b>Количество</b>: ${good.quantity}</div>
                    <div><b>Стоимость</b>: ${good.quantity * good.price}</div>
                </div>`;
    }
}

const cart = {
    cartListBlock: null,
    cartButton: null,
    cartItem,
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
            quantity: 3
        },

        {
            id_product: 268,
            product_name: "Карандаш",
            price: 20,
            quantity: 2
        }
    ],

    init() {
        this.cartListBlock = document.querySelector('.cart-item');
        this.cartButton = document.querySelector('.cart-btn');
        this.cartButton.addEventListener('click', this.clearCart.bind(this));
        this.render();
    },

    init() {
        this.cartListBlock = document.querySelector('.cart-item');
        this.cartButton = document.querySelector('.cart-btn');
        this.cartButton.addEventListener('click', this.clearCart.bind(this));
        this.render();
    },

    render() {
        if (this.goods.length) {
            this.goods.forEach(good => {
                this.cartListBlock.insertAdjacentHTML('beforeend', this.cartItem.render(good));
            });
            this.cartListBlock.insertAdjacentHTML('beforeend', `В корзине ${this.goods.length} товара на сумму ${this.getCartPrice()} рублей`);
        } else {
            this.cartListBlock.textContent = 'Корзина пуста';
        }
    },

    getCartPrice() {
        return this.goods.reduce(function (price, good) {
            return price + good.price * good.quantity;
        }, 0);
    },

    clearCart() {
        this.goods = [];
        this.render();
    },
};

cart.init();
