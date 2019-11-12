var Obra = require("../models/Obra");

const Obras = module.exports;

Obras.listar = () => {
  return Obra.find().exec();
};

Obras.listarPorAno = ano => {
  return Obra.find({ anoCriacao: ano }).exec();
};

Obras.listarPorCompositoreDuracao = (Compositor, Duracao) => {
  return Obra.find({
    compositor: Compositor,
    duracao: { $gt: Duracao }
  }).exec();
};

Obras.listarPorPeriodo = periodo => {
  return Obra.find({ periodo: periodo }).exec();
};

Obras.consultarObra = idObra => {
  return Obra.find({ id: idObra }).exec();
};

Obras.Conpositores = () => {
  return Obra.distinct("compositor").exec();
};

Obras.Periodos = () => {
  return Obra.distinct("periodo").exec();
};

/*Premios.consulta = idObra => {
  return Premio.findOne({ _id: idObra }).exec();
};

Premios.listarCategoriaX = category => {
  return Premio.find({ category: category }).exec();
};

Premios.listarCategoriaXdataY = (category, data) => {
  return Premio.find({ category: category, year: { $gt: data } }).exec();
};*/
