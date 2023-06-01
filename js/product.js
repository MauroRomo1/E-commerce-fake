import { verificarUser } from "./helpers.js";
import { Mockdata } from "./fetchProducts.js";

const userLogueado = JSON.parse(localStorage.getItem("userLogueado")) || null;
const containerProduct = document.querySelector("#containerProduct");

verificarUser(userLogueado);

const idProduct = new URL(window.location.href).searchParams.get("id");
const product = Mockdata.find((data) => data.id === parseInt(idProduct));

if (product) {
  containerProduct.innerHTML = `
    <article class="card">
              <div class="row g-0">
                <div class="col-md-6">
                  <img src=${product.image} class="object-fit-contain w-100 p-2" alt="${product.title}" style="height: 350px"  />
                </div>
                <div class="col-md-6">
                 <div class="card-body h-100">
                    <h5 class="card-title">
                    ${product.title}
                    </h5>
                    <p class="card-text">
                     ${product.description}
                    </p>
                    <h4 class="card-text text-center text-success">
                    <b>$${product.price}</b>
                    </h4>
                    <div class="d-grid">
                    <button class="btn btn-primary bt-lg" type="button">
                    <i class="fa-solid fa-cart-plus me-2"></i>
                    Sumar al carrito
                    </button>
                  </div>
                 </div>
                </div>
              </div>
    </article>
    `;
} else {
  containerProduct.innerHTML = `<h2 class="text-white text-center">No se encontro ese producto 🙁</h2>`;
}
