import fs from "fs";


/**
 * Lee un array de objetos dentro de un archivo, retorna un array de objetos json
 * @param {string} fileName
 * @returns Array de objetos contenido en el archivo
 */
const fileToArray = async (fileName) => {
    try {
        //leer archivo y cargarlo en array
        //devolver array
        return JSON.parse(await fs.promises.readFile(fileName));
    } catch (error) {
        console.log("Se produjo un error al leer el archivo!", error);

    }
};

/**
 * Escribe el array completo en un archivo
 * @param {string} fileName
 * @param {obj} array
 */

const arrayToFile = async (filname, array) => {
    try {
        //leer archivo y cargarlo en array
        return JSON.stringify(await fs.promises.writeFile(filname, JSON.stringify(array)))
    } catch (error) {
        throw error
    }
}

/**
 * Crea un archivo nuevo con el nombre recibido por parametro
 * @param {string} fileName
 */
const createEmptyFile = async (fileName) => {
    try {
        //leer archivo y cargarlo en array
        await fs.promises.writeFile(fileName, "[]");
    } catch (error) {
        console.log(`Se produce un error al crear el archivo`, error);
    }
};

/**
 * Valida que exista el archivo, si no existe lo crea llamando a createEmptyFile(fileName)
 * @param {string} fileName 
 */
const fileChecker = async (fileName) => {
    //chequeo que el archivo exista si no existe lo creo
    const stats = fs.existsSync(fileName);

    if (stats === false) {
        console.log(`Se crea el archivo vacio: ${fileName}`);
        await createEmptyFile(fileName);
    }
};

/**Busca el id dentro del array y retorna si existe
 * @param {string} fileName 
 * @param {number} id
 * @returns {boolean}
 */
const idExists = async (fileName, id) => {
    try {
        //leer archivo y cargarlo en array
        const array = await fileToArray(fileName);
        //recorrer array y buscar el id
        const result = array.find((obj) => obj.id === id);
        //devolver true o false
        return result ? true : false;
    } catch (error) {
        console.log(`Se produce un error al buscar el id`, error);
    }
};


export default class ProductManager {
    constructor(fileName) {
        this.fileName = fileName;
    }

    /**
     * Guarda agrega un objeto al archivo y devuleve su id
     * @param {string} obj 
     * @returns Id del objeto guardado
     */
    async addProduct(obj) {
        try {
            //valido que exista el archivo
            await fileChecker(this.fileName);
            //lee el archivo y lo guardia en un array
            let array = await fileToArray(this.fileName);
            let longitud = array.length;
            let index = 0;
            //Valido que el archivo contenga objetos
            if (longitud === 0) {
                index = 1;
            } else {
                //sumar uno al id del ultimo elemento y agregarlo al id del objeto
                index = array[longitud - 1].id + 1;
            }
            obj.id = index;
            array.push(obj);
            //escribir archivo
            await arrayToFile(this.fileName, array);
            //devolver id
            return obj.id;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Selecciona un objeto del archivo y lo devuleve
     * @param {int} id 
     * @returns Devuelve el objeto si lo encuentra
     */
    async getProductById(id) {
        try {

            await fileChecker(this.fileName);
            let array = await fileToArray(this.fileName);
            array = array.filter((x) => {
                return x.id === id;
            });
            if (array.length === 0)return null; //Remplaza el throw por un null
            else return array
        } catch (error) {
            throw error;
        }
    }


    /**
     * Lee el archivo y lo devuelve completo
     * @returns Devuelve todos los objetos del archivo
     */
    async getProducts() {
        try {
            await fileChecker(this.fileName);
            return fileToArray(this.fileName);
        } catch (error) {
            throw error;
        }
    }

    
    /**
     * Busca coincidencias mediante el findIndex y remplaza el objeto por el nuevo
     * @returns Devuelve el objeto actualizado
     */
     async updateProduct(obj) {
        
        try {
            await fileChecker(this.fileName);
            let array = await fileToArray(this.fileName);
            let index = array?.findIndex((x) => x.id === obj.id);
            if (index === -1) throw new Error("No se encontro el objeto")
            else {
                array[index] = obj;
                await arrayToFile(this.fileName, array);
                return obj;
            }
        } catch (error) {
            throw error;

      }
    }

    /**
     * Borra el objeto con le id seleccionado en el archivo
     * @param {int} id 
     */
    async deleteProduct(id) {
        try {
            await fileChecker(this.fileName);

            let array = await fileToArray(this.fileName);
            let result = await idExists(this.fileName, id); //No comprendo porque no me funciona el await si lo quito queda en promesa pendiente..
            array = array.filter((x) => {
                return x.id != id;
            });
            if (result === false) throw new Error("El id que usted desea eliminar No existe")
            else await arrayToFile(this.fileName, array);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Borra todos los objetos del archivo llamado a createEmptyFile(this.fileName)
     */
    async deleteAll() {
        await createEmptyFile(this.fileName);
    }
}

async function main() {
    try {

        let objeto = {
            title: "",
            price: 0.0,
            thumbnail: "",
            id: 0,
        };

        let objeto2 = {
            title: "Producto Actualizado",
            price: 33.23,
            thumbnail: "UrlActualizada",
            id: 3,
        };

        objeto.title = "NombreProducto";
        objeto.price = 3659.99;
        objeto.thumbnail = "http://URI";

        const phat = "./data/productos.json";

        const productos = new ProductManager(phat);

        //console.log('Llamo a addProduct 10 veces');

        console.log(await productos.addProduct(objeto));
        console.log(await productos.addProduct(objeto));
        // console.log(await productos.addProduct(objeto));
        // console.log(await productos.addProduct(objeto));
        // console.log(await productos.addProduct(objeto));
        // console.log(await productos.addProduct(objeto));
        // console.log(await productos.addProduct(objeto));
        // console.log(await productos.addProduct(objeto));
        // console.log(await productos.addProduct(objeto));
        //console.log(await productos.addProduct(objeto));

        //  console.log('Traigo el elemento con id 5');

        //  console.log(await productos.getProductById(4));

        // console.log('Borrar id 5');

        // await productos.deleteProduct(5);

        // console.log(await productos.getProducts());
        // console.log('Agrego un nuevo elemento');

        // console.log(await productos.addProduct(objeto));

        // console.log('Traer todo');
        // console.log(await productos.getProducts());

        //console.log('Actualizo el id 3')
        //console.log(await productos.updateProduct(objeto2));

        // console.log('Borro el elemento con el ID 3');
        // await productos.deleteProduct(3);

        // console.log('Agrego un nuevo elemento');
        // console.log(await productos.addProduct(objeto));
        // console.log('Traigo todos para validar que no se repita ningun id');
        // console.log(await productos.getProducts());

        //await productos.deleteAll();


    } catch (error) {
        console.log("El error es: ", error);
    }
}

//main();


