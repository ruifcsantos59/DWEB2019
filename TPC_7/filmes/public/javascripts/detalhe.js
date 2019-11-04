function detalhe(_id) {
  axios
    .get("/filmes/" + _id)
    .then(response => window.location.assign("/filmes/" + _id))
    .catch(error => console.log(error));
}
