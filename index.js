import { v4 as uuidv4 } from "https://jspm.dev/uuid";

let menuArray = [
  {
    image: "./images/pizza.png",
    name: "Pizza",
    ingredients: ["pepperoni", "mushrom", "mozarella"],
    id: uuidv4(),
    price: 14,
  },
  {
    image: "./images/hamburger.png",
    name: "Hamburger",
    ingredients: ["beef", "cheese", "lettuce"],
    price: 12,
    id: uuidv4(),
  },
  {
    image: "./images/beer.png",
    name: "Beer",
    ingredients: ["grain, hops, yeast, water"],
    price: 12,
    id: uuidv4(),
  },
];

const foodItems = document.querySelector(".food-items");
const Order = document.querySelector(".order");
const menuOrdered = document.querySelector(".snacks-order");
const totalPrice = document.getElementById("total-price");
const completeOrderBtn = document.getElementById("order-button");
const form = document.getElementById("form");
const closeFormBtn = document.getElementById("close-form");
const customerName =  document.getElementById('customerName')

document.addEventListener("click", function (e) {
  // console.log(e.target.id)
  if (e.target.dataset.plus) {
    placeInOrder(e.target.dataset.plus);
  } else if (e.target.dataset.remove) {
    removeOrder(e.target.dataset.remove, e);
  } else if(e.target === completeOrderBtn) {
    completeOrder()
  } else if(e.target === closeFormBtn) {
    form.style.display = 'none'
}
});


form.addEventListener('submit', function(e) {
    e.preventDefault()
    form.style.display = 'none'
    Order.innerHTML = `
        <div class = 'customer'>
        <p>thanks, ${customerName.value}! Your order is on its way!  </p>
        <div>
    `
})

let totalPriceArray = [];

function placeInOrder(menuId) {
  Order.style.display = "block";
  let menuOrder = "";
  let sum = 0;

  menuArray.filter((menu) => {
    if (menu.id === menuId) {
      menuOrder += `
            <div class= 'snacks total-price'>
             <h3 class= 'finals' >${menu.name}</h3>
                <div class="snacks-name remove">
                    <p data-remove = ${menu.id}>remove</p>
                </div>
                <h3>$${menu.price}</h3>
            </div>
            `;
      menuOrdered.innerHTML += menuOrder;

      totalPriceArray.push(`${menu.price}`);

      totalPriceArray.forEach((price) => {
        sum += parseInt(price);
        totalPrice.textContent = `$${sum}`;
      });
    }
  });
}

function removeOrder(menuId, e) {
  let sum = 0;

  menuArray.filter((menu) => {
    if (menu.id === menuId) {
      e.target.parentElement.parentElement.style.display = "none";

      let index = totalPriceArray.indexOf(`${menu.price}`);
      totalPriceArray.splice(index, 1);

      totalPriceArray.forEach((price) => {
        sum += parseInt(price);
        totalPrice.textContent = `$${sum}`;
        console.log(menuOrdered);
      });
    }
  });
  if (!totalPriceArray.length) {
    console.log("empty");
    Order.style.display = "none";
  }
}

function completeOrder() {
  form.style.display = "block";
}

function renderMenu() {
  console.log(menuArray);
  let items = "";
  menuArray.forEach((menu) => {
    items += `
        <div class="snacks">
            <img src= ${menu.image} alt= ${menu.name} id = ${menu.id}>
            <div class="snacks-name">
                <h3>${menu.name}</h3>
                <p>${menu.ingredients}</p>
                <h3>$${menu.price}</h3>
            </div>
            <i class="fa-solid fa-plus" data-plus = ${menu.id}></i>
        </div>
        `;
  });

  foodItems.innerHTML = items;
}
renderMenu();

if (totalPriceArray.length === 0) {
  console.log("yes");
  Order.classList.add(".hidden");
  // Order.classList.remove('order')
}
