//Cargar productos
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

  console.log("producto", producto);

  fetch("/api/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
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
