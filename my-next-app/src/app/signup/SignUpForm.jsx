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
    skills: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert('Please fill name, email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.name,
          email: form.email,
          password: form.password,
          skills: form.skills,
          profession: form.profession,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Sign up failed.');
        setLoading(false);
        return;
      }

      alert('Sign up successful!');
      router.push('/signin');
    }catch (error){
      console.error('Error: ',error);
      alert('Something went wrong. Please try again later.');
    }

    setLoading(false);
};

return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      {['name','email','password','profession','skills'].map((field) => (
        <div key={field}>
          <label className="text-lg text-gray-600 block mb-1 capitalize">
            {field === 'skills' ? 'Current Skill' : field}
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
        disabled={loading}
        className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50'
        >
        {loading ? 'Signing up...' : 'Sign up'}
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