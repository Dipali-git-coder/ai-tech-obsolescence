export default function ObsolescenceMeter({ score }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
      <div
        className={`h-6 text-white flex items-center justify-center ${
          score > 70 ? "bg-red-600" : score > 40 ? "bg-yellow-500" : "bg-green-600"
        }`}
        style={{ width: `${score}%` }}
      >
        {score}%
      </div>
    </div>
  );
}
