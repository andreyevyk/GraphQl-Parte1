const executaQuery = require('../database/queries')

class Pet {
   lista() {
      const sql = `SELECT 
                     Pets.id,Pets.nome, Pets.tipo, Pets.observacoes, 
                     Clientes.id as donoId, Clientes.nome as donoNome, Clientes.cpf as donoCpf
                     FROM Pets INNER JOIN Clientes ON Pets.donoId = Clientes.id`;
   
      return executaQuery(sql).then(pets => 
         pets.map(pet => 
            ({
               id: pet.id,
               nome: pet.nome,
               tipo: pet.tipo,
               observacoes: pet.observacoes,
               dono: {
                  id: pet.donoid,
                  nome: pet.dononome,
                  cpf: pet.donocpf,
               }
            })
         )
      )
   }

  buscaPorId(id) {
    const sql = `SELECT * FROM Pets WHERE id=${parseInt(id)}`

    return executaQuery(sql).then(res => res[0]);
  }

  adiciona(item) {
    const { nome, donoid, tipo, observacoes } = item
    const sql = `INSERT INTO Pets(nome, donoid, tipo, observacoes) VALUES('${nome}', ${donoid}, '${tipo}', '${observacoes}') RETURNING * `

    return executaQuery(sql).then(res => res[0]);
  }

  atualiza(novoItem) {
    const { id, nome, donoid, tipo, observacoes } = novoItem
    const sql = `UPDATE Pets SET nome='${nome}', donoid=${donoid}, tipo='${tipo}', observacoes='${observacoes}' WHERE id=${id} RETURNING *`

    return executaQuery(sql).then(res => res[0]);
  }

  deleta(res, id) {
    const sql = `DELETE FROM Pets WHERE id=${id}`

    executaQuery(res, sql)
  }
}

module.exports = new Pet
