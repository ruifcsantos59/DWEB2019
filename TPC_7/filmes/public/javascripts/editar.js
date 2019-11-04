function editar(ident) {
  axios
    .get("/filmes/edit/" + ident)
    .then(response => window.location.assign("/filmes/edit/" + ident))
    .catch(error => console.log(error));
}
