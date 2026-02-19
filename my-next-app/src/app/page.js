// ...existing code...
'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  // const [showAnalyze, setShowAnalyze] = useState(false);
  // const analyzeRef = useRef(null);
  const router = useRouter();

  const handleGetStarted = () => {
    // client-side navigation to your analyze page
    router.push("/analyze");
  };

  return (
    <div>
      {/* HERO: matches wireframe; does NOT touch navbar */}
      <section className="bg-white py-15">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            {/* <div className="inline-flex items-center justify-center w-10 h-10 border rounded-md mb-6">AI</div> */}
            <h1 className="text-2lg text-gray-800 md:text-5xl font-extrabold leading-tight mb-4">
              AI Skill Recommender System
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Find the best skill to stay up-to-date.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-purple-600 border border-black-900 px-6 py-3 rounded-lg text-lg text-white-500 font-medium shadow-sm cursor-pointer hover:bg-purple-700 hover:shadow-md transition"
            >
              Get Started
            </button>
          </div>

          <div className="md:w-1/2 flex justify-center">
              <div className="relative w-80 h-56">
                <img
                  src="/ai skill recommender brain(gemini) image.png"
                  alt="Profile"
                  className="w-full h-full rounded shadow-sm object-cover"
                />
              </div>
            </div>
        </div>
      </section>

    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50 py-16 px-6">
  
      {/* Card 1 */}
      <div className="flex items-start gap-5 bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
        
        <div className="w-14 h-14 flex items-center justify-center">
          <img
            src="/ai home page card 1.png"
            alt="card icon"
            className="w-full h-full object-contain"
          />
        </div>


        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Personalized Recommendations
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Get tailored skill suggestions based on your profile.
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="flex items-start gap-5 bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
        
        <div className="w-14 h-14 flex items-center justify-center">
          <img
            src="/ai home page card 2.png"
            alt="card icon"
            className="w-full h-full object-contain"
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Career Insights
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Discover in-demand skills for your industry.
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="flex items-start gap-5 bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
        
        <div className="w-14 h-14 flex items-center justify-center">
          <img
            src="/ai home page card 3.png"
            alt="card icon"
            className="w-full h-full object-contain"
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Learning Pathways
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Find courses to develop your expertise.
          </p>
        </div>
      </div>

    </div>



      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            {/* <div className="inline-flex items-center justify-center w-10 h-10 border rounded-md mb-6">AI</div> */}
            <h1 className="text-4xl text-gray-800 md:text-5xl font-extrabold leading-tight mb-4">
              Personalized Skill Recommendations
              <br />
              to Boost Your Professional Growth
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Receive tailored suggestions on which skills to acquire based on
              current industry trends and your career goals.
            </p>
          </div>

          <div className="relative w-80 h-56">
          <img
            src="https://www.joinhgs.com/sites/default/files/inline-images/AI.png"
            alt="Profile"
            className="w-full h-full rounded shadow-sm object-cover"
          />
        </div>
        </div>
      </section>
    </div>

  );
}
// ...existing code...