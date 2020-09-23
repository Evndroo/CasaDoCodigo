const livroTemplates = require("./livros");

module.exports = {
    livros : livroTemplates,
    home : {
        index : require("./index.marko"),
        pagina404 : require("./erro/404.marko"),
        pagina500 : require("./erro/500.marko")
    },
    login : require("./login/login.marko")
}