var mongoose = require("mongoose");

var partituraSchema = new mongoose.Schema({
    voz: String,
    path: String,
    type: String
})

var instrumentosSchema = new mongoose.Schema({
    designacao: String,
    partitura: [partituraSchema]
});

var videoSchema = new mongoose.Schema({
    href: String
});


var obrasSchema = new mongoose.Schema({
    arranjo: String,
    compositor: String,
    editado: String,
    id: String, 
    subtitulo: String,
    tipo: String,
    titulo: String,
    instrumento: [instrumentosSchema],
    infrelacionada: [videoSchema]
});

module.exports = mongoose.model("obras", obrasSchema);