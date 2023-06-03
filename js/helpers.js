const deslogueo = () => {
  let seguro = confirm("¿Esta seguro que quiere Cerrar sesión?");

  if (seguro) {
    localStorage.removeItem("userLogueado");
    location.reload();
  }
};

export const verificarUser = (user) => {
  if (user) {
    const contenedorLoginRegist = document.querySelector(
      "#contenedorLoginRegist"
    );
    contenedorLoginRegist.innerHTML = `
          <li class="nav-item dropdown">
          <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          >
          Bienvenido ${user.nombre}
          <i class="fa-solid fa-circle-user fa-2xl"></i>
          </a>
          <ul
          class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start text-center"
          >
          <li><a class="dropdown-item" href="#">Ver perfil</a></li>
          <li><a class="dropdown-item" href="#">Configuracion</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li>
          <button class="dropdown-item text-danger" id="btnDeslogueo" type="button">Cerrar sesión</button>
          </li>
          </ul>
          </li>`;

    const btnDeslogueo = document.querySelector("#btnDeslogueo");

    btnDeslogueo.addEventListener("click", (e) => {
      e.preventDefault();
      deslogueo();
    });
  }
};

const pillTheme = (category) => {
  switch (category) {
    case "electronics":
      return "info";
    case "jewelery":
      return "warning";
    case `men's clothing`:
      return "primary";
    case `women's clothing`:
      return "success";
    default:
      return "secondary";
  }
};

export function mostrarProductos(productos) {
  productosContainer.innerHTML = "";

  if (productos.length === 0) {
    const mensajeElement = document.createElement("h2");
    mensajeElement.classList.add("text-center", "text-muted");
    mensajeElement.textContent = "Productos no encontrados";
    productosContainer.appendChild(mensajeElement);
  } else {
    productos.forEach((producto) => {
      const productoElement = document.createElement("article");
      productoElement.classList.add("col");
      productoElement.innerHTML = `
        <div class="card h-100">
          <h6 class="pt-2 px-2">
           <span class="badge rounded-pill text-bg-${pillTheme(
             producto.category
           )}">${producto.category}</span>
          </h6>
          <img src="${producto.image}" style="height: 250px"
          class="card-img-top object-fit-contain pt-2 px-2" alt="${
            producto.title
          }">
          <div class="card-body">
            <h5 class="card-title">${producto.title}</h5>
          </div>
          <div class="card-footer d-grid mx-auto bg-white border-0">
              <h4 class="card-text text-center text-success">
                <b>$${producto.price}</b>
              </h4>
              <a class="btn btnComprar" href="../pages/product.html?id=${
                producto.id
              }">Ver más</a>
          </div>
        </div>
      `;
      productosContainer.appendChild(productoElement);
    });
  }
}
