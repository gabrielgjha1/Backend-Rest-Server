const { response } = require("express");
const path = require('path');
const { subirArchivo } = require("../helpers/subir-archivos");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario");
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL)


const cargarArchivo = async (req, res = response) => {
  

  try {
    const nombre = await subirArchivo(req.files,undefined,'img');
    res.json({
      nombre,
    });
  } catch (msg) {

    return res.status(400).json({
        msg
    })

  }
};



//cloudinary
const ActualizarImagenCloudinary = async (req=request,res=response)=>{


  const {id,coleccion} = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
    
      modelo = await Usuario.findById(id);

      if (!modelo){
        return res.status(400).json({
          msg:'No existe un usuario con el id'
        })
      }

      break;
    case 'productos':
    
      modelo =  await Producto.findById(id);

      if (!modelo){
        return res.status(400).json({
          msg:'No existe un producto con el id'
        })
      }

      break;
  
  
    default:
      return res.status(500).json({msg:'Se me olvido validar esto'});

  }


  //Limpiar Imagenes Previas 

  try {
    
    if (modelo.img){
      // hay que borrar la imagen del servidor 
      const nombreArr = modelo.img.split('/');
      const nombre = nombreArr[nombreArr.length -1];  ;
      const [public_id] = nombre.split('.');
      
      cloudinary.uploader.destroy(public_id);

    }

    const {tempFilePath} = req.files.archivo;
    
    const {secure_url} =  await cloudinary.uploader.upload(tempFilePath);


    modelo.img = secure_url;
  
    await modelo.save();

  } catch (error) {
    
  }

  return res.status(200).json({

     modelo

  })

}














/// servidor 
const ActualizarImagen = async (req=request,res=response)=>{


  const {id,coleccion} = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
    
      modelo = await Usuario.findById(id);

      if (!modelo){
        return res.status(400).json({
          msg:'No existe un usuario con el id'
        })
      }

      break;
    case 'productos':
    
      modelo =  await Producto.findById(id);

      if (!modelo){
        return res.status(400).json({
          msg:'No existe un producto con el id'
        })
      }

      break;
  
  
    default:
      return res.status(500).json({msg:'Se me olvido validar esto'});

  }


  //Limpiar Imagenes Previas 

  try {
    
    if (modelo.img){
      // hay que borrar la imagen del servidor 

      const pathImagen = path.join(__dirname, '../uploads',coleccion,modelo.img);
      if (fs.existsSync(pathImagen)){

        fs.unlinkSync(pathImagen)

      }
    }

  } catch (error) {
    
  }

  const nombre = await subirArchivo(req.files,undefined, coleccion);

  modelo.img = nombre;

  await modelo.save();

  return res.status(200).json({

     modelo

  })

}


const monstarImagen =  async (req,res)=>{


  const {id,coleccion} = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
    
      modelo = await Usuario.findById(id);

      if (!modelo){
        return res.status(400).json({
          msg:'No existe un usuario con el id'
        })
      }

      break;
    case 'productos':
    
      modelo =  await Producto.findById(id);

      if (!modelo){
        return res.status(400).json({
          msg:'No existe un producto con el id'
        })
      }

      break;
  
  
    default:
      return res.status(500).json({msg:'Se me olvido validar esto'});

  }


  //Limpiar Imagenes Previas 

  try {
    
    if (modelo.img){
      // hay que borrar la imagen del servidor 

      const pathImagen = path.join(__dirname, '../uploads',coleccion,modelo.img);
      if (fs.existsSync(pathImagen)){

        return  res.sendFile(pathImagen)

      }
    }


    const pathImage = path.join(__dirname,'../assets/no-image.jpg')
    res.sendFile(pathImage)
  } catch (error) {
    
  }

}

module.exports = {
  cargarArchivo,
  ActualizarImagen,
  monstarImagen,
  ActualizarImagenCloudinary
};
