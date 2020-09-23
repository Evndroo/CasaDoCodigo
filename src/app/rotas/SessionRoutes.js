const LivroController = require("../controllers/livro-controller");
const SessionController = require("../controllers/session-controller");
const sessionController = new SessionController();

module.exports = (app)=>{

    app.use(SessionController.rotas().login, function(req, res, next){

        if(req.isAuthenticated()){
            return res.redirect(LivroController.rotas().lista);
        }

        return next();
    });

    app.route(SessionController.rotas().login)
        .get(sessionController.loginPage())
        .post(sessionController.login());
}
