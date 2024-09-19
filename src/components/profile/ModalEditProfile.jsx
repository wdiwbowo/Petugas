import React, { useState } from 'react';
import { updateUserProfile } from '../../services/apiservice';

export default function ModalEditProfile({ isOpen, onClose, user, onUpdate }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [loading, setLoading] = useState(false); // Loading state for API call

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true during the API call
    try {
      const updatedUser = await updateUserProfile({ name, phoneNumber: phone, address });
      onUpdate(updatedUser); // Call the onUpdate prop with updated user data
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to update profile:", error.response ? error.response.data : error.message);
      // Optionally, show an error message to the user
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Profil</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nama</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full px-3 py-2"
              readOnly // Email tidak dapat diedit
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Telepon</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Alamat</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
              disabled={loading} // Disable button during loading
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
