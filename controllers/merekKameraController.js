const merekKamera = require('../models/kameraModel');

exports.create = async (req, res) => {
    const merekKamera = await merekKamera.create(req.body);
    res.status(201).json(merekKamera);
};

exports.getAll = async (req, res) => {
    res.json(await merekKamera.find());
};