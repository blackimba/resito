import { is } from "date-fns/locale";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SideBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    return(
        <nav className="h-screen w-64 bg-gray-800 text-white p-4 flex flex-col gap-2">
            <div className="mb-8 text-2xl font-bold tracking-wide">Resito</div>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `block px-4 py-2 rounded transition-colors ${
                        isActive ? "bg-blue-600" : "hover:bg-gray-800"
                    }`
                }
            >
                Dashboard
            </NavLink>
            <div>
                <button
                    className="w-full flex items-center justify-between px-4 py-2 rounded hover:bg-gray-700 focus:outline-none"
                    onClick={() => setIsOpen((open) => !open)}
                >
                    <span>Receipts</span>
                    <span>{isOpen ? "▲" : "▼"}</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40" : "max-h-0"}`}>
                    <NavLink
                        to="/receipts/list"
                        className={({ isActive }) =>
                            `block px-8 py-2 rounded transition-colors ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`
                        }
                    >
                        List
                    </NavLink>
                    <NavLink
                        to="/receipts/category"
                        className={({ isActive }) =>
                            `block px-8 py-2 rounded transition-colors ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`
                        }
                    >
                        Category
                    </NavLink>
                </div>
            </div>

        </nav>
    );
}

export default SideBar;