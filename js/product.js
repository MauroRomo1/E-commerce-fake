import { verificarUser } from "./helpers.js";
import { productos } from "./fetchProducts.js";

const userLogueado = JSON.parse(localStorage.getItem("userLogueado")) || null;
const containerProduct = document.querySelector("#containerProduct");

verificarUser(userLogueado);

const idProduct = new URL(window.location.href).searchParams.get("id");
const producto = productos.find((data) => data.id === parseInt(idProduct));

if (producto) {
  containerProduct.innerHTML = `
    <article class="card">
              <div class="row g-0">
                <div class="col-md-6">
                  <img src=${producto.image} class="object-fit-contain w-100 p-2" alt="${producto.title}" style="height: 350px"  />
                </div>
                <div class="col-md-6">
                 <div class="card-body h-100">
                    <h5 class="card-title">
                    ${producto.title}
                    </h5>
                    <p class="card-text">
                     ${producto.description}
                    </p>
                    <h4 class="card-text text-center text-success">
                    <b>$${producto.price}</b>
                    </h4>
                    <div class="d-grid">
                    <a href="../pages/error404.html" class="btn btnComprar bt-lg" type="button">
                    <i class="fa-solid fa-cart-plus me-2"></i>
                    Sumar al carrito
                    </a>
                  </div>
                 </div>
                </div>
              </div>
    </article>
    `;
} else {
  containerProduct.innerHTML = `<h2 class="text-white text-center">No se encontro ese producto 🙁</h2>`;
}
