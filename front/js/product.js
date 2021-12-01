getOneArticle();

function getUrlSearchParams() {
  // get the id product from href
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  const idProduct = searchParams.get("id");
  return idProduct;
}

function getOneArticle() {
  // fetch the article with getUrlSearchParams function
  const idProduct = getUrlSearchParams();
  fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then((response) => response.json())
    .then((product) => {
      const title = document.querySelector("#title");
      const description = document.querySelector("#description");
      const price = document.querySelector("#price");

      let productImg = document.createElement("img");
      document.querySelector(".item__img").appendChild(productImg);
      productImg.src = product.imageUrl;

      title.innerHTML = product.name;
      description.innerHTML = product.description;
      price.innerHTML = product.price;

      for (colors of product.colors) {
        const productColor = document.createElement("option");
        document.querySelector("#colors").appendChild(productColor);
        productColor.value = colors;
        productColor.innerHTML = colors;
      }
    });
}

function addProductToCart() {
  // select a product from the page and add it to the cart with button addeventlistener and localstorage
  const addToCart = document.querySelector("#addToCart");
  const choiceQuantity = document.querySelector("#quantity");
  addToCart.addEventListener("click", (event) => {
    event.preventDefault();
    if (
      choiceQuantity.value > 0 &&
      choiceQuantity.value <= 100 &&
      choiceQuantity.value != 0
    ) {
      let idBasket = 0;
      let product = {
        idBasket: idBasket,
        idProduct: getUrlSearchParams(),
        name: document.querySelector("#title").innerHTML,
        price: document.querySelector("#price").innerHTML,
        colors: document.querySelector("#colors").value,
        quantity: document.querySelector("#quantity").value,
        imgProduct: document.querySelector(".item__img").src,
      };

      let products = JSON.parse(localStorage.getItem("cart"));

      if (products) {
        // if the product is found in the cart with the same color and idProduct, we add the quantity
        const isProductInTheCart = products.find(
          (productInCart) =>
            productInCart.idProduct === product.idProduct &&
            productInCart.colors === product.colors
        );
        if (isProductInTheCart) {
          let newQuantity =
            parseInt(isProductInTheCart.quantity) + parseInt(product.quantity);
          isProductInTheCart.quantity = newQuantity;
          localStorage.setItem("cart", JSON.stringify(products));
          redirectionToCartPage();
        } else {
          // if the product is not found in the cart, add it to the cart
          products.push(product);
          localStorage.setItem("cart", JSON.stringify(products));
          redirectionToCartPage();
        }
      } else {
        // if the cart is empty, add the product to the empty cart
        products = [];
        products.push(product);
        localStorage.setItem("cart", JSON.stringify(products));
        redirectionToCartPage();
      }
    }
  });
}

function redirectionToCartPage() {
  if (
    window.confirm(
      "Votre produit a été ajouté au panier. Pour le consulter, cliquez sur OK."
    )
  ) {
    window.location.href = "cart.html";
  }
}
addProductToCart();
