import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const PrivateRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* You can add a Footer component here if needed */}
    </div>
  );
};

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add other private routes here */}
          </Route>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
