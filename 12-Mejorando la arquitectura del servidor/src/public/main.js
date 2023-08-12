document.addEventListener("DOMContentLoaded", () => {
  const categoriaSelect = document.querySelector('select[name="categoria"]');
  const ordenSelect = document.querySelector('select[name="orden"]');
  const paginacionSelect = document.querySelector('select[name="paginacion"]');
  const productosContainer = document.querySelector(".productos");

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

  function updateProducts(html) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;

    const productosHTML = tempElement.querySelector(".productos").innerHTML;

    productosContainer.innerHTML = productosHTML;
  }

  function handleCategoriaChange() {
    categoriaSeleccionada = categoriaSelect.value;
    const url = buildURL();

    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        updateProducts(html);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  }

  function handleOrdenChange() {
    ordenSeleccionado = ordenSelect.value;
    const url = buildURL();

    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        updateProducts(html);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  }

  function handlePaginacionChange() {
    paginacionSeleccionado = paginacionSelect.value;
    const url = buildURL();

    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        updateProducts(html);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  }

  if (categoriaSelect) {
    categoriaSelect.addEventListener("change", handleCategoriaChange);
  }

  if (ordenSelect) {
    ordenSelect.addEventListener("change", handleOrdenChange);
  }

  if (paginacionSelect) {
    paginacionSelect.addEventListener("change", handlePaginacionChange);
  }

  if (productosContainer) {
    productosContainer.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains("comprar-btn")) {
        const productId = target.dataset.productId;

        const url = `/api/carrito/productos?productId=${productId}`;

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
      }
    });
  }
});
