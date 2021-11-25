let products = JSON.parse(localStorage.getItem("cart"));

function variablesProduct() {
  productArticle = document.createElement("article");
  productDivImg = document.createElement("div");
  productImg = document.createElement("img");

  // Variables about items div
  productItemContent = document.createElement("div");
  productItemTitlePrice = document.createElement("div");
  productItemContentSettings = document.createElement("div");
  productItemContentSettingsQuantity = document.createElement("div");
  productItemContentSettingsDelete = document.createElement("div");

  // Variable about product informations
  productTitle = document.createElement("h2");
  productColor = document.createElement("p");
  productPrice = document.createElement("p");
  productTitleQuantity = document.createElement("p");
  productQuantity = document.createElement("input");
  productDelete = document.createElement("p");
}

function appendChildProducts() {
  document.querySelector("#cart__items").appendChild(productArticle);
  productArticle.appendChild(productItemContent);
  productItemContent.appendChild(productItemTitlePrice);
  productItemTitlePrice.appendChild(productTitle);
  productTitle.appendChild(productColor);
  productItemTitlePrice.appendChild(productPrice);

  // AppendChild about ItemSettings
  productItemContent.appendChild(productItemContentSettings);
  productItemContentSettings.appendChild(productItemContentSettingsQuantity);
  productItemContentSettingsQuantity.appendChild(productTitleQuantity);
  productItemContentSettingsQuantity.appendChild(productQuantity);
  productItemContentSettings.appendChild(productItemContentSettingsDelete);
  productItemContentSettingsDelete.appendChild(productDelete);
}

function displayProducts() {
  variablesProduct();
  appendChildProducts();

  productArticle.className = "cart__item";
  productArticle.setAttribute("data-id", products[cart].idProduct);
  productItemContent.className = "cart__item__content";
  productItemTitlePrice.className = "cart__item__content__titlePrice";
  productTitle.innerHTML = products[cart].name;
  productColor.innerHTML = products[cart].colors;
  productPrice.innerHTML = products[cart].price + " €";
  productItemContentSettings.className = "cart__item__content__settings";

  // Insertion about quantity product
  productItemContentSettingsQuantity.className =
    "cart__item__content__settings__quantity";
  productTitleQuantity.innerHTML = "Quantité : ";
  productQuantity.value = products[cart].quantity;
  productQuantity.className = "itemQuantity";
  productQuantity.setAttribute("type", "number");
  productQuantity.setAttribute("min", "1");
  productQuantity.setAttribute("max", "100");
  productQuantity.setAttribute("name", "itemQuantity");
  productItemContentSettingsDelete.className =
    "cart__item__content__settings__delete";
  productDelete.className = "deleteItem";
  productDelete.innerHTML = "Supprimer";
}

function getTotalPriceOfProducts() {
  // get the totals price from the product and display it
  let totalPrice = 0;
  for (cart in products) {
    totalPrice += products[cart].price * products[cart].quantity;
  }
  document.querySelector("#totalPrice").innerHTML = totalPrice;
}

function modifyQuantityProduct() {
  // modify the quantity of the product and update the total price of the cart when the quantity is modified
  let itemQuantity = document.querySelectorAll(".itemQuantity");
  for (let k = 0; k < itemQuantity.length; k++) {
    itemQuantity[k].addEventListener("change", function () {
      products[k].quantity = itemQuantity[k].value;
      localStorage.setItem("cart", JSON.stringify(products));
      getTotalPriceOfProducts();
    });
  }
}

function deleteProduct() {
  // delete the product from the cart by clicking on the productDelete element
  let deleteItem = document.querySelectorAll(".deleteItem");
  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", (event) => {
      event.preventDefault();
      let idProduct =
        event.target.parentNode.parentNode.parentNode.getAttribute("data-id");
      products.splice(idProduct, 1);
      localStorage.setItem("cart", JSON.stringify(products));
      location.reload();
    });
  }
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
      getTotalPriceOfProducts();
    }
  }
}

displayCart();
deleteProduct();
modifyQuantityProduct();

function validFirstName() {
  // valid the first name of the form and display an error message if the first name is not valid

  let regexName = /^[a-zA-Z]+$/;
  let firstName = document.querySelector("#firstName");
  let errorFirstName = document.querySelector("#firstNameErrorMsg");

  if (regexName.test(firstName.value) == true) {
    errorFirstName.innerHTML = "";
  } else {
    errorFirstName.innerHTML = "Veuillez entrer un prénom valide";
    errorFirstName.className = "error";
  }
}

function validLastName() {
  // valid the last name of the form and display an error message if the last name is not valid

  let regexName = /^[a-zA-Z]+$/;
  let lastName = document.querySelector("#lastName");
  let errorLastName = document.querySelector("#lastNameErrorMsg");

  if (regexName.test(lastName.value) == true) {
    errorLastName.innerHTML = "";
  } else {
    errorLastName.innerHTML = "Veuillez entrer un nom valide";
    errorLastName.className = "error";
  }
}

function validAddressPostal() {
  // valid the adress postal of the form and display an error message if the adress postal is not valid

  let regexAddressPostal =
    /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
  let addressPostal = document.querySelector("#address");
  let errorAddressPostal = document.querySelector("#addressErrorMsg");

  if (regexAddressPostal.test(addressPostal.value) == true) {
    errorAddressPostal.innerHTML = "";
  } else {
    errorAddressPostal.innerHTML = "Veuillez entrer une adresse valide";
    errorAddressPostal.className = "error";
  }
}

function validCity() {
  // valid the city of the form and display an error message if the city is not valid

  let regexCity = /^[a-zA-Z]+$/;
  let city = document.querySelector("#city");
  let errorCity = document.querySelector("#cityErrorMsg");

  if (regexCity.test(city.value) == true) {
    errorCity.innerHTML = "";
  } else {
    errorCity.innerHTML = "Veuillez entrer une ville valide";
    errorCity.className = "error";
  }
}

function validEmail() {
  // valid the email of the form and display an error message if the email is not valid

  let regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
  let email = document.querySelector("#email");
  let errorEmail = document.querySelector("#emailErrorMsg");

  if (regexEmail.test(email.value) == true) {
    errorEmail.innerHTML = "";
  } else {
    errorEmail.innerHTML = "Veuillez entrer un email valide";
    errorEmail.className = "error";
  }
}

function getForm() {
  let form = document.querySelector(".cart__order__form");

  form.firstName.addEventListener("blur", validFirstName);
  form.lastName.addEventListener("blur", validLastName);
  form.address.addEventListener("blur", validAddressPostal);
  form.city.addEventListener("blur", validCity);
  form.email.addEventListener("blur", validEmail);
}

function sendForm() {
  getForm();
  // send the form when the button is clicked
  let btnSubmit = document.querySelector(".cart__order__form__submit");
  btnSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let address = document.querySelector("#address").value;
    let city = document.querySelector("#city").value;
    let email = document.querySelector("#email").value;

    let idProducts = [];
    for (let i = 0; i < products.length; i++) {
      idProducts.push(products[cart].idProduct);
    }

    console.log(idProducts);

    const order = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email,
      },
      products: products,
    };
    console.log(order);
    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    console.log(options);
    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  });
}
sendForm();
