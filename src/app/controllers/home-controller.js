class HomeController {

    home() {
        return function(req, resp) {
            resp.marko(
                require('../views/index.marko')
            );
        };
    }
}

module.exports = HomeController;