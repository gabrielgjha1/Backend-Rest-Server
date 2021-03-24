const { response } = require('express');


const usuariosGet = (req,res=response)=>{

    res.json({

        msg:'HOla mundo'

    })

}

const usuariosDelete = (req,res=response)=>{

    res.json({

        msg:'HOla mundo'

    })

}


const usuariosput = (req,res=response)=>{

    const query = req.query;

    res.json({
        id,
        msg:'HOla mundo'

    })

}

const usuariosPost = (req,res=response)=>{

    const {nombre,edad} = req.body;

    res.json({

        msg:'HOla mundo',
        nombre,
        edad

    })

}

module.exports = {

    usuariosGet,
    usuariosDelete,
    usuariosput,
    usuariosPost

}