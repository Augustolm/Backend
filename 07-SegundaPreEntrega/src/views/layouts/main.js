
document.addEventListener('DOMContentLoaded', () => {
  const categoriaSelect = document.querySelector('select[name="categoria"]');
  const ordenSelect = document.querySelector('select[name="orden"]');
  const paginacionSelect = document.querySelector('select[name="paginacion"]');
  const comprarBtns = document.querySelectorAll('.comprar-btn');

  let categoriaSeleccionada = '';
  let ordenSeleccionado = '';
  let paginacionSeleccionado = '';

  function buildURL() {
    let url = '/';

    if (categoriaSeleccionada) {
      url += `?categoria=${categoriaSeleccionada}`;
    }

    if (ordenSeleccionado) {
      url += `${categoriaSeleccionada ? '&' : '?'}sort=${ordenSeleccionado}`;
    }

    if (paginacionSeleccionado) {
      url += `${categoriaSeleccionada || ordenSeleccionado ? '&' : '?'}page=${paginacionSeleccionado}`;
    }

    return url;
  }


  categoriaSelect.addEventListener('change', () => {
    categoriaSeleccionada = categoriaSelect.value;
    const url = buildURL();

    fetch(url)
    .then(response => response.text())
    .then(html => {
      const tempElement = document.createElement('div');
      tempElement.innerHTML = html;
  
      const productosHTML = tempElement.querySelector('.productos').innerHTML;
      const selectHTML = tempElement.querySelector('.pagination select').innerHTML;
  
      document.querySelector('.productos').innerHTML = productosHTML;
      document.querySelector('.pagination select').innerHTML = selectHTML;
  

      const categoriaSelect = document.querySelector('.pagination select[name="categoria"]');
      categoriaSelect.value = categoriaSeleccionada;
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
    });
  });


  ordenSelect.addEventListener('change', () => {
    ordenSeleccionado = ordenSelect.value;
    const url = buildURL();

    fetch(url)
      .then(response => response.text())
      .then(html => {

         const tempElement = document.createElement('div');
         tempElement.innerHTML = html;

         const productosHTML = tempElement.querySelector('.productos').innerHTML;

         document.querySelector('.productos').innerHTML = productosHTML;
       
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
      });
 

 



    });

    paginacionSelect.addEventListener('change', () => {
        paginacionSeleccionado = paginacionSelect.value;

      const url = buildURL();

      fetch(url)
      .then(response => response.text())
      .then(html => {

         const tempElement = document.createElement('div');
         tempElement.innerHTML = html;
   

         const productosHTML = tempElement.querySelector('.productos').innerHTML;
   
         document.querySelector('.productos').innerHTML = productosHTML;
       
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
      });

    });
  

    comprarBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const productId = btn.dataset.productId;
        console.log("productId", productId)
        // Realiza la petición al backend para comprar el producto con el productId
        // ...
      });
    });
  

  });
  