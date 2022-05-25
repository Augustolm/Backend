s

const http = require('http');


const server = http.createServer((req, res) => {
    
    const hora = (new Date()).getHours();
    if(hora>= 6 && hora<= 12) res.end('buen dia')
    else if (hora >= 13 && hora<= 19) res.end('Buenas tardes')
    else res.end('Buenas Noches')
})

server.listen(8080,() => {
    console.log(`Escuchandooo ${server.address().port}` )
})

//Date.prototype.getHours()
