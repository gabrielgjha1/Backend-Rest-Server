const dbValidators = require('./db-validetor');
const generarJWT = require('./generar-jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivos');

module.exports = {

    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo,


}