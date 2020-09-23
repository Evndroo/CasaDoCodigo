require('marko/node-require').install();
require('marko/express');

const methodOverride = require("method-override");
const rotas = require('../app/rotas/routes');
const templates = require("../app/views/templates");
const express = require('express');
const app = express();

app.use("/estatico",express.static("src/app/public"));
app.use(express.urlencoded());

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
}))

rotas(app);

app.use(function(req, res, next){
  return res.status(404).marko(templates.home.pagina404)
});


app.use(function (erro, req, resp, next) {
  return resp.status(500).marko( templates.home.pagina500 );
});


module.exports = app;