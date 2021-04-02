const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req,res=response)=>{

    const {limite=5,desde=0} = req.query;

  

    const [total,usuarios] = await Promise.all([
        Usuario.find({estado:true}).skip(Number(desde)).limit(Number(limite)),
        Usuario.countDocuments({estado:true})
    ])

    res.json({
        total,
        usuarios

    })

}

const usuariosDelete =async (req,res=response)=>{

    const {id} = req.params;

    //TODO Forma 1
    // const existeEmail = await Usuario.findOne({correo});
    
    // if (existeEmail){
        
        //     return res.status(400).json({
            
            //         msg:'Ese correo ya esta registrado'
            
            //     })
            
    //TODO Forma 2     
    console.log(req.usuario);
    const usuarioAuth = req.usuario;
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
            
    return res.status(400).json({
                usuarioAuth,
                usuario
    
            })

    }





const usuariosput = async (req,res=response)=>{

    const {id} = req.params;
    const {_id,password,google,correo,...resto} = req.body;



    //TODO VALIDAR contra base de datos

    if (password){

    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(password,salt);


    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);


    res.json({
        usuario,
        msg:'HOla mundo'

    })

}

const usuariosPost = async (req,res=response)=>{



    const {nombre,correo,password} = req.body;
    const usuario = new Usuario({nombre,correo,password});

    //verificar si el correo existe

    const existeEmail = await Usuario.findOne({correo});

    if (existeEmail){

        return res.status(400).json({

            msg:'Ese correo ya esta registrado'

        })

    }

    //Enctriptar la contraseña

    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password,salt);

    //Guardar en BD

    await usuario.save();

    res.json({

        msg:'HOla mundo',
        usuario

    })

}

module.exports = {

    usuariosGet,
    usuariosDelete,
    usuariosput,
    usuariosPost

}