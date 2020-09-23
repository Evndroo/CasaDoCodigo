const { static } = require("express");

const { check } = require('express-validator/check');

class LivroModel{

    static validacoes(){
        return[
            check('titulo').isLength({ min: 5 }).withMessage("O mínimo de caracteres para o título é de 5 caracteres"),
            check('preco').isCurrency().withMessage("O preço precisa ser um valor monetário"),
            check('descricao').isLength({min:15}).withMessage("O mínimo de caracteres para o título é de 15 caracteres")
        ]
    }

}

module.exports = LivroModel