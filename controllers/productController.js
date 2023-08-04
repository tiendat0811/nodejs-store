// controllers/productController.js
const Product = require('../models/product');
//middleware check token
const moment = require('moment');
const slugify = require('../utils/transform').slugify;
// render actions
exports.render = async (req, res) => {
    try {
        const title = "Sản phẩm";
        const products = await Product.find();
        res.render('product/index', { title: title, products: products });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// index actions
exports.index = async (req, res) => {
    return res.json({ data: res.paginatedResults })
}

// create product actions
exports.create = async (req, res) => {
    const title = "Tạo sản phẩm mới";
    res.render('product/create', { title: title });
}

// store product actions
exports.store = async (req, res) => {
    try {
        const product = new Product({
            ...req.body,
            createdDate: moment().format('MM/DD/YYYY, hh:mm:ss'),
            createdAt: moment().valueOf(),
            updatedDate: moment().format('MM/DD/YYYY, hh:mm:ss'),
            updatedAt: moment().valueOf(),
            slug: slugify(req.body.name)
        });
        await product.save();
        res.status(201).json({ data: product, message: 'Created successfully', status: 'ok' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// show product actions
exports.detail = async (req, res) => {
    try {

        // find product by slug
        const data = await Product.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categorySlug',
                    foreignField: 'slug',
                    as: 'category'
                }
            },
            {
                $unwind: '$category'
            },
            {
                $match: { slug: req.params.slug }
            },
            {
                $limit: 1
            },
        ]).exec();

        const product = data[0];
        if (!product) {
            return res.redirect('/notfound');
        }
        const title = product.name;
        res.render('product/detail', { title: title, product: product });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// update product actions
exports.update = async (req, res) => {
    try {
        const body = {
            ...req.body,
            updatedDate: moment().format('MM/DD/YYYY, hh:mm:ss'),
            updatedAt: moment().valueOf(),
        };
        if (req.body.quantity === 0) {
            body.status = 'soldout';
        } else if (req.body.quantity > 0) {
            body.status = 'active';
        }
        const product = await Product.findByIdAndUpdate(req.params.id, body);
        await product.save();
        res.status(201).json({ product: product, message: 'Updated successfully', status: 'ok' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}


// delete product actions
exports.delete = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Deleted successfully', status: 'ok' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};