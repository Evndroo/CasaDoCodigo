
const { check } = require('express-validator/check');

const LivroController = require("../controllers/livro-controller");
const livroController = new LivroController();

const HomeController = require("../controllers/home-controller");
const homeController = new HomeController();

module.exports = (app)=>{
    app.get('/', homeController.home());
    
    app.get('/livros', livroController.listar());

    app.get("/livros/form/:id", livroController.mostrarFormEdicao());

    app.get("/livros/form",livroController.mostrarFormCadastro());

    
    app.get("/livros/:id", livroController.filtrarPorId());


    app.post("/livros", [
        check('titulo').isLength({ min: 5 }).withMessage("O mínimo de caracteres para o título é de 5 caracteres"),
        check('preco').isCurrency().withMessage("O preço precisa ser um valor monetário"),
        check('descricao').isLength({min:15}).withMessage("O mínimo de caracteres para o título é de 15 caracteres")
    ],
    livroController.cadastrar());

    app.put("/livros", livroController.atualizar());

    app.delete("/livros/:id", livroController.deletar())
}
