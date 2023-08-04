const express = require('express');
const router = express.Router();

const toolController = require('../controllers/toolController');

router.get('/', toolController.index);

router.get('/banking', toolController.banking);

router.get('/checking-flight', toolController.checkingFlight);

router.get('/online-payment', toolController.onlinePayment);

router.get('/booking-guide', toolController.bookingGuide);

router.get('/faq', toolController.faq);

router.get('*', (req, res) => {
    // Xử lý logic tại đây, ví dụ:
    res.render('partials/empty', { title: 'Không tìm thấy' });
});

module.exports = router;
