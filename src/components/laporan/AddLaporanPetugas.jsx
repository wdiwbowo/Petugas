import React, { useState, useEffect } from 'react';

const AddLaporanPetugas = ({ isOpen, onClose, onSubmit }) => {
    const [reportContent, setReportContent] = useState('');
    const [file, setFile] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [type, setType] = useState('Officer');

    useEffect(() => {
        if (isOpen) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                        console.log('Lokasi didapatkan: ', position.coords);
                    },
                    (error) => {
                        console.error('Error fetching location:', error);
                        alert('Gagal mendapatkan lokasi.');
                    }
                );
            } else {
                alert('Geolocation tidak didukung oleh browser ini.');
            }
        }
    }, [isOpen]); // Hanya dijalankan saat modal dibuka (isOpen true)

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!latitude || !longitude) {
            alert('Lokasi belum tersedia, silakan coba lagi.');
            return;
        }

        const newLaporan = {
            id: Date.now(),
            nama: 'New Officer', // Ganti dengan nama petugas jika perlu
            isiLaporan: reportContent,
            imgUrl: URL.createObjectURL(file), // Untuk preview lokal
            latitude,
            longitude,
            type
        };

        // Kirim data laporan ke parent component
        onSubmit(newLaporan);

        // Reset form setelah pengiriman
        setReportContent('');
        setFile(null);
        setLatitude(null);
        setLongitude(null);
        onClose(); // Tutup modal setelah pengiriman
    };

    return (
        <div
            className={`fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}
        >
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold text-white mb-4">Tambah Laporan Petugas</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-200">Isi Laporan</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-100 rounded-md"
                            value={reportContent}
                            onChange={(e) => setReportContent(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-200">File</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-100 rounded-md"
                            required
                        />
                    </div>
                    {/* <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-200">Tipe</label>
                        <input
                            type="text"
                            value={type}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-gray-100 rounded-md"
                        />
                    </div> */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 mr-2"
                        >
                            Kirim
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                        >
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLaporanPetugas;
