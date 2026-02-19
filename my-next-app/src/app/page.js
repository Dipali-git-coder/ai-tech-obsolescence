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
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            {/* <div className="inline-flex items-center justify-center w-10 h-10 border rounded-md mb-6">AI</div> */}
            <h1 className="text-4xl text-gray-800 md:text-5xl font-extrabold leading-tight mb-4">
              AI-powered Tech Obsolescence Tracker
              <br />
              and Skill Recommender System
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Stay up-to-date with the latest technology and enhance your skills
              with personalized recommendations.
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
                <Image
                  src="https://media.istockphoto.com/id/1435220822/photo/african-american-software-developer.jpg?s=612x612&w=0&k=20&c=JESGRQ2xqRH9ZcJzvZBHZIZKVY8MDejBSOfxeM-i5e4="
                  alt="Profile"
                  fill
                  className="w-full h-full rounded shadow-sm object-cover"
                />
              </div>
            </div>
        </div>
      </section>
      
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12">
        <div className="md: w-1/2 flex justify-center">
          <div className="relative w-80 h-56">
            <Image
              src="https://media.istockphoto.com/id/526274307/photo/beginnings-of-computer-languages-in-schools.jpg?s=612x612&w=0&k=20&c=exzkCnsR5FRL4u08RovTaqGDeQ_a790lFudrwbc3ufE="
              alt="Profile"
              fill
              className="w-full h-full rounded shadow-sm object-cover"
            />
          </div>
        </div>

        <div className="md:w-1/2">
          {/* <div className="inline-flex items-center justify-center w-10 h-10 border rounded-md mb-6">AI</div> */}
          <h1 className="text-4xl text-gray-800 md:text-5xl font-extrabold leading-tight mb-4">
            Track Technology Obsolescence
            <br />
            and Stay Ahead in Your Career
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Identify outdated technologies and receive personalized skill
            recommendations to stay competitive in the job market.
          </p>
        </div>
        </div>
      </section>


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
          <Image
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