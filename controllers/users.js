const {response, request} = require('express');

const getUser = (req = request, res = response) => {

    const {q, nombre = '', edad} = req.query
    res.json({
        msg:'get API - controller',
        q,
        nombre,
        edad
    });
}

const postUser = (req, res = response)=>{

    const {nombre, edad} = req.body;
    res.status(201).json({
        msg:'post API - controller',
        nombre,
        edad
    });
}

const putUser = (req, res = response)=>{

    const {id} = req.params;
    res.json({
        msg:'put API - controller',
        id
    });
}

const deleteUser = (req, res = response)=>{
    res.json({
        msg:'delete API - controller'
    });
}

module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser
}