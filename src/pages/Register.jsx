import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 flex flex-col">
            {/* Konten Tengah */}
            <div className="flex-grow flex items-center justify-center py-6 sm:py-12">
                <div className="relative px-4 py-8 bg-gradient-to-r from-gray-900 to-black border border-gray-700 shadow-lg sm:rounded-3xl sm:p-12 max-w-md w-full">
                    <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
                        REGISTER
                    </h1>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-1 text-sm font-medium text-gray-200"
                                >
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="w-full px-3 py-2 text-gray-100 bg-gray-800 border border-gray-600 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                                    placeholder="Nama Lengkap"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-1 text-sm font-medium text-gray-200"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full px-3 py-2 text-gray-100 bg-gray-800 border border-gray-600 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4">
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-1 text-sm font-medium text-gray-200"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="w-full px-3 py-2 text-gray-100 bg-gray-800 border border-gray-600 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-1 text-sm font-medium text-gray-200"
                                >
                                    Konfirmasi Password
                                </label>
                                <input
                                    type="password"
                                    name="confirm-password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="w-full px-3 py-2 text-gray-100 bg-gray-800 border border-gray-600 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200"
                        >
                            Register
                        </button>
                    </form>
                    <div className="flex justify-between mt-6 text-sm text-gray-400">
                        <p>Sudah punya akun?</p>
                        <a
                            href="/login"
                            className="text-yellow-400 hover:underline"
                        >
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
