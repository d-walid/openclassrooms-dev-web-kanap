displayProducts();

async function getAllProducts() {
  // Fetch all articles from API with try and catch
  try {
    const response = await fetch("http://localhost:3000/api/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function displayProducts() {
  // Loop through array articles
  // Creating elements corresponding to each article
  // Assign classes to elements

  const products = await getAllProducts();
  products.forEach((product) => {
    const items = document.getElementById("items");
    anchor = document.createElement("a");
    article = document.createElement("article");
    article.classList.add("article");
    img = document.createElement("img");
    img.classList.add("productImage");
    img.alt = product.altTxt;
    title = document.createElement("h3");
    title.classList.add("productName");
    description = document.createElement("p");
    description.classList.add("productDescription");

    // Append elements to another element
    items.appendChild(anchor);
    anchor.appendChild(article);
    article.appendChild(img);
    article.appendChild(title);
    article.appendChild(description);

    // Assign values from API to elements in DOM
    anchor.href = `product.html?id=${product._id}`;
    img.src = product.imageUrl;
    img.altTxt = product.altTxt;
    title.innerHTML = product.name;
    description.innerHTML = product.description;
  });
}
