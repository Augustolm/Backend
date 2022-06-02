const fs = require("fs");


const escribirArchivo = async (fileName, array) => {
    try {
      await fs.promises.writeFile(fileName, JSON.stringify(array));
    } catch (error) {
      console.log("Se produjo un error al escribir el archivo!" , error);
    }
  };


const crearArray = async (fileName) => {
    try { 
      return JSON.parse(await fs.promises.readFile(fileName));
    } catch (error) {
      console.log("Se produjo un error al leer el archivo!" , error);
  }
  };

const crearArchivo = async (fileName) => {
    try {
      await fs.promises.writeFile(fileName, "[]");
    } catch (error) {
      console.log("Se produjo un error al crear el archivo!" , error);
    }
  };


const validarArchivo = async (fileName) => {
    const stats = fs.existsSync(fileName); //crea archivo
 
   if (stats == false) {
     console.log(`se crea el archivo vacio: ${fileName}`);
     await crearArchivo(fileName);
   }
 };

class ContenedorLogs {
    constructor(fileName) {
      this.fileName = fileName;
    }
    async saveLog(obj) {
      try {
         await validarArchivo(this.fileName);
         
         await escribirArchivo(this.fileName, obj);
       
        return obj;
      } catch (error) {
        throw error;
      }
    }
    
    async getAll() {
        try {
          await validarArchivo(this.fileName);
    
      
          return  crearArray(this.fileName);
        } catch (error) {
          throw error;
        }
      }
}





module.exports = ContenedorLogs;