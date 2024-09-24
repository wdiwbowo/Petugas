import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddPresensiModal = ({ isOpen, onClose, onSubmit }) => {
    const [reportContent, setReportContent] = useState('');
    const [file, setFile] = useState(null);
    const [latitude, setLatitude] = useState(''); // Initialize to empty string
    const [longitude, setLongitude] = useState(''); // Initialize to empty string
    const type = "presensi"; 
    // const companyGuid = "COMPANY-9a01d431-dfe6-48c2-ae5a-6d0177fd2e19-2024"; // Use your companyGuid

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
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPresensi = {
            guid: uuidv4(),
            reportContent,
            type,
            // companyGuid,
            latitude,
            longitude,
            file,
        };
        await onSubmit(newPresensi);
        setReportContent('');
        setFile(null);
        setLatitude(''); // Reset to empty string
        setLongitude(''); // Reset to empty string
        onClose();
    };

    useEffect(() => {
        if (!isOpen) {
            setReportContent('');
            setFile(null);
            setLatitude(''); // Reset to empty string
            setLongitude(''); // Reset to empty string
        } else {
            getCurrentLocation(); // Get current location when modal opens
        }
    }, [isOpen]);

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-black bg-opacity-50 fixed inset-0"></div>
            <div className="bg-gray-800 rounded-lg p-6 relative z-10 w-1/3">
                <h2 className="text-xl text-yellow-400 font-bold mb-4">Add Presensi</h2>
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
                    {/* Latitude and Longitude inputs are removed from the UI */}
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
