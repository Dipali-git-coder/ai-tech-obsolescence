'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignInForm from './SignInForm';

export default function SignInPage() {

  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      alert('Please enter username and password.');
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

        console.log("Login success:", data);

        alert("Sign in successful!");

        router.push('/');

      } else {

        alert(data.detail || "Invalid credentials");

      }

    } catch (error) {

      console.error("Signin error:", error);
      alert("Something went wrong. Try again.");

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