import { cargarProductos, verificarUser } from "./helpers.js";
import { mockData } from "./fetchProducts.js";

let productsEdit = [...mockData];
localStorage.setItem("ordenProductos", JSON.stringify(""));

const userLogueado = JSON.parse(localStorage.getItem("userLogueado")) || null;
const productsContainer = document.querySelector("#productsContainer");
const searchInput = document.querySelector("#searchInput");
const contendorCategorias = document.querySelector("#contendorCategorias");
const ordenProductosSelect = document.querySelector("#ordenProductos");

verificarUser(userLogueado);
cargarProductos(mockData, productsContainer);

const category = Array.from(
  new Set(mockData.map((product) => product.category))
);

const cargarCategorias = (categorias) => {
  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.innerText = categoria;
    option.classList.add("text-capitalize");
    option.value = categoria;
    contendorCategorias.appendChild(option);
  });
};
cargarCategorias(category);

const ordenarPorCategoria = (categoriaValue) => {
  console.log("La categoria es: " + categoriaValue);
};

const ordenProductos = (ordenValue) => {
  localStorage.setItem("ordenProductos", JSON.stringify(ordenValue));
  if (ordenValue === "todos") {
    productsEdit = mockData.filter((producto) =>
      producto.title.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    cargarProductos(productsEdit, productsContainer);
  }
  if (ordenValue === "mayorPrecio") {
    cargarProductos(
      productsEdit.sort((a, b) => b.price - a.price),
      productsContainer
    );
  }
  if (ordenValue === "MenorPrecio") {
    cargarProductos(
      productsEdit.sort((a, b) => a.price - b.price),
      productsContainer
    );
  }
};

const searchProducts = () => {
  const orden = JSON.parse(localStorage.getItem("ordenProductos"));

  productsEdit = mockData.filter((producto) =>
    producto.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  ordenProductos(orden);
  cargarProductos(productsEdit, productsContainer);
};

contendorCategorias.addEventListener("input", (e) => {
  ordenarPorCategoria(e.target.value);
});

ordenProductosSelect.addEventListener("input", (e) => {
  ordenProductos(e.target.value);
});

searchInput.addEventListener("input", () => {
  searchProducts(mockData);
});
