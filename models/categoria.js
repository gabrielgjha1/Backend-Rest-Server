const { Schema,model } = require('mongoose');



const CategoriaSchema = Schema({

    nombre: {

        type:String,
        required:[true,'EL campo es obligatorio']

    },

    estado: {

        type:Boolean,
        default:true,
        required:true
    },
    
    usuario:{

        type:Schema.Types.ObjectId,
        ref:'Usuario',
        require:true

    }


});


module.exports = model('Categoria',CategoriaSchema);