const generarAletaorio =  ():number => {
    return Math.floor(Math.random()*255)
}


class GeneradorColores {
    generar(): string {
        const rojo: number = generarAletaorio();
        const verde: number = generarAletaorio();
        const azul: number = generarAletaorio();
        return `rgb(${rojo},${verde},${azul})`
    }

}