const {Router} = require('express');
const { check } = require("express-validator");
const { ListarCategorias,GuardarCategorias, ActualizarCategorias, EliminarCategoria,ListarCategoriaId } = require('../controllers/categorias');
const { ValidarCampos } = require("../middleware/validar-campos");
const { validarCategoria } = require("../middleware/validar-categoria");
const { validarJWT } = require("../middleware/validar-jwt");
const {existeCategoriaPorId} = require('../helpers/db-validetor');
const router = Router();

router.get('/',ListarCategorias);

router.get('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
  
    ValidarCampos
],ListarCategoriaId);

router.put('/:id',[
    validarJWT,
    
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    check('nombre','EL nombre es requerido').not().isEmpty(),
    validarCategoria,
    ValidarCampos
],ActualizarCategorias);
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    ValidarCampos

],GuardarCategorias);

router.delete('/:id',[

    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCategoria,
    ValidarCampos
],EliminarCategoria)

module.exports  =  router;
