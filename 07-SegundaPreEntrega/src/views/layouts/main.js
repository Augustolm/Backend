
document.addEventListener('DOMContentLoaded', () => {
    const categoriaSelect = document.querySelector('select[name="categoria"]');
    const ordenSelect = document.querySelector('select[name="orden"]');
    const pendienteSelect = document.querySelector('select[name="pendiente"]');
    const comprarBtns = document.querySelectorAll('.comprar-btn');
  
    // Escucha el evento de cambio en el select de categoría
    categoriaSelect.addEventListener('change', () => {
      const categoriaSeleccionada = categoriaSelect.value;
      console.log("categoriaSeleccionada", categoriaSeleccionada)
      // Realiza la petición al backend con la categoría seleccionada
      // ...
    });
  
    // Escucha el evento de cambio en el select de orden
    ordenSelect.addEventListener('change', () => {
        const ordenSeleccionado = ordenSelect.value;      
        const url = `/?sort=${ordenSeleccionado}`;

        fetch(url)
        .then(response => response.text())
        .then(html => {
          // Crear un elemento temporal para analizar el HTML recibido
          const tempElement = document.createElement('div');
          tempElement.innerHTML = html;
    
          // Obtener solo la sección de productos del HTML recibido
          const productosHTML = tempElement.querySelector('.productos').innerHTML;
    
          // Actualizar solo la parte necesaria de la página
          document.querySelector('.productos').innerHTML = productosHTML;
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
        });
      
    });
    // Escucha el evento de cambio en el select de pendiente
    pendienteSelect.addEventListener('change', () => {
      const pendienteSeleccionado = pendienteSelect.value;
        console.log("pendienteSeleccionado", pendienteSeleccionado)
      // Realiza la petición al backend con el pendiente seleccionado
      // ...
    });
  
    // Escucha el evento de clic en los botones de comprar
    comprarBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const productId = btn.dataset.productId;
        console.log("productId", productId)
        // Realiza la petición al backend para comprar el producto con el productId
        // ...
      });
    });
  
    // Resto del código...
  });
  