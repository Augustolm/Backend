
class Usuario {
    constructor(nombre = '', apellido = '', libros = {}, mascotas = []) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        console.info(`El nombre del Usuario es: ${this.nombre} y su apellido es: ${this.apellido}`);
        return `${this.nombre} ${this.apellido}`;
    }

    addMascotas(nombreDeMascota) {
        this.mascotas = [...this.mascotas, nombreDeMascota]
        console.info(this.mascotas);
    }

    countMascotas() {
        const count = this.mascotas.length;
        console.info(`La cantidad de mascotas es: ${count}`);
        return count;
    }
    addBook(titulo = String, author = String) {
        const nuevoLibro = {
            nombre: titulo,
            author: author
        }
        this.libros.push(nuevoLibro);
        console.info(`Se ingreso exitosmanete el libro: ${titulo} del author: ${author}`);
    }

    getBookNames() {
        const nombreLibro = this.libros.map((n) => n.nombre);
        if(nombreLibro.length <= 1) {
            console.info(`El libro es: ${nombreLibro}`);
        }else console.info(`Los libros son: ${nombreLibro}`)            
        }

}
    
const Augusto = new Usuario ('Augusto', 'Mosettig', [{nombre: 'Fausto', autor:  'Johann Wolfgang von Goethe'}] , ['perro', 'gato']) 

console.info(Augusto);

Augusto.getFullName();
Augusto.addMascotas('pez');
Augusto.countMascotas()
Augusto.addBook('Don Quijote de la Mancha', 'Miguel de Cervantes')
Augusto.addBook('Los cuentos de Canterbury', 'Geoffrey Chaucer')
Augusto.addBook('Relatos cortos', 'Antón Chéjov')
Augusto.getBookNames()


// const Pedro = new Usuario ('Pedro', 'Perez', [{nombre: 'Decamerón', author: 'Giovanni Boccaccio'}], ['pez','iguana'])

// Pedro.countMascotas()
// Pedro.getBookNames()
// Pedro.getFullName()