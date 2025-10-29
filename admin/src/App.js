import { Routes, Route } from "react-router-dom";
import AdminLogin from "./Page/Login";
import DashboardLayout from "./Components/Dashboard/DashboardLayout";
import Dashboard from "./Components/Dashboard/Dashboard";
import UserManagement from "./Page/UserManagement";
import ProductManagement from "./Page/ProductsManagement";
import ChangePasswordSidebar from "./Page/ChangePassword";

function App() {
  return (
       <Routes>
        {/* Login page */}
        <Route path="/" element={<AdminLogin />} />

        {/* Dashboard layout wrapper */}
        <Route path="/app" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="product-management" element={<ProductManagement />} />
          <Route path="change-password" element={<ChangePasswordSidebar />}/>
        </Route>
      </Routes>
 
  );
}

export default App;
