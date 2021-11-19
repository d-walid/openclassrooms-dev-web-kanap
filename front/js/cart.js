let products = JSON.parse(localStorage.getItem("cart"));

let productArticle = document.createElement("article");
let productDivImg = document.createElement("div");
let productImg = document.createElement("img");
let productItemContent = document.createElement("div");
let productItemTitlePrice = document.createElement("div");
let productTitle = document.createElement("h2");
let productPrice = document.createElement("p");
let productQuantity = document.createElement("p");
let productSettings = document.createElement("div");
let productSettingsQuantity = document.createElement("div");

function displayProducts() {
  document.querySelector("#cart__items").appendChild(productArticle);
  productArticle.className = "cart__item";
  productArticle.setAttribute("data-id", products[cart].idProduct);

  // display img from the products token
  productArticle.appendChild(productDivImg);
  productDivImg.className = "cart__item__img";
  productDivImg.appendChild(productImg);
  productImg.src = products[cart].img;
  console.log(productImg.src);
}

function displayCart() {
  let EmptyCart = document.querySelector("#cart__items");
  // if the cart is empty, display a message
  if (products === null || products == 0) {
    EmptyCart.innerHTML = "<h2>Votre panier est vide</h2>";
  } else {
    // insert the products with the elements of the cart
    for (cart in products) {
      displayProducts();
    }
  }
}

displayCart();
