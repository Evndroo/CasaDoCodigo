const db = require("../../config/database");
const LivrosDAO = require("../infra/livros-dao");

const livrosDAO = new LivrosDAO(db);

module.exports = (app)=>{
    app.get('/', function (req, res) {
        res.marko(require("../views/index.marko"));
    });
    
    app.get('/livros', function (req, res) {

        livrosDAO.listar().then(
            livros => res.marko(
                require("../views/livros/lista/lista.marko"),
                {
                    livros
                }
            )
        ).catch(error=> {console.log(error)});
    });

    app.get("/livros/form/:id",function(req,res){
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
    });

    app.get("/livros/form",function(req, res){
        res.marko( require("../views/livros/form/form.marko"), {livro:{}})
    });

    
    app.get("/livros/:id", function(req, res){
        
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
    });


    app.post("/livros", function(req,res){
        const { body } = req;

        livrosDAO.inserir(body)
            .then(()=>res.redirect("/livros"))
            .catch((error)=>{console.log(error)});
        
    });

    app.put("/livros", function(req,res){
        const { body } = req;
        livrosDAO.atualizar(body)
            .then(()=>res.status(200).end())
            .catch((error)=>{console.log(error)});

    });

    app.delete("/livros/:id",function(req,res){
        const id = req.params.id

        livrosDAO.remover(id)
            .then(()=>res.status(200).end())
            .catch((error)=>{console.log(error); res.status(404)});
    })
}
