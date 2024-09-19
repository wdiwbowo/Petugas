import React, { useState, useEffect } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid'; // Ensure Heroicons is installed
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/apiservice'; // Import the getUserProfile function

export default function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profileImage: ''
  });
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage error state

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile(); // Fetch user profile from API
        setUser({
          name: userProfile.data.user.name || "Unknown",  // Add fallback values
          email: userProfile.data.user.email || "Email not available",
          phone: userProfile.data.user.phoneNumber || "Phone number not available",
          address: userProfile.data.user.address || "Address not available",
          profileImage: userProfile.profileImage || "https://via.placeholder.com/150", // Fallback image
        });
      } catch (error) {
        setError(error.message); // Handle any errors
      } finally {
        setLoading(false); // Stop loading after the request
      }
    };

    fetchUserProfile(); // Fetch data on component mount
  }, []);

  const handleEditProfile = () => {
    // Logic to handle profile edit
  };

  const handleUpdatePassword = () => {
    // Logic to handle password update
  };

  const handleContinue = () => {
    navigate('/laporan'); // Navigate to laporan page
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading while data is being fetched
  }

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
