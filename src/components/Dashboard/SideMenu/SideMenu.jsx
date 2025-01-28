"use client";

function SideMenu({ activePath, setActivePath }) {

    function updateActivePath(newPath) {
        setActivePath(newPath)
        console.log(newPath)
    }

    return (
        <div className="h-full  bg-gray-800 text-white flex flex-col">
            <div className="header p-4 text-xl font-bold border-b border-gray-700">
                Admin Dashboard
            </div>
            <div className="flex flex-col p-4 space-y-2">
                <a className={`p-2 rounded ${activePath === "/admin/dashboard/overview" ? "bg-blue-500" : "bg-gray-800 hover:bg-gray-700"}`} onClick={() => updateActivePath("/admin/dashboard/overview")} href="/admin/dashboard/overview">
                    Overview
                </a>
                <a className={`p-2 rounded ${activePath === "/admin/dashboard/products" ? "bg-blue-500" : "bg-gray-800 hover:bg-gray-700"}`} onClick={() => updateActivePath("/admin/dashboard/products")} href="/admin/dashboard/products">
                    Products
                </a>
                <a className={`p-2 rounded ${activePath === "/admin/dashboard/client" ? "bg-blue-500" : "bg-gray-800 hover:bg-gray-700"}`} onClick={() => updateActivePath("/admin/dashboard/client")} href="/admin/dashboard/client">
                    Users
                </a>
                <a className={`p-2 rounded ${activePath === "/admin/dashboard/pt_management" ? "bg-blue-500" : "bg-gray-800 hover:bg-gray-700"}`} onClick={() => updateActivePath("/admin/dashboard/pt_management")} href="/admin/dashboard/pt_management">
                    Personal Trainer
                </a>
            </div>
        </div>
    )
}

export default SideMenu