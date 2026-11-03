const Parawisata = require('../models/kameraModel');
const { errorHttp } = require('../middlewares/errorHandler');

const FASILITAS = ['Parkir', 'Musholla', 'Toilet', 'Kuliner', 'ramahDisabilitas'];
const LIMIT_DEFAULT = 10;
const LIMIT_MAKS = 50;
const FIELD_SORT = ['nama', 'kota', 'kategori', 'hargaTiket', 'createdAt'];
const FIELD_BOLEH_DIPILIH = ['nama', 'kota', 'kategori', 'hargaTiket', 'jamBuka', 'fasilitas', 'createdAt'];

// Mengubah bilangan dari query string menjadi bilangan bulat yang aman
function angkaAman(nilai, bawaan, min, maks) {
    const n = parseInt(nilai, 10);
    if (Number.isNaN(n)) return bawaan;
    return Math.min(Math.max(n, min), maks);
}

exports.create = async (req, res) => {
    const { nama, kota, kategori, hargaTiket, jamBuka, fasilitas } = req.body;
    const parawisata = await Parawisata.create({ nama, kota, kategori, hargaTiket, jamBuka, fasilitas });
    res.status(201).json(parawisata);
};


exports.getAll = async (req, res) => {
    const filter = {};

    if (req.query.kota) {
        filter.kota = String(req.query.kota);
    }
    if (req.query.kategori) {
        filter.kategori = String(req.query.kategori);
    }
    if (req.query.fasilitas) {
        const diminta = String(req.query.fasilitas)
            .split(',')
            .map((s) => s.trim().toLowerCase());
        for (const nama of FASILITAS) {
            if (diminta.includes(nama.toLowerCase())) {
                filter[`fasilitas.${nama}`] = true;
            }
        }
    }

    const page = angkaAman(req.query.page, 1, 1, Number.MAX_SAFE_INTEGER);
    const limit = angkaAman(req.query.limit, LIMIT_DEFAULT, 1, LIMIT_MAKS);

    // Sorting: ?sort=nama (naik) atau ?sort=-nama (turun). Bawaan: terbaru dulu
    const sortParam = String(req.query.sort || '-createdAt');
    const arah = sortParam.startsWith('-') ? -1 : 1;
    const sortField = sortParam.replace(/^-/, '');
    if (!FIELD_SORT.includes(sortField)) {
        throw errorHttp(400, `sort hanya boleh: ${FIELD_SORT.join(', ')}`);
    }

    // Projection: ?fields=nama,kota
    let select = '';
    if (req.query.fields) {
        const fields = String(req.query.fields).split(',').map((f) => f.trim());
        if (!fields.every((f) => FIELD_BOLEH_DIPILIH.includes(f))) {
            throw errorHttp(400, `fields hanya boleh: ${FIELD_BOLEH_DIPILIH.join(', ')}`);
        }
        select = fields.join(' ');
    }

    const collation = { locale: 'en', strength: 2 };

    const query = Parawisata.find(filter)
        .collation(collation)
        .select(select)
        .sort({ [sortField]: arah, _id: 1 })
        .skip((page - 1) * limit)
        .limit(limit);

    const [data, total] = await Promise.all([
        query,
        Parawisata.countDocuments(filter).collation(collation),
    ]);

    res.json({ data, page, limit, total, totalPages: Math.ceil(total / limit) });
};

exports.getById = async (req, res) => {
    const data = await Parawisata.findById(req.params.id);
    if (!data) throw errorHttp(404, 'Data tidak ditemukan');
    res.json(data);
};

exports.update = async (req, res) => {
    const { nama, kota, kategori, hargaTiket, jamBuka, fasilitas } = req.body;
    const data = await Parawisata.findByIdAndUpdate(
        req.params.id,
        { nama, kota, kategori, hargaTiket, jamBuka, fasilitas },
        { returnDocument: 'after', runValidators: true }
    );
    if (!data) throw errorHttp(404, 'Data tidak ditemukan');
    res.json(data);
};

exports.remove = async (req, res) => {
    const data = await Parawisata.findByIdAndDelete(req.params.id);
    if (!data) throw errorHttp(404, 'Data tidak ditemukan');
    res.status(204).send();
};