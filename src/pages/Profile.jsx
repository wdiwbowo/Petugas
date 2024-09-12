import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid'; // Pastikan Heroicons diinstall
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Main St, Hometown, USA",
    profileImage: "https://via.placeholder.com/150" // Ganti dengan URL gambar profil sebenarnya
  });

  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleEditProfile = () => {
    // Logic untuk mengedit profil
  };

  const handleUpdatePassword = () => {
    // Logic untuk memperbarui password
  };

  const handleContinue = () => {
    navigate('/laporan'); // Arahkan ke halaman laporan
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 flex items-center justify-center">
      <div className="relative w-full max-w-lg mx-auto px-6 py-10 bg-gradient-to-r from-gray-900 to-black border border-gray-700 shadow-lg sm:rounded-3xl sm:p-8">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-8">
          Profil Pengguna
        </h1>
        <div className="flex flex-col items-center text-center">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
          <h2 className="text-2xl font-semibold text-gray-100 mb-2">
            {user.name}
          </h2>
          <p className="text-gray-300 mb-4">{user.email}</p>
          <p className="text-gray-300 mb-4">{user.phone}</p>
          <p className="text-gray-300 mb-6">{user.address}</p>
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleEditProfile}
              className="bg-yellow-400 text-black py-2 px-4 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200"
            >
              Edit Profil
            </button>
            <button
              onClick={handleUpdatePassword}
              className="bg-yellow-400 text-black py-2 px-4 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200"
            >
              Update Password
            </button>
          </div>
          <button
            onClick={handleContinue}
            className="flex items-center justify-center bg-yellow-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-600 transition duration-200"
          >
            Lanjut
            <ChevronRightIcon className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
