const { request, response } = require("express");
const { ObjectId } = require('mongoose').Types;
const Categoria = require ('../models/categoria')
const Usuario = require ('../models/usuario')
const Producto = require ('../models/producto')
const Role = require ('../models/role')
const CollecionesPermitidas = [

    'usuarios',
    'categorias',
    'productos',
    'roles'

];

const buscarUsuario = async(termino = '',res=response)=>{

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID){

        const usuario = await Usuario.findById(termino);
       return res.json({
            
            results: (usuario) ? [ usuario ] : []
        });

    }

    const regex =  new RegExp(termino,'i');

    const usuarios = await Usuario.find({

        $or:[{nombre:regex},{correo:regex}],
        $and:[{estado:true}]

    });

    res.json({
        results:usuarios
    })
}

const Buscarcategorias = async(termino='',res=response)=>{


    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID){

        const categorias = await Categoria.findById(termino);
     
        return res.status(200).json({

            results: (categorias) ? [categorias]: []

        });

    }

    const regex =  new RegExp(termino,'i');

    const categorias = await Categoria.find({

        $or:[{nombre:regex}],
        $and:[{estado:true}]        

    });

    return res.status(200).json({

        results:categorias

    });

}

const buscarProductos  =  async (termino,res=response)=>{

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID){

        const productos = await  Producto.findById(termino);
     
        return res.status(200).json({

            results: (productos) ? [productos]: []

        });

    }

    const regex =  new RegExp(termino,'i');

    const productos = await Producto.find({

        $or:[{nombre:regex}],
        $and:[{estado:true}]        

    });

    return res.status(200).json({

        results:productos

    });


}

const buscar = (req=request,res=response)=>{


    const {coleccion,termino} = req.params;

    if (!CollecionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:'No es una colleccion permitida'
        });
    }


    switch (coleccion) {
        
        case 'usuarios':
            buscarUsuario(termino,res);    
        break;

        case 'categorias':
            Buscarcategorias(termino,res);
            break;
        case 'productos':
            buscarProductos(termino,res);
            break;
        case 'roles':
            break;

        default:
            return  res.status(500).json({
                msg:'Se le olvido hacer es esta busqueda'
            })

    }

    //  return res.status(200).json({

    //     msg:'bucando',
    //     coleccion,
    //     termino

    // });

}

module.exports = {

    buscar

}