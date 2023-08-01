// ========================================================
const main = document.querySelector(".main");
const wrapper = document.querySelector(".wrapper");
// console.log(wrapper);

// ========================================================
let slider = document.getElementById("myRange");
let output = document.getElementById("value");
// console.log(slider);

output.innerHTML = slider.value;

const onChange = (e) => {
  const price = e.target.value;
  output.innerHTML = price;
};
// ========================================================
//fetching data
let data;
const fetchData = async () => {
  wrapper.classList += " wrapper__loading";
  // console.log(data);
  if (!data) {
    const response = await fetch(`https://dummyjson.com/products`);
    const data = await response.json();
    // console.log(data);
    const products = data.products;
    // console.log(products);
    products.map((product) => {
      return (main.innerHTML += renderProducts(product));
    });
  }

  wrapper.classList.remove("wrapper__loading");
};

const renderProducts = (product) => {
  return `<div class="product m-10">
  <figure class="image__container">
    <img src="${product.thumbnail}" alt="">
  </figure>
  <div class="product__details">
    <p>ID: <span class="product__details--id">${product.id}</span></p>
    <p>Title: <span class="product__details--title">${product.title}</span></p>
    <p>Description: <span class="product__details--description">${product.description}</span> </p>
    <p>Price:$ <span class="product__details--price">${product.price}</span></p>
    <p>Promo: <span class="product__details--discounted-percentage">${product.discountPercentage}</span> %</p>
    <p>Rating: <span class="product__details--rating">${product.rating}</span></p>
    <p>Available: <span class="product__details--stock">${product.stock}</span> units</p>
    <p>Brand: <span class="product__details--brand">${product.brand}</span></p>
    <p>Category: <span class="product__details--category">${product.category}</span></p>
  </div>
</div>`;
};

fetchData();
