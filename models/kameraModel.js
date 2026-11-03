
const mongoose = require('mongoose');

const kelengkapanSchema = new mongoose.Schema({
    lensa: String,
    baterai: String,
}, { _id: false })

const kameraSchema = new mongoose.Schema({
    noSeri: {
        type: String,
        required: [true, 'nomor seri wajib diisi'],
        unique: true,
        trim: true
    },
    model: {
        type: String,
        required: [true, 'model wajib diisi'],
        trim: true
    },
    tarifHarian: {
        type: Number,
        required: [true, 'tarif harian wajib diisi']
    },
    jenis: {
        type: String,
        required: [true, 'jenis wajib diisi'],
        trim: true
    },
    kelengkapan: kelengkapanSchema,
    createdAt: { type: Date, default: Date.now },

    
});

module.exports = mongoose.model('Kamera', kameraSchema);
