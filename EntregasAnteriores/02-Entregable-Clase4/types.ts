// id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
// title (nombre del producto)
// description (descripción del producto)
// price (precio)
// thumbnail (ruta de imagen)
// code (código identificador)
// stock (número de piezas disponibles)

export interface Product {
  id?: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  code: string;
  stock: number;
}

export type Path = string;
