const SessionController = require("../controllers/session-controller");
const sessionController = new SessionController();

module.exports = (app)=>{
    app.route("/login")
        .get(sessionController.loginPage())
        .post(sessionController.login());
}
