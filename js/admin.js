import { verificarUser } from "./helpers.js";

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const userLogueado = JSON.parse(localStorage.getItem("userLogueado")) || null;
const cuerpoTabla = document.querySelector("#cuerpoTabla");
const updateUserModal = new bootstrap.Modal(
  document.getElementById("updateUserModal")
);
const contenedorForm = document.querySelector("#contenedorForm");

if (!userLogueado || userLogueado.rol !== "Administrador") {
  console.warn("no tienes permisos para estar en esta pagina.");
  Swal.fire({
    icon: "error",
    title: "<h4>No tienes permisos para estar aquí.</h4>",
    text: "Redirigiendo a la pagina principal...",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: () => {
      setTimeout(() => {
        location.replace("../index.html");
      }, 2500);
    },
  });
} else {
  cargarTabla();
}

const abrirModalUpdateUser = (index) => {
  contenedorForm.innerHTML = "";
  const form = document.createElement("form");
  const cuerpoForm =
    /* HTML */
    `<div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          value="${usuarios[index].nombre}"
        />
      </div>
      <div class="mb-3">
        <label for="apellido" class="form-label">Apellido</label>
        <input
          type="text"
          class="form-control"
          id="apellido"
          value="${usuarios[index].apellido}"
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Correo electrónico</label>
        <input
          type="email"
          class="form-control"
          id="email"
          value="${usuarios[index].email}"
        />
      </div>
      <div class="mb-3">
        <label for="rol" class="form-label">Roles</label>
        <select class="form-select" id="rol">
          <option value="${usuarios[index].rol}" selected disabled>
            ${usuarios[index].rol}
          </option>
          <option value="Usuario">Usuario</option>
          <option value="Administrador">Administrador</option>
        </select>
      </div>
      <div class="mb-3 d-flex justify-content-end">
        <button type="button" class="btn btn-primary" id="btnActualizarUsuario">
          Actualizar
        </button>
      </div>`;
  form.innerHTML = cuerpoForm;
  contenedorForm.append(form);

  form.querySelector("#btnActualizarUsuario").addEventListener("click", () => {
    actualizarUsuario(index);
  });

  updateUserModal.show();
};

const eliminarUser = (index) => {
  let validacion = confirm("¿Esta seguro de eliminar este usuario?");
  if (validacion) {
    usuarios.splice(index, 1);
    cargarTabla();
  }
};

const actualizarUsuario = (index) => {
  usuarios[index].nombre = document.querySelector("#nombre").value;
  usuarios[index].apellido = document.querySelector("#apellido").value;
  usuarios[index].email = document.querySelector("#email").value;
  usuarios[index].rol = document.querySelector("#rol").value;

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  cargarTabla();
  updateUserModal.hide();
};

const cargarTabla = () => {
  cuerpoTabla.innerHTML = "";
  usuarios.forEach((usuario, index) => {
    let fila = document.createElement("tr");
    let celda =
      /* HTML */
      `
        <th scope="row">${usuario.id}</th>
        <td>${usuario.nombre}</td>
        <td>${usuario.apellido}</td>
        <td>${usuario.email}</td>
        <td>${usuario.rol}</td>
        <td class="d-flex gap-1 justify-content-around">
          <button type="button" class="btn btn-primary" id="btnEditUser">
            <i class="fa-solid fa-user-pen"></i>
          </button>
          <button type="button" class="btn btn-primary" id="btnEliminarUser">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      `;
    fila.innerHTML = celda;
    cuerpoTabla.append(fila);

    fila.querySelector("#btnEditUser").addEventListener("click", () => {
      abrirModalUpdateUser(index);
    });

    fila.querySelector("#btnEliminarUser").addEventListener("click", () => {
      eliminarUser(index);
    });
  });
};
verificarUser(userLogueado);
