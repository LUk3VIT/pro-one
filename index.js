//chamando os pacotes instalodos, para usar
const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
//-----------------------------------------------------------------------------------------
//inicializando o express, e usando a engine do Handlebars
const app = express();

app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')
//-----------------------------------------------------------------------------------------
//chamando o css para estilizar a pagina
app.use(express.static('public'))
//-----------------------------------------------------------------------------------------
//fazendo uma requizição para view aqui no index.js, chamando o home.handlebars, e fazendo a sua rota 
app.get('/', (req,res) => {
    res.render('home')//layout = false é para dizer, que não temos nenhum layout definido ainda
})
//-----------------------------------------------------------------------------------------
//criando a conexão com o banco de dados 
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proOne'
})
//------------------------------------------------------------------------------------------
//verificando se conectou com o banco de dados e iniciando o listem 
conn.connect(function (err){
    if (err) {
        console.log(err);
    }
    console.log('Conectou mysql!');
    app.listen(3000);
})


