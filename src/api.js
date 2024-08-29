require('dotenv').config();
const express = require("express");
const app = express();
const token = require('./util/token');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const secretKey = process.env.SECRET_KEY;

const router = express.Router();

app.use('/', router.get('/', async (req, res) => {
    res.status(200).send("<h1>API-CHAT</h1>")
}));

app.use("/sobre", router.get("/sobre", async (req, res) => {
    res.status(200).send({
        "nome": "API-CHAT",
        "versão": "0.1.0",
        "autor": "Hadassa Martins"
    });
}));

app.use("/salas", router.get("/salas", async (req, res) => {
    const salaController = require("./controllers/salaController");
    const resp = await salaController.get();
    res.status(200).send(resp);
}));

app.use("/entrar", router.post("/entrar", async (req, res) => {
    const usuarioController = require("./controllers/usuarioController");
    let resp = await usuarioController.entrar(req.body.nick);

    const userToken = token.setToken(resp.id, secretKey); 

    res.status(200).send({ token: userToken, user: resp });
}));

app.use("/salas", router.get("/salas", async (req, res) => {
    if (token.checkToken(req.headers.token, secretKey)) {
        const salaController = require("./controllers/salaController");
        let resp = await salaController.get();
        res.status(200).send(resp);
    } else {
        res.status(400).send({ msg: "Usuário não autorizado" });
    }
}));

app.use("/sala/entrar", router.put("/sala/entrar", async (req, res) => {
    if (!token.checkToken(req.headers.token, secretKey))
        return res.status(401).send({ msg: "Token inválido ou expirado" });

    const salaController = require("./controllers/salaController");
    let resp = await salaController.entrar(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);
}));

app.use("/sala/mensagem/", router.post("/sala/mensagem", async (req, res) => {
    if (!token.checkToken(req.headers.token, secretKey))
        return res.status(401).send({ msg: "Token inválido ou expirado" });

    const salaController = require("./controllers/salaController");
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idSala);
    res.status(200).send(resp);
}));

app.use("/sala/mensagem/", router.get("/sala/mensagem", async (req, res) => {
    if (!token.checkToken(req.headers.token, secretKey))
        return res.status(401).send({ msg: "Token inválido ou expirado" });

    const salaController = require("./controllers/salaController");
    let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);
}));

module.exports = app;
