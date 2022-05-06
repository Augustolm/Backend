
// let mostrarlista = (lista) => {
//     if (lista == '')
//     console.log('Lista Vacia');
//     else {
//         console.log(lista);
//     }
// }

const { fuchsia } = require("tailwindcss/colors");

// mostrarlista()

// let lista = 'valor'

// test = function(lista) {
//     if(lista)
//     console.log(lista);
//     else
//     console.log('lista vacia');
// }

// test()



function mostrarLista(lista){
    if (lista.length == 0)console.log('Lista vacia');
    else
    console.log(lista);
}


// mostrarLista([])
// mostrarLista([1,2,3,4])



(function mostrarLista(lista){
    if (lista.length == 0)console.log('Lista vacia');
    else
    console.log(lista);
})([1,2,3]);



function crearMultiplicador(multiplicador){
    return function(numero) {
        return numero * multiplicador;
    };
};


//const multiplicador = crearMultiplicador(10)

const duplicar = crearMultiplicador(2);
const triplicar = crearMultiplicador(3);

console.log(duplicar(20));
console.log(triplicar(30));