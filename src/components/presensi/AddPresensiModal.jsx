import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

const AddPresensiModal = ({ isOpen, onClose, onSubmit }) => {
    const [reportContent, setReportContent] = useState('');
    const [file, setFile] = useState(null);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const type = "presensi"; // Set type as Presensi
    const [guid] = useState(() => uuidv4());
    const [companyGuid] = useState("COMPANY-9a01d431-dfe6-48c2-ae5a-6d0177fd2e19-2024");
    const [reporterName] = useState("TNWK");
    const [reporterGuid] = useState("USER-ce78b8f0-9b65-408b-9be5-bf94ec7ce068-2024");

    // Function to get the user's current location
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLatitude(latitude.toString());
                    setLongitude(longitude.toString());
                },
                (error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Terjadi kesalahan saat mendapatkan lokasi. ' + error.message,
                    });
                }
            );
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Geolocation tidak didukung oleh browser ini.',
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('reportContent', reportContent);
        formData.append('file', file);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('type', type);
        formData.append('companyGuid', companyGuid);
        formData.append('reporterName', reporterName);
        formData.append('reporterGuid', reporterGuid);
        formData.append('guid', guid);

        await onSubmit(formData); // Call the onSubmit function with FormData
        // Reset form fields
        setReportContent('');
        setFile(null);
        setLatitude('');
        setLongitude('');
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            getCurrentLocation(); // Get current location when modal opens
        } else {
            // Reset form fields when modal is closed
            setReportContent('');
            setFile(null);
            setLatitude('');
            setLongitude('');
        }
    }, [isOpen]);

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-black bg-opacity-50 fixed inset-0"></div>
            <div className="bg-gray-800 rounded-lg p-6 relative z-10 w-1/3">
                <h2 className="text-xl text-yellow-400 font-bold mb-4">Tambah Presensi</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-1">Isi Presensi:</label>
                        <textarea
                            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg"
                            value={reportContent}
                            onChange={(e) => setReportContent(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-1">File:</label>
                        <input
                            type="file"
                            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    {/* Latitude and Longitude inputs are hidden */}
                    <input type="hidden" value={latitude} />
                    <input type="hidden" value={longitude} />
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            onClick={onClose}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Tambah Presensi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPresensiModal;
