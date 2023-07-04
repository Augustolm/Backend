import { Router } from 'express';
import __dirname from '../app.js';


const routerLogin = Router();



routerLogin.get('/login', async (req, res) => {
    res.cookie('mi cookie', 'mi primera cookie value', { maxAge: 10000 });
    res.render(__dirname + '/views/login');
  }
);


routerLogin.get('/login2', async (req, res) => {
    console.log("req.cookies", req.cookies)
    res.send("reading cookies")
  }
);



routerLogin.get('/login3', async (req, res) => {
    console.log("req.cookies", req.cookies)
    res.clearCookie('mi cookie');
    res.send("eliminar cookies")
  }
);



export default routerLogin;
