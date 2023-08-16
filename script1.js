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
let tempProducts;
const fetchData = async (filter) => {
  //loading spinner
  wrapper.classList += " wrapper__loading";

  //fetching data
  const response = await fetch(`https://dummyjson.com/products`);
  data = await response.json();
  if (data.products.length > 0) {
    products = data.products;
    tempProducts = data.products;

    productsHTML = data.products
      .map((product) => {
        return renderProducts(product);
      })
      .join("");
    main.innerHTML = productsHTML;
  } else {
    console.log("no product available");
  }

  //loading spinner
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
  const selectedOption = e.target.value;
  if (selectedOption === "price_low_to_high") {
    tempProducts.sort((a, b) => a.price - b.price);
  } else if (selectedOption === "price_high_to_low") {
    tempProducts.sort((a, b) => b.price - a.price);
  }
  //   main.innerHTML = "";
  productsHTML = tempProducts
    .map((product) => {
      return renderProducts(product);
    })
    .join("");
  main.innerHTML = productsHTML;
};

const onChangeSlider = (e) => {
  const price = e.target.value;

  output.innerHTML = price;

  const filteredProducts = products.filter((product) => {
    return product.price > 0 && product.price < price;
  });
  console.log(filteredProducts);
  productsHTML = filteredProducts
    .map((product) => {
      return renderProducts(product);
    })
    .join("");
  main.innerHTML = productsHTML;
};

const onSubmit = (e) => {
  e.preventDefault();
  const productInput = document.querySelector(".input");

  const { value } = productInput;
  console.log(value);
  console.log(typeof value);
  const result = products.filter(
    (product) =>
      product.category.includes(value) ||
      product.title.toLowerCase().includes(value.toLowerCase())
  );
  console.log(result);

  if (result.length === 0) {
    main.innerHTML = `<div class="no__product">Products -<span class="value">${value}</span>- not found here</div>`;
  } else {
    productsHTML = result
      .map((item) => {
        return renderProducts(item);
      })
      .join("");
    //   console.log(productsHTML);
    main.innerHTML = productsHTML;
  }
};

fetchData();
// console.log(products);

// if (filter === "price_low_to_high") {
//     console.log(products);
//     products.sort((a, b) => a.price - b.price);
//   } else if (filter === "price_high_to_low") {
//     products.sort((a, b) => b.price - a.price);
//   } else if (filter) {
//     const items = products.filter((product) => {
//       return product.price > 0 && product.price < filter;
//     });
//     console.log(items);
//     let result = items
//       .map((item) => {
//         return renderProducts(item);
//       })
//       .join("");
//     // console.log(productsHTML);
//     return (main.innerHTML = result);
//   }

//   form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const productInput = document.querySelector(".input");

//     const { value } = productInput;
//     console.log(value);
//     console.log(products);
//   });
