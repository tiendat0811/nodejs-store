const moment = require('moment');

function slugify(text) {
    const timestamp = moment().format('YYYYMMDDHHmmss');
    const slug = text
        .toString() // Convert to string
        .toLowerCase() // Convert to lowercase
        .trim() // Remove leading and trailing whitespace
        .replace(/\s+/g, '-') // Replace whitespace with dashes
        .replace(/[^\w\-]+/g, '') // Remove non-word characters except dashes
        .replace(/\-\-+/g, '-') // Replace multiple dashes with a single dash
        .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes

    return `${slug}-${timestamp}`;
}

module.exports = { slugify };