const generarAletaorio =  () => {
    return Math.floor(Math.random()*256)
}


class GeneradorColores {
    generar() {
        const rojo = generarAletaorio();
        const verde = generarAletaorio();
        const azul = generarAletaorio();
        return `rgb(${rojo},${verde},${azul})`
    }

}