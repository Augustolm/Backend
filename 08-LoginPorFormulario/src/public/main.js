document.addEventListener("DOMContentLoaded", () => {
  const categoriaSelect = document.querySelector('select[name="categoria"]');
  const ordenSelect = document.querySelector('select[name="orden"]');
  const paginacionSelect = document.querySelector('select[name="paginacion"]');
  const comprarBtns = document.querySelectorAll(".comprar-btn");
  const deleteButtons = document.querySelectorAll(".btn-borrar");

  let categoriaSeleccionada = "";
  let ordenSeleccionado = "";
  let paginacionSeleccionado = "";

  function buildURL() {
    let url = "/";

    if (categoriaSeleccionada) {
      url += `?categoria=${categoriaSeleccionada}`;
    }

    if (ordenSeleccionado) {
      url += `${categoriaSeleccionada ? "&" : "?"}sort=${ordenSeleccionado}`;
    }

    if (paginacionSeleccionado) {
      url += `${
        categoriaSeleccionada || ordenSeleccionado ? "&" : "?"
      }page=${paginacionSeleccionado}`;
    }

    return url;
  }

  if (categoriaSelect) {
    categoriaSelect.addEventListener("change", () => {
      categoriaSeleccionada = categoriaSelect.value;
      const url = buildURL();

      fetch(url)
        .then((response) => response.text())
        .then((html) => {
          const tempElement = document.createElement("div");
          tempElement.innerHTML = html;

          const productosHTML =
            tempElement.querySelector(".productos").innerHTML;
          const selectHTML =
            tempElement.querySelector(".pagination select").innerHTML;

          document.querySelector(".productos").innerHTML = productosHTML;
          document.querySelector(".pagination select").innerHTML = selectHTML;

          const categoriaSelect = document.querySelector(
            '.pagination select[name="categoria"]'
          );
          categoriaSelect.value = categoriaSeleccionada;
        })
        .catch((error) => {
          console.error("Error al realizar la solicitud:", error);
        });
    });
  }

  if (ordenSelect) {
    ordenSelect.addEventListener("change", () => {
      ordenSeleccionado = ordenSelect.value;
      const url = buildURL();

      fetch(url)
        .then((response) => response.text())
        .then((html) => {
          const tempElement = document.createElement("div");
          tempElement.innerHTML = html;

          const productosHTML =
            tempElement.querySelector(".productos").innerHTML;

          document.querySelector(".productos").innerHTML = productosHTML;
        })
        .catch((error) => {
          console.error("Error al realizar la solicitud:", error);
        });
    });
  }

  if (paginacionSelect) {
    paginacionSelect.addEventListener("change", () => {
      paginacionSeleccionado = paginacionSelect.value;

      const url = buildURL();

      fetch(url)
        .then((response) => response.text())
        .then((html) => {
          const tempElement = document.createElement("div");
          tempElement.innerHTML = html;

          const productosHTML =
            tempElement.querySelector(".productos").innerHTML;

          document.querySelector(".productos").innerHTML = productosHTML;
        })
        .catch((error) => {
          console.error("Error al realizar la solicitud:", error);
        });
    });
  }

  if (comprarBtns) {
    comprarBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const productId = btn.dataset.productId;
        console.log("productId", productId);

        const carritoTest = "64a19d9c6ab70dcbf8280238";
        const url = `/api/carrito/${carritoTest}/productos?productId=${productId}`;

        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: productId }),
        })
          .then((response) => response.text())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error("Error al realizar la solicitud:", error);
          });
      });
    });
  }

  if (deleteButtons) {
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.dataset.productId;
        const carritoTest = "64a19d9c6ab70dcbf8280238";
        const url = `/api/carrito/${carritoTest}/productos?productId=${productId}`;

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
