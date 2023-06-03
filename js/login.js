// const usuarios = [
//   {
//     id: 1,
//     nombre: "Mauro",
//     apellido: "Romo",
//     edad: 23,
//     email: "mauroromo1999@outlook.com",
//     password: "mauro123456",
//   },
//   {
//     id: 2,
//     nombre: "Pablo",
//     apellido: "Iñigo",
//     edad: 23,
//     email: "pabloiñigo@gmail.com",
//     password: "pablo123456",
//   },
//   {
//     id: 3,
//     nombre: "Lucas",
//     apellido: "Trello",
//     edad: 23,
//     email: "lucastrello@gmail.com",
//     password: "lucas123456",
//   },
// ];
// localStorage.setItem("usuarios", JSON.stringify(usuarios));

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
  {
    id: 1,
    nombre: "nombreEjemplo",
    apellido: "apellidoEjemplo",
    edad: 23,
    email: "correoEjeomplo@ejemplo.com",
    password: "ejemplo123456",
  },
];

const formLogin = document.querySelector("#login");
const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const alertError = document.querySelector("#alertError");

const logueoUser = () => {
  const usuarioEncontrado = usuarios.find(
    (user) =>
      user.email === userEmail.value && user.password === userPassword.value
  );

  if (usuarioEncontrado) {
    localStorage.setItem("userLogueado", JSON.stringify(usuarioEncontrado));
    location.replace("../index.html");
  } else {
    alertError.classList.remove("d-none");
  }
};

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  alertError.classList.add("d-none");
  logueoUser();
});
