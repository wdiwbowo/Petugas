import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/apiservice"; // Adjust the import path as necessary
import Swal from 'sweetalert2';

export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (event) => {
        event.preventDefault();
        setErrorMessage('');
    
        if (email === "" || password === "") {
            setErrorMessage('Email dan password harus diisi.');
            return;
        }
    
        try {
            const response = await login(email, password);
            if (response.data.success) {
                localStorage.setItem('appToken', response.data.data.appToken);
                localStorage.setItem('userToken', response.data.data.userToken);
                if (keepLoggedIn) {
                    localStorage.setItem('keepLoggedIn', 'true');
                }
    
                // Tampilkan pesan sukses menggunakan SweetAlert2
                Swal.fire({
                    title: 'Login Berhasil!',
                    text: 'Anda akan dialihkan ke halaman laporan.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate("/laporan");
                });
            } else {
                // Tampilkan pesan gagal
                Swal.fire({
                    title: 'Login Gagal',
                    text: 'Periksa kembali kredensial Anda.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            let errorMessage = 'Terjadi kesalahan. Silakan coba lagi.';
            if (error.response) {
                errorMessage = error.response.data.message || 'Login gagal. Silakan coba lagi.';
            } else if (error.request) {
                errorMessage = 'Tidak ada respons dari server. Silakan coba lagi nanti.';
            }
    
            // Tampilkan pesan error menggunakan SweetAlert2
            Swal.fire({
                title: 'Error',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center py-6 sm:py-12">
            <div className="w-full max-w-md px-6 py-10 bg-black border border-gray-700 rounded-2xl shadow-xl">
                <h1 className="text-3xl font-extrabold text-center text-yellow-400 mb-8">
                    LOGIN
                </h1>
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 text-gray-100 bg-gray-800 border border-gray-700 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                className="w-full px-4 py-2 text-gray-100 bg-gray-800 border border-gray-700 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                                {passwordVisible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12a9 9 0 0118 0 9 9 0 01-18 0zm9 4.5v-5m0 0a2.5 2.5 0 015 0v5m-5 0h5" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3a9 9 0 00-9 9 9 9 0 0018 0 9 9 0 00-9-9zM12 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="keepLoggedIn"
                            className="mr-2"
                            checked={keepLoggedIn}
                            onChange={(e) => setKeepLoggedIn(e.target.checked)}
                        />
                        <label htmlFor="keepLoggedIn" className="text-sm text-gray-300">Keep me logged in</label>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 text-black bg-yellow-400 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200"
                    >
                        Login
                    </button>
                </form>

                {errorMessage && (
                    <div className="mt-4 text-center text-red-500">
                        {errorMessage}
                    </div>
                )}

                <div className="text-center mt-4">
                    <a href="/lupaPassword" className="text-sm text-yellow-400 hover:underline">Lupa kata sandi?</a>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-300">
                        Belum punya akun?{" "}
                        <a href="/register" className="text-yellow-400 hover:underline font-semibold">Buat akun baru</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
