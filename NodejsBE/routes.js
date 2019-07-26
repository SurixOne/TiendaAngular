const util = require('./util');
const db = require('./db');

function getUsu(req, res) {
    db.readUsuarioDB()
    .then( usus => res.send({data: usus}))
    .catch( err => res.send({data: err}))
}
function postLogin2(req, res){
    passport.authenticate('local', function(err, user, info) {
        if (err) { return res.status(501).json(err); }
        if (!user) { return res.status(501).json(info); }
        req.logIn(user, function(err) {
          if (err) { return res.status(501).json(err); }
          return res.status(200).json({message:'Login success'});
          //cambiar username por usuario
        });
    })(req, res, next);
}
function postLogin(req, res) {
    let usuario = req.body;
    console.log('pff' + usuario.usuario)
    db.readUsuarioLoginDB(usuario)
    .then(usu => res.send({data: usu}))
    .catch( err => res.send({data: err}))
}
function postUsu(req, res) {
    let usuario = req.body;
    console.log("usuario guardado", usuario);

    db.saveUsuarioDB(usuario)
    .then( usus => res.send(usuario))
    .catch( err => res.send({data: err}))
}

function deleteUsu(req, res) {
    let id = req.params.id;
    console.log(id);

    db.deleteUsuarioDB(id)
    .then( usus => res.send({data: id}))
    .catch( err => res.send({data: err}))
}

function putUsu(req, res) {

    let id = req.params.id;
    let usuario = req.body;
    console.log('put', id, usuario);

    db.updateUsuarioDB(usuario, id)
    .then( usu => res.send({data: usu}))
    .catch( err => res.send({data: err}))
}
function getProd(req, res) {
    db.readDB()
    .then( prods => res.send({data: prods}))
    .catch( err => res.send({data: err}))
}

function postProd(req, res) {
    let producto = req.body;
    console.log(producto);

    db.saveDB(producto)
    .then( prods => res.send(producto))
    .catch( err => res.send({data: err}))
}

function deleteProd(req, res) {
    let id = req.params.id;
    console.log(id);

    db.deleteDB(id)
    .then( prods => res.send({data: id}))
    .catch( err => res.send({data: err}))
}

function putProd(req, res) {

    let id = req.params.id;
    let producto = req.body;
    console.log('put', id, producto);

    db.updateDB(producto, id)
    .then( prod => res.send({data: prod}))
    .catch( err => res.send({data: err}))
}

function notFound(req,res) {
    res.send({respuesta: 'Pagina no encontrada'});
}

module.exports = {
    postLogin,
    getProd,
    postProd,
    deleteProd ,
    putProd,
    getUsu,
    postUsu,
    deleteUsu,
    putUsu,
    notFound
}
