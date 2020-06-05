//importar a dependencia do sqlite3

const sqlite3 = require("sqlite3").verbose()

//criar o objeto que realizará operações no banco de dados

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objeto bd para as operações
/*db.serialize(() => {
    //criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT, 
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)


    //Inserir dados na Tabela
const query = `
    INSERT INTO places (
        image, 
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
`

    const values = [
        "https://conexaoplaneta.com.br/wp-content/uploads/2018/08/voce-sabe-o-que-significam-simbolos-reciclagem-abre-conexao-planeta.jpg.png.jpg",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInserData(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com Sucesso")
        console.log(this)
    }
*/
    //db.run(query, values, afterInserData)*/

    //Consultar os dados da tabela

//db.all(`SELECT * FROM places`, function (err, rows){
//if(err) {
      //      return console.log(err)
     //   }

     //   console.log("Aqui estão seus registros")
     //   console.log(rows)
 //   })


    //Deletar um dado da tabela

   // db.run(`DELETE FROM places WHERE id = ?`, [3], function(err){
     //   if(err){
      //      return console.log(err)
      //  }

    //  console.log("Registro deletado com sucesso")
   // })
//})