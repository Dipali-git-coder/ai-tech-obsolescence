'use client';

export default function SignInForm({ form, onChange, onSubmit }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border p-8">
        <h1 className="text-4xl text-center font-light text-gray-600">Sign in</h1>

        
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div>
            <label className="text-lg text-gray-600 block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="  abc@gmail.com"
              className="text-gray-600 w-full border border-gray-500 rounded-xl py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-lg text-gray-600 block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="  Enter password"
              className="text-gray-600 w-full border border-gray-500 rounded-xl py-2 focus:outline-none"
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
            Sign in
          </button>

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account? <a href="/signup" className="text-blue-600">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
