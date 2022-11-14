//chamando os pacotes instalodos, para usar
const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const session = require('express-session');
const multer = require('multer');
//-----------------------------------------------------------------------------------------
//inicializando o express, Handlebar, mysql, express-session, multert
const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//receber os campos do formulário---

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());
//----------------------------------

app.engine('handlebars', exphbs.engine());
app.set('view engine','handlebars');
//-----------------------------------------------------------------------------------------
//chamando o css para estilizar a pagina
app.use(express.static('public'));
//-----------------------------------------------------------------------------------------

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {

        //Extração da extensão do arquivo original
        const extensaoArquivo = file.originalname.split('.')[1];

        //Cria um codigo randomico que será o nome do arquivo
        const novoNomeArquivo = require('crypto')
            .randomBytes(10)
            .toString('hex');

        //Indica o novo nome do arquivo:
        cb(null ,`${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

const uploads = multer({storage});

//-------------------------------------------------------------------------------------------
//fazendo uma requizição para view aqui no index.js, chamando o home.handlebars, e fazendo a sua rota 
app.get('/', (req,res) => {
    res.render('home');//layout = false é para dizer, que não temos nenhum layout definido ainda
})

app.get('/cadastro', (req,res) => {
    res.render('cadastro');
})

//
app.post('/cadastro', uploads.single('foto'), (req,res) => {

    const usuario = req.body.usuario
    const email = req.body.email
    const senha = req.body.senha
    //const caminho = req.file.destination
    const arquivo = req.body.filename
    const foto = arquivo
    
    const sql = `INSERT INTO tbl_usuario (usuario,email,senha,foto) VALUES ('${usuario}','${email}','${senha}','${foto}')`
    conn.query(sql, function(err, dados) {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
    })
})

//-----------------------------------------------------------------------------------------
//criando a conexão com o banco de dados 
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proOne'
});
//------------------------------------------------------------------------------------------
//verificando se conectou com o banco de dados e iniciando o listem 
conn.connect(function (err){
    if (err) {
        console.log(err);
    }
    console.log('Conectou mysql!');
    app.listen(3000);
});


