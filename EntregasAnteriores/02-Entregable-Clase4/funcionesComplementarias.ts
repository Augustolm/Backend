import * as fs from "fs";
import { Path, Product } from "./types";

const createEmptyFile = async (path: Path) => {
  try {
    //leer archivo y cargarlo en array
    await fs.promises.writeFile(path, "[]");
  } catch (error) {
    console.log(`Se produce un error al crear el archivo`, error);
  }
};

export const fileChecker = async (path: string) => {
  const stats = fs.existsSync(path);

  if (stats === false) {
    console.log(`Se crea el archivo vacio: ${path}`);
    await createEmptyFile(path);
  }
};

export const fileToArray = async (path: Path) => {
  try {
    // leer archivo y cargarlo en array
    const fileContent = await fs.promises.readFile(path, "utf-8");
    // devolver array
    return JSON.parse(fileContent);
  } catch (error) {
    console.log("Se produjo un error al leer el archivo!", error);
  }
};

export const arrayToFile = async (path: Path, array: any[]) => {
  try {
    return await fs.promises.writeFile(path, JSON.stringify(array, null, 4));
  } catch (error) {
    throw new Error(`Se produjo un error al escribir el archivo! ${error}`);
  }
};

export const ifExist = async (path: Path, id: number) => {
  try {
    const array = await fileToArray(path);

    const result = array.find((item: Product) => item.id === id);

    return result ? true : false;
  } catch (error) {
    console.log(`Se produce un error al buscar el id`, error);
  }
};
