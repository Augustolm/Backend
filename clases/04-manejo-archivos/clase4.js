"use strict";
//importar libreria
const fs = require("fs");
//crear archivo
const crearArchivo = (nombreArchivo, contenido) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(nombreArchivo, contenido, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(contenido);
            }
        });
    });
};
const datos = {
    nombre: "Adrian",
    edad: 29,
    casado: false,
    sueldo: 11.2,
    estado: "BN",
};
const contenido = JSON.stringify(datos, null, 2);
crearArchivo("nuevo.txt", contenido);
// fs.writeFile("nuevo.txt", "Hola mundo", (err) => {
//   try {
//     if (err) throw err;
//     console.log("Archivo creado con exito");
//   } catch (error) {
//     console.log(error);
//   }
// });
