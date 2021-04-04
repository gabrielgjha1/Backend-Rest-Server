const { response, request } = require("express");
const Producto = require("../models/producto");


const ListarProductos = async (req = request, res = response) => {
    try {
      const { limite = 5, desde = 0 } = req.query;
  
      const [productos, total] = await Promise.all([
        Producto.find()
          .limit(Number(limite))
          .skip(Number(desde))
          .populate("usuario", "nombre correo")
          .populate("categoria", "nombre"),
          Producto.countDocuments(),
      ]);
  
      return res.status(200).json({
        productos,
        total,
        msg: "Datos",
      });
    } catch (error) {
      return res.status(500).json({
        error,
        msg: "Error, Consulte con el administrador",
      });
    }
  };

  const ListarProductosId = async (req = request, res = response)=>{

    const id = req.params.id;

    try {
        
        const producto = await Producto.findById(id);

        return res.status(200).json({
            msg: "datos",
            producto
          });

    } catch (error) {
         return res.status(500).json({
      error,
      msg: "Error, Consulte con el administrador",
    });
    }

}

const CrearProductos = async (req=request,res=response)=>{

  const {estado,usuario,...resto} = req.body; 

  try {

    const productoExiste = await Producto.findOne({ nombre:resto.nombre });


    if (productoExiste) {
      
        return res.status(400).json({
        msg: "El producto existe existe",
      });

    }

    const data = {

      nombre:resto.nombre,
      usuario: req.usuario._id,
      categoria: resto.categoria,

    };

    console.log(data);
    const producto = new Producto(data);

    const productoDB = await producto.save();

    if (!productoDB) {
      return res.status(400).json({
        msg: "Error al guardar los datos",
      });
    }

    return res.status(200).json({
      msg: "prducto guardado ",
      productoDB,
    });

  } catch (error) {
    return res.status(500).json({
      msg: "Error, Consulte con el administrador",
      error,
    });
  }


};


const ActualizarProducto = async (req = request, res = response) => {

  const { usuario,estado, precio,nombre,categoria} = req.body;
  const id = req.params.id;

  let data = {} ;

  if (precio){

    data.precio = precio;

  }

  if (categoria){

    data.categoria = categoria;

  }

  if (nombre){

    data.nombre = nombre;
    
  }

  try {
    console.log(data);

    const producto = await Producto.findByIdAndUpdate(id, data);

    return res.status(200).json({
      msg: "Producto Actualizada",
      producto,
    });

  } catch (error) {

    return res.status(500).json({
        msg: "Error, Consulte con el administrador",
        error,
      });

  }
};

const EliminarProducto = async (req = request , res=response)=>{

  const id = req.params.id;

  try {

      const ComprobarProducto = await Producto.findById(id);

      if (!ComprobarProducto.estado){

          return res.status(400).json({
              msg: "Producto ya esta eliminada",
            
            });

      }

      const producto = await Producto.findByIdAndUpdate(id,{estado:false})

      return res.status(200).json({
          msg: "Producto eliminado",
          producto,
        });

  } catch (error) {
      return res.status(500).json({
          msg: "Error, Consulte con el administrador",
          error,
        });
  
  }

  
}

module.exports = {

    CrearProductos,
    ListarProductos,
    ListarProductosId,

    ActualizarProducto,
    EliminarProducto,
  

}