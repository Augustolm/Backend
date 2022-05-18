const fs = require("fs");


const crearArray = async (fileName) => {
  try { 
    return JSON.parse(await fs.promises.readFile(fileName));
  } catch (error) {
    console.log("Se produjo un error al leer el archivo!" , error);
}
};

const escribirArchivo = async (fileName, array) => {
  try {
    await fs.promises.writeFile(fileName, JSON.stringify(array));
  } catch (error) {
    console.log("Se produjo un error al escribir el archivo!" , error);
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

class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }
  async save(obj) {
    try {
       await validarArchivo(this.fileName);

      let array = await crearArray(this.fileName);
      let longitud = array.length;
      let index = 0;
 
      if (longitud == 0) {
        index = 1;
      } else {
       index = array[longitud - 1].id + 1;
      }

      obj.id = index;
      array.push(obj);
      //escribir archivo
      await escribirArchivo(this.fileName, array);
      //devolver id
      return obj.id;
    } catch (error) {
      throw error;
    }
  }


  async getById(id) {
    try {

      await validarArchivo(this.fileName);

      let array = await crearArray(this.fileName);

      array = array.filter((x) => {
        return x.id == id;
      });

      return array[0];
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

  async deleteById(id) {
    try {
      
      await validarArchivo(this.fileName);
      let array = await crearArray(this.fileName);
     
      array = array.filter((x) => {
        return x.id != id;
      });
      await escribirArchivo(this.fileName, array);
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    await crearArchivo(this.fileName);
  }
}

async function productosObj() {
  try {
    let objeto = {
      id: 0,
      titulo: "",
      url: "",
      precio: 0,
    };


    objeto.titulo = "Producto1";
    objeto.thumbnail = "url pendiente";
    objeto.precio = 1500;


    productos = new Contenedor("productos.txt");

    console.log('Llamo a save 3 veces');

    console.log(await productos.save(objeto));
    console.log(await productos.save(objeto));
    console.log(await productos.save(objeto));


    console.log('Traigo el elemento con id 2');
    console.log(await productos.getById(2));
    console.log('Borro el elemento con el ID 3');

    await productos.deleteById(3);

    console.log('Agrego un nuevo elemento');
    console.log(await productos.save(objeto));


    console.log('Traigo todos');
    console.log(await productos.getAll());


    console.log('Borro el elemento con el ID 3');
    await productos.deleteById(3);


    console.log('Agrego un nuevo elemento');
    console.log(await productos.save(objeto));

    console.log('Traigo todos para validar que no se repita ningun id');
    console.log(await productos.getAll());

    // console.log('Vacio el archivo');
    // await productos.deleteAll();

  } catch (error) {
    console.log("El error es: ", error);
  }
}

//productosObj();

module.exports = Contenedor;