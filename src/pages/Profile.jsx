import React, { useState, useEffect } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile, updatePassword } from '../services/apiservice';
import ModalEditProfile from '../components/profile/ModalEditProfile';
import ModalUpdatePassword from '../components/profile/ModalUpdatePassword'; // Import the password modal

export default function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profileImage: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // State for password modal
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setUser({
          name: userProfile.data.user.name || "Unknown",
          email: userProfile.data.user.email || "Email not available",
          phone: userProfile.data.user.phoneNumber || "Phone number not available",
          address: userProfile.data.user.address || "Address not available",
          profileImage: userProfile.data.profileImage || "https://via.placeholder.com/150",
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUpdateProfile = async (updatedUser) => {
    try {
      const response = await updateUserProfile({
        name: updatedUser.name,
        phoneNumber: updatedUser.phoneNumber,
        address: updatedUser.address
      });
      setUser((prevUser) => ({
        ...prevUser,
        name: response.name,
        phone: response.phoneNumber,
        address: response.address,
      }));

      // Show success message
      setShowSuccessMessage(true);

      // Reload page after 2 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
        window.location.reload();
      }, 2000);

      handleModalClose();
    } catch (error) {
      console.error("Failed to update profile:", error.response ? error.response.data : error.message);
    }
  };

  const handleUpdatePassword = async (currentPassword, newPassword) => {
    try {
      const response = await updatePassword(user.email, currentPassword, newPassword);
      return response; // Return the response for handling in the modal
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const handleContinue = () => {
    navigate('/laporan');
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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 flex items-center justify-center">
      <div className="relative w-full max-w-lg mx-auto px-6 py-10 bg-gradient-to-r from-gray-900 to-black border border-gray-700 shadow-lg sm:rounded-3xl sm:p-8">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-8">Profil Pengguna</h1>
        <div className="flex flex-col items-center text-center">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
          <h2 className="text-2xl font-semibold text-gray-100 mb-2">{user.name}</h2>
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
              onClick={() => setIsPasswordModalOpen(true)} // Open password modal
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

        {/* Success message */}
        {showSuccessMessage && (
          <div className="mt-4 text-green-500 text-center">
            Profil berhasil diperbarui!
          </div>
        )}
      </div>
      {isModalOpen && (
        <ModalEditProfile
          isOpen={isModalOpen}
          onClose={handleModalClose}
          user={user}
          onUpdate={handleUpdateProfile}
        />
      )}
      {isPasswordModalOpen && (
        <ModalUpdatePassword
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          onUpdate={handleUpdatePassword} // Pass the update password function
        />
      )}
    </div>
  );
}
