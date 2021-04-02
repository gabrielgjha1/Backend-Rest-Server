const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req,res=response)=>{

   const {correo,password} = req.body;

   try {

       //Verificar si el email existe

        const usuario = await Usuario.findOne({correo});

        if (!usuario){

            return res.status(400).json({

                msg:'Usuario/password no es correcto -correo'

            })

        }

        //Si el usuario esta activo

        if (!usuario.estado){

            return res.status(400).json({

                msg:'EL usuario no esta activo'

            })

        }
        
        //verificar la contraseña
        console.log(usuario.id);
        const validarPassword = bcryptjs.compareSync(password,usuario.password);
        if (!validarPassword){
            return res.status(400).json({
                msg:"sd"
            })
        }
        
        //generar JWT

    //generar JWT
    const token  = await generarJWT(usuario.id);


      return  res.json({
            usuario,
            token,
            msg:"login okto"
        })

   } catch (error) {

        console.log(error);
        res.status(500).json({

            msg:'Hable con el administrador'

        })

   }


}

module.exports={
    login
}