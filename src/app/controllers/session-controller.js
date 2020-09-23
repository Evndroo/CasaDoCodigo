const templates = require("../views/templates")

const LivroController = require("../controllers/livro-controller");


class SessionController{

    static rotas(){
        return {
            login:"/login"
        }
    }

    loginPage(){
        return function(req,res){ res.marko(templates.login) }
    }

    login(){
        return function(req,res, next){

            const passport = req.passport;

            passport.authenticate("local", (error, user, message)=>{
                if(message){
                    return res.marko(templates.login);
                }

                if(error){
                    return next(error)
                }

                req.login(user, (error)=>{

                    if(error){
                        return next(error)
                    }

                    return res.redirect(LivroController.rotas().lista)
                });

            })(req, res, next);
        }
    }
}

module.exports = SessionController;