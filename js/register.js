const formulario = document.getElementById("formRegistro");
const inputs = document.querySelectorAll("#formRegistro input");

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

class Usuario {
  constructor(nombre, apellido, email, password) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.password = password;
  }
}

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{3,20}$/,
  apellido: /^[a-zA-ZÀ-ÿ\s]{3,20}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  password: /^.{6,12}$/,
};

const campos = {
  usuario: false,
  apellido: false,
  email: false,
  password: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "apellido":
      validarCampo(expresiones.apellido, e.target, "apellido");
      break;
    case "email":
      validarCampo(expresiones.email, e.target, "email");
      break;
    case "password":
      validarCampo(expresiones.password, e.target, "password");
      validarConfirmPassword();
      break;
    case "confirmPassword":
      validarConfirmPassword();
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value.trim())) {
    document.getElementById(`${campo}`).classList.remove("is-invalid");
    document.getElementById(`${campo}`).classList.add("is-valid");
    campos[campo] = true;
  } else {
    document.getElementById(`${campo}`).classList.remove("is-valid");
    document.getElementById(`${campo}`).classList.add("is-invalid");
    campos[campo] = false;
  }
};

const validarConfirmPassword = () => {
  const inputPassword1 = document.getElementById("password");
  const inputPassword2 = document.getElementById("confirmPassword");

  if (inputPassword1.value !== inputPassword2.value) {
    inputPassword2.classList.remove("is-valid");
    inputPassword2.classList.add("is-invalid");
    campos["password"] = false;
  } else {
    inputPassword2.classList.remove("is-invalid");
    inputPassword2.classList.add("is-valid");
    campos["password"] = true;
  }
};

const crearUsuario = () => {
  const inputNombre = document.getElementById("nombre").value;
  const inputApellido = document.getElementById("apellido").value;
  const inputEmial = document.getElementById("email").value;
  const inputPassword = document.getElementById("password").value;

  let validacion = validarUsuario(inputEmial.trim());

  if (!validacion) {
    usuarios.push(
      new Usuario(
        inputNombre.trim().toLocaleLowerCase(),
        inputApellido.trim().toLocaleLowerCase(),
        inputEmial.trim(),
        inputPassword.trim()
      )
    );
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    Swal.fire({
      icon: "success",
      title: "Usuario logueado",
      text: "Redirigiendo para iniciar sesión...",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: () => {
        setTimeout(() => {
          location.replace("./login.html");
        }, 2500);
      },
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "El usuario ya existe",
      text: "Intenta loguearte con los datos corespondientes.",
      confirmButtonColor: "#7b2cbf",
      footer: '<a href="#">¿Quieres inicia sesión?</a>',
    });
  }
};

const validarUsuario = (correo) => {
  let usuarioEncotrado = usuarios.find((user) => {
    return user.email === correo;
  });

  if (usuarioEncotrado) {
    return true;
  } else {
    return false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    validarFormulario(e);
  });
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const terminos = document.getElementById("checkTerminos");
  if (
    campos.nombre &&
    campos.apellido &&
    campos.email &&
    campos.password &&
    terminos.checked
  ) {
    crearUsuario();
    formulario.reset();
    document.querySelectorAll(".is-valid").forEach((input) => {
      input.classList.remove("is-valid");
    });
  } else {
    document.getElementById("msjError").classList.remove("d-none");
    setTimeout(() => {
      document.getElementById("msjError").classList.add("d-none");
    }, 3000);
  }
});
