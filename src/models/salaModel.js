const db = require ("./db");

async function listarSalas (){
    return await db.findAll("salas");
}

module.exports = {listarSalas};