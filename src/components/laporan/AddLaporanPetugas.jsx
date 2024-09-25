import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'; // Import SweetAlert2

const AddLaporanPetugas = ({ isOpen, onClose, onSubmit }) => {
    const [reportContent, setReportContent] = useState('');
    const [file, setFile] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [type, setType] = useState('');
    const [isTypeLocked, setIsTypeLocked] = useState(false); // State to lock type selection
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [guid] = useState(() => uuidv4());
    const [companyGuid] = useState("COMPANY-9a01d431-dfe6-48c2-ae5a-6d0177fd2e19-2024");
    const [reporterName] = useState("TNWK");
    const [reporterGuid] = useState("USER-ce78b8f0-9b65-408b-9be5-bf94ec7ce068-2024");

    // Define a mapping for report types
    const reportTypeMapping = {
        'Officer': 'Gajah Masuk',
        'report-harian': 'Laporan Harian',
        'report-kegiatan': 'Laporan Kegiatan',
        'report-kendala': 'Kendala Lapangan',
    };

    // Array for dropdown options
    const reportTypes = Object.keys(reportTypeMapping).map(key => ({
        value: key,
        label: reportTypeMapping[key],
    }));

    useEffect(() => {
        if (isOpen) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                    },
                    (error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Gagal mendapatkan lokasi.',
                        });
                    }
                );
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Geolocation tidak didukung oleh browser ini.',
                });
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
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Lokasi belum tersedia, silakan coba lagi.',
            });
            setLoading(false);
            return;
        }
    
        if (!type) {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Silakan pilih tipe laporan.',
            });
            setLoading(false);
            return;
        }
    
        const apiType = type; // This is correct
    
        const formData = new FormData();
        formData.append('reportContent', reportContent);
        formData.append('file', file);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('type', type); // Use the selected key for the type
        formData.append('companyGuid', companyGuid);
        formData.append('reporterName', reporterName);
        formData.append('reporterGuid', reporterGuid);
        formData.append("guid", guid);
    
        try {
            await onSubmit(formData);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Laporan berhasil ditambahkan.',
            });
            // Resetting form states after submission
            setReportContent('');
            setFile(null);
            setLatitude(null);
            setLongitude(null);
            setType(''); // Reset type
            setIsTypeLocked(false); // Unlock type selection for next report
            onClose();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal mengirim laporan.',
            });
        } finally {
            setLoading(false);
        }
    };
    

    const handleTypeChange = (e) => {
        const selectedType = e.target.value;
        setType(selectedType);
        if (selectedType) {
            setIsTypeLocked(true); // Lock the type once selected
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold text-yellow-400 mb-4">Tambah Laporan Petugas</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={reportContent}
                        onChange={(e) => setReportContent(e.target.value)}
                        placeholder="Isi laporan..."
                        className="w-full px-4 py-2 mb-4 bg-gray-700 text-gray-300 rounded-lg focus:outline-none"
                        rows="4"
                    />
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 mb-4 bg-gray-700 text-gray-300 rounded-lg focus:outline-none"
                    />
                    <select
                        value={type}
                        onChange={handleTypeChange}
                        className="w-full px-4 py-2 mb-4 bg-gray-700 text-gray-300 rounded-lg focus:outline-none"
                        disabled={isTypeLocked} // Disable if type is locked
                    >
                        <option value="">Pilih Tipe Laporan</option>
                        {reportTypes.map(rt => (
                            <option key={rt.value} value={rt.value}>{rt.label}</option>
                        ))}
                    </select>

                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            {loading ? 'Menambahkan...' : 'Tambah'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLaporanPetugas;
