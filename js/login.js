const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const formLogin = document.querySelector("#login");
const loginBtn = document.querySelector("#loginBtn");
const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const alertError = document.querySelector("#alertError");

const verificarRegexpEmail = (emailValue) => {
  let resultado = false;
  if (
    emailValue.length >= 6 &&
    emailValue.length <= 60 &&
    emailValue.match(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    )
  ) {
    resultado = true;
  }
  return resultado;
};

const verificarRegexpPassword = (passValue) => {
  let resultado = false;
  if (
    passValue.length >= 6 &&
    passValue.length <= 60 &&
    passValue.match(/[a-zA-Z0-9]/)
  ) {
    resultado = true;
  }
  return resultado;
};

const logueoUser = () => {
  const usuarioEncontrado = usuarios.find(
    (user) =>
      user.email === userEmail.value && user.password === userPassword.value
  );

  if (
    verificarRegexpEmail(userEmail.value.toLowerCase()) &&
    verificarRegexpPassword(userPassword.value) &&
    usuarioEncontrado
  ) {
    alertError.classList.add("d-none");
    let { id, rol, nombre, apellido, edad, email } = usuarioEncontrado;
    localStorage.setItem(
      "userLogueado",
      JSON.stringify({ id, rol, nombre, apellido, edad, email })
    );
    loginBtn.setAttribute("disabled", "");
    loginBtn.innerHTML =
      /* HTML */
      `
        <span
          class="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Cargando...
      `;
    setTimeout(() => {
      location.replace("../index.html");
    }, 1000);
  } else {
    alertError.classList.remove("d-none");
    userPassword.value = "";
    userPassword.focus();
  }
};

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  logueoUser();
});
