
document.addEventListener('DOMContentLoaded', () => {
  const categoriaSelect = document.querySelector('select[name="categoria"]');
  const ordenSelect = document.querySelector('select[name="orden"]');
  const paginacionSelect = document.querySelector('select[name="paginacion"]');
  const comprarBtns = document.querySelectorAll('.comprar-btn');
  const deleteButtons = document.querySelectorAll('.btn-borrar');

 
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


  if (categoriaSelect) {
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
  }

  if (ordenSelect) {

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

  }

  if(paginacionSelect){
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

  }
    
  if(comprarBtns){
    comprarBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const productId = btn.dataset.productId;
        console.log("productId", productId);
    
        const carritoTest = '64a19d9c6ab70dcbf8280238';
        const url = `/api/carrito/${carritoTest}/productos?productId=${productId}`;
    
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId: productId })
        })
          .then(response => response.text())
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error('Error al realizar la solicitud:', error);
          });
      });
    });
    
  }

  if (deleteButtons) {
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const productId = event.target.dataset.productId;
        const carritoTest = '64a19d9c6ab70dcbf8280238';
        const url = `/api/carrito/${carritoTest}/productos?productId=${productId}`;

        fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(response => {
            if (response.ok) {
              alert('Producto eliminado correctamente');
              window.location.reload();
            } else {
              throw new Error('Error al realizar la eliminación');
            }
          })
          .catch(error => {
            console.error('Error al realizar la eliminación:', error);
          });
      });
    });
}

});
  

document.getElementById('loginBtn').addEventListener('click', function() {
  const usuario = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  console.log('Iniciar sesión:', { usuario, password });
});

document.getElementById('registerBtn').addEventListener('click', function() {
  var registerForm = document.getElementById('registerForm');
  var loginBtn = document.getElementById('loginBtn');
  var clearBtn = document.getElementById('clearBtn');
  var registerBtn = document.getElementById('registerBtn');
  var registerSubmitBtn = document.getElementById('registerSubmitBtn');
  var clearRegisterBtn = document.getElementById('clearRegisterBtn');
  var cancelBtn = document.getElementById('cancelBtn');

  if (registerForm.style.display === 'none') {
      registerForm.style.display = 'block';
      loginBtn.style.display = 'none';
      clearBtn.style.display = 'none';
      registerBtn.style.display = 'none';
  } else {
      registerForm.style.display = 'none';
      loginBtn.style.display = 'block';
      clearBtn.style.display = 'block';
      registerBtn.style.display = 'block';
  }
  document.getElementById('loginForm').reset(); // Restablecer los campos del formulario al registrarse
});

document.getElementById('clearRegisterBtn').addEventListener('click', function() {
  document.getElementById('email').value = '';
});

document.getElementById('registerSubmitBtn').addEventListener('click', function(event) {
  event.preventDefault();
  const usuario = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  console.log('Registrarse:', { usuario, password, email });
});




//Cargar productos
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const thumbnail = document.getElementById('thumbnail').value;
  const price = document.getElementById('price').value;
  const status = document.getElementById('status').value;
  const category = document.getElementById('category').value;
  const code = document.getElementById('code').value;
  const stock = document.getElementById('stock').value;
  const description = document.getElementById('description').value;

  const producto = {
    title,
    thumbnail,
    price,
    status,
    category,
    code,
    stock,
    description
  };

  console.log("producto", producto)

  fetch('/api/productos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  })

  document.getElementById('title').value = '';
  document.getElementById('thumbnail').value = '';
  document.getElementById('price').value = '';
  document.getElementById('status').value = '';
  document.getElementById('category').value = '';
  document.getElementById('code').value = '';
  document.getElementById('stock').value = '';
  document.getElementById('description').value = '';
});
