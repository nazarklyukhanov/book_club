const { Raiting } = require('../db/models')

class RaitingService {

static async findById(id) {
    return await Raiting.findAll({where: {book_id : id}})
}

}

module.exports = RaitingService
