const {
    Router
} = require('express');
const { check } = require('express-validator');
const {
    getUser,
    postUser,
    putUser,
    deleteUser
} = require('../controllers/users');
const { roleValido, validaMail, existeUsuarioId } = require('../helpers/db-validators');
const { validar } = require('../middlewares/validation');


const router = Router();

router.get('/', getUser);

router.post('/',[
    check('mail', 'El correo no es valido').isEmail(),
    check('mail').custom(validaMail),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 8 caracteres').isLength({min:8}),
    // check('role', 'Rol no valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(roleValido),
    validar
], postUser);

router.put('/:id',[
    check('id', 'ID no valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('role').custom(roleValido),
    validar
], putUser);

router.delete('/:id',[
    check('id', 'ID no valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validar
], deleteUser);

module.exports = router