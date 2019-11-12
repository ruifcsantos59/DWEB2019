var express = require("express");
var router = express.Router();

var Obras = require("../controllers/obraController");

/* GET home page. */
router.get("/", (req, res) => {
  if (
    req.query.ano &&
    !req.query.compositor &&
    !req.query.duracao &&
    !req.query.periodo
  ) {
    Obras.listarPorAno(req.query.ano)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro));
  } else if (
    !req.query.ano &&
    req.query.compositor &&
    req.query.duracao &&
    !req.query.periodo
  ) {
    Obras.listarPorCompositoreDuracao(req.query.compositor, req.query.duracao)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro));
  } else if (
    !req.query.ano &&
    !req.query.compositor &&
    !req.query.duracao &&
    req.query.periodo
  ) {
    console.log("entrei aqui");
    Obras.listarPorPeriodo(req.query.periodo)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro));
  } else {
    Obras.listar()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro));
  }
});

router.get("/compositores", (req, res) => {
  Obras.Conpositores()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

router.get("/periodos", (req, res) => {
  Obras.Periodos()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

router.get("/:idObra", (req, res) => {
  Obras.consultarObra(req.params.idObra)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

module.exports = router;
