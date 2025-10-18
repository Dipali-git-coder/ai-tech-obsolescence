export const mockData = {
  skill: "React",
  score: 72, // Obsolescence score out of 100
  summary: "React is stable, but AI-driven frameworks like Next.js and Astro are growing faster. Consider learning these to stay future-ready.",
  
  // Popularity trend over recent years (fake data)
  trends: [
    { year: 2021, popularity: 95 },
    { year: 2022, popularity: 90 },
    { year: 2023, popularity: 84 },
    { year: 2024, popularity: 78 },
    { year: 2025, popularity: 70 },
  ],
  
  // Recommended next skills (fake data)
  recommendations: [
    { name: "Next.js", confidence: 88, duration: "2 months" },
    { name: "TypeScript", confidence: 92, duration: "3 months" },
    { name: "Astro", confidence: 85, duration: "2 months" },
    { name: "Prompt Engineering", confidence: 95, duration: "1 month" },
    { name: "Rust", confidence: 80, duration: "4 months" }
  ],
  
  // Optional saved plan (dummy)
  savedPlan: [
    { name: "TypeScript", progress: 40 },
    { name: "Next.js", progress: 10 }
  ]
};
