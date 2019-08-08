const express = require('express')
const auth = require('./auth')

module.exports = function(server){

    //Rotas com controle de acesso
   const protectedApi = express.Router()
   server.use('/api',protectedApi)

   protectedApi.use(auth)

    // rotas de ciclo de pagamento
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    BillingCycle.register(protectedApi, '/billingCycles')

    //rotas publicas
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
}