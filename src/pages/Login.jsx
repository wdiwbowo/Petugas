import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/apiservice"; // Adjust the import path as necessary

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
            console.log(response.data.success)
            if (response.data.success) {
                // const userProfile = {
                //     name: response.data.data.name,
                //     email: response.data.data.email,
                //     phoneNumber: response.data.data.phoneNumber,
                //     role: response.data.data.role,
                // };
                // console.log(response.data.data.appToken)
                // console.log(response.data.data.userToken)
                localStorage.setItem('appToken', response.data.data.appToken); // Ensure correct key
                localStorage.setItem('userToken', response.data.data.userToken);
                if (keepLoggedIn) {
                    localStorage.setItem('keepLoggedIn', 'true');
                }
                navigate("/profile");
            } else {
    
                setErrorMessage('Login gagal. Periksa kembali kredensial Anda.');
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Login gagal. Silakan coba lagi.');
            } else if (error.request) {
                setErrorMessage('Tidak ada respons dari server. Silakan coba lagi nanti.');
            } else {
                setErrorMessage('Terjadi kesalahan. Silakan coba lagi.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 flex flex-col justify-center py-6 sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-gradient-to-r from-gray-900 to-black border border-gray-700 shadow-lg sm:rounded-3xl sm:p-20">
                    <h1 className="text-3xl font-extrabold text-center text-yellow-400 mb-8">
                        LOGIN
                    </h1>
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-200"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="w-full px-4 py-2 text-gray-100 bg-gray-800 border border-gray-600 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                                placeholder="name@company.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-200"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2 text-gray-100 bg-gray-800 border border-gray-600 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="keepLoggedIn"
                                className="mr-2"
                                checked={keepLoggedIn}
                                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                            />
                            <label htmlFor="keepLoggedIn" className="text-sm text-gray-200">Keep me logged in</label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200"
                        >
                            Login
                        </button>
                    </form>

                    {/* Display error message if there is one */}
                    {errorMessage && (
                        <div className="text-center text-red-500 mt-4">
                            {errorMessage}
                        </div>
                    )}

                    {/* Tombol Lupa Password */}
                    <div className="text-center mt-4">
                        <a
                            href="/lupaPassword"
                            className="text-sm text-yellow-400 font-semibold hover:underline"
                        >
                            Lupa kata sandi?
                        </a>
                    </div>

                    {/* Tombol Register */}
                    <div className="flex justify-between items-center mt-8">
                        <p className="text-sm text-gray-400">
                            Belum punya akun?
                        </p>
                        <a
                            href="/register"
                            className="text-sm text-yellow-400 font-semibold hover:underline"
                        >
                            Buat akun baru
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
