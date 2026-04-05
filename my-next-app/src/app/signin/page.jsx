'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignInForm from './SignInForm';
import toast from 'react-hot-toast';

export default function SignInPage() {

  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      alert('Please enter all fields.');
      return;
    }

    try {

      const res = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: form.username,   // Django expects username
          email: form.email,
          password: form.password
        })
      });

      const data = await res.json();

      console.log("Login Response:", data);

      localStorage.setItem("token", data.access); // Store access token for Skills.jsx

      if (res.ok) {

        // save JWT tokens
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);

        localStorage.setItem("userEmail", form.email); // Store email for SavedCourses.jsx

        console.log("Login success:", data);

        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-sm w-full bg-green-50 border border-green-400 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3`}
          >
            ✅ <span>Login successful!</span>
          </div>
        ));

        router.push('/');

      } else {

        // alert(data.detail || "Invalid credentials");
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-sm w-full bg-yellow-50 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3`}
          >
            ⚠️ <span>{data.detail || "Invalid credentials"}</span>
          </div>
        ));

      }

    } catch (error) {

      console.error("Signin error:", error);
      toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-sm w-full bg-yellow-50 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3`}
      >
        ⚠️ <span>Something went wrong! Try again.</span>
      </div>
    ));

    }
  };

  return (
    <SignInForm
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}