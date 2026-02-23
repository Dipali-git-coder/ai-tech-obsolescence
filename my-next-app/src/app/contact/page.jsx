"use client";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-purple-50 flex items-center justify-center px-6 py-16">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 bg-white shadow-2xl rounded-3xl p-10">

        {/* LEFT SIDE - TEXT CONTENT */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold leading-tight">
            Let's Build the <br />
            <span className="bg-gradient-to-r from-rose-500 to-purple-500 text-transparent bg-clip-text">
              Future of Skills
            </span>
          </h1>

          <p className="mt-6 text-gray-600">
            Have questions about our AI-powered system? Want to collaborate,
            suggest improvements, or learn more about our research?
            We would love to hear from you.
          </p>

          <div className="mt-8 space-y-4 text-gray-700">
            <p>📧 Email: dipalibangal@example.com</p>
            <p>🎓 Bachelor of Information Technology</p>
            <p>🤖 Focused on AI & Machine Learning Solutions</p>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-2xl p-8 shadow-inner">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Send Us a Message
          </h2>

          <form className="space-y-5">

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400 transition text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400 transition text-gray-800"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-rose-500 text-white font-semibold shadow-lg hover:scale-105 hover:bg-rose-600 transition duration-300"
            >
              Send Message 
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}