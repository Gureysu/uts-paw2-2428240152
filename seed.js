
require('dotenv').config({ quiet: true });
const mongoose = require('mongoose');
const Parawisata = require('./models/parawisataModel');

const DATA_PARIWISATA = [
    {
        nama: 'Taman Wisata Alam Punti Kayu',
        kota: 'Palembang',
        kategori: 'Wisata Alam',
        hargaTiket: 25000,
        jamBuka: '09:00 - 16:00'
    },
    {
        nama: 'Jembatan Ampera',
        kota: 'Palembang',
        kategori: 'Wisata Ikonik',
        hargaTiket: 0,
        jamBuka: '24 Jam'
    },
    {
        nama: 'Jakabaring Sport City',
        kota: 'Palembang',
        kategori: 'Wisata Olahraga',
        hargaTiket: 15000,
        jamBuka: '08:00 - 18:00'
    },
    {
        nama: 'Museum Sultan Mahmud Badaruddin II',
        kota: 'Palembang',
        kategori: 'Wisata Sejarah',
        hargaTiket: 5000,
        jamBuka: '08:00 - 16:00'
    },
    {
        nama: 'Taman Kambang Iwak',
        kota: 'Palembang',
        kategori: 'Wisata Taman',
        hargaTiket: 0,
        jamBuka: '06:00 - 18:00'
    },
    {
        nama: 'Benteng Kuto Besak',
        kota: 'Palembang',
        kategori: 'Wisata Sejarah',
        hargaTiket: 5000,
        jamBuka: '08:00 - 17:00'
    },
    {
        nama: 'Danau Ranau',
        kota: 'Ogan Komering Ulu Selatan',
        kategori: 'Wisata Alam',
        hargaTiket: 10000,
        jamBuka: '07:00 - 17:00'
    },
    {
        nama: 'Taman Purbakala Kerajaan Sriwijaya',
        kota: 'Palembang',
        kategori: 'Wisata Sejarah',
        hargaTiket: 5000,
        jamBuka: '08:00 - 17:00'
    },
    {
        nama: 'Pulau Kemaro',
        kota: 'Palembang',
        kategori: 'Wisata Religi',
        hargaTiket: 10000,
        jamBuka: '08:00 - 17:00'
    },
    {
        nama: 'Air Terjun Bidadari',
        kota: 'Lahat',
        kategori: 'Wisata Alam',
        hargaTiket: 10000,
        jamBuka: '08:00 - 17:00'
    }
];

async function main() {
    try {
        await mongoose.connect(process.env.DB_URI);

        // Menghapus data pariwisata lama
        await Parawisata.deleteMany({});

        // Memasukkan data pariwisata baru
        const pariwisata = await Parawisata.insertMany(DATA_PARIWISATA);

        console.log(
            `Seed selesai: ${pariwisata.length} data pariwisata berhasil ditambahkan`
        );
    } catch (err) {
        console.error('Gagal menjalankan seed:', err.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

main();
