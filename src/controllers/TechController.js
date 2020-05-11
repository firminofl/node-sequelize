const Tech = require('../models/Tech')
const User = require('../models/User')

async function index(req, res) {
    const { user_id } = req.params

    const user = User.findByPk(user_id, {
        include: {
            association: 'techs'
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
    const { name } = req.body

    const user = await User.findByPk(user_id)

    if (!user)
        return res.status(400).json({
            error: 'Tech not found'
        })

    const [tech, created] = await Tech.findOrCreate({
        where: {
            name
        }
    })

    await user.addTech(tech)

    return res.json({
        tech,
        created
    })
}

async function destroy(req, res) {
    const { user_id } = req.params
    const { name } = req.body

    const user = await User.findByPk(user_id)

    if (!user)
        return res.status(400).json({
            error: 'Tech not found'
        })

    const tech = await Tech.findOne({
        where: {
            name
        }
    })

    await user.removeTech(tech)

    return res.json()
}

module.exports = {
    index,
    store,
    destroy
}