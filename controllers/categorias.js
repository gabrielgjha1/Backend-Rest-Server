const { request, response } = require("express");
const { body } = require("express-validator");
const Categoria = require("../models/categoria");

const ListarCategorias = async (req = request, res = response) => {
  try {
    const { limite = 5, desde = 0 } = req.query;

    const [categorias, total] = await Promise.all([
      Categoria.find()
        .limit(Number(limite))
        .skip(Number(desde))
        .populate("usuario", "nombre correo"),
      Categoria.countDocuments(),
    ]);

    return res.status(200).json({
      categorias,
      total,
      msg: "bien",
    });
  } catch (error) {
    return res.status(500).json({
      error,
      msg: "Error, Consulte con el administrador",
    });
  }
};

const ListarCategoriaId = async (req = request, res = response)=>{

    const id = req.params.id;

    try {
        
        const categoria = await Categoria.findById(id);

        return res.status(200).json({
            msg: "bien",
            categoria
          });

    } catch (error) {
         return res.status(500).json({
      error,
      msg: "Error, Consulte con el administrador",
    });
    }

}


const GuardarCategorias = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  try {
    const categoriasExiste = await Categoria.findOne({ nombre });

    if (categoriasExiste) {
      return res.status(400).json({
        msg: "La categoria existe",
        nombre,
      });
    }

    const data = {
      nombre,
      usuario: req.usuario._id,
    };

    const categoria = new Categoria(data);

    const CategoriaDB = await categoria.save();

    if (!CategoriaDB) {
      return res.status(400).json({
        msg: "Error al guardar los datos",
        nombre,
        usuario: req.usuario,
      });
    }

    return res.status(200).json({
      msg: "Categoria Guardada",
      categoria,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error, Consulte con el administrador",
      error,
    });
  }
};

const ActualizarCategorias = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const id = req.params.id;

  try {
    const EncontrarCategoria = await Categoria.findById(id);

    if (!EncontrarCategoria) {
      return res.status(400).json({
        msg: "La categoria con el nombre: " + nombre + " No existe",
      });
    }

    const categoria = await Categoria.findByIdAndUpdate(id, { nombre });

    return res.status(200).json({
      msg: "Categoria Actualizada",
      categoria,
    });

  } catch (error) {

    return res.status(500).json({
        msg: "Error, Consulte con el administrador",
        error,
      });

  }
};

const EliminarCategoria = async (req = request , res=response)=>{

    const id = req.params.id;
    try {

    
        const categoria = await Categoria.findByIdAndUpdate(id,{estado:false})

        return res.status(200).json({
            msg: "Categoria eliminada",
            categoria,
          });

    } catch (error) {
        return res.status(500).json({
            msg: "Error, Consulte con el administrador",
            error,
          });
    
    }

    
}

module.exports = {
  ListarCategorias,
  GuardarCategorias,
  ActualizarCategorias,
  EliminarCategoria,
  ListarCategoriaId
};
