'use client'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const items = [
        {name: "Tech Skill Analayzer", url: "/" },
        {name: "Home", url: "/" },
        {name: "About Us", url: "/about" },
        {name: "Contact Us", url: "/contact" },
    ];

    const primary = items[0];
    const others = items.slice(1);

    const [active, setActive] = useState(null);
    const [user, setUser] = useState(null);

    const handleProfileClick = () => {
        if (!localStorage.getItem("access")) {
            router.push("/signin");
            return;
        }
        router.push("/profile");
    };

    useEffect(() => {
        const saved = typeof window !== 'undefined'
        ? localStorage.getItem('nav-active') : null;

        if (saved) setActive(saved);
    }, []);

    const handleClick = (name) => {
        setActive(name);
        try { localStorage.setItem('nav-active', name); } catch {}
    };

    const linkClass = (name) =>
    `${active === name ? 'text-blue-400' : 'text-white'} hover:text-gray-300 font-semibold`;

    /* -------- Fetch User Profile -------- */
    useEffect(() => {
        const fetchProfile = async () => {

            try {
                const token = localStorage.getItem("access");

                if (!token) {
                    setUser(null);
                    return;
                }

                const res = await fetch("http://127.0.0.1:8000/api/users/profile/", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } 
                else if (res.status === 401) {
                    // 🔥 FIX: invalid token handle
                    localStorage.removeItem("access");
                    setUser(null);
                } 
                else {
                    console.error("Unexpected error:", res.status);
                }

            } catch (err) {
                console.error("Profile fetch error:", err);
                setUser(null);
            }
        };

        fetchProfile();

    }, []); 
    /* ------------------------------------ */

    return (
    <div>
        <nav className="bg-purple-950 py-2 px-2 rounded-lg">
            <div className="flex items-center justify-between">

                <ul className="flex space-x-6">
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

                <li>
                    <Link
                        href="/signup"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 font-semibold"
                    >
                        Sign Up
                    </Link>
                </li>

                <li>
                    <Link
                        href="/signin"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 font-semibold"
                    >
                        Sign In
                    </Link>
                </li>

                {/* -------- Profile Icon -------- */}
                <button
                    onClick={handleProfileClick}
                    className="focus:outline-none"
                >
                    {user && user.profile_pic ? (

                        <img
                            src={`http://127.0.0.1:8000${user.profile_pic}`}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-white hover:scale-105 transition"
                        />

                    ) : user ? (

                        <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-500 text-white flex items-center justify-center font-bold hover:scale-105 transition">
                            {user.email.charAt(0).toUpperCase()}
                        </div>

                    ) : (

                        <img
                            src="/user-profile-icon.png"
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-white hover:scale-105 transition"
                        />

                    )}
                </button>
                {/* -------------------------------- */}

                </ul>
            </div>
        </div>
    </nav>
</div>
);
}