const { Pool } = require('pg');

const conexao = new Pool({
   user: 'admin',
   password: 'postgres_admin',
   host: 'localhost',
   port: 15432,
   database: 'agenda-petshop'
});

module.exports = conexao
