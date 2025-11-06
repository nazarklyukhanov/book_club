const RaitingService = require("../services/raiting.service");
const formatResponse = require("../utils/formatResponse");

class RaitingController {

static async getRaiting(req, res) {
    const { id } = req.params
    const bookRaiting = await RaitingService.findById(id)
    if (!bookRaiting) {
        res.status(500).json(formatResponse (500, 'у этой книги нет рейтинга') )
    }

    if(isNaN(+id)) {
        res.status(404).json(formatResponse (404, 'Введите корректный id') )
    }
    const newRaiting = bookRaiting.reduce((acc, val) => 
        acc + val.raiting,0)

    const newBookRaiting = newRaiting/bookRaiting.length

    return res
    .status(200)
    .json(formatResponse (200, 'Рейтинг книги изменён', newBookRaiting ))
}
}

module.exports = RaitingController
