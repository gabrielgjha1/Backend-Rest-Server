const { Router } = require("express");
const { check } = require("express-validator");
const {usuariosGet,usuariosput,usuariosDelete,usuariosPost} = require('../controllers/usuarios');
const { validarROle,existeUsuarioPorId } = require("../helpers/db-validetor");
const { ValidarCampos } = require("../middleware/validar-campos");
const { EsAdminROle, validarRoles } = require("../middleware/validar-compos");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id",[

    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    ValidarCampos

], usuariosput);

router.post("/",
[
    check('correo','El correo no es valido').isEmail(),
    check('password','El password es obligatorio y mas de 6 letras').isLength({min:6}),
    check('nombre','El nombre  Es obligatorio').not().isEmpty(),
    check('rol').custom( (rol)=> validarROle(rol) ),
    ValidarCampos
],usuariosPost);

router.delete("/:id", [
    validarJWT,
    // EsAdminROle,
    validarRoles('VENTAS_ROLE','ADMIN_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    ValidarCampos

], usuariosDelete);

module.exports = router;
