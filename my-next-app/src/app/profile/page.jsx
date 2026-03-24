'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileUI from './ProfileUI';

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
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
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(() => router.push('/signin'));

  }, []);

  if (!userData) return <p>Loading...</p>;

  return <ProfileUI user={userData} />;
}