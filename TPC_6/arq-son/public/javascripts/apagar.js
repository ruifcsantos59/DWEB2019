function apagaItem(ident) {
  console.log("entrei");
  axios
    .delete("/" + ident)
    .then(response => window.location.assign("/"))
    .catch(error => console.log(error));
}
