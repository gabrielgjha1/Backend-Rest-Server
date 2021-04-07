const {Router} = require('express');
const { check } = require("express-validator");
const { cargarArchivo, ActualizarImagen, monstarImagen, ActualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validetor');
const { ValidarArchivo } = require('../middleware/validar-archivo');
const { ValidarCampos } = require("../middleware/validar-campos");

const router = Router();

router.post('/',ValidarArchivo,cargarArchivo);

//servidor

// router.put('/:coleccion/:id',[
//     ValidarArchivo,
//     check('id','El id debe ser de mongo').isMongoId(),
//     check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
//     ValidarCampos
// ], ActualizarImagen);

//cloudinary 
router.put('/:coleccion/:id',[
    ValidarArchivo,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    ValidarCampos
], ActualizarImagenCloudinary);


router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    ValidarCampos
],monstarImagen)

module.exports  =  router;

