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
      const productImg = document.createElement("img");
      const img = document.querySelector(".item__img").appendChild(productImg);
      const price = document.querySelector("#price");

      title.innerHTML = product.name;
      description.innerHTML = product.description;
      img.src = product.imageUrl;
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
  addToCart.addEventListener("click", () => {
    let idBasket = 0;
    const product = {
      idBasket: idBasket,
      idProduct: getUrlSearchParams(),
      name: document.querySelector("#title").innerHTML,
      price: document.querySelector("#price").innerHTML,
      colors: document.querySelector("#colors").value,
      quantity: document.querySelector("#quantity").value,
    };
    let products = localStorage.getItem("cart");
    let productArray = [];
    if (products != null) {
      // If the cart isn't empty, it will push in the existing array
    } else {
      productArray.push(product);
    }

    let test = JSON.parse(localStorage.getItem("cart"));
    console.log(test);
    if (product.idProduct) {
      alert("trouvé");
    } else {
      alert("non trouvé");
    }
    localStorage.setItem("cart", JSON.stringify(productArray));
  });
}
addProductToCart();
