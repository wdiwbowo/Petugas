import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    console.log('User logged out successfully. Token removed.');
    
    navigate("/login");
  };
  

  return (
    <nav className="bg-gradient-to-b from-black via-gray-900 to-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* Logo can be added here */}
            </div>
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-yellow-400 hover:bg-yellow-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${mobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className={`${mobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop navigation links */}
          <div className="flex-1 flex items-center justify-end sm:justify-start">
            <div className="hidden sm:flex space-x-4">
              <Link
                to="/laporan"
                className="rounded-md px-3 py-2 text-sm font-medium text-yellow-300 hover:bg-yellow-600 hover:text-gray-900"
              >
                Laporan
              </Link>
              <Link
                to="/presensi"
                className="rounded-md px-3 py-2 text-sm font-medium text-yellow-300 hover:bg-yellow-600 hover:text-gray-900"
              >
                Presensi
              </Link>
              <Link
                to="/profile"
                className="rounded-md px-3 py-2 text-sm font-medium text-yellow-300 hover:bg-yellow-600 hover:text-gray-900"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-md px-3 py-2 text-sm font-medium text-yellow-300 hover:bg-yellow-600 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar menu */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-black via-gray-900 to-gray-800 z-40 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } sm:hidden`}
        id="mobile-menu"
      >
        <div className="relative flex flex-col items-start pt-10 px-4 space-y-4">
          <button
            type="button"
            className="absolute top-4 right-4 p-2 text-yellow-400 hover:text-yellow-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <Link
            to="/laporan"
            className="block w-full text-left text-yellow-300 text-lg font-medium py-4 px-2 hover:bg-yellow-600 transition duration-200"
          >
            Laporan
          </Link>
          <Link
            to="/presensi"
            className="block w-full text-left text-yellow-300 text-lg font-medium py-4 px-2 hover:bg-yellow-600 transition duration-200"
          >
            Presensi
          </Link>
          <Link
            to="/profile"
            className="block w-full text-left text-yellow-300 text-lg font-medium py-4 px-2 hover:bg-yellow-600 transition duration-200"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left text-yellow-300 text-lg font-medium py-4 px-2 hover:bg-yellow-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
