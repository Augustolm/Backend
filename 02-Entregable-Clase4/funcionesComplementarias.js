var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from "fs";
const createEmptyFile = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //leer archivo y cargarlo en array
        yield fs.promises.writeFile(path, "[]");
    }
    catch (error) {
        console.log(`Se produce un error al crear el archivo`, error);
    }
});
export const fileChecker = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const stats = fs.existsSync(path);
    if (stats === false) {
        console.log(`Se crea el archivo vacio: ${path}`);
        yield createEmptyFile(path);
    }
});
export const fileToArray = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // leer archivo y cargarlo en array
        const fileContent = yield fs.promises.readFile(path, "utf-8");
        // devolver array
        return JSON.parse(fileContent);
    }
    catch (error) {
        console.log("Se produjo un error al leer el archivo!", error);
    }
});
export const arrayToFile = (path, array) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield fs.promises.writeFile(path, JSON.stringify(array, null, 4));
    }
    catch (error) {
        throw new Error(`Se produjo un error al escribir el archivo! ${error}`);
    }
});
export const ifExist = (path, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const array = yield fileToArray(path);
        const result = array.find((item) => item.id === id);
        return result ? true : false;
    }
    catch (error) {
        console.log(`Se produce un error al buscar el id`, error);
    }
});
