import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// ** Import Pages **
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import CreateBinPage from './pages/CreateBinPage';
import UpdateBinPage from './pages/UpdateBinPage';
import AddDriverPage from './pages/AddDriverPage';
import ViewDriverPage from './pages/ViewDriverPage';
import ViewComplaintsPage from './pages/ViewComplaintsPage';
import ViewReportPage from './pages/ViewReportPage';
import UserDetailPage from './pages/UserDetailPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import UserPage from './pages/UserPage';
import UserProfilePage from './pages/UserProfilePage';
import NewComplaintPage from './pages/NewComplaintPage';
import MyComplaintPage from './pages/MyComplaintPage';
import DriverPage from './pages/DriverPage';
import WorkPage from './pages/WorkPage';


// ** Auth & Context**
import { useAuth } from './context/AuthProvider';
import { useBio } from './context/BioProvider';
import { useAdmin } from './context/AdminProvider';

const App = () => {
  const [authUser, setAuthUser] = useAuth();
  const [BioDriver, setBioDriver] = useBio();
  const [Admin, setAdmin] = useAdmin();

  // ** Redirect to Login if Not Authenticated **
  const requireAuth = (user, loginPage, navigateTo) => {
    return user ? <Navigate to={navigateTo} /> : <LoginPage {...loginPage} />;
  };

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        
        {/* Login Routes */}
        <Route path="/user_login" element={requireAuth(authUser, { userType: 'User', setUser: setAuthUser, loginUrl: '/users/login', showAdditionalLinks: true }, '/userpage')} />
        <Route path="/driver_login" element={requireAuth(BioDriver, { userType: 'Driver', setUser: setBioDriver, loginUrl: '/drivers/login', showAdditionalLinks: false }, '/driverpage')} />
        <Route path="/admin_login" element={requireAuth(Admin, { userType: 'Admin', setUser: setAdmin, loginUrl: '/admins/login', showAdditionalLinks: false }, '/adminpage')} />
        
        {/* Authenticated Routes */}
        <Route path="/register" element={authUser ? <Navigate to="/userpage" /> : <SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Admin Routes */}
        <Route path="/adminpage" element={Admin ? <AdminPage /> : <Navigate to="/admin_login" />} />
        <Route path="/createbin" element={Admin ? <CreateBinPage /> : <Navigate to="/admin_login" />} />
        <Route path="/updatebin" element={Admin ? <UpdateBinPage /> : <Navigate to="/admin_login" />} />
        <Route path="/adddriver" element={Admin ? <AddDriverPage /> : <Navigate to="/admin_login" />} />
        <Route path="/viewdrivers" element={Admin ? <ViewDriverPage /> : <Navigate to="/admin_login" />} />
        <Route path="/viewcomplaints" element={Admin ? <ViewComplaintsPage /> : <Navigate to="/admin_login" />} />
        <Route path="/viewworkreport" element={Admin ? <ViewReportPage /> : <Navigate to="/admin_login" />} />
        <Route path="/userdetails" element={Admin ? <UserDetailPage /> : <Navigate to="/admin_login" />} />

        {/* User Routes */}
        <Route path="/userpage" element={authUser ? <UserPage /> : <Navigate to="/user_login" />} />
        <Route path="/myprofile" element={authUser ? <UserProfilePage /> : <Navigate to="/user_login" />} />
        <Route path="/new_complaint" element={authUser ? <NewComplaintPage /> : <Navigate to="/user_login" />} />
        <Route path="/my_complaint" element={authUser ? <MyComplaintPage /> : <Navigate to="/user_login" />} />

        {/* Driver Routes */}
        <Route path="/driverpage" element={BioDriver ? <DriverPage /> : <Navigate to="/driver_login" />} />
        <Route path="/work" element={BioDriver ? <WorkPage /> : <Navigate to="/driver_login" />} />
      </Routes>
      
      <Toaster />
    </>
  );
};

export default App;
