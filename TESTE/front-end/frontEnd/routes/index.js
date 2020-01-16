var express = require('express');
var router = express.Router();
var axios = require('axios');

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ'

/* GET home page. */
router.get('/', function (req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/entidades?apikey=' + apiKey)
  .then(dados => res.render('index', { lista: dados.data }))
  .catch(error => res.render('error', { error: error }));
});

router.get('/:id', function(req, res){
  axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '?apikey=' + apiKey)
  .then(ent => {
    console.log(ent.data);
    axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/tipologias?apikey=' + apiKey)
    .then(tip => {
      console.log(tip.data)
      axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/dono?apikey=' + apiKey)
      .then(dono => {
        console.log(dono.data);
        axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/participante?apikey=' + apiKey)
        .then(part => {
          console.log(part.data)
          res.render('ent', { ent: ent.data, tips: tip.data, dono: dono.data, part: part.data})
        })
        .catch(error => res.render('error', { error: error }));
      })
      .catch(error => res.render('error', { error: error }));
    })
    .catch(error => res.render('error', { error: error }));
  })
  .catch(error => res.render('error', { error: error }));
});

router.get('/tipologia/:id', function(req, res){
  axios.get('http://clav-api.dglab.gov.pt/api/tipologias/' + req.params.id + '?apikey=' + apiKey)
  .then(tip => {console.log(tip.data)
    res.render('tip', { tip: tip.data })})
  .catch(error => res.render('error', { error: error }));
})

module.exports = router;
