require("dotenv").config();
const express = require('express');
const app = require("../src/api");
const token = require('../src/util/token'); // Ajuste o caminho conforme necessário

app.use(express.json());

// Middleware para verificar o token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Espera 'Bearer <token>'

    if (token == null) return res.status(401).json({ msg: 'Token não fornecido' });

    if (!token.checkToken(token)) {
        return res.status(401).json({ msg: 'Token inválido ou expirado' });
    }

    next();
};

// Aplicar o middleware de autenticação às rotas protegidas
app.use('/salas', authenticateToken);
app.use('/sala/entrar', authenticateToken);
app.use('/sala/mensagem', authenticateToken);

let port = process.env.API_PORT || 5000;

app.listen(port, () => {
    console.log("App executando na porta " + port);
});
