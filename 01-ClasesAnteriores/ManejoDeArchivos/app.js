const {promises: fs} = require('fs');

const filename = './fyh.txt'
const pack = 'package.json'
//const sobreEscribir = fs.writeFileSync('fyh.txt', fecha);
// const  EscribirArchivo = async () => {
//     try {    
//         const fecha = new Date();
//         const obj = {
//             fecha: fecha,
//             nombre: 'Juan',
//             apellido: 'Perez',
//         }
//         console.log(fecha)
//         const sobreEscribir = await fs.writeFile(filename,  JSON.stringify(obj));
//        // const escribir = fs.appendFileSync(filename, fecha, 'utf8');
//        const lectura = await fs.readFile(filename, 'utf8');
//         console.log(lectura)
//     } catch (error) {
//         console.log('este es el error',error)
//     }
// }
// EscribirArchivo()

const lecturaYescritura = async () => {
    try {
        const lectura = await fs.readFile(pack, 'utf8');
        const obj = JSON.parse(lectura);
        console.log(obj)
        obj.version = '1.0.0';
        const sobreEscribir = await fs.writeFile(pack, JSON.stringify(obj));
        console.log('se ha escrito correctamente')
    } catch (error) {
        console.log('este es el error',error)
    }
}
lecturaYescritura()


