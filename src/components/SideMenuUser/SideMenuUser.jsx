"use client";

import { useUser } from "@/context/UserContext";

function SideMenuUser({ activePath, setActivePath }) {
    const { currentUser } = useUser();

    function updateActivePath(newPath) {
        setActivePath(newPath)
        console.log(newPath)
    }

    if(!currentUser){
        return (<></>)
    }
    return (
        <div className="h-full  bg-gray-800 text-white flex flex-col">
            <div className="header p-4 text-xl font-bold border-b border-gray-700">
                Dashboard
            </div>
            <div className="flex flex-col p-4 space-y-2">
                <a className={`p-2 rounded ${activePath === `/user/dashboard/${currentUser.userId}/overview` ? "bg-blue-500" : "bg-gray-800 hover:bg-gray-700"}`} onClick={() => updateActivePath(`/user/dashboard/${currentUser.userId}/overview`)} href={`/user/dashboard/${currentUser.userId}/overview`}>
                    Overview
                </a>
                <a className={`p-2 rounded ${activePath === `/user/dashboard/${currentUser.userId}/gig_management` ? "bg-blue-500" : "bg-gray-800 hover:bg-gray-700"}`} onClick={() => updateActivePath(`/user/dashboard/${currentUser.userId}/gig_management`)} href={`/user/dashboard/${currentUser.userId}/gig_management`}>
                    Gig Management
                </a>
                <a className={`p-2 rounded ${activePath === `/user/dashboard/${currentUser.userId}/services` ? "bg-blue-500" : "bg-gray-800 hover:bg-gray-700"}`} onClick={() => updateActivePath(`/user/dashboard/${currentUser.userId}/services`)} href={`/user/dashboard/${currentUser.userId}/services`}>
                    Services
                </a>
                <a className={`p-2 rounded ${activePath === `/user/dashboard/${currentUser.userId}/shopping` ? "bg-blue-500" : "bg-gray-800 hover:bg-gray-700"}`} onClick={() => updateActivePath(`/user/dashboard/${currentUser.userId}/shopping`)} href={`/user/dashboard/${currentUser.userId}/shopping`}>
                    Shopping
                </a>
            </div>
        </div>
    )
}

export default SideMenuUser