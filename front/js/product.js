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
  // select a product from the page and add it to the cart with button addeventlistener
  const idProduct = getUrlSearchParams();
  const btnAddToCart = document.querySelector("#addToCart");
  btnAddToCart.addEventListener("click", (event) => {
    event.preventDefault();
    let detailsProduct = {
      id: idProduct,
      quantity: document.querySelector("#quantity").value,
      color: document.querySelector("#colors").value,
      nameProduct: document.querySelector("#title").innerHTML,
      priceProduct: document.querySelector("#price").innerHTML,
      descriptionProduct: document.querySelector("#description").innerHTML,
    };
    localStorage.setItem("detailsProduct", JSON.stringify(detailsProduct));
    console.log(detailsProduct);
  });
}
addProductToCart();
