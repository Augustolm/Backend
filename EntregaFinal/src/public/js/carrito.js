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
    const cid = uuidv4();
    const url = "/payment-intens";

    fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error en la petición: ${response.status}`);
        }
      })
      .then((session) => {
        console.log("redirige a mercad", session);
        window.location.href = session.url;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
