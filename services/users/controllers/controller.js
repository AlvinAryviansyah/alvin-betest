const User = require('../model/user')

class Controller{
    static findAll(req, res) {
        User.findAll()
        .then(data => res.status(200).json(data))
    }

    static addUser(req, res) {
        User.create(req.body)
        .then(data => res.status(200).json(data))
    }
}

module.exports = Controller