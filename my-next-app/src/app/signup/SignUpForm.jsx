'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    profession: '',
    skill: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert('Please fill name, email and password.');
      return;
    }

    const registered = {
      name: form.name,
      email: form.email,
      avatarUrl: '/avatar-placeholder.png',
      profession: form.profession,
      skill: form.skill,
    };

    try {
      localStorage.setItem('registeredUser', JSON.stringify(registered));
      localStorage.setItem('user', JSON.stringify({
        name: registered.name,
        avatarUrl: registered.avatarUrl,
      }));
    } catch (err) {
      console.error('LocalStorage error:', err);
    }

    const userData = {
        name: data.name || 'User',
        avatarUrl: data.avatarUrl || '/user-profile-icon.png',
        email: data.email,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
    console.log('Sign up:', form);
    alert('Sign up successful!');

    router.push('/signin');

  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      {['name','email','password','profession','skill'].map((field) => (
        <div key={field}>
          <label className="text-lg text-gray-600 block mb-1 capitalize">
            {field === 'skill' ? 'Current Skill' : field}
          </label>
          <input
            type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={`  Enter your ${field}`}
            className="text-gray-600 w-full border border-gray-500 rounded-xl py-2 focus:outline-none"
          />
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Sign up
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <a href="/signin" className="text-blue-600 hover:underline">
          Sign in
        </a>
      </p>
    </form>
  );
}
