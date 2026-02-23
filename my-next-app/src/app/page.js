// ...existing code...
'use client'
import Image from "next/image";
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
      <section className="bg-gradient-to-r from-[#41206f] via-[#55318a] to-[#356b84] py-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          
          <div className="md:w-1/2">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-white">
              AI Skill Recommender System
            </h1>

            <p className="text-lg text-gray-200 mb-8">
              Find the best skill to stay up-to-date.
            </p>

            <button
              onClick={handleGetStarted}
              className="bg-[#6d3bbd] px-6 py-3 rounded-lg text-lg text-white font-medium shadow-md hover:bg-[#7c4dce] transition duration-300"
            >
              Get Started
            </button>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-[480px] h-[320px]">
              <Image
                src="/ai skill recommender brain image.png"
                alt="AI Brain"
                fill
                className="rounded-xl shadow-lg object-cover"
              />
            </div>
          </div>

        </div>
      </section>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white py-16 px-6">
  
      {/* Card 1 */}
      <div className="flex items-start gap-5 bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100">
        
        <div className="w-14 h-14 flex items-center justify-center">
          <Image
            src="/ai home page card 1.png"
            alt="card icon"
            width={56}
            height={56}
            className="object-contain"
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
      <div className="flex items-start gap-5 bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100">
        
        <div className="w-14 h-14 flex items-center justify-center">
          <Image
            src="/ai home page card 2.png"
            alt="card icon"
            width={56}
            height={56}
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
      <div className="flex items-start gap-5 bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100">
        
        <div className="w-14 h-14 flex items-center justify-center">
          <Image
            src="/ai home page card 3.png"
            alt="card icon"
            width={56}
            height={56}
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

      <section className="bg-purple-50 py-20">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            {/* <div className="inline-flex items-center justify-center w-10 h-10 border rounded-md mb-6">AI</div> */}
            <h1 className="text-3xl text-gray-800 md:text-4xl font-extrabold leading-tight mb-4">
              Discover Your Skills with AI Recommendations & track risks 
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Let our AI guide you to the most relevant skills for your career growth 
              and stay informed about potential risks in your industry.
            </p>
          </div>

          <div className="flex item-center justify-center">
          <Image
            src="/ai skill recommender robot(Gemini) image.png"
            alt="Profile"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
        </div>
      </section>
    </div>

  );
}
// ...existing code...