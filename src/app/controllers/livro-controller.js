const LivrosDAO = require("../infra/livros-dao");
const { validationResult } = require('express-validator/check');
const db = require('../../config/database');
const livrosDAO = new LivrosDAO(db);


class LivroController{

    listar(){
        return function (req, res) {
            livrosDAO.listar().then(
                livros => res.marko(
                    require("../views/livros/lista/lista.marko"),
                    {
                        livros
                    }
                )
            ).catch(error=> {console.log(error)});
        }
    }

    mostrarFormEdicao(){
        return function(req,res){
            const id = req.params.id
    
            livrosDAO.buscarPorId(id).then(
                livro => {
                    res.marko(
                        require("../views/livros/form/form.marko"),
                        {
                            livro: livro[0]
                        }
                    )
                }
            ).catch(error=> {
                console.log(error)
            })
        }
    }

    mostrarFormCadastro(){
        return function(req, res){
            res.marko( require("../views/livros/form/form.marko"), {livro:{}})
        }
    }

    filtrarPorId(){
        return function(req, res){
        
            const id = req.params.id
    
            livrosDAO.buscarPorId(id).then(
                livros => {
                    res.marko(
                        require("../views/livros/lista/lista.marko"),
                        {
                            livros
                        }
                    )
                }
            ).catch(error=> {
                console.log(error)
            });
        }
    }

    cadastrar(){
        return function(req,res){
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.marko(
                  require("../views/livros/form/form.marko"),
                    {
                        livro:req.body,
                        errosValidacao: errors.array()
                    }
              );
            }
    
            const { body } = req;
    
            livrosDAO.inserir(body)
                .then(()=>res.redirect("/livros"))
                .catch((error)=>{console.log(error)});
            
        }
    }

    atualizar(){
        return function(req,res){
            const { body } = req;
            livrosDAO.atualizar(body)
                .then(()=>res.status(200).end())
                .catch((error)=>{console.log(error)});
    
        }
    }

    deletar(){
        return function(req,res){
            const id = req.params.id
    
            livrosDAO.remover(id)
                .then(()=>res.status(200).end())
                .catch((error)=>{console.log(error); res.status(404)});
        }
    }
}

module.exports = LivroController