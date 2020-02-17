const conexao = require('../conexao');

const executaQuery = (query) => {

   return new Promise((resolver, reject) => {
      conexao.query(query, (erro, resultados, campos) => {
        console.log('executou a query!')
          if (erro) {
            reject(erro)
          } else {
            resolver(resultados.rows)
          }
        })
      
   });   
   
}

module.exports = executaQuery;
