const fs = require('fs')

try {
    test = new Date().toString()
    console.log(test);
    const data = fs.writeFileSync('.fyh.txt', `${test}`, 'utf-8')
    console.log('El archivo se escribio con exito  ');
} catch (error) {
    console.log(error);
}
try {
    test2 = new Date().toString()
    const data = fs.appendFileSync('.fyh.txt', `${test2}\n`, 'utf-8')
} catch (error) {
    console.log(error);
}
try {
    fs.unlinkSync('.fyh.txt')
    console.log('Elimina archivo'); 
} catch (error) {
    console.log(error);
}

const leerarchiv = async () => {
    try {
        const data = fs.writeFileSync('.fyh.txt', `${test}`, 'utf-8')
    } catch (error) {
        console.log(error);
    }
}

leerarchiv()