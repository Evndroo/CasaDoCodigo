const livroRoutes = require("./livroRoutes");
const homeRoutes = require("./HomeRoute");
const sessionRoutes = require("./SessionRoutes");

module.exports = (app)=>{
    
    livroRoutes(app);
    homeRoutes(app);
    sessionRoutes(app);
}
