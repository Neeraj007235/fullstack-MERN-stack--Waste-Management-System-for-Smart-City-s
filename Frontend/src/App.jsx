import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage';
import CreateBinPage from './pages/CreateBinPage';
import UpdateBinPage from './pages/UpdateBinPage';
import AddDriverPage from './pages/AddDriverPage';
import ViewDriverPage from './pages/ViewDriverPage';
import ViewComplaintsPage from './pages/ViewComplaintsPage';
import ViewReportPage from './pages/ViewReportPage';
import UserDetailPage from './pages/UserDetailPage';

import AdminLoginPage from './pages/AdminLoginPage';
import UserLoginPage from './pages/UserLoginPage';
import SignUpPage from './pages/SignUpPage';
import DriverLoginPage from './pages/DriverLoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from "./pages/ResetPasswordPage"

import UserPage from './pages/UserPage';
import UserProfilePage from './pages/UserProfilePage';
import NewComplaintPage from './pages/NewComplaintPage';
import MyComplaintPage from './pages/MyComplaintPage';
import DriverPage from './pages/DriverPage';
import WorkPage from './pages/WorkPage';

import { useAuth } from './context/AuthProvider';
import { useBio } from './context/BioProvider';
import { useAdmin } from './context/AdminProvider';

const App = () => {

  const [authUser, setAuthUser] = useAuth();
  const [BioDriver, setBioDriver] = useBio();
  const [Admin, setAdmin] = useAdmin();


  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Login Routes */}
        <Route path="/user_login" element={!authUser ? <UserLoginPage /> : <Navigate to="/userpage" />} />
        <Route path="/driver_login" element={!BioDriver ? <DriverLoginPage /> : <Navigate to="/driverpage" />} />
        <Route path="/admin_login" element={!Admin ? <AdminLoginPage /> : <Navigate to="/adminpage" />} />
        <Route path="/register" element={!authUser ? <SignUpPage /> : <Navigate to="/userpage" />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Admin section */}
        <Route path="/adminpage" element={Admin ? <AdminPage /> : <Navigate to="/admin_login" />} />
        <Route path="/createbin" element={Admin ? <CreateBinPage /> : <Navigate to="/admin_login" />} />
        <Route path="/updatebin" element={Admin ? <UpdateBinPage /> : <Navigate to="/admin_login" />} />
        <Route path="/adddriver" element={Admin ? <AddDriverPage /> : <Navigate to="/admin_login" />} />
        <Route path="/viewdrivers" element={Admin ? <ViewDriverPage /> : <Navigate to="/admin_login" />} />
        <Route path="/viewcomplaints" element={Admin ? <ViewComplaintsPage /> : <Navigate to="/admin_login" />} />
        <Route path="/viewworkreport" element={Admin ? <ViewReportPage /> : <Navigate to="/admin_login" />} />
        <Route path="/userdetails" element={Admin ? <UserDetailPage /> : <Navigate to="/admin_login" />} />

        {/* User section */}
        <Route path="/userpage" element={authUser ? <UserPage /> : <Navigate to="/user_login" />} />
        <Route path="/myprofile" element={authUser ? <UserProfilePage /> : <Navigate to="/user_login" />} />
        <Route path="/new_complaint" element={authUser ? <NewComplaintPage /> : <Navigate to="/user_login" />} />
        <Route path="/my_complaint" element={authUser ? <MyComplaintPage /> : <Navigate to="/user_login" />} />

        {/* Driver section */}
        <Route path="/driverpage" element={BioDriver ? <DriverPage /> : <Navigate to="/driver_login" />} />
        <Route path="/work" element={BioDriver ? <WorkPage /> : <Navigate to="/driver_login" />} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
