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

module.exports = {

    validarROle,
    existeUsuarioPorId
}