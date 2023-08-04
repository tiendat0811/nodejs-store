const Setting = require('../models/setting');
// general
exports.setting = async (req, res) => {
    try {
        const title = "Cài đặt";
        const setting = await Setting.findOne();
        res.render('admin/index', { title, page: './setting/index.ejs', setting: setting });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

exports.settingUpdate = async (req, res) => {

    try {
        const setting = await Setting.findOne();
        const { logo, contact, banner, slider, social, banking, payment, shipping } = req.body;
        //create new data from body if not undefined
        const newData = {
            logo: logo ? logo : setting.logo,
            contact: contact ? contact : setting.contact,
            banner: banner ? banner : setting.banner,
            slider: slider ? slider : setting.slider,
            social: social ? social : setting.social,
            banking: banking ? banking : setting.banking,
            payment: payment ? payment : setting.payment,
            shipping: shipping ? shipping : setting.shipping
        }
        const updatedSetting = await Setting.findByIdAndUpdate(
            setting._id,
            {
                $set: newData
            },
            { new: true }
        );
        res.status(201).json({ message: 'Updated successfully', status: 'ok', setting: updatedSetting });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// banking
exports.banking = async (req, res) => {
    try {
        const title = "Quản lý ngân hàng";
        const setting = await Setting.findOne();
        res.render('admin/index', { title, page: './setting/banking.ejs', setting: setting });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// slider
exports.slider = async (req, res) => {
    const title = "Quản lý quảng cáo";
    res.render('admin/index', { title, page: './setting/slider.ejs' });
}

// banner
exports.banner = async (req, res) => {
    const title = "Banner";
    res.render('admin/index', { title, page: './setting/banner.ejs' });
}

//payment
exports.payment = async (req, res) => {
    const title = "Phương thức thanh toán";
    res.render('admin/index', { title, page: './setting/payment.ejs' });
}

//shipping
exports.shipping = async (req, res) => {
    const title = "Phương thức vận chuyển";
    res.render('admin/index', { title, page: './setting/shipping.ejs' });
}