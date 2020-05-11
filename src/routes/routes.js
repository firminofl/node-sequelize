const routes = require('express').Router()

const UserController = require('../controllers/UserController')
const AddressesController = require('../controllers/AddressesController')
const TechController = require('../controllers/TechController')
const ReportController = require('../controllers/ReportController')

// Definição rotas
routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

routes.get('/users/:user_id/addresses', AddressesController.index)
routes.post('/users/:user_id/addresses', AddressesController.store)

routes.get('/users/:user_id/techs', TechController.index)
routes.post('/users/:user_id/techs', TechController.store)
routes.delete('/users/:user_id/techs', TechController.destroy)

routes.get('/report', ReportController.show)

module.exports = routes