import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/common/PrivateRoute";
import ClientScreen from "./pages/ClientScreen";
import SignInScreen from "./pages/SignInScreen";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/signin" element={<SignInScreen />} />
          
          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/clients" element={<ClientScreen />} />
            {/* Add other protected routes here */}
          </Route>
          
          {/* Redirect root to appropriate page */}
          <Route path="/" element={<Navigate replace to="/clients" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;