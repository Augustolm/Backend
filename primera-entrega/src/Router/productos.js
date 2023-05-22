import { Router } from "express";
import {productGet, productID , productPost, productPut, productDelete} from "../controller/product.js";


const routerProduct = Router();


routerProduct.get("/", productGet);
routerProduct.get("/:id", productID);
routerProduct.post("/", productPost);
routerProduct.put("/", productPut);
routerProduct.delete("/:id", productDelete);


export default routerProduct;
