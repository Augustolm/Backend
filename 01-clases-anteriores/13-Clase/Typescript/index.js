"use strict";
const generarAletaorio = () => {
    return Math.floor(Math.random() * 255);
};
class GeneradorColores {
    generar() {
        const rojo = generarAletaorio();
        const verde = generarAletaorio();
        const azul = generarAletaorio();
        return `rgb(${rojo},${verde},${azul})`;
    }
}
