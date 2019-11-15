const readline = require("readline");
const path = require("path");

const { exec } = require("child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(__dirname);

rl.question("Qual o nome que pretende dar á base de dados?", dbResposta => {
  console.log(`Nome da base de dados: ${dbResposta}`);

  rl.question("Qual o nome que pretende dar à coleção?", colResposta => {
    console.log(`Nome da Coleção: ${colResposta}`);

    rl.question("Qual o ficheiro que pretende carregar?", fileResposta => {
      console.log(`Nome da Coleção: ${__dirname + "/" + fileResposta}`);

      const child = exec(
        `mongoimport -d ${dbResposta} -c ${colResposta} --jsonArray ${fileResposta}`,
        (error, stdout, stderr) => {
          if (error) {
            throw error;
          }
          console.log(stdout);
        }
      );

      rl.close();
    });
  });
});
