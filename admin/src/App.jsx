import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$';

function ProtectedRoute({ children, token }) {
  // If token is not found, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === '' ? (
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <SideBar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                {/* Protected Routes */}
                <Route
                  path="/add"
                  element={
                    <ProtectedRoute token={token}>
                      <Add token={token} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/list"
                  element={
                    <ProtectedRoute token={token}>
                      <List token={token} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute token={token}>
                      <Orders token={token} />
                    </ProtectedRoute>
                  }
                />
                {/* Default Route */}
                <Route path="*" element={<Navigate to="/add" replace />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
