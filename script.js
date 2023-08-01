let slider = document.getElementById("myRange");
let output = document.getElementById("value");

// console.log(slider);

output.innerHTML = slider.value;

const onChange = (e) => {
  const price = e.target.value;
  output.innerHTML = price;
};

//fetching data

const fetchData = async () => {
  const response = await fetch(`https://dummyjson.com/products`);
  const data = await response.json();
  console.log(data);
};

fetchData();
