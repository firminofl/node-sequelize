const User = require('../models/User')

async function index(req, res) {
    const users = await User.findAll()

    return res.json(users)
}

async function store(req, res) {
    const { name, email } = req.body

    const user = await User.create({
        name, email
    })

    return res.json(user)
}

module.exports = {
    index,
    store
}