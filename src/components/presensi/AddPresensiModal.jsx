import React, { useState, useEffect } from 'react';

const AddPresensi = ({ isOpen, onClose, onSubmit }) => {
    const [presensiContent, setPresensiContent] = useState('');
    const [file, setFile] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [reporterName] = useState("TNWK"); // Ubah jika perlu
    const [companyGuid] = useState("COMPANY-9a01d431-dfe6-48c2-ae5a-6d0177fd2e19-2024");
    const [reporterGuid] = useState("USER-ce78b8f0-9b65-408b-9be5-bf94ec7ce068-2024");
    const [type] = useState("Presensi"); 

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
    }, [isOpen]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!latitude || !longitude) {
            alert('Lokasi belum tersedia, silakan coba lagi.');
            return;
        }

        const newPresensi = {
            id: Date.now(),
            isiPresensi: presensiContent,
            imgUrl: URL.createObjectURL(file), // Untuk preview lokal
            latitude,
            longitude,
            type, // Menggunakan tipe default "Presensi"
            companyGuid,
            reporterName,
            reporterGuid,
        };

        // Kirim data presensi ke parent component
        onSubmit(newPresensi);

        // Reset form setelah pengiriman
        setPresensiContent('');
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
                <h2 className="text-2xl font-semibold text-white mb-4">Tambah Presensi</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-200">Isi Presensi</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-100 rounded-md"
                            value={presensiContent}
                            onChange={(e) => setPresensiContent(e.target.value)}
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

export default AddPresensi;
