require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

require('./database/index')

const express = require('express')

class AppController {
    constructor() {
        this.express = express()

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.express.use(express.json())
    }

    routes() {
        // Principal routes of app
        this.express.use(require('./routes/routes'))
    }
}

module.exports = new AppController().express