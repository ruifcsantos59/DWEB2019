var express = require("express");
var router = express.Router();

var Filmes = require("../controllers/filmeController");

/* GET home page. */
router.get("/", function(req, res) {
  Filmes.listar()
    .then(dados => res.render("index", { lista: dados }))
    .catch(erro => res.render("error", { error: erro }));
});

router.get("/new", (req, res) => {
  console.log("aquiiiiiiii");
  return res.render("new");
});

router.get("/:idFilme", (req, res) => {
  console.log(req.params.idFilme);
  Filmes.consultar(req.params.idFilme)
    .then(dados => res.render("detalhe", { lista: dados }))
    .catch(erro => res.render("error", { error: erro }));
});

router.get("/edit/:idFilme", (req, res) => {
  console.log("aquiii");
  Filmes.consultar(req.params.idFilme)
    .then(filme => res.render("editar", { lista: filme }))
    .catch(error => res.render("error", { error: error }));
});

router.post("/edit", (req, res) => {
  console.log(req.body.year);
  let filme = {
    title: req.body.title,
    year: req.body.year,
    cast: req.body.cast.split(","),
    genres: req.body.genres.split(",")
  };

  console.log("Entrei aqui");

  Filmes.editar(req.body._id, filme)
    .then(filme => res.render("detalhe", { lista: filme }))
    .catch(erro => res.render("error", { error: erro }));
});

router.post("/", (req, res) => {
  let filme = {
    title: req.body.title,
    year: req.body.year,
    cast: req.body.cast.split(","),
    genres: req.body.genres.split(",")
  };
  Filmes.novo(filme)
    .then(filme => res.render("detalhe", { lista: filme }))
    .catch(erro => res.render("error", { error: erro }));
});

router.delete("/:idFilme", (req, res) => {
  console.log(req.params.idFilme);
  Filmes.apagar(req.params.idFilme)
    .then(filme => res.json(filme))
    .catch(erro => res.render("error", { error: erro }));
});

router.put("/:idFilme", (req, res) => {
  console.log(req.body);
  console.log(req.params.idFilme);

  Filmes.editar(req.params.idFilme, req.body)
    .then(filme => res.json(filme))
    .catch(erro => res.render("error", { error: erro }));
});

module.exports = router;
