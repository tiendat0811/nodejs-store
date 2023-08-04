const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ''
    },
});


const Category = mongoose.model('Category', categorySchema);


// add default data
const categories = [
    {
        name: 'Đèn led âm trần',
        slug: 'led-am-tran'
    },
    {
        name: 'Đèn tuýp led',
        slug: 'den-tuyp-led'
    },
    {
        name: 'Đèn pha led',
        slug: 'den-pha-led'
    },
    {
        name: 'Bóng đèn led',
        slug: 'bong-den-led'
    },
    {
        name: 'Đèn led ốp trần',
        slug: 'den-led-op-tran'
    },
    {
        name: 'Đèn led gắn ray',
        slug: 'den-led-gan-ray'
    },
    {
        name: 'Đèn led nhà xưởng',
        slug: 'den-led-nha-xuong'
    },
    {
        name: 'Đèn led panel',
        slug: 'den-led-panel'
    },
    {
        name: 'Đèn đường led',
        slug: 'den-duong-led'
    },
    {
        name: 'Đèn led sự cố',
        slug: 'den-led-su-co'
    },
    {
        name: 'Máng đèn - Chao đèn',
        slug: 'mang-den-chao-den'
    }
]
try {
    Category.findOne().then(category => {
        if (!category) {
            Category.insertMany(categories)
        }
    })
} catch (error) {
    console.log(error)
}
module.exports = Category;