import React, { useState, useEffect } from 'react';
import { addReport } from '../../services/apiservice';
import { v4 as uuidv4 } from 'uuid';

const AddLaporanPetugas = ({ isOpen, onClose, onSubmit }) => {
    const [reportContent, setReportContent] = useState('');
    const [file, setFile] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [type, setType] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [guid] = useState(() => uuidv4());
    const [companyGuid] = useState("COMPANY-9a01d431-dfe6-48c2-ae5a-6d0177fd2e19-2024");
    const [reporterName] = useState("TNWK");
    const [reporterGuid] = useState("USER-ce78b8f0-9b65-408b-9be5-bf94ec7ce068-2024");

    useEffect(() => {
        if (isOpen) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
    
        if (!latitude || !longitude) {
            alert('Lokasi belum tersedia, silakan coba lagi.');
            setLoading(false);
            return;
        }
        if (!type) {
            alert('Silakan pilih tipe laporan.');
            setLoading(false);
            return;
        }
    
        const formData = new FormData();
        formData.append('reportContent', reportContent);
        formData.append('file', file);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('type', type);
        formData.append('companyGuid', companyGuid);
        formData.append('reporterName', reporterName);
        formData.append('reporterGuid', reporterGuid);
        formData.append("guid", guid);
    
        console.log('Submitting Report:', formData);
    
        try {
            const newLaporan = await addReport(formData); // Call addReport with formData only
            if (newLaporan) {
                onSubmit(newLaporan);
                setReportContent('');
                setFile(null);
                setLatitude(null);
                setLongitude(null);
                setType('');
            } else {
                throw new Error('Laporan tidak berhasil ditambahkan.');
            }
        } catch (err) {
            console.error('Error adding report:', err);
            setError(err.message || 'Terjadi kesalahan saat menambahkan laporan.');
        } finally {
            setLoading(false);
            onClose();
        }
    };    
    
    return (
        <div className={`fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}>
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
                    <div className="mb-4">
                        <label className="block text-gray-200">Tipe Laporan</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-100 rounded-md"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Pilih Tipe</option>
                            <option value="Officer">Gajah Masuk</option>
                            <option value="report-harian">Laporan Harian</option>
                            <option value="report-kegiatan">Laporan Kegiatan</option>
                            <option value="report-kendala">Kendala Lapangan</option>
                        </select>
                    </div>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 mr-2"
                            disabled={loading}
                        >
                            {loading ? 'Mengirim...' : 'Kirim'}
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
