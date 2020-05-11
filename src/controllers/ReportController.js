const { Op, where } = require('sequelize')

const User = require('../models/User')

async function show(req, res) {
    // Encontrar todos os usuários que tem email que termina com @gmail.com
    // Desses usuarios eu quero buscar todos que morar na rua "Acre"
    // Desses usuários eu quero buscar as tecnologias que começam com node

    const users = await User.findAll({
        attributes: ['name', 'email'],
        where: {
            email: {
                [Op.iLike]: '%@gec.inatel.br'
            }
        },
        include: [
            {
                association: 'addresses',
                where: {
                    street: 'Rua Acre'
                }
            },
            {
                association: 'techs',
                required: false,
                where: {
                    name: {
                        [Op.iLike]: '%node'
                    }
                }
            }]
    })

    return res.json(users)
}

module.exports = {
    show
}