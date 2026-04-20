let cart = [];

const savedCart = localStorage.getItem("cart");
if (savedCart) {
    cart = JSON.parse(savedCart);
    document.addEventListener('DOMContentLoaded', showCart);
}

let booksData = {
    1: { name: "Мастер и Маргарита", price: 599 },
    2: { name: "Преступление и наказание", price: 699 },
    3: { name: "1984", price: 549 }
};

const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
};

const showCart = () => {
    let cartDiv = document.getElementById('cart');
    let totalDiv = document.getElementById('total');

    cartDiv.innerHTML = '';

    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>Корзина пуста</p>';
        totalDiv.innerHTML = 'Итого: 0 руб.';
        return;
    }

    cart.forEach((item, index) => {
        let itemDiv = document.createElement('div');
        itemDiv.style.borderBottom = '1px solid #ccc';
        itemDiv.style.padding = '10px';
        itemDiv.style.margin = '5px 0';
        itemDiv.innerHTML = `${item.name} - ${item.price} руб. <button class="remove-btn" onclick="removeFromCart(${index})">Удалить</button>`;
        cartDiv.appendChild(itemDiv);
    });

    let total = getTotal();
    totalDiv.innerHTML = `Итого: ${total} руб.`;
};

const addToCart = (bookId) => {
    let product = {
        name: booksData[bookId].name,
        price: booksData[bookId].price
    };
    cart.push(product);
    showCart();
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${booksData[bookId].name} добавлена в корзину!`);
};

const removeFromCart = (index) => {
    cart.splice(index, 1);
    showCart();
    localStorage.setItem("cart", JSON.stringify(cart));
};

const filterBooks = (category) => {
    let book1 = document.getElementById('book1');
    let book2 = document.getElementById('book2');
    let book3 = document.getElementById('book3');

    if (category === 'all') {
        book1.style.display = 'block';
        book2.style.display = 'block';
        book3.style.display = 'block';
    } else if (category === 'roman') {
        book1.style.display = 'block';
        book2.style.display = 'none';
        book3.style.display = 'none';
    } else if (category === 'drama') {
        book1.style.display = 'none';
        book2.style.display = 'block';
        book3.style.display = 'none';
    } else if (category === 'antiutopia') {
        book1.style.display = 'none';
        book2.style.display = 'none';
        book3.style.display = 'block';
    }
};

const clearCart = () => {
    cart = [];
    showCart();
    localStorage.setItem("cart", JSON.stringify(cart));
};

const pay = () => {
    if (cart.length === 0) {
        alert('Корзина пуста! Добавьте товары перед оплатой.');
    } else {
        alert('Покупка прошла успешно! Спасибо за заказ.');
        cart = [];
        showCart();
        localStorage.setItem("cart", JSON.stringify(cart));
    }
};