const express = require('express')
const router = express.Router()

const requestController = require('../controllers/requestController')
const { authenticateToken } = require('../middlewares/authenticateToken')
const { checkRole } = require('../middlewares/checkRole')

router.get('/requests/create', (req, res) => {res.render('create-request')})


router.post('/requests/create', authenticateToken, requestController.createRequest)

router.get('/requests', authenticateToken, checkRole('admin'), requestController.getAllRequests)

router.get('/requests/my', authenticateToken, requestController.getUserRequests)

router.post('/requests/delete/:id', authenticateToken, checkRole('user'), requestController.deleteRequest)

router.post('/requests/approve/:id', authenticateToken, checkRole('admin'), requestController.approveRequest)

router.post('/requests/reject/:id', authenticateToken, checkRole('admin'), requestController.rejectRequest)

router.post('/requests/complete/:id', authenticateToken, requestController.completeRequest)

module.exports = router