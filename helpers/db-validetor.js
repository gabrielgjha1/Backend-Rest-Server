const Categoria = require('../models/categoria');
const producto = require('../models/producto');
const Role = require('../models/role');
const Usuario = require('../models/usuario');


const validarROle = async (rol='')=>{

    const ExisteRol = await Role.findOne({rol});
    if (!ExisteRol){

        throw new Error('El rol no es valido')

    } 

}

const existeUsuarioPorId = async(id)=>{

    const ExisteId = await Usuario.findById(id)

    if (!ExisteId){

        throw new Error('No existe el usuario');

    }

}

const existeCategoriaPorId = async(id)=>{

    const EncontrarCategoria = await Categoria.findById(id);

    if (!EncontrarCategoria) {

      throw new Error ('NO existe esa categoria');

    }

}
const existeProductosPorId = async(id)=>{

    const EncontrarCategoria =  await producto.findById(id);

    if (!EncontrarCategoria) {

      throw new Error ('NO existe ESe producto');

    }

}

module.exports = {

    validarROle,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductosPorId,
}