
class Usuario {
    constructor(nombre = '', apellido = '', libros =[], mascotas = []){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }



    getFullName() {
            console.log(`El nombre del Usuario es: ${this.nombre} y su apellido es: ${this.apellido}`);
            return this.nombre, this.apellido

    }
    addMascotas(nombreDeMascota) {
        this.mascotas = [...this.mascotas, nombreDeMascota]
        console.log(this.mascotas);
    }
    countMascotas() {
        const count = this.mascotas.length
        console.log(`${this.nombre} tiene ${count} Mascotas`);
        return count
    }
    addBook(nombre, author) {
        const nuevoLibro = {nombre:nombre,
                            author:author}

        this.libros.push(nuevoLibro)
        console.log(`se ingreso existosamente el libro titulado: "${nombre}" escrito por "${author}"`);
    }

    getBookNames(){
       const nombreLibro = this.libros.map((n) => n.nombre)
       if(nombreLibro.length <= 1)
       console.log(`El libro es: ${nombreLibro}\n`);
       else(console.log(`Los libros son: ${nombreLibro}\n`))
    }



}

const Augusto = new Usuario ('Augusto', 'Mosettig', [{nombre: 'Fausto', autor:  'Johann Wolfgang von Goethe'}] , ['perro', 'gato']) 

console.log(Augusto);

Augusto.getFullName()
// Augusto.addMascotas('Loro')
// Augusto.countMascotas()
// Augusto.addBook('Don Quijote de la Mancha', 'Miguel de Cervantes')
// Augusto.addBook('Los cuentos de Canterbury', 'Geoffrey Chaucer')
// Augusto.addBook('Relatos cortos', 'Antón Chéjov')
// Augusto.getBookNames()


// const Pedro = new Usuario ('Pedro', 'Perez', [{nombre: 'Decamerón', author: 'Giovanni Boccaccio'}], ['pez','iguana'])

// Pedro.countMascotas()
// Pedro.getBookNames()
// Pedro.getFullName()



function esFindesemana(variable){
    if(variable === 'sabado' || variable == 'domingo')
    console.log('Es findesemana');
    else console.log('Es dia de semana');
}   

// esFindesemana('lunes')
// esFindesemana('martes')
// esFindesemana('miercoles')
// esFindesemana('jueves')
// esFindesemana('viernes')
// esFindesemana('sabado')
// esFindesemana('domingo')

//Given an array of integers, find the pair of adjacent elements that has the largest product and return that product.
function solution(inputArray) {
    let largestProduct = inputArray[0] * inputArray[1]
    for(var i = 1 ; i < inputArray.length - 1; i++) {
        const actualProduct = inputArray[i] * inputArray[ i  + 1]
        if(actualProduct > largestProduct) {
            largestProduct = actualProduct
        }
        
    }
    console.log(largestProduct);
    return largestProduct

}

let inputArray = [5, 6, -4, 2, 3, 2, 23]
solution(inputArray)