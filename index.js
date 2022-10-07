//chamando os pacotes instalodos, para usar
const express = require('express');
const exphbs = require('express-handlebars');
//-----------------------------------------------------------------------------------------
//inicializando o express, e usando a engine do Handlebars
const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine','handlebars');
//-----------------------------------------------------------------------------------------
//fazendo uma requizição para view aqui no index.js, chamando o home.handlebars, e fazendo a sua rota 
app.get('/', (req,res) => {
    res.resnder('home', {layout:false});
});
//-----------------------------------------------------------------------------------------
//criando o listem, que serve para falar em qual porta esta rodando o servidor
app.listen(3000, () =>{
    console.log('app Funcionando');
});