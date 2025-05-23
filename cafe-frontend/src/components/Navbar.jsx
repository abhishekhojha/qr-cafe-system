import { Link, useLocation } from "react-router-dom";
import { Coffee, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils"; 

const NavBar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "Customer" },
    { to: "/kitchen", label: "Kitchen" },
    { to: "/admin", label: "Admin" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="backdrop-blur bg-white/70 border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo / Branding */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-700">
          <Coffee className="h-6 w-6 text-blue-600" />
          <span>CaféDash</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4 items-center">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "px-4 py-2 rounded-xl font-medium transition-all duration-200 text-sm",
                isActive(to)
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-6 h-6 text-blue-700" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm">
          <div className="absolute right-0 top-0 w-3/4 max-w-xs bg-white h-full shadow-lg px-6 py-4 flex flex-col gap-4 animate-slide-in">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-blue-700">Menu</span>
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-5 h-5 text-blue-700" />
              </button>
            </div>
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition",
                  isActive(to)
                    ? "bg-blue-600 text-white"
                    : "text-blue-600 hover:bg-blue-100"
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
