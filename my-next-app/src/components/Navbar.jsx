// ...existing code...
'use client'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import UserProfileMenu from './UserProfileMenu';


export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const items = [
        {name: "Tech Skill Analayzer", url: "/" },
        {name: "Home", url: "/" },
        // {name: "About", url: "/products" },
        {name: "Recommended", url: "/recommended" },
        {name: "Saved Plan", url: "/saved" },
    ];

    const primary = items[0]; // right side
    const others = items.slice(1); // left side

    const [active, setActive] = useState(null);

    useEffect(() => {
        // load previously clicked item so highlight persists across navigations
        const saved = typeof window !== 'undefined' ? localStorage.getItem('nav-active') : null;
        if (saved) setActive(saved);
    }, []);

    const handleClick = (name) => {
        setActive(name);
        try { localStorage.setItem('nav-active', name); } catch {}
    };

    const linkClass = (name) =>
        `${active === name ? 'text-blue-400' : 'text-white'} hover:text-gray-300 font-semibold`;

    return (
        <div>
            <nav className="bg-gray-800 py-6 px-6 rounded-lg">
                <div className="flex items-center justify-between">
                        <ul className="flex-space-x-6">
                            <li>
                                <Link
                                    href={primary.url}
                                    onClick={() => handleClick(primary.name)}
                                    className={linkClass(primary.name)}
                                >
                                    {primary.name}
                                </Link>
                            </li>
                        </ul>

                    <div className="flex items-center space-x-4">
                        <ul className="flex space-x-6 items-center">
                            {others.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.url}
                                        onClick={() => handleClick(item.name)}
                                        className={linkClass(item.name)}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}

                            {/* Keep Sign Up / Sign In buttons if still needed */}
                            <li>
                                <Link
                                    href="/signup"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 font-semibold"
                                >
                                    Sign Up
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/signin"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 font-semibold"
                                >
                                    Sign In
                                </Link>
                            </li>

                            {/* User Profile Dropdown */}
                            <UserProfileMenu />
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
// ...existing code...