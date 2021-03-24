const { Router } = require("express");
const {usuariosGet,usuariosput,usuariosDelete,usuariosPost} = require('../controllers/usuarios');
const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosput);

router.post("/", usuariosPost);

router.delete("/", usuariosDelete);

module.exports = router;
