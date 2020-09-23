const uuid = require("uuid/v4");
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;

const UsuarioDAO = require("../app/infra/usuario-dao")
const db = require("./database")


module.exports = (app)=>{


    passport.use(new LocalStrategy(
        {
            usernameField : "email",
            passwordField : "senha"
        },
        (email, senha, done) => {

            const usuarioDAO = new UsuarioDAO(db);

            usuarioDAO.buscaPorEmail(email)
                .then((usuario)=>{
                    if(!usuario || usuario.senha != senha){
                        return done(null,false,{
                            mensagem: "Login e senha incorretos"
                        });
                    } 
                    return done(null, usuario);

                })
                .catch((error)=>{
                    return done (error, false, { mensagem: "Ops, tivemos algum problema, tente novamente mais tarde" });
                })
        }
    ))

    passport.serializeUser((usuario, done)=>{

        const serializedUser = {
            nome : usuario.nome_completo,
            email : usuario.email 
        }

        done(null, serializedUser);
    });


    passport.deserializeUser((userSession, done)=>{
        done(null, userSession);
    });

    app.use(session({
        secret:"pao-de-batata",
        genid: function(req){
            return uuid();
        },
        resave:false,
        saveUninitialized:false
    }));

    app.use(passport.initialize());

    app.use(passport.session());

    app.use(function(req,res,next){
        req.passport = passport;
        next();
    });
}