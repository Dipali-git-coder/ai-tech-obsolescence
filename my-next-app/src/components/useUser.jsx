'use client'
import { useEffect, useState } from 'react';

export function useUser() {
  const [user, setUser] = useState({
    name: 'User',
    avatarUrl: '/avatar-placeholder.png',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.error('useUser: failed to parse user', err);
    }
  }, []);

  return user;
}
