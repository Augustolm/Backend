const socket = io();

const enviarMensaje = () => {
  const author = document.getElementById("author").value;
  const text = document.getElementById("text").value;
  const mensaje = { author, text };
  socket.emit('new_message', {mensaje});
  return false;
}

const crearEtiquetasMensaje = (mensaje) => {
  
  const { author, text, tiempo } = mensaje;
  return `
    <div>
      <strong>${author}</strong>
      <p> algo ${tiempo}</p>
      <em>${text}</em>
    </div>
  `;
}

const agregarMensajes = (mensajes) => {
  const mensajesFinal = mensajes.map(mensaje => crearEtiquetasMensaje(mensaje)).join(" ");
  document.getElementById("messages").innerHTML = mensajesFinal;
}

socket.on('messages', (messages) => agregarMensajes(messages));