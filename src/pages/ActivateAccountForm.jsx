import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { activateAccount } from '../services/apiservice'; // Sesuaikan path
import Swal from 'sweetalert2'; // Import SweetAlert

const ActivateAccount = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleActivate = async () => {
    try {
      const result = await activateAccount(email, otp);
      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Akun Anda sudah aktif!',
          text: 'Mengarahkan ke halaman login...',
          timer: 2000,
          timerProgressBar: true,
          willClose: () => {
            navigate('/'); // Redirect ke halaman login setelah 2 detik
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Cek OTP Anda.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Terjadi kesalahan!',
        text: 'Coba lagi.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 flex items-center justify-center py-6 sm:py-12 overflow-hidden">
      <div className="relative py-3 sm:max-w-md sm:mx-auto">
        <div className="relative px-4 py-10 bg-gradient-to-r from-gray-900 to-black border border-gray-700 shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-extrabold text-center text-yellow-400 mb-6">
            Aktivasi Akun
          </h1>
          <p className="text-center text-gray-300 mb-6">
            Masukkan OTP untuk mengaktifkan akun Anda.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); handleActivate(); }} className="space-y-6">
            <div className="relative">
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-200">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="block w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 focus:ring-yellow-400 focus:border-yellow-400 peer"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="otp" className="block mb-1 text-sm font-medium text-gray-200">
                Otp
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Otp"
                className="block w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 focus:ring-yellow-400 focus:border-yellow-400 peer"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Aktivasi Akun
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActivateAccount;
