const socket = io();

const enviarMensaje = () => {
  const author = document.getElementById("author").value;
  const text = document.getElementById("text").value;
  const mensaje = { author, text };
  console.log('que dolor de garganta!', {mensaje});
  socket.emit('new_message', {mensaje});
  return false;
}

const crearEtiquetasMensaje = (mensaje) => {
  
  const { author, text, tiempo} = mensaje;
  return `
  <div>
  <strong>${author}</strong>
  <em>${tiempo}</em>
  <em>${text}</em>
  </div>
  `;
}

const agregarMensajes = (mensajes) => {
  const mensajesFinal = mensajes.map(mensaje => crearEtiquetasMensaje(mensaje)).join(" ");
  document.getElementById("messages").innerHTML = mensajesFinal;
}

socket.on('messages', (messages) => agregarMensajes(messages));

const enviarProducto = () => {
  const titulo = document.getElementById("titulo").value;
  const imagen = document.getElementById("imagen").value;
  const precio = document.getElementById("precio").value;
  const producto = { titulo, imagen , precio };
  console.log(producto);
  socket.emit('nuevoProducto', {producto});
   return false;
}

// const formProd = document.getElementById('formProd')
// const titulo = document.getElementById("titulo") //arroja null value no funciona.
// formProd.addEventListener('submit', e => {
//   e.preventDefault()
//  console.log(titulo ); //resultado Null
// })
