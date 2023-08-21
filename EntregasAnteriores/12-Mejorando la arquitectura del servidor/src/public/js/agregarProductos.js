//Cargar productos
const form = document.getElementById("form"); // Obtén el elemento del formulario

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const price = document.getElementById("price").value;
  const status = document.getElementById("status").value;
  const category = document.getElementById("category").value;
  const code = document.getElementById("code").value;
  const stock = document.getElementById("stock").value;
  const description = document.getElementById("description").value;

  const producto = {
    title,
    thumbnail,
    price,
    status,
    category,
    code,
    stock,
    description,
  };

  fetch("/api/addproductos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Producto agregado correctamente");
        window.location.reload();
      } else {
        console.error("Error al cargar el producto");
      }
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });

  document.getElementById("title").value = "";
  document.getElementById("thumbnail").value = "";
  document.getElementById("price").value = "";
  document.getElementById("status").value = "";
  document.getElementById("category").value = "";
  document.getElementById("code").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("description").value = "";
});

document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".btn-borrar-producto");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const productId = event.currentTarget.dataset.productId;
      const url = `/api/borrarProduct?id=${productId}`;

      console.log("producto a eliminar", productId);

      fetch(url, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log("Producto eliminado correctamente");
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
});
