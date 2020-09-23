const templates = require("../views/templates")

class HomeController {

    home() {
        return function(req, resp) { resp.marko(templates.home.index) };
    }
}

module.exports = HomeController;