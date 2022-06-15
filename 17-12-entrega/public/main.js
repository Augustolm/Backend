const socket = io();

const enviarMensaje = () => {
  const author = document.getElementById("author").value;
  const text = document.getElementById("text").value;
  const mensaje = { author, text };
  //console.log('desde enviar mensaje',mensaje);
  
  socket.emit('new_message', {mensaje});
  return false;
}



const crearEtiquetasMensaje = (mensajes) => {
  //console.log('create etiqueta de mensaje', mensajes);
  
  const { id, Author, mensaje, tiempo} = mensajes;
  return `
  <div>
  <strong>${Author}</strong>
  <em class="text-warning bg-dark">${tiempo}</em>
  <em class="text-success">${mensaje}</em>
  </div>
  `;
}

const agregarMensajes = (mensajes) => {
  //console.log('esto es agregar mensaje', mensajes);
  if (mensajes !== ''){
    const mensajesFinal = mensajes.map(mensajes => crearEtiquetasMensaje(mensajes)).join(" ");
    document.getElementById("messages").innerHTML = mensajesFinal;
  }
}



const enviarProducto = () => {
  const titulo = document.getElementById("titulo").value;
  const url = document.getElementById("imagen").value;
  const precio = document.getElementById("precio").value;
  const producto = { titulo, url , precio };
  socket.emit('nuevoProducto', producto);
  //console.log(producto);
  return false;
}

const crearEtiquetasProductos= (producto) => {
  const { id,titulo, url, precio } = producto;
  return `
  <tr>
  <th scope="row">${id}</td>  
  <td>${titulo}</td>
  <td><img src="${url}"></td>
  <td>$${precio}</td>
  </tr>
  `;
}

const agregarProductos = (producto) => {
 
  const headtable = `<table class="table">
  <thead class="thead-dark">
  <tr>
    <th scope="col">Id</th>
    <th scope="col">Nombre Producto</th>
    <th scope="col">Imagen</th>
    <th scope="col">Precio</th>
  </tr>
</thead>
  <tbody>`
  const foottable = `</tbody>
  </table>`
  
  
  const productosFinal = producto.map(producto => crearEtiquetasProductos(producto)).join(" ");
  document.getElementById("products").innerHTML = productosFinal;
}



socket.on('messages', (messages) => agregarMensajes(messages));
socket.on('producto', (producto) => agregarProductos(producto))
