document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const codeInputContainer = document.getElementById("codeInputContainer");
  const sendButton = document.getElementById("sendButton");
  const messageContainer = document.getElementById("messageContainer");
  const messageText = document.getElementById("messageText");
  const sendButtonCode = document.getElementById("sendButtonCode");
  const invalidEmailMessage2 = document.getElementById("invalidEmailMessage2");
  const invalidCodeMessage3 = document.getElementById("invalidCodeMessage3");
  const invalidEmailMessagePasswordCorrecto = document.getElementById(
    "invalidEmailMessagePasswordCorrecto"
  );
  const invalidEmailMessagePAsswordIncorrecto = document.getElementById(
    "invalidEmailMessagePAsswordIncorrecto"
  );

  const passwordInputContainer = document.getElementById(
    "passwordInputContainer"
  );
  const confirmPasswordInputContainer = document.getElementById(
    "confirmPasswordInputContainer"
  );
  const submitPasswordButton = document.getElementById("submitPasswordButton");

  sendButton.addEventListener("click", function () {
    const email = emailInput.value;
    const textCode = document.getElementById("textCode");

    fetch("/login/recuperarPasswordCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.status === 200) {
          codeInputContainer.style.display = "block";
          sendButton.style.display = "none";
          sendButtonCode.style.display = "block";
          response.json().then((data) => {
            messageText.textContent = data.message;
            messageContainer.style.display = "block";

            setTimeout(() => {
              messageContainer.style.display = "none";
            }, 20000);
          });
        } else {
          codeInputContainer.style.display = "none";
          sendButton.disabled = false;
          invalidEmailMessage.style.display = "block";

          setTimeout(() => {
            invalidEmailMessage.style.display = "none";
          }, 5000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

  sendButtonCode.addEventListener("click", function () {
    const textCode = document.getElementById("textCode");
    console.log("enviar codigo al back", textCode.value);
    fetch("/login/recuperarPasswordCodeCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ textCode: textCode.value }),
    })
      .then((response) => {
        if (response.status === 200) {
          codeInputContainer.style.display = "none";
          sendButtonCode.style.display = "none";
          passwordInputContainer.style.display = "block";
          confirmPasswordInputContainer.style.display = "block";
          submitPasswordButton.style.display = "block";
          sendButtonCode.disabled = true;
          sendButtonCode.style.display = "none";
          console.log("codigo correcto");
        } else if (response.status === 405) {
          console.log("codigo expirado");
          invalidEmailMessage2.style.display = "block";

          setTimeout(() => {
            window.location.replace("/login");
          }, 2000);
        } else {
          console.log("codigo incorrecto");
          invalidCodeMessage3.style.display = "block";
          setTimeout(() => {
            invalidCodeMessage3.style.display = "none";
          }, 3000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

  submitPasswordButton.addEventListener("click", function () {
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      console.log("las contraseñas no coinciden");

      invalidEmailMessagePAsswordIncorrecto.style.display = "block";
      setTimeout(() => {
        invalidEmailMessagePAsswordIncorrecto.style.display = "none";
      }, 2000);

      return;
    }

    const data = {
      password: password,
    };

    ///login/restarPassword

    fetch("/login/restarPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Contraseña actualizada");
          invalidEmailMessagePasswordCorrecto.style.display = "block";
          setTimeout(() => {
            window.location.replace("/login");
          }, 2000);
        } else {
          response.json().then((data) => {
            console.error("Error al actualizar contraseña:", data.message);
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
});
