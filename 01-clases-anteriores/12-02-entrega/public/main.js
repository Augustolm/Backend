fetch('/')
.then(response => response.text())
.then(template => {
  
  const hbsTemplate = Handlebars.compile(template);

const socket = io();

const enviarMensaje = () => {
  const author = document.getElementById("author").value;
  const text = document.getElementById("text").value;
  const mensaje = { author, text };
  
  socket.emit('new_message', {mensaje});
  return false;
}





const crearEtiquetasMensaje = (mensaje) => {
  
  const { author, text, tiempo} = mensaje;
  return `
  <div>
  <strong>${author}</strong>
  <em class="text-warning bg-dark">${tiempo}</em>
  <em class="text-success">${text}</em>
  </div>
  `;
}

const agregarMensajes = (mensajes) => {
  const mensajesFinal = mensajes.map(mensaje => crearEtiquetasMensaje(mensaje)).join(" ");
  document.getElementById("messages").innerHTML = mensajesFinal;
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
  
  
  const productos2 = producto.map(producto => crearEtiquetasProductos(producto)).join(" ");
  
  const productosFinal = headtable.concat(productos2,foottable, hbsTemplate);
  document.getElementById("products").innerHTML = productosFinal;
}



socket.on('messages', (messages) => agregarMensajes(messages));
socket.on('producto', (producto) => agregarProductos(producto))
})