const getIndexById = (productos,id) => productos.findIndex( prod => prod.id == id);

const getIndexByIdUsu = (usuarios,id) => usuarios.findIndex( usu => usu.id == id);

module.exports = {
    getIndexById,
    getIndexByIdUsu
}