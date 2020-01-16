var express = require('express');
var router = express.Router();

var Obras = require("../Controllers/obrasController");

/* GET users listing. */
router.get('/obras', function(req, res) {

  if(req.query.compositor && !req.query.instumentos){
    Obras.listarPorCompositor(req.query.compositor).then(dados => res.jsonp(dados)).catch(erro => res.status(500).jsonp(erro));
  }else if(!req.query.compositor && req.query.instumentos){
    
  }else {
    Obras.listar().then(dados => res.jsonp(dados)).catch(erro => res.status(500).jsonp(erro));
  }
});

router.get('/obras/:id', function(req, res){
  Obras.listarPorID(req.params.id).then(dados => res.jsonp(dados)).catch(erro => res.status(500).jsonp(erro));
});

router.get('/tipos', function(req, res){
  Obras.listarTipos().then(dados => res.jsonp(dados)).catch(erro => res.status(500).jsonp(erro));
});

router.get('/obrasQuant', function(req, res){

});


module.exports = router;
