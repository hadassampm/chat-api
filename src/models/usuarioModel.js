const { connect } = require("../api");
const db = require("./db");
async function registrarUsuario(nick){
    return await db.insertOne("usuario", {"nick": nick});

}

async function insertOne(collection, objeto){
    const db = await connect();
    return db.collection(collection).insertOne(objeto);
}

let buscarUsuario = async (iduser) => {
    let user = await db.findOne("usuarios", iduser);
    return user;
}

let alterarUsuario = async (user) => {
    return await db.updateOne("usuarios", user, {_id:user._id});
}

module.exports = {registrarUsuario, insertOne, buscarUsuario, alterarUsuario} /*Tem que adionar isso aqui */