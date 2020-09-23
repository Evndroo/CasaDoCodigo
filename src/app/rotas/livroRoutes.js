const SessionController = require("../controllers/session-controller");
const LivroController = require("../controllers/livro-controller");
const livroController = new LivroController();

const LivroModel = require("../Models/livro-model");

module.exports = (app)=>{

    app.use(LivroController.rotas().autenticadas, function(req, res,next){
        
        if(!req.isAuthenticated()){
            return res.redirect(SessionController.rotas().login);
        }

        return next();
        
    });
    
    app.get(LivroController.rotas().lista, livroController.listar());    

    app.get(LivroController.rotas().edicao, livroController.mostrarFormEdicao());


    app.route(LivroController.rotas().cadastro)  
        .get(livroController.mostrarFormCadastro())
        .post(LivroModel.validacoes(), livroController.cadastrar())
        .put(LivroModel.validacoes(), livroController.atualizar());

    app.route(LivroController.rotas().idDoLivro)
        .get(livroController.filtrarPorId())
        .delete(livroController.deletar())
}
