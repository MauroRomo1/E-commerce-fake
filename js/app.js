import { verificarUser, mostrarProductos } from "./helpers.js";
import { productos } from "./fetchProducts.js";

const userLogueado = JSON.parse(localStorage.getItem("userLogueado")) || null;

const selectCategoria = document.getElementById("selectCategoria");
const selectOrden = document.getElementById("selectOrden");
const inputBusqueda = document.getElementById("inputBusqueda");

verificarUser(userLogueado);

const obtenerCategorias = () => {
  const categoriasUnicas = [
    ...new Set(productos.map((producto) => producto.category)),
  ];
  return categoriasUnicas;
};
const categorias = obtenerCategorias();

const cargarCategorias = (categorias) => {
  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    selectCategoria.appendChild(option);
  });
};
cargarCategorias(categorias);

function filtrarProductos() {
  const categoriaSeleccionada = selectCategoria.value;
  const ordenSeleccionado = selectOrden.value;
  const textoBusqueda = inputBusqueda.value.toLowerCase();

  let productosFiltrados = productos;

  if (categoriaSeleccionada !== "todas") {
    productosFiltrados = productosFiltrados.filter(
      (producto) => producto.category === categoriaSeleccionada
    );
  }

  productosFiltrados = productosFiltrados.filter((producto) =>
    producto.title.toLowerCase().includes(textoBusqueda)
  );

  if (ordenSeleccionado === "mayor-menor") {
    productosFiltrados.sort((a, b) => b.price - a.price);
  } else if (ordenSeleccionado === "menor-mayor") {
    productosFiltrados.sort((a, b) => a.price - b.price);
  }

  mostrarProductos(productosFiltrados);
}
filtrarProductos();

selectCategoria.addEventListener("input", filtrarProductos);
selectOrden.addEventListener("input", filtrarProductos);
inputBusqueda.addEventListener("input", filtrarProductos);
