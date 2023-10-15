const deleteButtons = document.querySelectorAll(".btn-delete");
deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const userId = button.dataset.userId;
    console.log("Eliminar Button clicked for user ID:", userId);

    const url = `/api/login/delete/${userId}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Usuario eliminado exitosamente");
          window.location.replace("/api/gestion/users");
        } else {
          response.json().then(() => {
            console.error("Error al eliminar usuario", response.status);
            const errorDiv = document.getElementById("errorDiv");
            errorDiv.textContent = response.status;
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

///users/rol/:id
const rolButtons = document.querySelectorAll(".btn-rol");
rolButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const userId = button.dataset.userId;
    console.log("Rol Button clicked for user ID:", userId);

    const url = `/api/users/rol/${userId}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("cambio de rol exitoso");
          window.location.replace("/api/gestion/users");
        } else {
          response.json().then(() => {
            console.error("Error al cambiar de rol", response.status);
            const errorDiv = document.getElementById("errorDiv");
            errorDiv.textContent = "Error al cambiar de rol";
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

document
  .querySelector(".eliminarUsuarios")
  .addEventListener("click", async function () {
    try {
      const response = await fetch("/api/login/deleteAllFortime", {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Obtener el mensaje de error como texto
        alert(errorMessage);
        return;
      }

      const data = await response.json();

      if (data && data.correosEliminados) {
        alert(
          `Usuarios eliminados correctamente. Lista de correos eliminados: ${data.correosEliminados.join(
            ", "
          )}`
        );
      } else {
        throw new Error("No se pudo obtener la lista de correos eliminados");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  });

document
  .getElementById("redirectTienda")
  .addEventListener("click", function () {
    window.location.href = "/";
  });
