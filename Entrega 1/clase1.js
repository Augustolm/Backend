
class Usuario {
    constructor(nombre = '', apellido = '', libros =[], mascotas = []){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }



    getFullName() {
            console.log(`El nombre del Usuario es: ${this.nombre} y su apellido es: ${this.apellido}`);
    }
    addMascotas(nombreDeMascota) {
        this.mascotas = [...this.mascotas, nombreDeMascota]
        console.log(this.mascotas);
    }
    countMascotas() {
        const count = this.mascotas.length
        console.log(`${this.nombre} tiene ${count} Mascotas`);
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
Augusto.addMascotas('Loro')
Augusto.countMascotas()
Augusto.addBook('Don Quijote de la Mancha', 'Miguel de Cervantes')
Augusto.addBook('Los cuentos de Canterbury', 'Geoffrey Chaucer')
Augusto.addBook('Relatos cortos', 'Antón Chéjov')
Augusto.getBookNames()


const Pedro = new Usuario ('Pedro', 'Perez', [{nombre: 'Decamerón', author: 'Giovanni Boccaccio'}], ['pez','iguana'])

Pedro.countMascotas()
Pedro.getBookNames()
Pedro.getFullName()