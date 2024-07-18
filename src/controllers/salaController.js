exports.get = async function () {
    const salaModel = require('../models/salaModel');
    return await salaModel.listarSalas();
  //return[{nome: "info632A"}, {nome: "info632B"}];
}

