(function (datos = []) {
    if(datos.length < 1) {
        console.log("No hay datos");
        return;
    }else{
    console.table(datos)
    }
})([1,2,3,4,5,6,7,8,9,10]);

const crearMultiplicador = (numero) => {
    console.log(numero);
    return function(m) {
        console.log(numero * m);
    }
    
}

const triplicar = crearMultiplicador(3);
const duplicar = crearMultiplicador(2);


triplicar(9)
duplicar(100)