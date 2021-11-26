function orderConfirmation() {
  const idHtml = document.querySelector("#orderId");
  idHtml.innerHTML = localStorage.getItem("orderId");
  localStorage.clear();
}

orderConfirmation();
