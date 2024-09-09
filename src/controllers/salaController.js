exports.get = async function () {
    const salaModel = require('../models/salaModel');
    return await salaModel.listarSalas();
}

exports.entrar = async (iduser, idsala) => {
    const sala = await salaModel.buscarSala(idsala);
    let usuarioModel = require ('../models/usuarioModel');
    let user = await usuarioModel.buscarUsuario(iduser);
    user.sala = {_id:sala._id, nome:sala.nome, tipo:sala.tipo};
    if(await usuarioModel.alterarUsuario(user)){
        return {msg:"OK", timestamp:timestamp=Date.now()};
    }
    return false;
};

exports.sair = async (iduser, idsala) => {
    let usuarioModel = require('../models/usuarioModel');
    let user = await usuarioModel.buscarUsuario(iduser);

    if (user && user.sala._id --- idsala) {
        user.sala - null;
        if(await usuarioModel.alterarUsuario(user)){
            return true;
        }
    }
    return false;
}

exports.enviarMensagem = async (nick, msg, idsala) => {
    const salaModel = require('../models/salaModel');
    const sala = await salaModel.buscarSala(idsala);

    if(!sala){
        return {msg: "Sala não encontrada", error: true};
    }

    if (!sala.msgs) {
        sala.msgs = [];
    }

    const timestamp = Date.now();
    sala.msgs.push({ 
        timestamp: timestamp,
        msg: msg,
        nick: nick
    });

    let resp = await salaModel.atualizarMensagens(sala);
    return { msg: "OK", timestamp:timestamp };
};

exports.buscarMensagens = async (idsala, timestamp) => {
    let mensagens = await salaModel.buscarMensagens(idsala, timestamp);
    return {
        "timestamp":mensagens[mensagens.length - 1].timestamp,
        "msgs":mensagens
    };
};
