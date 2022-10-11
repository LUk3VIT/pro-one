//chamando os pacotes instalodos, para usar
const express = require('express');
const exphbs = require('express-handlebars');
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
//criando o listem, que serve para falar em qual porta esta rodando o servidor
app.listen(3000, () =>{
    console.log('app Funcionando')
})