import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LupaPassword from "./pages/LupaPassword";
import Profile from "./pages/Profile";
import Laporan from "./pages/Laporan";
import Presensi from "./pages/Presensi";
import ActivateAccountForm from "./pages/ActivateAccountForm";

export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/lupaPassword', element: <LupaPassword /> },
    { path: '/profile', element: <Profile /> },
    { path: '/laporan', element: <Laporan /> },
    { path: '/presensi', element: <Presensi /> },
    { path: '/activateAccountForm', element: <ActivateAccountForm /> },
])