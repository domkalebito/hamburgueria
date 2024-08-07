// API do whatsapp -> https://faq.whatsapp.com/5913398998672934
// API do whatsapp -> https://api.whatsapp.com/send?phone=2790000000&text=Quero%20fazer%20um%20agendamento
// API de alertas  -> https://apvarun.github.io/toastify-js/

const spanItem = document.getElementById("date-span")
const menu = document.getElementById("menu")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")

const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

const cartBtn = document.getElementById("cart-btn")
const cartCounter = document.getElementById("cart-count")

const closeModalBtn = document.getElementById("close-modal-btn")
const checkoutBtn = document.getElementById("checkout-btn")

/* ------------------------------------------------------------------------- */


let cart = [] // MONTAR LISTA ARRAY DE PRODUTOS 26:00


// ABRIR O MODAL DO CARRINHO
cartBtn.addEventListener("click", function(){
  updateCartModal()
  // cartModal.style.display = "flex"
  cartModal.classList.remove('hidden')
  cartModal.classList.add('flex')
})

// FECHAR O MODAL QUANDO CLICAR FORA
cartModal.addEventListener("click", function(event){
  if (event.target === cartModal){
    // cartModal.style.display = "none"
    cartModal.classList.remove('flex')
    cartModal.classList.add('hidden')
  }
})

// FECHAR O MODAL NO BOTÃO
closeModalBtn.addEventListener("click", function(){
  cartModal.classList.remove('flex')
  cartModal.classList.add('hidden')
})


// ADICIONAR NO CARRINHO
menu.addEventListener("click", function(event){  
  // Se o elemento ou o Pai dele contem a classe -> closest()
  let parentButton = event.target.closest(".add-to-cart-btn")
  
  if(parentButton){
    // Pega o atributo do elemento
    const name = parentButton.getAttribute("data-name")
    const price = parseFloat(parentButton.getAttribute("data-price"))
    
    addToCart(name, price)
  }  
})


// FUNÇÕES
/* ------------------------------------------------------------------------- */
// FUNÇÃO ADICIONAR NO CARRINHO 24:40
function addToCart(name, price){
  // Verifica se existe no array -> find(param)
  const existingItem = cart.find(item => item.name === name)

  if(existingItem){
    // Se já existe o item, então aumenta a quantidade + 1
    existingItem.quantity += 1;
    return;
  }else{
    // Adiciona items no array
    cart.push({ name, price, quantity: 1 })
  }

  updateCartModal()
}


// CONSTRUIR VISUALMENTE O CARRINHO 34:00
function updateCartModal(){
  cartItemsContainer.innerHTML = ``;
  let total = 0;

  cart.forEach(item => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex", "flex-col", "justify-between", "bm-4");

    cartItemElement.innerHTML = `
      <div class="flex items-center justify-between px-2 py-3 shadow-md">
        <div>
          <p class="font-medium">${item.name}</p>
          <p>Qtd: ${item.quantity}</p>
          <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
        </div>

        <button
          class="remove-from-cart-btn px-4 py-4 bg-red-700 shadow-btnCarRemove bg-opacity-90 rounded-xl text-white hover:bg-opacity-100 duration-200"
          data-name="${item.name}"
        >Remover</button>
  
      </div>
    `
    total += item.price * item.quantity;
    cartItemsContainer.appendChild(cartItemElement);
  })
  cartTotal.innerText = total.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
  cartCounter.innerHTML = cart.length;
}


// REMOVER QUANTIDADE DOS ITEMS NO CARRINHO 51:50
cartItemsContainer.addEventListener("click", function(event){
  // Se o elemento contem a classe -> contains()
  if(event.target.classList.contains("remove-from-cart-btn")){
    const name = event.target.getAttribute("data-name")

    removeCartItem(name)
  }
})


//REMOVE A QUANTIDADE DO ITEM NO CARRINHO 55:30
function removeCartItem(name){
  const index = cart.findIndex(item => item.name === name)

  if(index !== -1){
    const item = cart[index]; // Pega o item pelo index

    // Se existe o item, remove quantidade -1
    if(item.quantity > 1){                 
      item.quantity -= 1
      updateCartModal()
      return
    }

    // Deleta o item do Array de produtos
    cart.splice(index, 1)
    updateCartModal()
  }
}


// PEGA O ENDEREÇO 01:04:00
addressInput.addEventListener("input", function(event){
  let inputValue = event.target.value
  if(inputValue !== ""){
    addressInput.classList.remove("border-2", "border-red-500")
    addressInput.classList.add("border-none")
    addressWarn.classList.add("hidden")
  }
})

// addressInput.addEventListener("focusin", function(event){
//   addressWarn.classList.add("hidden")
// })


// FINALIZAR O PEDIDO NO CARRINHO 01:00:00
checkoutBtn.addEventListener("click", function(){
  const isOpen = checkRestaurantOpen()

  if(!isOpen){

    Toastify({
      text: "Ops, Restaurante fechado no momento!",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: { background: "linear-gradient(to right, #790909, #b60c0c)" }
    }).showToast();

    return
  }

  // Se não tem item no carrinho
  if(cart.length === 0){
    alert("NENHUM ITEM NO CARRINHO!")
    return
  }

  // Se endereço vazio
  if(addressInput.value === ""){
    addressWarn.classList.remove("hidden")
    addressInput.classList.add("border-2", "border-red-500")
    addressInput.focus()
    return
  }

  // Enviar o pedido para API do Whatsapp
  const cartItems = cart.map((item) => {
    return (
      `${item.name} Qtd:${item.quantity} Preço:R$${item.price.toFixed(2)} \r\n`
    )
  }).join("")

  let stringFormatada = cartItems.slice(0, -3).trimStart().trimEnd()  // Recorta string e Remove espaços

  const message = encodeURIComponent(stringFormatada)
  const phone = "+351937468280"

  // API do Whatsapp 01:16:00
  window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")
  // window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${message}`)

  cart = [] // Limpa lista de array de produtos
 
  updateCartModal()
})



// HORÁRIO DE FUNCIONAMENTO 01:06:00
function checkRestaurantOpen(){
  const data = new Date()
  const hora = data.getHours()
  return hora >= 18 && hora < 22
  // Retorna TRUE se estiver aberto
}

const isOpen = checkRestaurantOpen()
if(isOpen){
  spanItem.classList.remove("bg-red-500")
  spanItem.classList.add("bg-green-500")
}else{
  spanItem.classList.remove("bg-green-500")
  spanItem.classList.add("bg-red-500")
}



// ENVIAR O PEDIDO PARA API DO WHATSAPP 01:11:00