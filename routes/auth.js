const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { ValidarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.post('/login',[
    check('password','La contraseña es requerida').not().isEmpty(),
    check('correo','El correo es requerido').isEmail(),
    ValidarCampos,
    

],login);

module.exports = router;