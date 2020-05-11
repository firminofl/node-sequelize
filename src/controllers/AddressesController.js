const Address = require('../models/Address')
const User = require('../models/User')

async function index(req, res) {
    const { user_id } = req.params

    const user = User.findByPk(user_id, {
        include: {
            association: 'addresses'
        }
    })

    if (!user)
        return res.status(400).json({
            error: 'User not found'
        })

    return res.json(user)

}

async function store(req, res) {
    const { user_id } = req.params
    const { zipcode, street, number } = req.body

    const user = await User.findByPk(user_id)

    if (!user)
        return res.status(400).json({
            error: 'User not found'
        })

    const address = await Address.create({
        zipcode,
        street,
        number,
        user_id
    })

    return res.json(address)
}

module.exports = {
    index,
    store
}