document.getElementById("loginBtn").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    // Validar que los campos no estén vacíos
    console.error("Por favor ingrese su correo electrónico y contraseña");
    return;
  }

  const data = {
    email: email,
    password: password,
  };

  fetch("/login/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Loguin exitoso");
        window.location.replace("/login/profile");
      } else {
        response.json().then((data) => {
          console.error("Error al iniciar sesión:", data.message);
          const errorDiv = document.getElementById("errorDiv");
          errorDiv.textContent = data.message;
          errorDiv.style.display = "block";

          setTimeout(() => {
            errorDiv.style.display = "none";
          }, 5000);
        });
      }
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
});

document.getElementById("registerBtn").addEventListener("click", function () {
  let registerForm = document.getElementById("registerForm");
  let loginBtn = document.getElementById("loginBtn");
  let clearBtn = document.getElementById("clearBtn");
  let registerBtn = document.getElementById("registerBtn");
  let registerSubmitBtn = document.getElementById("registerSubmitBtn");
  let clearRegisterBtn = document.getElementById("clearRegisterBtn");
  let cancelBtn = document.getElementById("cancelBtn");
  let lastname = document.getElementById("lastname").value;
  let age = document.getElementById("age").value;

  if (registerForm.style.display === "none") {
    registerForm.style.display = "block";
    loginBtn.style.display = "none";
    clearBtn.style.display = "none";
    registerBtn.style.display = "none";
    recuperarPassword1.style.display = "none";
  } else {
    registerForm.style.display = "none";
    loginBtn.style.display = "block";
    clearBtn.style.display = "block";
    registerBtn.style.display = "block";
    recuperarPassword1.style.display = "block";
  }
  document.getElementById("loginForm").reset(); // Restablecer los campos del formulario al registrarse
});

document
  .getElementById("clearRegisterBtn")
  .addEventListener("click", function () {
    document.getElementById("email").value = "";
  });

document
  .getElementById("registerSubmitBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const usuario = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const lastName = document.getElementById("lastname").value;

    if (!usuario || !password || !email || !age || !lastName) {
      console.error("Por favor complete todos los campos");
      return;
    }

    const data = {
      usuario: usuario,
      password: password,
      email: email,
      lastName: lastName,
      age: age,
    };

    fetch("/login/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            const successDiv = document.getElementById("successDiv");
            successDiv.textContent =
              "Usuario creado con éxito. Favor de iniciar sesión nuevamente.";
            successDiv.style.display = "block";

            setTimeout(() => {
              successDiv.style.display = "none";
              window.location.replace("/login");
            }, 3000); // 3000 milisegundos = 3 segundos
          });
        } else {
          response.json().then((data) => {
            console.error("Error en el registro:", data.message);
            const errorDiv = document.getElementById("errorDiv");
            errorDiv.textContent = data.message;
            errorDiv.style.display = "block";

            setTimeout(() => {
              errorDiv.style.display = "none";
            }, 5000);
          });
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  });

document
  .getElementById("recuperarPassword1")
  .addEventListener("click", function () {
    window.location.replace("/login/recuperarPassword");
  });
