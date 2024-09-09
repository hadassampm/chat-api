const db = require("./db");
async function registrarUsuario(nick){
    return await db.insertOne("usuario", {"nick": nick});
}

let buscarUsuario = async (iduser) => {
    let user = await db.findOne("usuarios", iduser);
    return user;
}

let alterarUsuario = async (user) => {
    return await db.updateOne("usuarios", user, {_id:user._id});
}

<<<<<<< HEAD
module.exports = {registrarUsuario, buscarUsuario, alterarUsuario};
=======
module.exports = {registrarUsuario, insertOne, buscarUsuario, alterarUsuario} 
>>>>>>> ec7abcb09aa2e6814054bda565c5e291c0a4dfba
