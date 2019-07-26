const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const productoSchema = new Schema({
    id: Number,
    item: String,
    stock: Number,
    foto: String,
    precio: Number
})

const usuarioSchema = new Schema({
    id: Number,
    usuario: String,
    mail: String,
    clave: String,
    carrito: Object({
        id: Number,
        item: String,
        foto: String,
        precio: Number
    })
})

usuarioSchema.methods.isValid = function(hashedpassword){
    return bcrypt.compareSync(hashedpassword, this.clave);
}

const productoModel = mongoose.model('productos', productoSchema);

const usuarioModel = mongoose.model('usuarios', usuarioSchema);

function updateUsuarioDB(usu, id) {
    return new Promise((resolve, reject) => {
        usuarioModel.updateOne({_id: id}, {$set: usu}, err => {
            if(err) reject(err)
            else resolve(usu);
        });
    })
}

function deleteUsuarioDB(id) {
    return new Promise((resolve, reject) => {
        usuarioModel.deleteOne({ _id: id }, err => {
            if(err) reject(err)
            else resolve();
        });
    })
}

function saveUsuarioDB(usu) {
    return new Promise((resolve, reject) => {
              let usuarioSave = new usuarioModel(usu);
              console.log('usuario mail clave carrito',
              usu.usuario, usu.mail,  usu.clave, usu.carrito);
              usuarioSave.save(err => {
                  if(err) reject(err)
                  else resolve();
              });
    })
}
function saveUsuarioDB2(usu) {
    return new Promise((resolve, reject) => {

        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(usu.clave, salt, function(err, hash) {
              // Store hash in your password DB.
              console.log("hash", hash);
              usu.clave = hash;
              let usuarioSave = new usuarioModel(usu);
              console.log('usuario mail clave carrito',
              usu.usuario, usu.mail,  bcrypt.hash(usu.clave, 10), usu.carrito);
              usuarioSave.save(err => {
                  if(err) reject(err)
                  else resolve();
              });
          });
        });
    })
}

function readUsuarioDB(usu) {
    return new Promise((resolve, reject) => {
        usuarioModel.find({}, (err, usus) => {
            if(err) reject(err)
            else resolve(usus);
        });
    })
}

function readUsuarioLoginDB(usu) {
    console.log("easy main dude", usu.clave);
    return new Promise((resolve, reject) => {
        usuarioModel.findOne({       
            $or:[{usuario:usu.usuario}, {clave: usu.clave }]
            }, (err, miusu) => {
            if(err){ 
                reject(err)}
            else if(usu.clave == miusu.clave){
                resolve(miusu);
            } 
            else reject('clave incorrecta');
        });
    })
}

function updateDB(prod, id) {
    return new Promise((resolve, reject) => {
        productoModel.updateOne({_id: id}, {$set: prod}, err => {
            if(err) reject(err)
            else resolve(prod);
        });
    })
}

function deleteDB(id) {
    return new Promise((resolve, reject) => {
        productoModel.deleteOne({ _id: id }, err => {
            if(err) reject(err)
            else resolve();
        });
    })
}


function saveDB(prod) {
    return new Promise((resolve, reject) => {
        let productoSave = new productoModel(prod);
        productoSave.save(err => {
            if(err) reject(err)
            else resolve();
        });
    })
}

function readDB(prod) {
    return new Promise((resolve, reject) => {
        productoModel.find({}, (err, prods) => {
            if(err) reject(err)
            else resolve(prods);
        });
    })
}



listaProductos = [
    {id: 2, item: 'Remera PunPun', stock: 27, foto: 'https://d26lpennugtm8s.cloudfront.net/stores/348/125/products/oyasumi-punpun41-62ba7067f6713dfa9015163796383237-1024-1024.jpg', precio: 203},
    {id: 1, item: 'Taza PunPun', stock: 36, foto: 'https://res.cloudinary.com/teepublic/image/private/s--LW-W-HFI--/c_scale,h_704/c_lpad,g_north_west,h_801,w_1802,x_187,y_48/c_crop,h_801,w_691,x_125/c_mfit,g_north_west,u_misc:Mug%20Effect%20Coffee3%20Left/e_displace,fl_layer_apply,x_14,y_-2/c_mfit,g_north_east,u_misc:Mug%20Effect%20Coffee3%20Right/e_displace,fl_layer_apply,x_-14,y_-2/c_crop,h_801,w_656/g_north_west,l_upload:v1466696262:production:blanks:w00xdkhjelyrnp8i8wxr,x_-410,y_-235/b_rgb:a3a3a3/c_limit,f_auto,h_285,q_90,w_285/v1541349997/production/designs/3441714_0', precio: 100},
    {id: 2, item: 'Gorra Jojos', stock: 27, foto: 'https://ae01.alicdn.com/kf/HTB1VSJdOXXXXXXfaXXXq6xXFXXXx/Anime-jojo-Bizarre-Adventure-Cappello-Jotaro-Kujou-Esercito-Militare-Unisex-Berretto-di-Cotone.jpg_640x640.jpg', precio: 203},
    {id: 3, item: 'Manga PunPun', stock: 41, foto: 'https://scontent-lga3-1.cdninstagram.com/vp/89eb5d76af56b410e3e897baa2380e0d/5DC395E3/t51.2885-15/sh0.08/e35/s640x640/65144162_3050242091654419_795892293424069825_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com', precio: 20},
]

listaUsuarios = [
    {
        id: 1,
        usuario: 'SurixOne',
        mail: 'surixone@hotmail.com',
        clave: 'poker1',
        carrito: ({})
    }]

function iniDB() {

    saveDB(listaProductos[0])
    .then(()=>saveDB(listaProductos[1]))
    .then(()=>saveDB(listaProductos[2]))
    .then(()=>saveDB(listaProductos[3]))
    .catch( err => console.log('ERROR INI: ', err));

    saveUsuarioDB(listaUsuarios[0])
    .catch( err => console.log('ERROR INI: ', err));
}


function conectarDB(cb) {
    mongoose.connect('mongodb://localhost/ecommerce', {useNewUrlParser: true}, err => {
        if(err) return console.log(`Error en conexión de ${err}`);
        console.log('Base de datos conectada');
        
        iniDB();

        if(cb) cb();
    });
}

module.exports = {
    usuarioModel,
    usuarioSchema,
    readDB,
    saveDB,
    deleteDB,
    updateDB,
    readUsuarioDB,
    saveUsuarioDB,
    deleteUsuarioDB,
    updateUsuarioDB,
    readUsuarioLoginDB,
    conectarDB
}