'use client'

import { useRouter } from "next/navigation";

export default function ProfileUI({ user }) {

  const router = useRouter();

  if (!user) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const firstLetter = user.email?.charAt(0).toUpperCase();

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="w-[380px] bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="h-40 bg-gradient-to-r from-purple-500 to-pink-500 relative flex justify-center">

          {/* Avatar */}
          <div className="absolute -bottom-12">

            {user.profile_pic ? (
              <img
                src={`http://127.0.0.1:8000${user.profile_pic}`}
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-purple-500 text-white flex items-center justify-center text-3xl font-bold border-4 border-white">
                {firstLetter}
              </div>
            )}

          </div>

        </div>

        {/* User Info */}

        <div className="pt-16 pb-6 text-center">

          <h2 className="text-xl font-semibold text-gray-800">
            {user.name || "User"}
          </h2>

          <p className="text-gray-500 text-sm">
            {user.email}
          </p>

        </div>


        {/* Menu */}

        <div className="px-6 space-y-4 pb-6">

          <MenuItem
            onClick={() => router.push("/profile/skills")}
            title="Current Skills"
            />

          <MenuItem
            onClick={() => router.push("/profile/recommendations")}
            title="Recommended Skills"
            />

          <MenuItem
            onClick={() => router.push("/profile/recommended-courses")}
            title="Recommended Courses"
          />

          <MenuItem
            onClick={() => router.push("/profile/saved-courses")}
            title="Saved Courses"
          />

        </div>


        {/* Logout */}

        <div
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/signin");
          }}
          className="text-center py-4 text-gray-500 border-t cursor-pointer hover:text-red-500"
        >
          Logout
        </div>

      </div>

    </div>
  );
}


function MenuItem({ title, onClick }) {

  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center bg-gray-100 p-4 rounded-xl cursor-pointer hover:bg-gray-200"
    >
      <span className="text-gray-700">{title}</span>
      <span className="text-gray-400">›</span>
    </div>
  );
}