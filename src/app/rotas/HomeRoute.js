const HomeController = require("../controllers/home-controller");
const homeController = new HomeController();

module.exports = (app)=>{
    app.get('/', homeController.home());
}
