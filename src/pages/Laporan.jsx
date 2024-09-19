import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import AddLaporanPetugas from '../components/laporan/addLaporanPetugas';

const dummyLaporanData = [
    { id: 1, nama: 'John Doe', isiLaporan: 'Report about water quality', imgUrl: 'https://via.placeholder.com/100' },
    { id: 2, nama: 'Jane Smith', isiLaporan: 'Report about air pollution', imgUrl: 'https://via.placeholder.com/100' },
    { id: 3, nama: 'Alice Johnson', isiLaporan: 'Report about deforestation', imgUrl: 'https://via.placeholder.com/100' },
    { id: 4, nama: 'Bob Brown', isiLaporan: 'Report about wildlife preservation', imgUrl: 'https://via.placeholder.com/100' },
    { id: 5, nama: 'Charlie Black', isiLaporan: 'Report about ocean cleanup', imgUrl: 'https://via.placeholder.com/100' },
];

const Laporan = () => {
    const [laporanData, setLaporanData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Jumlah item per halaman
    const [isModalOpen, setIsModalOpen] = useState(false); // State untuk membuka modal

    useEffect(() => {
        const fetchLaporanData = () => {
            setTimeout(() => {
                setLaporanData(dummyLaporanData);
                setLoading(false);
            }, 1000); // Simulasi delay API 1 detik
        };

        fetchLaporanData();
    }, []);

    const filteredLaporanData = laporanData.filter((item) =>
        item.nama.toLowerCase().includes(filterText.toLowerCase())
    );

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredLaporanData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredLaporanData.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleAdd = () => {
        setIsModalOpen(true); // Buka modal ketika tombol Add ditekan
    };

    const handleEdit = (id) => {
        console.log(`Edit item with id: ${id}`);
        // Implement functionality for editing the report
    };

    const handleDelete = (id) => {
        console.log(`Delete item with id: ${id}`);
        setLaporanData(laporanData.filter(item => item.id !== id));
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // Tutup modal setelah selesai
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

                    {/* Filter/Pencarian */}
                    <div className="px-6 mb-4">
                        <input
                            type="text"
                            placeholder="Cari berdasarkan nama reporter..."
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />
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
                                {currentItems.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-yellow-600 hover:text-gray-900 transition duration-300">
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">{index + 1 + indexOfFirstItem}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-100">{item.nama}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">{item.isiLaporan}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">
                                            <img src={item.imgUrl} alt="report img" className="h-10 w-10 object-cover rounded-lg" />
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400 flex items-center space-x-2">
                                            <button
                                                onClick={() => handleEdit(item.id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center py-4">
                        <nav className="flex items-center space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`text-white font-bold py-2 px-4 rounded ${currentPage === page ? 'bg-yellow-500' : 'bg-gray-500 hover:bg-gray-600'} `}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                </div>
            </main>

            {/* Modal Add Laporan */}
            {isModalOpen && (
                <AddLaporanPetugas
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSubmit={(newLaporan) => {
                        setLaporanData([...laporanData, newLaporan]);
                        handleModalClose();
                    }}
                />
            )}
        </div>
    );
};

export default Laporan;
