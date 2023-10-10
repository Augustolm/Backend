const deleteButtons = document.querySelectorAll(".btn-delete");
deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const userId = button.dataset.userId;
    console.log("Eliminar Button clicked for user ID:", userId);
    // Agrega el código para eliminar aquí
  });
});

const rolButtons = document.querySelectorAll(".btn-rol");
rolButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const userId = button.dataset.userId;
    console.log("Rol Button clicked for user ID:", userId);
    // Agrega el código para asignar rol aquí
  });
});
