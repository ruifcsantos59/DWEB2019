var Premio = require("../models/Premio");

const Premios = module.exports;

Premios.listar = () => {
  return Premio.find()
    .sort({ year: 1 })
    .exec();
};

Premios.consulta = idPremio => {
  return Premio.findOne({ _id: idPremio }).exec();
};

Premios.categorias = () => {
  return Premio.distinct("category").exec();
};

Premios.listarCategoriaX = category => {
  return Premio.find({ category: category }).exec();
};

Premios.listarCategoriaXdataY = (category, data) => {
  return Premio.find({ category: category, year: { $gt: data } }).exec();
};

Premios.laureados = () => {
  return Premio.aggregate([
    { $unwind: "$laureates" },
    {
      $group: {
        _id: "$laureates.firstname",
        premios: {
          $push: {
            year: "$year",
            category: "$category"
          }
        }
      }
    },
    { $sort: { _id: 1 } }
  ]).exec();
  /*return Filme.aggregate([
    { $group: { _id: "$" + campo, contador: { $sum: 1 } } },
    { $sort: { contador: -1 } }
  ]).exec();*/
};
