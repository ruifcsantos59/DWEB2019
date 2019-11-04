var Filme = require("../models/filme");

const Filmes = module.exports;

Filmes.listar = () => {
  return Filme.find()
    .sort({ title: 1 })
    .exec();
};

Filmes.consultar = fid => {
  return Filme.findOne({ _id: fid }).exec();
};

Filmes.novo = filme => {
  return Filme.create(filme);
};

Filmes.editar = (fid, filme) => {
  return Filme.findOneAndUpdate({ _id: fid }, filme).exec();
};

Filmes.apagar = fid => {
  return Filme.findByIdAndRemove(fid);
};

Filmes.contar = () => {
  return Filme.countDocuments().exec();
};

Filmes.projetar = campos => {
  return Filme.find({}, campos).exec();
};

Filmes.agregar = campo => {
  return Filme.aggregate([
    { $group: { _id: "$" + campo, contador: { $sum: 1 } } },
    { $sort: { contador: -1 } }
  ]).exec();
};
