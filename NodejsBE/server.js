const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

const routes = require('./routes');
const db = require('./db');

const PORT = 8082;

const app = express()

app.use(session({
    name:'myname.sid',
    resave:false,
    saveUninitialized:false,
    secret: 'secret',
    cookie:{
        maxAge: 300000,
        httpOnly:false,
        secure:false
    }
}));

require('./passport-config');

app.use(passport.initialize());

app.use(passport.session());

app.use(express.static(__dirname + '/views'));
app.use(cors({
    origin: ['http://localhost:4200'],
    credentials:true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {

})

app.get('/prod', routes.getProd);
app.post('/prod', routes.postProd);
app.delete('/prod/:id', routes.deleteProd);
app.put('/prod/:id', routes.putProd);

app.get('/usu', routes.getUsu);
app.post('/usu', routes.postUsu);
app.delete('/usu/:id', routes.deleteUsu);
app.put('/usu/:id', routes.putUsu);

app.post('/log/', routes.postLogin);

app.get('*', routes.notFound);

db.conectarDB(()=> {
    app.listen(PORT, err => {
        if (err) return console.log(`Error en Server express: ${err}`);
        console.log(`Servidor express listen in ${PORT}`);
    })
});