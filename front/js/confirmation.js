function orderConfirmation() {
  // The order id will be given to the client when the order is finished and clear the localstorage for security
  const idHtml = document.querySelector("#orderId");
  idHtml.innerHTML = localStorage.getItem("orderId");
  localStorage.clear();
}

orderConfirmation();
