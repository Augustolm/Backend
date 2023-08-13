document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".btn-borrar");

  if (deleteButtons) {
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.dataset.productId;
        const url = `/api/carrito/productos?productId=${productId}`;

        fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              alert("Producto eliminado correctamente");
              window.location.reload();
            } else {
              throw new Error("Error al realizar la eliminación");
            }
          })
          .catch((error) => {
            console.error("Error al realizar la eliminación:", error);
          });
      });
    });
  }

  const btnFinalizarCompra = document.getElementById("btn-finalizar-compra");

  btnFinalizarCompra.addEventListener("click", function () {
    // Suponiendo que tienes un valor para `cid` que deseas usar en la URL

    const cid = uuidv4();
    console.log("cid", cid);
    const url = `/api/cartps/${cid}/purchase`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Manejo de la respuesta exitosa
        console.log("Compra realizada con éxito:", data);
        // Aquí podrías mostrar un mensaje de éxito al usuario
      })
      .catch((error) => {
        // Manejo de errores
        console.error("Error al realizar la compra:", error);
        // Aquí podrías mostrar un mensaje de error al usuario
      });
  });
});
