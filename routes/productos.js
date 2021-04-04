const {Router} = require('express');
const { check } = require("express-validator");
const { CrearProductos,ListarProductos, ListarProductosId,ActualizarProducto, EliminarProducto } = require('../controllers/productos');
const { existeProductosPorId } = require('../helpers/db-validetor');
const { ValidarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.get('',ListarProductos);
router.get('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeProductosPorId),
],ListarProductosId);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('descripcion','El precio es obligatorio').not().isEmpty(),
    check('categoria','No es un ID valido').isMongoId(),
    ValidarCampos
],CrearProductos),

router.put('/:id',[
    validarJWT,
    check('id').custom(existeProductosPorId),
    // check('categoria','No es un ID valido').isMongoId().isEmpty(),

],ActualizarProducto),

router.delete('/:id',[
    validarJWT,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeProductosPorId),

],EliminarProducto),




module.exports  =  router;

