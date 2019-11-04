function apagaItem(_id) {
  axios
    .delete("/filmes/" + _id)
    .then(response => window.location.assign("/filmes"))
    .catch(error => console.log(error));
}
