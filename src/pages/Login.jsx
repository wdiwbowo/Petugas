import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulasi proses login (sesuaikan dengan API login Anda)
        if (email === "user@example.com" && password === "password123") {
            // Jika login berhasil, arahkan ke halaman utama
            navigate("/profile");
        } else {
            // Jika login gagal, tampilkan pesan kesalahan
            alert("Email atau password salah!");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 flex flex-col justify-center py-6 sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-gradient-to-r from-gray-900 to-black border border-gray-700 shadow-lg sm:rounded-3xl sm:p-20">
                    <h1 className="text-3xl font-extrabold text-center text-yellow-400 mb-8">
                        LOGIN
                    </h1>
                    <form className="space-y-6" onSubmit={handleSubmit}>
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
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-2 text-gray-100 bg-gray-800 border border-gray-600 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200"
                        >
                            Login
                        </button>
                    </form>

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
