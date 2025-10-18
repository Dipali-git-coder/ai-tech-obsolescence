'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignInForm from './SignInForm';

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert('Please enter email and password.');
      return;
    }

    try {
      const reg = localStorage.getItem('registeredUser');
      let userObj;
      if (reg) {
        userObj = JSON.parse(reg);
      } else {
        userObj = { name: form.email.split('@')[0], avatarUrl: '/avatar-placeholder.png' };
      }
      localStorage.setItem('user', JSON.stringify({ name: userObj.name, avatarUrl: userObj.avatarUrl }));
    } catch {
      console.error('Error accessing localStorage');
    }

    console.log('Sign in:', form);
    alert('Sign in successful!'); // <-- show message
    router.push('/');
  };

  return (
    <SignInForm
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
