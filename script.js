const cart = JSON.parse(localStorage.getItem('cart')) || []; // Carregar o carrinho armazenado, ou um carrinho vazio

let total = 0;

// Função para adicionar item ao carrinho
function addToCart(name, price, description) {
    // Adiciona o produto com nome, preço e descrição ao carrinho
    cart.push({ name, price, description });
    updateCart();
    showNotification();
    saveCartToLocalStorage();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Salva o carrinho no localStorage
}

function displayPurchaseConfirmation() {
    const purchaseItems = JSON.parse(localStorage.getItem('cart'));
    const purchaseTotal = localStorage.getItem('purchaseTotal');

    if (purchaseItems && purchaseTotal) {
        const itemsList = document.getElementById('purchase-items');
        const totalElement = document.getElementById('purchase-total');

        // Exibe os itens do carrinho com nome, descrição e preço
        purchaseItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.description} - R$ ${item.price.toFixed(2)}`;
            itemsList.appendChild(li);
        });

        totalElement.textContent = `Total da compra: R$ ${purchaseTotal}`;
     // Adiciona o botão de impressão
     const printButton = document.createElement('button');
     printButton.textContent = 'Imprimir Detalhes da Compra';
     printButton.id = 'print-button';
     itemsList.appendChild(printButton);

     // Adiciona evento ao botão de impressão
     printButton.addEventListener('click', printPurchaseDetails);

        // Limpar o carrinho após a compra (se necessário)
        localStorage.removeItem('cart');
        localStorage.removeItem('purchaseTotal');
        
    }
}

window.onload = function() {
    // Recupera o carrinho do localStorage
    const cart = JSON.parse(localStorage.getItem('cart'));
    const purchaseTotal = localStorage.getItem('purchaseTotal');

    // Exibe os itens na lista
    const itemsList = document.getElementById('purchase-items');
    if (cart) {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name ||'Nome não definido'} -  R$ ${item.price.toFixed(2)}`;
            itemsList.appendChild(li);
        });
    }

    // Exibe o total da compra
    const totalElement = document.getElementById('purchase-total');
    if (purchaseTotal) {
        totalElement.textContent = `Total da compra: R$ ${purchaseTotal}`;
    } else {
        totalElement.textContent = 'Total da compra: R$ 0,00'; // Valor padrão, caso não haja total
    }
    
    // Limpa os dados após a compra (opcional)
    localStorage.removeItem('cart');
    localStorage.removeItem('purchaseTotal');
};

// Função para atualizar o carrinho na página
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = ''; // Limpar itens da lista
    total = 0; // Resetar o total

    // Adicionar cada item do carrinho à lista de exibição
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name ||'Nome não definido'} - R$ ${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price;
    });

    // Atualizar o total
    cartTotal.textContent = total.toFixed(2);
}

// Função para limpar o carrinho
function clearCart() {
    localStorage.removeItem('cart'); // Remover o carrinho do localStorage
    cart.length = 0; // Limpar o carrinho na memória
    updateCart();
}

// Função para finalizar a compra
function buyCart() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
    } else {
        localStorage.setItem('cart', JSON.stringify(cart)); // Salva os produtos
        localStorage.setItem('purchaseTotal', total.toFixed(2)); // Salva o total
        window.location.href = 'confirmacao-de-compra.html'; // Redireciona para a confirmação
    }
}



// Função para exibir a notificação de item adicionado ao carrinho
function showNotification() {
    const notification = document.getElementById('notification');
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Carregar o carrinho ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    updateCart(); // Atualizar o carrinho na página com os dados do localStorage
});

const loginToggle = document.getElementById('login-toggle');
const loginForm = document.getElementById('login-form');

// Adicionar eventos aos botões de limpar e comprar
document.getElementById('clear-cart').addEventListener('click', clearCart);
document.getElementById('buy-cart').addEventListener('click', buyCart);

// Lidar com o login, conforme já implementado em seu código
document.getElementById('login-toggle').addEventListener('click', function() {
    var loginForm = document.getElementById('login-form');
    if (loginForm.style.display === 'none' || loginForm.style.display === '') {
        loginForm.style.display = 'block'; // Mostrar o formulário
    } else {
        loginForm.style.display = 'none'; // Ocultar o formulário
    }
});

document.getElementById('login').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email == "admin@gmail.com" && password == "admin") 
    {
        // Here you would typically send the login information to a server
        console.log(`Login attempt: ${email}`);
        alert('Login realizado com sucesso!');
        loginForm.classList.add('hidden');
        window.location.href = 'login_efetuado.html';
        
    } 
    else 
    {
        alert('Tente novamente');
    }
    
});

// Alternar visibilidade do carrinho
document.getElementById('carrinho-toggle').addEventListener('click', function() {
    var cartForm = document.getElementById('cart');
    if (cartForm.style.display === 'none' || cartForm.style.display === '') {
        cartForm.style.display = 'block'; // Mostrar o carrinho
    } else {
        cartForm.style.display = 'none'; // Ocultar o carrinho
    }
});

