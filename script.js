// ========================================================
const main = document.querySelector(".main");
const wrapper = document.querySelector(".wrapper");

const form = document.getElementById("form");

// ========================================================
let slider = document.getElementById("myRange");
let output = document.getElementById("value");

output.innerHTML = slider.value;

// ========================================================
//fetching data
let data;
let products;
let productsHTML;
const fetchData = async (filter) => {
  wrapper.classList += " wrapper__loading";
  if (!products) {
    const response = await fetch(`https://dummyjson.com/products`);
    data = await response.json();
    products = data.products;
    // products.map((product) => {
    //   return (main.innerHTML += renderProducts(product));
    // });
  }
  wrapper.classList.remove("wrapper__loading");
  // console.log(products);

  if (filter === "price_low_to_high") {
    console.log(products);
    products.sort((a, b) => a.price - b.price);
  } else if (filter === "price_high_to_low") {
    products.sort((a, b) => b.price - a.price);
  } else if (filter) {
    const items = products.filter((product) => {
      return product.price > 0 && product.price < filter;
    });
    console.log(items);
    let result = items
      .map((item) => {
        return renderProducts(item);
      })
      .join("");
    // console.log(productsHTML);
    return (main.innerHTML = result);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const productInput = document.querySelector(".input");

    const { value } = productInput;
    console.log(value);
    console.log(products);
  });

  productsHTML = products
    .map((product) => {
      return renderProducts(product);
    })
    .join("");

  // console.log(productsHTML);
  main.innerHTML = productsHTML;
};
// console.log(products);

const renderProducts = (product) => {
  return `<div class="product m-10">
  <figure class="image__container">
    <img src="${product.thumbnail}" alt="">
  </figure>
  <div class="product__details">
    <p>ID: <span class="product__details--id">${product.id}</span></p>
    <p>Title: <span class="product__details--title">${product.title}</span></p>
    <p>Description: <span class="product__details--description">${product.description}</span> </p>
    <p>Price: $<span class="product__details--price">${product.price}</span></p>
    <p>Promo: <span class="product__details--discounted-percentage">${product.discountPercentage}</span> %</p>
    <p>Rating: <span class="product__details--rating">${product.rating}</span></p>
    <p>Available: <span class="product__details--stock">${product.stock}</span> units</p>
    <p>Brand: <span class="product__details--brand">${product.brand}</span></p>
    <p>Category: <span class="product__details--category">${product.category}</span></p>
  </div>
</div>`;
};

const optionPicked = (e) => {
  // console.log(e.target.value);
  const selectedOption = e.target.value;
  // console.log(selectedOption);
  fetchData(selectedOption);
};

const onChangeSlider = (e) => {
  const price = e.target.value;
  output.innerHTML = price;
  fetchData(price);
};

fetchData();
