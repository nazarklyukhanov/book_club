const RaitingService = require("../services/raiting.service");
const formatResponse = require("../utils/formatResponse");

class RaitingController {

static async getRaiting(req, res) {
    const { id } = req.params

try {
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
 catch (error) {
    return res.status(500).json(formatResponse (500, 'Ошибка сервера', null, error))
}
}
    

static async changeRaiting(req, res) {
    const { user } = res.locals   // пользователь
    const { id } = req.params    //id книги
    const { raiting } = req.body

    try {
        const bookRaiting = await RaitingService.findByUserBookId(id, user.id)
    if(!bookRaiting) {
        const newRaiting = await RaitingService.createRaitingId(id, user.id, raiting)
        return res.status(201).json(formatResponse (201, "Рейтинг создан", newRaiting))
    }

    const updateRaiting = await RaitingService.updateRaitingId(id, user.id, raiting)
    return res.status(200).json(formatResponse (200, "Рейтинг изменён", updateRaiting))
    } catch (error) {
        return res.status(500).json(formatResponse (500, 'Ошибка сервера', null, error))
    }
    

}   
}


module.exports = RaitingController
