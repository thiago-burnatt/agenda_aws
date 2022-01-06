require('dotenv').config();  // Para não fazer commit dos dados de login do dB

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING, // Link com arquivo .env que possui os dados de login
    {
        // useFindAndModify: false,
    }) 
    .then(() => {
        app.emit('pronto');
    })
    .catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
// const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

// app.use(helmet());
app.use(express.urlencoded({extended:true}));  // Para obter os dados enviados via POST
app.use(express.json());

// Para usar os arquivos estáticos
app.use(express.static('./public'));



// Para salvar os dados do cliente em outras sessões
const sessionOptions = session({
    secret: 'test secret',
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 *24 * 7,  // Para a sessão durar uma semana
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

// Para usar o views - Precisa instalar o ejs
app.set('views', './src/views');  // Pode usar path também
app.set('view engine', 'ejs');  //ejs é usado para utilizar for e if dentro do HTML, por exemplo 

app.use(csrf());

// Para usar um Middleware global
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

// Para usar as routes
app.use(routes);

// Para que comece a escutar somente depois que estiver conectado no dB
app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000')
    });
})

