import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col items-center">
        <p className="text-sm mb-2 text-center">
          &copy; {new Date().getFullYear()} AI Tech Tracker. All rights reserved.
        </p>

        <div className="flex flex-col space-y-1 text-center">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}
