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
    console.log("cid", cid);
    const purchaseUrl = `/api/cartps/${cid}/purchase`;
    const ticketUrl = `/api/carrito/ticket?code=${cid}`;

    fetch(purchaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Compra realizada con éxito");
          window.location.href = ticketUrl;
        } else {
          throw new Error(`Error en la petición: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error("Error al realizar la compra:", error);
      });
  });
});
