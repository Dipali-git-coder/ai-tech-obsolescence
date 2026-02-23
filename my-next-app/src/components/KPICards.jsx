"use client";

export default function KPICards({ trending, obsolete }) {
  const totalTrending = trending.length;
  const totalObsolete = obsolete.length;

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-10">
      
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-gray-600">Total Skills</h3>
        <p className="text-3xl font-bold mt-2">
          {totalTrending + totalObsolete}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-gray-600">Trending Skills</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">
          {totalTrending}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-gray-600">Obsolete Skills</h3>
        <p className="text-3xl font-bold text-red-500 mt-2">
          {totalObsolete}
        </p>
      </div>

    </div>
  );
}