// Cliente

const socket = io();


const form = document.querySelector('form');

if (form) {
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
  
  }

  socket.on('ListaProduct', (data) => {

  const tableRows = data.map((producto) => {
    return `
      <tr>
        <td>${producto._id}</td>
        <td>${producto.title}</td>
        <td>${producto.price}</td>
        <td><img src="${producto.thumbnail}" alt="img" class="img-small"></td>
        <td><span class="delete-icon" data-product-id="${producto._id}">&#128465;</span></td>
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
  if (productDiv) {
    productDiv.innerHTML = tableHtml;
  }

  //eliimina
  const deleteIcons = document.querySelectorAll('.delete-icon');
  deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener('click', () => {
      const productId = deleteIcon.dataset.productId;      
      socket.emit('deleteProduct', productId);
    });
  });





  const cardProduct = data.map((producto) => {
    return `
      <div class="card">
        <img src="${producto.thumbnail}" alt="img" class="card-img">
        <div class="card-body">
          <h5 class="card-title">${producto.title}</h5>
          <p class="card-text">${producto.description}</p>
          <div class="price-stock">
            <p class="card-price">Precio: ${producto.price}</p>
            <p class="card-stock">Stock: ${producto.stock}</p>
          </div>
          <p class="card-category">Categoría: ${producto.category}</p>
          <button class="btn btn-primary">Comprar</button>
        </div>
      </div>
    `;
  });

  const productDivcards = document.querySelector('.product-cards');
  if (productDivcards) {
    productDivcards.innerHTML = cardProduct.join('');
  }
});


socket.emit('ListaProduct');


//Chat
socket.emit('chatBox');

socket.on('chatBox', async (data) => {
  const chatbox = await data.map((mensaje) => {
    return `
      <div class="message">
        <p class="message-email">${mensaje.email}: ${mensaje.message}</p>
      </div>
    `;
  });

  const boxChat = document.querySelector('.message-box');
  if (boxChat) {
    boxChat.innerHTML = chatbox.join('');
    boxChat.scrollTop = boxChat.scrollHeight;
  }
});


const nameInput = document.querySelector('.name-input');
const emailInput = document.querySelector('.email-input');
const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('.send-button');


if (nameInput && emailInput && messageInput && sendButton) {
  nameInput.addEventListener('input', checkFormCompletion);
  emailInput.addEventListener('input', checkFormCompletion);
}



function checkFormCompletion() {
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const messageValue = messageInput.value.trim();

  if (nameValue !== '' && emailValue !== '') {
   
    messageInput.disabled = false;
    sendButton.disabled = false;
  } else {

    messageInput.disabled = true;
    sendButton.disabled = true;
  }
}


const chatForm = document.querySelector('.chat-form');


if (chatForm) {
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
  
    const chatMessage = {
      name,
      email,
      message
    };
  
    socket.emit('chat', chatMessage);
  
    messageInput.value = '';
    messageInput.disabled = true;
    sendButton.disabled = true;
  });
}


