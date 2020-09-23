const LivrosDAO = require("../infra/livros-dao");
const { validationResult } = require('express-validator/check');
const db = require('../../config/database');
const livrosDAO = new LivrosDAO(db);
const templates = require("../views/templates");

class LivroController{

    static rotas(){
        return{
            lista: "/livros",
            cadastro: "/livros/form",
            edicao: "/livros/form/:id",
            idDoLivro: "/livros/:id"
        }
    }

    listar(){
        return function (req, res) {
            livrosDAO.listar().then(
                livros => res.marko(
                    templates.livros.lista,
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
                        templates.livros.form,
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
            res.marko(templates.livros.form, {livro:{}})
        }
    }

    filtrarPorId(){
        return function(req, res){
        
            const id = req.params.id
    
            livrosDAO.buscarPorId(id).then(
                livros => {
                    res.marko(
                        templates.livros.lista,
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
                    templates.livros.form,
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

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.marko(
                    templates.livros.form,
                    {
                        livro:req.body,
                        errosValidacao: errors.array()
                    }
              );
            }

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