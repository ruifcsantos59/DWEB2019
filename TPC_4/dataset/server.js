var http = require ('http');
var fs = require ('fs');

const server = http.createServer((req, res) => {
  
  const partes = req.url.split('/');
  var pag = partes[partes.length - 1];

  console.log(pag);

  let arq2html = fs.readFileSync('arq2html.xsl');

  if(pag.match(/arq2html.xsl/)){
    res.writeHead(200, {'Content-Type' : 'text/xml'});
    res.write(arq2html)
    res.end();
  } else if(pag.match(/[0-9]+/)){
    fs.readFile('arq' + pag + '.xml', (err, data) => {
      res.writeHead(200, {'Content-Type' : 'text/xml'});
      res.write(data);
      res.end();
    });
  }else {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write('<h1>erro</h1>');
    res.end()
  }

});

server.listen(7777);