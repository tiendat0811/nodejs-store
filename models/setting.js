const mongoose = require('mongoose');
const moment = require('moment');

const bankingSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    locale: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },

});

const socialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
});

const sliderSchema = new mongoose.Schema({
    position: {
        type: Number,
    },
    name: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

const settingSchema = new mongoose.Schema({
    banner: {
        type: [sliderSchema],
        default: [{
            position: 1,
            name: 'Banner 1',
            image: 'https://images.unsplash.com/photo-1604601815764-6d01fc6bebde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmxpZ2h0fGVufDB8fDB8fHww&w=1000&q=80',
            link: '/'
        },
        {
            position: 3,
            name: 'Banner 3',
            image: 'https://www.savethestudent.org/uploads/flights.jpg',
            link: '/'
        },
        {
            position: 2,
            name: 'Banner 2',
            image: 'https://www.moneysavingexpert.com/content/dam/mse/editorial-image-library/guide-images/hero-images/hero-travel-cheap-flights.jpg',
            link: '/'
        },
        {
            position: 4,
            name: 'Banner 4',
            image: 'https://media.cntraveler.com/photos/607f3c487774091e06dd5d21/4:3/w_1819,h_1364,c_limit/Breeze%20Airways_166655077_303814634409055_8038496796049085212_n.jpeg',
            link: '/'
        },
        ]
    },
    logo: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/anphat-fsl.appspot.com/o/logo.jpg?alt=media&token=29245626-6dcd-4847-8fdf-ea8adc378955'
    },
    slider: {
        type: [sliderSchema],
        default: [{
            position: 4,
            name: 'Slider 4',
            image: 'https://firebasestorage.googleapis.com/v0/b/anphat-fsl.appspot.com/o/slider-4.jpg?alt=media&token=c952e8ea-9276-40c4-950a-d191dffe0e12',
            link: '/'
        },
        {
            position: 1,
            name: 'Slider 1',
            image: 'https://firebasestorage.googleapis.com/v0/b/anphat-fsl.appspot.com/o/slider-1.jpg?alt=media&token=11cd8d80-6eec-45ad-b498-8f9605ecd933',
            link: '/'
        },
        {
            position: 3,
            name: 'Slider 3',
            image: 'https://firebasestorage.googleapis.com/v0/b/anphat-fsl.appspot.com/o/slider-3.jpg?alt=media&token=f5959234-178b-484b-985f-cf5dd0366dd3',
            link: '/'
        },
        {
            position: 2,
            name: 'Slider 2',
            image: 'https://firebasestorage.googleapis.com/v0/b/anphat-fsl.appspot.com/o/slider-2.jpg?alt=media&token=74a03e59-7bc3-4cdd-ac3d-abd4eb5c664b',
            link: '/'
        },
        ]
    },
    contact: {
        type: {
            address: String,
            phone: String,
            email: String
        },
        default: {
            address: '187 Đường Số 3, Bình Trị Đông B, Bình Tân, TP. HCM',
            phone: '(+84) 0838616839 – 0938925533',
            email: 'anphatsaigon.jsc@gmail.com'
        }
    },
    banking: {
        type: [bankingSchema],
        default: [
            {
                fullname: 'Nguyễn Văn A',
                number: '123456789',
                name: 'Ngân hàng Vietcombank',
                locale: 'Hồ Chí Minh',
                image: 'https://portal.vietcombank.com.vn/resources/no-image-news.jpg?RenditionID=3'
            },
            {
                fullname: 'Nguyễn Văn A',
                number: '123456789',
                name: 'Ngân hàng Vietcombank',
                locale: 'Hồ Chí Minh',
                image: 'https://portal.vietcombank.com.vn/resources/no-image-news.jpg?RenditionID=3'
            }
        ]
    },
    social: {
        type: [socialSchema],
        default: [{
            name: 'Facebook',
            link: 'https://www.facebook.com/',
            image: 'https://firebasestorage.googleapis.com/v0/b/vnbay-3bd29.appspot.com/o/messenger.png?alt=media&token=62f86ba2-624f-46fb-8e9b-6f9d1ae8f0a0'
        },
        {
            name: 'Zalo',
            link: 'https://zalo.me/',
            image: 'https://firebasestorage.googleapis.com/v0/b/vnbay-3bd29.appspot.com/o/zalo-icon.png?alt=media&token=5058be08-278d-4e55-af79-4b4880ba0c7f'
        }
        ]
    },
    visitorCount: {
        type: Number,
        default: 0
    },
    payment: {
        type: Array,
        default: []
    },
    shipping: {
        type: Array,
        default: []
    }
});

const Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting

try {
    // init setting
    Setting.findOne().then((setting) => {
        if (!setting) {
            const setting = new Setting();
            setting.save();
        }
    }).catch((e) => {
        console.log(e);
    })
} catch (error) {
    console.log(error)
}