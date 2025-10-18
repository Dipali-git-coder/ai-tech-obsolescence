'use client'
import SignUpForm from './SignUpForm'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border p-8">
        <h1 className="text-4xl text-center font-light text-gray-600">Sign up</h1>
        <SignUpForm />
      </div>
    </div>
  );
}
