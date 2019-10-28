function detalhe(ident) {
  axios
    .get("/arq/" + ident)
    .then(response => window.location.assign("/arq/" + ident))
    .catch(error => console.log(error));
}
