
fetch('http://localhost:8080/api/productos',  {method: 'GET'})
.then(response => response.json())
.then(data => {
    console.log(data);
    agregarCard(data)
})
.catch(err => console.log(err))

function crearCard(data){

    const {titulo, precio, url, id} = data;

    return `
    <div class="card" style="width: 18rem;">
    <img src="${url}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${titulo}</h5>
      <p class="card-text">$ ${precio}</p>
      <button type="button" id="btn-agregar" class="btn btn-primary">Comprar</button>
    </div>
  </div>

    `;
    
    
}    
const agregarCard = (data) => {
    const cardFinal = data.map(data => crearCard(data)).join(" ");
    document.getElementById("carritos").innerHTML = cardFinal;
}



const botonCompra = document.getElementById('btn-agregar')

if(botonCompra)
botonCompra.addEventListener('Click', (e) => {
    console.log('Click');
    e.stopPropagation()
    e.preventDefault()
})




