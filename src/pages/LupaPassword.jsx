import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { forgotPassword } from "../services/apiservice"; // Import the API service
import Swal from "sweetalert2"; // Import SweetAlert

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email); // Call the API service
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: `Link reset password telah dikirim ke ${email}`,
                timer: 2000,
                timerProgressBar: true,
                willClose: () => {
                    navigate("/"); // Redirect to login page after closing the alert
                },
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gagal mengirim link reset, silakan coba lagi.",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 flex flex-col justify-center py-6 sm:py-12">
            <div className="relative py-6 sm:max-w-lg sm:mx-auto">
                <div className="relative px-6 py-12 bg-gradient-to-r from-gray-900 to-black border border-gray-700 shadow-lg sm:rounded-3xl sm:p-12">
                    <h1 className="text-3xl font-bold text-center text-yellow-400 mb-8">
                        Lupa Password
                    </h1>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-200"
                            >
                                Masukkan Email Anda
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="w-full px-4 py-3 text-gray-100 bg-gray-800 border border-gray-600 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                                placeholder="name@company.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200"
                        >
                            Kirim Link Reset
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <a
                            href="/"
                            className="text-sm text-yellow-400 hover:underline"
                        >
                            Kembali ke Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
