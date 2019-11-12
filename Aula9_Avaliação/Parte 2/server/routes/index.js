var express = require("express");
var router = express.Router();
var axios = require("axios");

/* GET home page. */
router.get("/", (req, res) => {
  axios
    .get(
      "http://clav.dglab.gov.pt/api/entidades?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ"
    )
    .then(dados => res.render("index", { lista: dados.data }))
    .catch(erro => console.log(erro));
});

router.get("/:idEntidade", (req, res) => {
  axios
    .get(
      `http://clav.dglab.gov.pt/api/entidades/${req.params.idEntidade}?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ`
    )
    .then(entidade => {
      axios
        .get(
          `http://clav.dglab.gov.pt/api/entidades/${req.params.idEntidade}/tipologias?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ`
        )
        .then(tipologia => {
          axios
            .get(
              `http://clav.dglab.gov.pt/api/entidades/${req.params.idEntidade}/intervencao/dono?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ`
            )
            .then(dono => {
              axios
                .get(
                  `http://clav.dglab.gov.pt/api/entidades/${req.params.idEntidade}/intervencao/participante?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ`
                )
                .then(participante =>
                  res.render("entidade", {
                    entidade: entidade.data,
                    tipologia: tipologia.data,
                    dono: dono.data,
                    participante: participante.data
                  })
                )
                .catch(erro => console.log(erro));
            })
            .catch(erro => console.log(erro));
        })
        .catch(erro => console.log(erro));
    })
    .catch(erro => console.log(erro));
});

module.exports = router;
