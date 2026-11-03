
const mongoose = require('mongoose');

const kameraSchema = new mongoose.Schema({
    motif: {
        type: String,
        required: [true, 'motif wajib diisi'],
        trim: true
    },
    harga: {
        type: Number,
        required: [true, 'harga wajib diisi']
    },
    benang: {
        type: String,
        required: [true, 'benang wajib diisi'],
        trim: true
    },
    
});

module.exports = mongoose.model('Kamera', kameraSchema);
