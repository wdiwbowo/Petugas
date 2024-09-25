import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LupaPassword from "./pages/LupaPassword";
import Profile from "./pages/Profile";
import Laporan from "./pages/Laporan";
import Presensi from "./pages/Presensi";
import ActivateAccountForm from "./pages/ActivateAccountForm";
import PrivateRoute from "./components/PrivateRoute";

// Gantilah dengan logika autentikasi yang sesuai
const isAuthenticated = !!localStorage.getItem('userToken'); // Contoh menggunakan token di localStorage

export const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/lupaPassword', element: <LupaPassword /> },
    { path: '/activateAccountForm', element: <ActivateAccountForm /> },

    {
        path: '/profile',
        element: <PrivateRoute element={<Profile />} isAuthenticated={isAuthenticated} />
    },
    {
        path: '/laporan',
        element: <PrivateRoute element={<Laporan />} isAuthenticated={isAuthenticated} />
    },
    {
        path: '/presensi'
        , element: <PrivateRoute element={<Presensi />} isAuthenticated={isAuthenticated} />
    },
]);
