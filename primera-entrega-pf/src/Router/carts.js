import { Router } from "express";
import { cartsGetid, cartsPost, getCarts, newCarts } from "../controller/carts.js";



const routerCarts = Router();



routerCarts.post("/", newCarts);
routerCarts.get("/:cid", cartsGetid);
routerCarts.get("/", getCarts);
routerCarts.post("/:cid/product/:pid", cartsPost);



export default routerCarts;
