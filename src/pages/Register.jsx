import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { register } from '../services/apiservice'; // Assuming register also handles OTP sending

export default function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        if (!termsAccepted) {
            alert('Anda harus menyetujui syarat dan ketentuan.');
            return;
        }

        const formData = new FormData(event.target);
        const uniqueCompanyGuid = `COMPANY-${uuidv4()}-2024`;

        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
            phoneNumber: formData.get('phone'),
            name: formData.get('fullName'),
            guidAplication: 'PROJECT-fc2ded7c-d7fe-4945-8c49-e6528d2f075f-2024',
            role: 'warga',
            companyGuid: uniqueCompanyGuid,
        };

        try {
            const response = await register(data);

            if (response.data && response.data.success) {
                setSuccessMessage('Registrasi berhasil! OTP akan dikirim ke email Anda.');

                // OTP sending happens within the same `register` API
                setTimeout(() => {
                    navigate('/activateaccountform');
                }, 3000); // Delay before navigating to OTP page
            } else {
                setErrorMessage(response.data.message || 'Pendaftaran gagal, silakan coba lagi.');
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response dari API:', error.response.data);
                setErrorMessage(error.response.data.message || 'Pendaftaran gagal, silakan coba lagi.');
            } else {
                console.error('Error tanpa respons dari API:', error);
                setErrorMessage('Pendaftaran gagal, silakan coba lagi.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 flex flex-col justify-center py-6 sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-gradient-to-r from-gray-900 to-black border border-gray-700 shadow-lg sm:rounded-3xl sm:p-20">
                    <h1 className="text-3xl font-extrabold text-center text-yellow-400 mb-8">
                        REGISTER
                    </h1>
                    {successMessage && (
                        <div className="text-center text-green-500 mb-4" aria-live="polite">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="text-center text-red-500 mb-4" aria-live="polite">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleRegister}>
                        {/* Institution select input */}
                        <div>
                            <label htmlFor="institution" className="block mb-2 text-sm font-medium text-gray-200">
                                Asal Instansi
                            </label>
                            <select
                                name="institution"
                                id="institution"
                                className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                required
                            >
                                <option value="">Asal Instansi</option>
                                <option value="COMPANY-0a3a303e-7dd0-4246-ad21-d675e77904b4-2024">PT. LSKK</option>
                                <option value="Software Kreatife Indonesia">Software Kreatife Indonesia</option>
                                <option value="PPTIK ITB">PPTIK ITB</option>
                                <option value="PUSTEKHAN ITB">PUSTEKHAN ITB</option>
                                <option value="Universitas Bandar Lampung (UBL)">Universitas Bandar Lampung (UBL)</option>
                                <option value="Institut Teknologi Garut(ITG)">Institut Teknologi Garut(ITG)</option>
                                <option value="Universitas Sangga Buana">Universitas Sangga Buana</option>
                                <option value="Universitas Sriwijaya">Universitas Sriwijaya</option>
                                <option value="FK Universitas Sriwijaya">FK Universitas Sriwijaya</option>
                                <option value="Universitas Widyatama">Universitas Widyatama</option>
                                <option value="FIK Universitas Bandar Lampung">FIK Universitas Bandar Lampung</option>
                                <option value="Telkom Indonesia">Telkom Indonesia</option>
                            </select>
                        </div>

                        {/* Email field */}
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="w-full px-4 py-2 text-gray-100 bg-gray-800 border border-gray-600 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                                placeholder="Email"
                                required
                            />
                        </div>

                        {/* Phone Number field */}
                        <div>
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-200">
                                Nomor Telepon
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                className="w-full px-4 py-2 text-gray-100 bg-gray-800 border border-gray-600 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                                placeholder="Nomor Telepon"
                                required
                            />
                        </div>

                        {/* Full Name field */}
                        <div>
                            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-200">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                className="w-full px-4 py-2 text-gray-100 bg-gray-800 border border-gray-600 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                                placeholder="Nama Lengkap"
                                required
                            />
                        </div>

                        {/* Password field */}
                        <div className="relative">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-200">
                                Password
                            </label>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                name="password"
                                id="password"
                                className="w-full px-4 py-2 text-gray-100 bg-gray-800 border border-gray-600 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="absolute inset-y-12 right-0 flex items-center pr-3"
                            >
                                {/* Password visibility toggle */}
                            </button>
                        </div>

                        {/* Terms and conditions */}
                        <div className="flex items-center mt-4">
                            <input
                                type="checkbox"
                                id="terms"
                                className="w-4 h-4 text-yellow-600 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                            />
                            <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-200">
                                Saya menyetujui <a href="#" className="text-yellow-400 underline">Syarat dan Ketentuan</a>
                            </label>
                        </div>

                        {/* Submit button */}
                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                className="px-6 py-3 text-lg font-medium text-gray-100 bg-yellow-400 rounded-lg hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            >
                                Daftar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
