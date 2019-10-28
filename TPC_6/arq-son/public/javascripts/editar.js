function editar(ident) {
  axios
    .get("/alt/" + ident)
    .then(response => window.location.assign("/alt/" + ident))
    .catch(error => console.log(error));
}
