var http = require("http");
var url = require("url");
var pug = require("pug");
var fs = require("fs");
var jsonfile = require("jsonfile");

var { parse } = require("querystring");

var myBD = "to-do.json";

var myServer = http.createServer((req, res) => {
  var purl = url.parse(req.url, true);
  var query = purl.query;

  console.log(req.method + " " + purl.pathname);

  console.log(myBD);

  if (req.method == "GET") {
    if (purl.pathname == "/") {
      jsonfile.readFile(myBD, (erro, todo) => {
        res.writeHead(200, {
          "Content-Type": "text/html; charset = UTF-8"
        });
        if (!erro) {
          res.write(pug.renderFile("index.pug", { lista: todo }));
        } else {
          res.write(
            pug.renderFile("erro.pug", { e: "Erro na leitura da BD ... " })
          );
        }
        res.end();
      });
    } else if (purl.pathname == "/w3.css") {
      res.writeHead(200, {
        "Content-Type": "text/css"
      });
      fs.readFile("stylesheets/w3.css", (erro, dados) => {
        if (!erro) {
          res.write(dados);
        } else {
          res.write("<p>Erro: " + erro + "</p>");
        }
        res.end();
      });
    } else {
      jsonfile.readFile(myBD, (erro, todo) => {
        res.writeHead(200, {
          "Content-Type": "text/html; charset = UTF-8"
        });
        if (!erro) {
          res.write(pug.renderFile("index.pug", { lista: todo }));
        } else {
          res.write(
            pug.renderFile("erro.pug", { e: "Erro na leitura da BD ... " })
          );
        }
        res.end();
      });
    }
  } else if (req.method == "POST") {
    if (purl.pathname == "/") {
      recuperaInfo(req, res => {
        jsonfile.readFile(myBD, (erro, todo) => {
          if (!erro) {
            todo.push(res);
            jsonfile.writeFile(myBD, todo, erro => {
              if (erro) {
                console.log(erro);
              } else {
                console.log("Registo gravado com sucesso");
              }
            });
          }
        });
      });
      res.writeHead(301, { Location: "/" });
      res.end();
    } else {
      res.writeHead(301, { Location: "/" });
      res.end();
    }
  }else {
    res.writeHead(200, {
      'Content-Type' : 'text/html; charset = UTF-8'
    });
    console.log('Erro: ' + req.method + ' não suportado...');
    res.write(pug.renderFile('erro.pug', {
      e : 'Erro: ' + req.method + ' não suportado...'
    }));
    res.end();
  }
});

myServer.listen(3000, () => {
  console.log("Servidor á escuta na porta 3000");
});

recuperaInfo = (request, callback) => {
  if (request.headers["content-type"] == "application/x-www-form-urlencoded") {
    let body = "";
    request.on("data", bloco => {
      body += bloco.toString();
    });
    request.on("end", () => {
      callback(parse(body));
    });
  }
};
