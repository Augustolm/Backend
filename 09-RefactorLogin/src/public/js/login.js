document.getElementById("loginBtn").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

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
      console.log("response", response);
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
  } else {
    registerForm.style.display = "none";
    loginBtn.style.display = "block";
    clearBtn.style.display = "block";
    registerBtn.style.display = "block";
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
        console.log("response", response);
        if (response.ok) {
          console.log("Registro exitoso");
          window.location.replace("/login/profile");
        } else {
          console.error("Error en el registro");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  });
