const { Raiting } = require('../db/models')

class RaitingService {

static async findById(id) {
    return await Raiting.findAll({where: {book_id : id}})
}

static async findByUserBookId(id, user_id) {
    return await Raiting.findAll({where: {book_id : id, user_id: user_id}})
}

static async createRaitingId(id, user_id, raiting) {
    return await Raiting.create({book_id:id, user_id: user_id, raiting: raiting})
}

static async updateRaitingId(id, user_id, raiting) {

    const updateRaiting = await this.findByUserBookId(id, user_id)

    if (!updateRaiting) return null

    updateRaiting.raiting = raiting

    await updateRaiting.save()

    return updateRaiting
}

}

module.exports = RaitingService
