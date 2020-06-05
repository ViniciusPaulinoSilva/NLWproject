const express = require("express") 
const server  = express()

//pegar o bando de dados

const db = require("./database/db.js")

//configurar pasta public
server.use(express.static("public"))

//habilitar uso do req.body

server.use(express.urlencoded({ extended: true }))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true 
})



//configurar caminho da aplicação
//pagina inicial

server.get("/", (req, res) => {
    return res.render( "index.html",{ title: "Ecoleta"})
})




server.get("/create-point", (req, res) => {

    server.post("/savepoint",(req, res) =>{
        
        //req.body: O corpo do formulário
        //console.log(req.body)
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
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
        ]

        function afterInserData(err) {
            if(err) {
                console.log(err)
                return res.send("Erro no Cadastro")
            }
    
            console.log("Cadastrado com Sucesso")
            console.log(this)

            return res.send.render("create-point.html", { saved: true} )
        }
       
       
        db.run(query, values, afterInserData)

    })


    return res.render("create-point.html")
})





server.get("/search-results", (req, res) => {

    const search = req.query.search

    if(search ==""){
        //pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'` , function (err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length
        //mostrar a pagina html com os dados do bd
        return res.render("search-results.html", { places: rows, total })
    })
})

//ligar o servidor

server.listen(3000)
