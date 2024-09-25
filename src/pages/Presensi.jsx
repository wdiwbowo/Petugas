import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import AddPresensiModal from '../components/presensi/AddPresensiModal';
import { getPetugasReports, addReport} from '../services/apiservice'; // Ensure deleteReport is imported
import Swal from 'sweetalert2'; // Import SweetAlert

const Presensi = () => {
    const [presensiData, setPresensiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalItems, setTotalItems] = useState(0);

    const queryParams = {
        companyGuid: "COMPANY-9a01d431-dfe6-48c2-ae5a-6d0177fd2e19-2024",
        type: "presensi",
        page: currentPage,
        limit: itemsPerPage,
    };

    useEffect(() => {
        const fetchPresensiData = async () => {
            const loadingSwal = Swal.fire({
                title: 'Memuat data...',
                didOpen: () => {
                    Swal.showLoading();
                },
                allowOutsideClick: false,
            });

            try {
                const response = await getPetugasReports(queryParams);

                if (response && response.success && response.data) {
                    setPresensiData(response.data.data || []);
                    setTotalItems(response.data.totalItems || 0);
                } else {
                    Swal.fire('Error', 'Data presensi tidak ditemukan atau respons gagal.', 'error');
                }
            } catch (error) {
                console.error('Error fetching presensi:', error);
                Swal.fire('Error', 'Gagal mengambil data presensi.', 'error');
            } finally {
                setLoading(false);
                loadingSwal.close();
            }
        };

        fetchPresensiData();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(totalItems / itemsPerPage)) {
            setCurrentPage(newPage);
        }
    };

    const handleAdd = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleAddPresensiSubmit = async (newPresensi) => {
        try {
            const response = await addReport(newPresensi);
            if (response && response.success) {
                setPresensiData((prevData) => [...prevData, response.data]);
                Swal.fire('Success', 'Presensi berhasil ditambahkan!', 'success');
            } else {
                Swal.fire('Error', response.message || 'Gagal menambahkan presensi.', 'error');
            }
        } catch (error) {
            console.error('Error saat menambahkan presensi:', error);
            Swal.fire('Error', 'Terjadi kesalahan saat menambahkan presensi.', 'error');
        }
    };

    const handleEdit = (id) => {
        // Implement the edit functionality here
        console.log("Edit presensi with ID:", id);
    };

    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
        });

        if (confirmDelete.isConfirmed) {
            try {
                const response = await deleteReport(id); // Call delete report API
                if (response && response.success) {
                    setPresensiData((prevData) => prevData.filter(item => item._id !== id));
                    Swal.fire('Deleted!', 'Laporan telah dihapus.', 'success');
                } else {
                    Swal.fire('Error', response.message || 'Gagal menghapus laporan.', 'error');
                }
            } catch (error) {
                console.error('Error saat menghapus laporan:', error);
                Swal.fire('Error', 'Terjadi kesalahan saat menghapus laporan.', 'error');
            }
        }
    };

    if (loading) {
        return null; // Do not render anything while loading
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800">
            <Navbar />
            <main className="flex-1 p-6">
                <div className="bg-gray-800 shadow-2xl rounded-lg">
                    <div className="flex justify-between items-center p-6 bg-gray-800 rounded-t-lg">
                        <h1 className="text-4xl font-extrabold text-yellow-400">Presensi</h1>
                        <button
                            onClick={handleAdd}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
                        >
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Add
                        </button>
                    </div>

                    <div className="px-6 mb-4 flex justify-between">
                        <input
                            type="text"
                            placeholder="Cari berdasarkan nama reporter..."
                            className="w-2/3 px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                                {presensiData.length > 0 ? (
                                    presensiData.map((item, index) => (
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
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-500' : 'bg-yellow-500 hover:bg-yellow-600'} text-white rounded`}
                            >
                                Previous
                            </button>
                            <span className="self-center text-yellow-400">{`Halaman ${currentPage} dari ${Math.ceil(totalItems / itemsPerPage)}`}</span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)}
                                className={`px-4 py-2 ${currentPage >= Math.ceil(totalItems / itemsPerPage) ? 'bg-gray-500' : 'bg-yellow-500 hover:bg-yellow-600'} text-white rounded`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <AddPresensiModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleAddPresensiSubmit}
            />
        </div>
    );
};

export default Presensi;
