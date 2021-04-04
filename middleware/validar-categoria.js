const Categoria = require("../models/categoria");


const validarCategoria = async (req,res,next)=>{

    const id = req.params.id;
    try {
        
        const ComprobarEstado = await Categoria.findById(id);

        if (!ComprobarEstado.estado){

            return res.status(400).json({
                msg: "Categoria ya esta eliminada",
              
              });

        }

        next();
    } catch (error) {
        return res.status(500).json({
            msg: "Error, Consulte con el administrador",
            error,
          });
    }

    


}

module.exports = {
    validarCategoria


}