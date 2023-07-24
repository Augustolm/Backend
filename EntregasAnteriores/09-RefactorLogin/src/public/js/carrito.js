document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".btn-borrar");

  if (deleteButtons) {
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.dataset.productId;
        const carritoTest = "64a19d9c6ab70dcbf8280238";
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
});
