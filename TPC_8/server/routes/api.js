var express = require("express");
var router = express.Router();

var Premios = require("../controllers/PremiosController");

/* Categoria e Data*/
router.get("/premios", (req, res, next) => {
  if (!req.query.categoria && !req.query.data) {
    next();
  } else {
    if (req.query.categoria && !req.query.data) {
      Premios.listarCategoriaX(req.query.categoria)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro));
    } else if (req.query.categoria && req.query.data) {
      Premios.listarCategoriaXdataY(req.query.categoria, req.query.data)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro));
    }
  }
});

/* GET Todos os Prémios */
router.get("/premios", (req, res) => {
  console.log("nao entrei aqui");
  Premios.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

/* GET Só um Prémio com um determinado id */
router.get("/premios/:idPremio", (req, res) => {
  Premios.consulta(req.params.idPremio)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

/* GET Todas as Categorias */
router.get("/categorias", (req, res) => {
  Premios.categorias()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

router.get("/laureados", (req, res) => {
  Premios.laureados()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

module.exports = router;
