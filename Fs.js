        
const fs = require('fs');

let productoArray =[]

class Productos {


   async  save(obj) {


       // console.warn('este es new obj', newobj );
       // console.warn('este es new obj', productoArray.length );
       // console.warn('este es new obj', productoArray )
       
       try {
           const data = fs.readFileSync('./productos.txt', 'utf8')
           productoArray = data
                      
           
           const newobj = {
               ...obj,
               id: productoArray.length + 1
           }
         

          } catch (err) {
            console.error(err)
          }


       // productoArray.push(newobj)
        // console.warn('este es new obj', newobj );


        // console.log(newobj.id);

        //await fs.promises.writeFile('productos.txt', JSON.stringify(productoArray))

    }




    getAll() {
        return productoArray
    }

    deleteAll() {
        try {
           
            fs.unlinkSync('./productos.txt')
            console.log('fila removida');
            
        } catch (err) {
            console.error('Ocurrió algo incorrecto al eliminar el archivo.', err)
        }
        
    }

}


const test  = new  Productos

const p ={
        "id": 1,
        "nombre": "PC",
        "precio": 1000,
        "imagen": "url pendiente"
}

test.save(p)






































// let miData = fs.readFileSync('producto.txt', 'utf-8');
// let midataJson = JSON.parse(miData)

//  console.log('esto es mi fs',miData);
//  console.log('esto es JSON.',midataJson);


// const salvar = (obj) => {
//    let busqueda = midataJson.find(id => id.id == obj.id)
//     try {
//         if(!busqueda){
//             fs.appendFile("producto.txt", `,${JSON.stringify(obj)}\r\n`, function(err) {
//                 if(err) {
//                     return console.log(err);
//                 }
//                 console.log("El objeto se guardo con existo");
//                 });
//         }
//             else {
//                 console.log('El ID ingresado ya existe');
//             }

//     } catch (error) {
//         console.log('Error, no se cargo el archivo');
//     }
// }
// const p ={
//                 "id": 5,
//                 "nombre": "PC",
//                 "precio": 1000,
//                 "imagen": "url pendiente"
// }

// try {
//     salvar(p)
// } catch (error) {
//     console.log(error)
// }



// console.log(JSON.stringify(p));

// console.log(JSON.parse(p));


// // class Contenedor {

    
   

// //     save(obj)  {    
// //         //algo = JSON.parse(this.midataJson); //mirar tutorial de JSON
// //         //console.log(obj.id);
// //             // let arr = this.midataJson.find(r => r.id === obj.id)
// //             // console.log('esto es pepe', arr);
         
// //         try {
            
            
// //             fs.appendFile("producto.txt", `${JSON.stringify(obj)}\r\n`, function(err) {
// //                     if(err) {
// //                         return console.log(err);
// //                     }
                  
// //                     console.log("la fila se guardo con exito!");
// //                   });
           

// //         } catch (error) {
// //             throw new Error('Aca no cargo nada')
// //         }
// //       //  console.log(this.midata);
// //        // console.log(this.midataJson.miData);
// //         // fs.appendFile("producto.txt", `${obj}\r\n`, function(err) {
// //         //     if(err) {
// //         //         return console.log(err);
// //         //     }
          
// //         //     console.log("la fila se guardo con exito!");
// //         //   });
// //     }

// //     getById(numero){
// //         console.log(this.midataJson[numero]);
// //     }
// //     getAll(){
// //         console.log(this.midataJson);
// //     }

// // }


// //  const test = new Contenedor()
// //  const p = {
// //             "id": 3,
// //             "nombre": "PC",
// //             "precio": 1000,
// //             "imagen": "url pendiente"
// //         }
// //     test.save(p)
// //     // test.getById(1)
// //     // test.getAll()