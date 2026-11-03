const Kamera = require('../models/kameraModel');

exports.create = async (req, res) => {
    const Kamera = await Kamera.create(req.body);
    res.status(201).json(Kamera);
};

exports.getAll = async (req, res) => {
    res.json(await Kamera.find());
};