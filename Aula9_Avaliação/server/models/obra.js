var mongoose = require("mongoose");

var ObraSchema = new mongoose.Schema({
  id: String,
  nome: String,
  desc: String,
  anoCriacao: String,
  periodo: String,
  compositor: String,
  duracao: String
});

module.exports = mongoose.model("obras", ObraSchema);
