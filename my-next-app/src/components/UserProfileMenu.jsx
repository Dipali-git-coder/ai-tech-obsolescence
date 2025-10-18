// UserProfileMenu.jsx
'use client'
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from './useUser';

export default function UserProfileMenu() {
  const router = useRouter();
  const user = useUser();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function clickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('click', clickOutside);
    return () => document.removeEventListener('click', clickOutside);
  }, []);

  const handleSignOut = () => {
    try { localStorage.removeItem('auth-token'); } catch {}
    try { localStorage.removeItem('nav-active'); } catch {}
    try { localStorage.removeItem('user'); } catch {}
    setProfileOpen(false);
    router.push('/signin');
  };

  return (
    <li ref={profileRef} className="relative">
      <button
        onClick={() => setProfileOpen((s) => !s)}
        className="ml-2 w-10 h-10 rounded-full overflow-hidden border-2 border-white focus:outline-none"
        aria-label="Open user menu"
      >
        <img
          src={user?.avatarUrl || '/user-profile-icon.png'}
          alt="User avatar"
          className="w-full h-full object-cover"
        />
      </button>

      {profileOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white text-gray-800 rounded-lg shadow-lg z-50">
          <div className="px-4 py-3 border-b">
            <div className="font-semibold">{user?.name || 'User'}</div>
            <div className="text-sm text-gray-500">UX/UI Designer</div>
          </div>
          <ul className="flex flex-col py-2">
            <li><Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Your Profile</Link></li>
            <li><Link href="/profile/update" className="block px-4 py-2 hover:bg-gray-100">Update Profile</Link></li>
            <li><Link href="/current-skills" className="block px-4 py-2 hover:bg-gray-100">Current Skills</Link></li>
            <li><Link href="/Recommended" className="block px-4 py-2 hover:bg-gray-100">Recommended Skills</Link></li>
            <li><Link href="/Saved" className="block px-4 py-2 hover:bg-gray-100">Saved Plan</Link></li>
            <li>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </li>
  );
}