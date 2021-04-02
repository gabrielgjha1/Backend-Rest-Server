const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignin } = require("../controllers/auth");
const { ValidarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.post('/login',[
    check('password','La contraseña es requerida').not().isEmpty(),
    check('correo','El correo es requerido').isEmail(),
    ValidarCampos,
    

],login);

router.post('/google',[
    check('id_token','El id token es necesario').not().isEmpty(),
    ValidarCampos
],googleSignin);

module.exports = router;