const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/', homeController.index);

router.get('/about', homeController.about);

router.get('/contact', homeController.contact);

router.get('/flight', homeController.flight);

router.get('*', (req, res) => {
    // Xử lý logic tại đây, ví dụ:
    res.render('partials/empty', { title: 'Không tìm thấy' });
});

module.exports = router;
