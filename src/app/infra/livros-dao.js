class LivrosDAO{

    constructor(db){
        this._db = db;
    }

    buscarPorId(id){   
        return new Promise((resolve, reject)=>{ 
            this._db.all("select * from livros where id="+id, (error, result)=>{                
                if(error) return reject(error);

                return resolve(result);
            });
        });
    }

    listar(){
        return new Promise((resolve, reject)=>{
            this._db.all("select * from livros", (error, result)=>{

                if(error) return reject("Não foi possível buscar os dados no banco");

                return resolve(result);

            });
        });
    }

    atualizar(livro){
        return new Promise((resolve, reject)=>{
            this._db.run(
                `update livros set titulo = ?, preco = ?, descricao = ? where id=?`,
                [livro.titulo, livro.preco, livro.descricao, livro.id],
                function(error){
                    if(error) {
                        console.log("Erro de database: " + error);
                        return reject(error);
                    }

                    return resolve();
                }
            )
        })
    }

    inserir(livro){
        return new Promise((resolve, reject)=>{
            this._db.run(
                `insert into livros(titulo, preco, descricao) values (?,?,?)`,
                [livro.titulo, livro.preco, livro.descricao],
                function(error){
                    if(error) {
                        console.log("Erro de database: " + error);
                        return reject(error);
                    }

                    return resolve();
                }
            )
        })
    }

    remover(id) {

        return new Promise((resolve, reject) => {
            this._db.run(
                `
                    DELETE 
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro) => {
                    if (erro) {
                        return reject('Não foi possível remover o livro!');
                    }
                    return resolve();
                }
            );
        });
    }
}

module.exports = LivrosDAO