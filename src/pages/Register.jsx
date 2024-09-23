import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { register, getAllCompanies } from '../services/apiservice';

export default function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [deviceData, setDeviceData] = useState({ companyGuid: '' });
    const [companies, setCompanies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const companyList = await getAllCompanies();
                setCompanies(companyList);
            } catch (error) {
                console.error('Failed to fetch companies:', error);
                setErrorMessage('Gagal memuat data perusahaan.');
            }
        };

        fetchCompanies();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDeviceData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        if (!termsAccepted) {
            alert('Anda harus menyetujui syarat dan ketentuan.');
            return;
        }

        const formData = new FormData(event.target);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
            phoneNumber: formData.get('phone'),
            name: formData.get('fullName'),
            guidAplication: 'PROJECT-fc2ded7c-d7fe-4945-8c49-e6528d2f075f-2024',
            role: 'warga',
            companyGuid: deviceData.companyGuid,
        };

        try {
            const response = await register(data);
            if (response.data && response.data.success) {
                setSuccessMessage('Registrasi berhasil! OTP akan dikirim ke email Anda.');
                setTimeout(() => {
                    navigate('/activateaccountform');
                }, 3000);
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
        <div className="h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800">
            <div className="relative max-w-md w-full px-4 py-10 bg-gradient-to-r from-gray-900 to-black border border-gray-700 shadow-lg rounded-3xl">
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
                    {/* Institution select input */}
                    <div>
                        <label htmlFor="institution" className="block mb-2 text-sm font-medium text-gray-200">
                            Asal Instansi
                        </label>
                        <select
                            name="companyGuid"
                            value={deviceData.companyGuid}
                            onChange={handleChange}
                            className="mt-1 block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm overflow-hidden"
                            style={{ maxWidth: '100%' }} // Menambahkan style langsung untuk memastikan lebar tidak lebih dari layar
                        >
                            <option value="">Select company</option>
                            {companies.map(company => (
                                <option key={company.guid} value={company.guid}>
                                    {company.name}
                                </option>
                            ))}
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
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
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
    );
}
