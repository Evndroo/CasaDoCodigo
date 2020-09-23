
const { check } = require('express-validator/check');

const LivroController = require("../controllers/livro-controller");
const livroController = new LivroController();

const HomeController = require("../controllers/home-controller");
const homeController = new HomeController();

module.exports = (app)=>{
    app.get('/', homeController.home());
    
    app.get(LivroController.rotas().lista, livroController.listar());
 
    app.post(LivroController.rotas().lista, [
        check('titulo').isLength({ min: 5 }).withMessage("O mínimo de caracteres para o título é de 5 caracteres"),
        check('preco').isCurrency().withMessage("O preço precisa ser um valor monetário"),
        check('descricao').isLength({min:15}).withMessage("O mínimo de caracteres para o título é de 15 caracteres")
    ],
    livroController.cadastrar());

    app.put(LivroController.rotas().lista, livroController.atualizar());

    app.get(LivroController.rotas().edicao, livroController.mostrarFormEdicao());

    app.get(LivroController.rotas().cadastro,livroController.mostrarFormCadastro());

    app.get(LivroController.rotas().idDoLivro, livroController.filtrarPorId());

    app.delete(LivroController.rotas().idDoLivro, livroController.deletar())
}
