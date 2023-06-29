const contenedorTabla = document.getElementById("contenedorTabla");
const cuerpoTabla = document.getElementById("cuerpoTabla");

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const eliminarUsuario = (index) => {
  usuarios.splice(index, 1);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  cargarTablaUsers();
};

const cargarTablaUsers = () => {
  cuerpoTabla.innerHTML = "";

  if (usuarios.length > 0) {
    usuarios.forEach((usuario, index) => {
      let fila = document.createElement("tr");
      let celda =
        /* HTML */
        ` <th scope="row">${usuario.id}</th>
          <td>${usuario.nombre}</td>
          <td>${usuario.apellido}</td>
          <td>${usuario.email}</td>
          <td class="d-grid gap-2 d-md-flex justify-content-around">
            <button
              type="button"
              title="Eliminar usuario"
              class="btn btn-danger"
              id="btnElimnarUser"
            >
              <i class="fa-solid fa-trash"></i>
            </button>
            <button
              type="button"
              title="Editar usuario"
              class="btn btn-primary"
              id="editUser"
            >
              <i class="fa-solid fa-user-pen "></i>
            </button>
          </td>`;
      fila.innerHTML = celda;
      cuerpoTabla.appendChild(fila);

      fila.querySelector("#btnElimnarUser").addEventListener("click", () => {
        eliminarUsuario(index);
      });
    });
  } else {
    contenedorTabla.innerHTML =
      '<h4 class="text-center text-white">No hay usuarios para cargar.</h4>';
  }
};
cargarTablaUsers();
