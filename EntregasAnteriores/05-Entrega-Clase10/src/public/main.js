// Cliente

const socket = io();




document.querySelector('form').addEventListener('submit', (event) => {
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

  socket.emit('nuevoProducto', producto);

  document.getElementById('title').value = '';
  document.getElementById('thumbnail').value = '';
  document.getElementById('price').value = '';
  document.getElementById('status').value = '';
  document.getElementById('category').value = '';
  document.getElementById('code').value = '';
  document.getElementById('stock').value = '';
  document.getElementById('description').value = '';
  
});


socket.emit('ListaProduct');

socket.on('ListaProduct', (data) => {

  const tableRows = data.map((producto) => {
    return `
      <tr>
        <td>${producto.id}</td>
        <td>${producto.title}</td>
        <td>${producto.price}</td>
        <td><img src="${producto.thumbnail}" alt="img" class="img-small"></td>
        <td><span class="delete-icon" data-product-id="${producto.id}">&#128465;</span></td>
      </tr>
    `;
  });

  const tableHtml = `
    <table>
      <thead>
        <th>Id</th>
        <th>Nombre del producto</th>
        <th>Precio</th>
        <th>Url</th>
        <th>Acciones</th>
      </thead>
      <tbody>
        ${tableRows.join('')}
      </tbody>
    </table>
  `;

  const productDiv = document.querySelector('.productosList');
  productDiv.innerHTML = tableHtml;


  const deleteIcons = document.querySelectorAll('.delete-icon');
  deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener('click', () => {
      const productId = deleteIcon.dataset.productId;      
      socket.emit('deleteProduct', productId);
    });
  });
});