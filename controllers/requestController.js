const Request = require('../models/Request')

async function createRequest(req, res) {
    try {
        const { title, name, description } = req.body
        const request = new Request({ title, name, description, userId: req.userId })
        await request.save()
        res.redirect('/requests/my')
    } catch (error) {
        console.error('Ошибка создания запроса:', error)
        res.status(500).render('error', { message: 'Ошибка сервера' })
    }
}

async function getAllRequests(req, res) {
    try {
        const requests = await Request.find()
        res.render('all-requests', { requests:requests })
    } catch (error) {
        console.error('Ошибка поиска запросов:', error)
        res.status(500).render('error', { message: 'Ошибка сервера' })
    }
}

async function getUserRequests(req, res) {
    try {
        const requests = await Request.find({ userId: req.userId })
        res.render('user-requests', { requests })
    } catch (error) {
        console.error('Ошибка поиска запросов:', error)
        res.status(500).render('error', { message: 'Ошибка сервера' })
    }
}

async function deleteRequest(req, res) {
    try {
        const requestId = req.params.id
        const request = await Request.findByIdAndDelete(requestId)
        if (!request) {
            return res.status(404).render('error', { message: 'Запрос не найден' })
        }
        res.redirect('/requests/my')
    } catch (error) {
        console.error('Ошибка удаления запросов:', error)
        res.status(500).render('error', { message: 'Ошибка сервера' })
    }
}

async function approveRequest(req, res) {
    try {
        const requestId = req.params.id
        const request = await Request.findByIdAndUpdate(requestId, { status: 'в обработке' })
        if (!request) {
            return res.status(404).render('error', { message: 'Запрос не найден' })
        }
        res.redirect('/requests')
    } catch (error) {
        console.error('Ошибка подтверждения запроса:', error)
        res.status(500).render('error', { message: 'Ошибка сервера' })
    }
}

async function rejectRequest(req, res) {
    try {
        const requestId = req.params.id
        const request = await Request.findByIdAndUpdate(requestId, { status: 'отклонен' })
        if (!request) {
            return res.status(404).render('error', { message: 'Запрос не найден' })
        }
        res.redirect('/requests')
    } catch (error) {
        console.error('Ошибка отклонения запроса:', error)
        res.status(500).render('error', { message: 'Ошибка сервера' })
    }
}

async function completeRequest(req, res) {
    try {
        const requestId = req.params.id
        const request = await Request.findByIdAndUpdate(requestId, { status: 'завершен' })
        if (!request) {
            return res.status(404).render('error', { message: 'Запрос не найден' })
        }
        res.redirect('/requests')
    } catch (error) {
        console.error('Ошибка завершения запроса:', error)
        res.status(500).render('error', { message: 'Ошибка сервера' })
    }
}

module.exports = {
    createRequest,
    getAllRequests,
    getUserRequests,
    deleteRequest,
    approveRequest,
    rejectRequest,
    completeRequest
}