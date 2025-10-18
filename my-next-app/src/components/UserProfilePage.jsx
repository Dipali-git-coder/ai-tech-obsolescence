// in UserProfilePage.jsx
'use client'
import { useRouter } from 'next/navigation';
import { useUser } from './useUser';  // path may vary

export default function UserProfilePage() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));  // ← this line reads the stored user data
    } catch {}
  }, []);

  const handleSignOut = () => {
    try { localStorage.removeItem('user'); } catch {}
    router.push('/signin');
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <img
          src={user.avatarUrl || '/avatar-placeholder.png'}
          alt="avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />
        <h1 className="text-2xl font-semibold mb-2">{user.name}</h1>
        <p className="text-sm text-gray-600 mb-4">Logged in user</p>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}
