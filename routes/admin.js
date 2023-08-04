const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const settingController = require('../controllers/settingController');
const { checkRole } = require('../middlewares/auth');
router.get('/', adminController.index);

// category
router.get('/category', checkRole(['admin']), adminController.categories);

// product
router.get('/product', checkRole(['admin']), adminController.products);

// order
router.get('/order', checkRole(['admin']), adminController.orders);

// post
router.get('/post', adminController.posts);

// user
router.get('/user', checkRole(['admin']), adminController.users);

// setting
router.get('/setting', checkRole(['admin']), settingController.setting);

router.patch('/setting', checkRole(['admin']), settingController.settingUpdate);

// setting - banking
router.get('/setting/banking', checkRole(['admin']), settingController.banking);

// setting - slider
router.get('/setting/slider', checkRole(['admin']), settingController.slider);

// setting - banner
router.get('/setting/banner', checkRole(['admin']), settingController.banner);

// setting - payment
router.get('/setting/payment', checkRole(['admin']), settingController.payment);

// setting - shipping
router.get('/setting/shipping', checkRole(['admin']), settingController.shipping);

router.get('/*', (req, res) => {
    // Xử lý logic tại đây, ví dụ:
    res.render('partials/empty', { title: 'Không tìm thấy' });
});

module.exports = router;