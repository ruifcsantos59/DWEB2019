var express = require("express");
var router = express.Router();
var jsonfile = require("jsonfile");

var myBD = __dirname + "/../arq-son.json";

/* GET home page. */
router.get("/", function(req, res) {
  jsonfile.readFile(myBD, (erro, arq) => {
    if (!erro) {
      res.render("index", { lista: arq });
    } else {
      res.render("error", { error: erro });
    }
  });
});

// Adicionar novo ARQ SONORO
router.get("/new", function(req, res) {
  res.render("add");
});
router.post("/new", function(req, res) {
  var obj = {
    prov: req.body.prov,
    local: req.body.local,
    tit: req.body.tit,
    musico: req.body.musico,
    file: {
      t: req.body.t,
      text: req.body.text
    },
    duracao: req.body.duracao
  };
  jsonfile.readFile(myBD, (erro, arq) => {
    if (!erro) {
      arq.push(obj);
      jsonfile.writeFile(myBD, arq, erro => {
        if (erro) console.log(erro);
        else console.log("Gravado com sucesso");
      });
    }
  });
  res.redirect("/");
});

// Remover ARQ SONORO
router.delete("/:ident", function(req, res) {
  jsonfile.readFile(myBD, (erro, arq) => {
    if (!erro) {
      var index = arq.findIndex(arq => arq.tit == req.params.ident);
      if (index > -1) {
        arq.splice(index, 1);
        jsonfile.writeFile(myBD, arq, erro => {
          if (erro) {
            console.log(erro);
            res.json({ error: erro });
          } else {
            console.log("Base de dados atualizada com sucesso");
            res.json({ success: "true" });
          }
        });
      }
    } else {
      console.log("Erro na leitura da base de dados ....");
      res.render("error", { error: erro });
    }
  });
});

// Ver detalhe de um ARQ SONORO
router.get("/arq/:ident", function(req, res) {
  jsonfile.readFile(myBD, (erro, arq) => {
    if (!erro) {
      var index = arq.findIndex(arq => arq.tit == req.params.ident);
      if (index > -1) {
        var array = [];
        array.push(arq[index]);
        res.render("arq", { lista: array });
      }
    }
  });
});

// Editar um ARQ SONORO
router.get("/alt/:ident", function(req, res) {
  jsonfile.readFile(myBD, (erro, arq) => {
    if (!erro) {
      var index = arq.findIndex(arq => arq.tit == req.params.ident);
      if (index > -1) {
        var array = [];
        array.push(arq[index]);
        res.render("alt", { lista: array });
      }
    }
  });
});
router.post("/alt", function(req, res) {
  var obj = {
    prov: req.body.prov,
    local: req.body.local,
    tit: req.body.tit,
    musico: req.body.musico,
    file: {
      t: req.body.t,
      text: req.body.text
    },
    duracao: req.body.duracao
  };

  jsonfile.readFile(myBD, (erro, arq) => {
    if (!erro) {
      var index = arq.findIndex(arq => arq.tit == req.body.tit);
      if (index > -1) {
        arq.splice(index, 1);
        arq.push(obj);
        jsonfile.writeFile(myBD, arq, erro => {
          if (erro) {
            console.log(erro);
            res.json({ error: erro });
          } else {
            console.log("Arquivo Apagado");
            res.render("index", { lista: arq });
          }
        });
      }
    } else {
      console.log("Erro na leitura da base de dados ....");
      res.render("error", { error: erro });
    }
  });
});

module.exports = router;
