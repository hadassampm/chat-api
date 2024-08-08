const db = require ("./db");

async function listarSalas (){
    return await db.findAll("salas");
}

let buscarSala = async (idsala)=>{
    return db.findOne ("salas", idsala);
}

module.exports = {listarSalas};