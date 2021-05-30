const Role = require('../models/role');
const User = require('../models/user');

const roleValido = async(role = '') => {
    const existRole = await Role.findOne({role});

    if(!existRole){
        throw new Error('Se inserto un rol no valido.')
    }
};

const validaMail = async (mail = '') =>{

    const mailExiste = await User.findOne({mail});

    if (mailExiste) {
            throw new Error(`Este correo: ${mail} ya esta registrado`)
        
    }

}

const existeUsuarioId = async(id) => {
    const usuarioExiste = await User.findById(id);

    if (!usuarioExiste) {
            throw new Error(`Este id: ${id} no existe`)
        
    }
}

module.exports = {
    roleValido,
    validaMail,
    existeUsuarioId
}