import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Star,
  TrendingUp,
  DollarSign,
  Headphones,
  Store,
  Settings,
  LogOut,
  Lock
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  
   const userRole = localStorage.getItem("userRole")  ;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userRole");
    navigate("/");
  };

   const allMenuItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["super_admin", "admin", "order_manager", "support", "inventory_manager", "finance_manager"] },
    { path: "/product-management", label: "Products", icon: ShoppingBag, roles: ["super_admin", "admin", "inventory_manager"] },
    { path: "/orders", label: "Orders", icon: Package, roles: ["super_admin", "admin", "order_manager", "support"] },
    { path: "/user-management", label: "Customers", icon: Users, roles: ["super_admin", "admin", "support"] },
    { path: "/reviews", label: "Reviews", icon: Star, roles: ["super_admin", "admin", "support"] },
     { path: "/transactions", label: "Transactions", icon: DollarSign, roles: ["super_admin", "admin", "finance_manager"] },
    { path: "/support", label: "Support", icon: Headphones, roles: ["super_admin", "admin", "support"] },
    { path: "/vendors", label: "Vendors", icon: Store, roles: ["super_admin", "admin"] },
    {path:"/change-password", label:"Change password", icon: Lock, roles:["super_admin", "admin"],},
    { path: "/settings", label: "Settings", icon: Settings, roles: ["super_admin"] },
  ];

   const menuItems = allMenuItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className="w-64 bg-white shadow-lg h-screen overflow-y-auto flex flex-col">
      <div className="p-6 flex-1">
        <div className="text-xl font-bold border-b pb-4 mb-4">Admin Panel</div>
        
         <div className="text-xs text-gray-500 mb-4 px-3">
          Role: <span className="font-semibold capitalize">{userRole.replace('_', ' ')}</span>
        </div>

        <nav className="flex flex-col gap-1 text-gray-700">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={`/app${item.path}`}
                className="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-100 text-lg"
              >
                <Icon size={18} /> {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-100 text-red-600"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;