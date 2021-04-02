const { response, request } = require("express");

const EsAdminROle = (req=request,res=response,next)=>{



    if (!req.usuario){

        return res.status(500).json({
            msg:'Se quiere verificar el rol sin validar el token primero'
        });



    }
    const { rol,nombre} = req.usuario;

    if (rol !== 'ADMIN_ROLE'){

        return res.status(401).json({

            msg: 'El usuario no es adminstrador'

        })

    }


    next();
}

const validarRoles = (...roles)=>{

    return (req,res=response,next)=>{

        if (!req.usuario){

            return res.status(500).json({
                msg:'Se quiere verificar el rol sin validar el token primero'
            });

        }

        if (!roles.includes(req.usuario.rol)){
            
            return res.status(401).json({
                msg:'No puede realizar esta accion, su rol no se lo permite'
            });

        }

        next();


    }

}



module.exports = {

    EsAdminROle,
    validarRoles

}