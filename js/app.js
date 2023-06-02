import { cargarProductos, verificarUser } from "./helpers.js";
import { Mockdata } from "./fetchProducts.js";

let products = Mockdata;
let productsEdit = [...products];

const userLogueado = JSON.parse(localStorage.getItem("userLogueado")) || null;
const productsContainer = document.querySelector("#productsContainer");
const searchInput = document.querySelector("#searchInput");
const contendorCategorias = document.querySelector("#contendorCategorias");
const ordenProductos = document.querySelector("#ordenProductos");

verificarUser(userLogueado);
cargarProductos(products, productsContainer);

const category = Array.from(
  new Set(products.map((product) => product.category))
);

const cargarCategorias = (categorias) => {
  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.innerText = categoria;
    option.value = categoria;
    contendorCategorias.appendChild(option);
  });
};
cargarCategorias(category);

const searchProduct = () => {
  products = productsEdit.filter((producto) =>
    producto.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  console.log(products);
  cargarProductos(products, productsContainer);
};

searchInput.addEventListener("input", () => {
  searchProduct(products);
});

ordenProductos.addEventListener("input", (e) => {
  if (e.target.value === "todos") {
    cargarProductos(products, productsContainer);
  }
  if (e.target.value === "mayorPrecio") {
    cargarProductos(
      productsEdit.sort((a, b) => b.price - a.price),
      productsContainer
    );
  }

  if (e.target.value === "MenorPrecio") {
    cargarProductos(
      productsEdit.sort((a, b) => a.price - b.price),
      productsContainer
    );
  }
});
