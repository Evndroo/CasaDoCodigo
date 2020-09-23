const livroRoutes = require("./livroRoutes");

const homeRoutes = require("./HomeRoute");

module.exports = (app)=>{
    
    livroRoutes(app);
    homeRoutes(app);

}
