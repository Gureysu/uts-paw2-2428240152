const MerekKamera = require('../models/merekKameraModel');

exports.create = async (req, res) => {
    const merekKamera = await MerekKamera.create(req.body);
    res.status(201).json(merekKamera);
};

exports.getAll = async (req, res) => {
    res.json(await MerekKamera.find());
};  