const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { response,request } = require('express');


const subirArchivo = (files, extensionValidas = ['png','jpg','jpeg','gif'],carpeta = '')=>{


    return new Promise((resolve,rejected)=>{
        
        const {archivo}  = files;
        
        const nombreCortado = archivo.name.split('.');
        const extencion = nombreCortado[nombreCortado.length -1];
    
        if (!extensionValidas.includes(extencion)){
    
            return rejected('la extencion no es valida') 
    
                
        }
    
         const nombreTemp =  uuidv4() + '.' + extencion ;
    
    
    
        const uploadPath = path.join(__dirname , '../uploads/', carpeta ,nombreTemp) ;
      
        archivo.mv(uploadPath, (err)=> {
            
            if (err){
              rejected(res.status(500).json({err}))

          }
          resolve(nombreTemp)
     
        });
    })

  
}


module.exports = {

    subirArchivo,
   
}