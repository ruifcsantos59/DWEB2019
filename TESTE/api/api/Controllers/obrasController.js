var Obras = require('../Models/obras');

const Obra = module.exports;

Obra.listar = () => {
    return Obras.find({}, {id: 1, titulo: 1, tipo: 1, compositor: 1}).exec();
}

Obra.listarPorID = (id) => {
    return Obras.findOne({id: id}).exec();
}

Obra.listarTipos = () => {
    return Obras.distinct("tipo").exec();
}

Obra.listarPorCompositor = (compositor) => {
    return Obras.find({compositor: compositor}).exec();
}

Obra.listarPorPartituras = (instrumento) => {

}

Obra.quantObras = () => {
    
}