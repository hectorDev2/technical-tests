import { products } from "./products.json";

// ELEMENTOS DOM
const list = document.querySelector("ul");
const checkboxes = document.querySelectorAll('.filter input[type="checkbox"]');
const filterButton = document.querySelector(".filter #filterButton");
const clearButton = document.querySelector(".filter #clearButton");
const buttonClose = document.querySelector(".button-close");
const filterContainer = document.querySelector(".filter-container");
const filterBtn = document.querySelector(".button-filter");
// FUNCIONES AUXILIARES

// OBTENER FILTROS ACTIVOS
const getActiveFilters = () => {
  return Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => ({
      id: checkbox.id,
      value: checkbox.value,
    }));
};

// LIMPIAR LISTA DE PRODUCTOS
const clearProductList = () => {
  list.innerHTML = "";
};

// CREAR Y AÑADIR PRODUCTO AL DOM
const addProductToDOM = (product) => {
  const li = document.createElement("li");
  li.className = "product-item";
  const divText = document.createElement("div");
  divText.className = "product-text";
  divText.textContent = product.name;

  const price = document.createElement("p");
  price.textContent = `${product.price} $`;
  divText.appendChild(price);

  const img = document.createElement("img");
  img.src = `img/${product.img}`;
  divText.appendChild(img);

  li.appendChild(divText);
  const buttonBuy = document.createElement("button");
  buttonBuy.textContent = "Comprar";
  buttonBuy.className = "button-buy";
  li.appendChild(buttonBuy);

  list.appendChild(li);
};

// MOSTRAR PRODUCTOS FILTRADOS
const displayFilteredProducts = (filters) => {
  const filteredProducts = products.filter((product) =>
    filters.some((filter) => filter.value == product.filterId)
  );
  filteredProducts.forEach(addProductToDOM);
};

// MOSTRAR TODOS LOS PRODUCTOS
const displayAllProducts = () => {
  products.forEach(addProductToDOM);
};

// LIMPIAR FILTROS
const clearFilters = () => {
  checkboxes.forEach((checkbox) => (checkbox.checked = false));
};

// MANEJADORES DE EVENTOS

// BOTÓN FILTRAR
filterButton.addEventListener("click", () => {
  const activeFilters = getActiveFilters();

  clearProductList();
  displayFilteredProducts(activeFilters);
  console.log("Filtros activos:", activeFilters);
});
filterButton.addEventListener("onchange", () => {
  const activeFilters = getActiveFilters();
  //add the number of filters active to the button
  const textButton = document.createElement("span");
  textButton.textContent = `:${activeFilters.length}`;
  filterButton.appendChild(textButton);
  clearProductList();
  displayFilteredProducts(activeFilters);
  console.log("Filtros activos:", activeFilters);
});

// BOTÓN LIMPIAR
clearButton.addEventListener("click", () => {
  clearProductList();
  clearFilters();
  displayAllProducts();
});

// BOTÓN CERRAR
buttonClose.addEventListener("click", () => {
  filterContainer.style.display = "none";
});

filterBtn.addEventListener("click", () => {
  filterContainer.style.display = "block";
});
// INICIALIZAR PÁGINA CON TODOS LOS PRODUCTOS
displayAllProducts();
