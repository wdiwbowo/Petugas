import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LupaPassword from "./pages/LupaPassword";
import Profile from "./pages/Profile";
import Laporan from "./pages/Laporan";
import Presensi from "./pages/Presensi";
import ActivateAccountForm from "./pages/ActivateAccountForm";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
    { path: '/', element: <ProtectedRoute element={<Login />} /> },
    { path: '/login', element: <ProtectedRoute element={<Login />} />  },
    { path: '/register', element: <Register />}  ,
    { path: '/lupaPassword', element: <LupaPassword />},
    { path: '/profile', element: <ProtectedRoute element={<Profile />} /> },
    { path: '/laporan', element: <ProtectedRoute element={<Laporan />}/> },
    { path: '/presensi', element: <ProtectedRoute element={<Presensi />} /> },
    { path: '/activateAccountForm', element: <ProtectedRoute element={<ActivateAccountForm />}/> },
])