const {response, request} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const getUser = async (req = request, res = response) => {

    const { limit = 5, skip = 0 } = req.query;

    const activo = {estado:true};


    const [total, users] = await Promise.all([
        User.countDocuments(activo),
        User.find(activo)
        .limit(Number(limit))
        .skip(Number(skip))
        
    ]);
    res.json({
        total,
        users
    });
}

const postUser = async (req, res = response)=>{

    const {nombre, apellido, mail, password, role} = req.body;
    const user = new User({nombre, apellido, mail, password, role});

    //Encriptar cpassword
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    //guarda en db
    await user.save();

    res.status(201).json({
        user
    });
}

const putUser = async (req, res = response)=>{

    const {id} = req.params;
    const {password, google, mail, _id, ...userData} = req.body;

    //Validacion id
    if (password){
        const salt = bcryptjs.genSaltSync(10);
        userData.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await User.findByIdAndUpdate(id, userData)
    res.json(usuario);
}

const deleteUser = async (req, res = response)=>{
    const{id} = req.params;

    const usuario = await User.findByIdAndUpdate(id,{estado:false})
    res.json({
        msg:'delete API - controller',
        usuario
    });
}

module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser
}