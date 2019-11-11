var mongoose = require("mongoose");

var LaureateSchema = new mongoose.Schema({
  id: String,
  firstname: String,
  surname: String,
  motivation: String,
  share: String
});

var PremiosSchema = new mongoose.Schema({
  year: String,
  overallMotivation: String,
  laureates: [LaureateSchema]
});

module.exports = mongoose.model("premios", PremiosSchema);
