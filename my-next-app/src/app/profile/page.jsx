'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileUI from './ProfileUI';

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 added
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access');

    if (!token) {
      router.push('/signin');
      return;
    }

    fetch('http://127.0.0.1:8000/api/users/profile/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Unauthorized"); // 🔥 important fix
        }
        return res.json();
      })
      .then(data => {
        setUserData(data);
        setLoading(false); // 🔥 stop loading
      })
      .catch(() => {
        localStorage.removeItem('access'); // 🔥 clean invalid token
        router.push('/signin');
      });

  }, []);

  // 🔥 prevent UI flash
  if (loading) return null;

  return <ProfileUI user={userData} />;
}