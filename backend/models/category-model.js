const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema;

const newCategory = new CategorySchema({
    name: {
        type: String, 
        required: true
    },
    token: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('category', newCategory)