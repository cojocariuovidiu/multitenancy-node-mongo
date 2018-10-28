const BaseController = require('../controllers/base_controller');

module.exports = (app) => {
    app.get('/fetchAllTenants', BaseController.fetchAllTenants);
    app.post('/register', BaseController.register);

};
