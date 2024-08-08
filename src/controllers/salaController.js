exports.get = async function () {
    const salaModel = require('../models/salaModel');
    return await salaModel.listarSalas();
  //return[{nome: "info632A"}, {nome: "info632B"}];
}

exports.entrar = async (iduser, idsalaa) => {
  const sala = await salaModel.buscarSala(idsala);
  let usuarioModel = require ('../models/usuarioModel');
  let user = await usuarioModel.buscarUsuario(iduser);
  user.sala ={_id:sala._id, nome:sala.nome, tipo:sala.tipo};
  if(await usuarioModel.alterarUsuario(user)){
    return {msg: "OK", timestamp:timestamp=Date.now()};
  }
  return false;
}

exports.enviaMensagem = async (nick, msg, idsala) => {
  const sala = await salaModel.buscarSala(idsala);
  if(!sala.msgs){
    sala.msgs = [];
  }
  timestamp = Date.now()
  sala.msgs.push(
    {
      
    }
  )
}