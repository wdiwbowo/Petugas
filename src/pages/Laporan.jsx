import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import AddLaporanPetugas from '../components/laporan/addLaporanPetugas';
import { getPetugasReports, addReport } from '../services/apiservice';

const Laporan = () => {
    const [laporanData, setLaporanData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState('');
    const [filterType, setFilterType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [successMessage, setSuccessMessage] = useState(''); // State for success message

    const queryParams = {
        companyGuid: "COMPANY-9a01d431-dfe6-48c2-ae5a-6d0177fd2e19-2024",
        type: filterType,
        page: currentPage,
        limit: itemsPerPage,
    };

    useEffect(() => {
        const fetchLaporanData = async () => {
            try {
                const response = await getPetugasReports(queryParams);

                if (response && response.success && response.data) {
                    setLaporanData(response.data.data || []);
                    setTotalItems(response.data.totalItems || 0);
                } else {
                    setError('Data laporan tidak ditemukan atau respons gagal.');
                }
            } catch (error) {
                console.error('Error fetching laporan:', error);
                setError('Gagal mengambil data laporan.');
            } finally {
                setLoading(false);
            }
        };

        fetchLaporanData();
    }, [filterType, currentPage]);

    const currentItems = laporanData;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleAdd = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleAddLaporanSubmit = async (newLaporan) => {
        try {
            const response = await addReport(newLaporan);
            if (response && response.success) {
                console.log('Laporan berhasil ditambahkan:', response.data);
                setLaporanData((prevData) => [...prevData, response.data]);
                setSuccessMessage('Laporan berhasil ditambahkan!');
    
                setTimeout(() => {
                    setSuccessMessage('');
                    setIsModalOpen(false); // Close modal after success
                    setCurrentPage(1); // Reset to first page to reflect new entry
                }, 3000);
            } else {
                console.error('Gagal menambahkan laporan:', response.message);
            }
        } catch (error) {
            console.error('Error saat menambahkan laporan:', error);
        }
    };    

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-700">
                <div className="text-center">
                    <div className="loader mb-4 animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
                    <p className="text-yellow-400 text-2xl font-bold">Sedang Memuat...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-700">
                <p className="text-red-400 text-2xl font-bold">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800">
            <Navbar />
            <main className="flex-1 p-6">
                <div className="bg-gray-800 shadow-2xl rounded-lg">
                    <div className="flex justify-between items-center p-6 bg-gray-800 rounded-t-lg">
                        <h1 className="text-4xl font-extrabold text-yellow-400">Laporan</h1>
                        <button
                            onClick={handleAdd}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
                        >
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Add
                        </button>
                    </div>

                    {successMessage && (
                        <div className="p-4 bg-green-500 text-white text-center">
                            {successMessage}
                        </div>
                    )}

                    <div className="px-6 mb-4 flex justify-between">
                        <input
                            type="text"
                            placeholder="Cari berdasarkan nama reporter..."
                            className="w-2/3 px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)} // Correct state variable
                            className="w-1/3 px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            <option value="">All Types</option>
                            <option value="Officer">Officer</option>
                            <option value="report-harian">Report Harian</option>
                            <option value="report-kegiatan">Report Kegiatan</option>
                            <option value="report-kendala">Report Kendala</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto px-6 pb-6">
                        <table className="min-w-full divide-y divide-gray-700 table-fixed">
                            <thead className="bg-gray-700 text-yellow-400">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">No</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Reporter Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Report Content</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Img</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {currentItems && currentItems.length > 0 ? (
                                    currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-100">{index + 1}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-100">{item?.reporterName || 'Nama tidak tersedia'}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-100">{item?.reportContent || 'Data tidak tersedia'}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-100">
                                                {item?.imageUrl ? (
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={`Report Image ${index + 1}`}
                                                        className="h-16 w-16 object-cover rounded"
                                                    />
                                                ) : (
                                                    <span>No Image Available</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-100 text-sm text-gray-400 flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleEdit(item?._id)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded"
                                                >
                                                    <PencilIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item?._id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-4 text-center text-sm text-gray-400">Tidak ada data laporan yang tersedia.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between px-6 pb-6">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="bg-gray-600 text-white py-2 px-4 rounded-lg disabled:opacity-50">Previous</button>
                        <span className="text-white">Page {currentPage} of {totalPages}</span>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="bg-gray-600 text-white py-2 px-4 rounded-lg disabled:opacity-50">Next</button>
                    </div>
                </div>
            </main>
            {isModalOpen && <AddLaporanPetugas isOpen={isModalOpen} onSubmit={handleAddLaporanSubmit} onClose={handleModalClose} />}
        </div>
    );
};

export default Laporan;
