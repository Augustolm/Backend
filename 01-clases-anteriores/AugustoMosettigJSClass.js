
class Ususario {
 
    constructor(nombre = '', apellido = '', libros = [], mascotas = []) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }
    getFullName() {
        console.log(`Mi nombre es ${this.nombre} y mi apellido es ${this.apellido}`);
    }
    addMascotas(nombreMascotas){
        this.mascotas = [...this.mascotas, nombreMascotas]
        console.log(this.mascotas);
    }
    countMascotas(){
       
        console.log(this.mascotas.length);
        // const numMascotas = this.mascotas.map((r)=> (r.mascotas))
        // console.log(numMascotas.length);
    }
    addBook(nombre, autor){
       this.libros.push({nombre: nombre, autor: autor})
    }
    getBookNamre(){
        const nombreLib = this.libros.map((rec) => rec.nombre)
        console.log(nombreLib);
    }


}

const Augusto = new Ususario('Augusto', 'Mosettig', 
[{nombre: 'libro1', autor:  'autor1'}] , ['perro', 'gato'])

console.log(Augusto);

Augusto.getFullName();
Augusto.addMascotas('Loro');
Augusto.countMascotas();
Augusto.addBook('libro2', 'autor2')
Augusto.getBookNamre()