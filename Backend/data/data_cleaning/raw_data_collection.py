import requests
import json

all_jobs  = []

url = "https://api.adzuna.com/v1/api/jobs/in/search/1"

JOB_ROLES = [
    "backend developer",
    "frontend developer",
    "fullstack developer",
    "software engineer",
    "machine learning engineer",
    "artificial intelligence engineer",
]

for role in JOB_ROLES:
    for page in range(1,6):
        params = {
            "app_id": "b11247f0",
            "app_key": "cf9764f615e8f43ef4bcbb055d1a1b7f",
            "what": role,
            "results_per_page": 50,
        }

        response = requests.get(url, params=params)
        print(response.url)
        # print(response.status_code)
        # print("Response Text:", response.text)
        print("Status:", response.status_code)
        print(response.headers.get("Content-Type"))
        print("Response Preview:", response.text[:300])

        if response.status_code == 200:
            data = response.json()
            all_jobs.extend(data["results"]) 

            print("✅ Data saved successfully")
        else:
            print("❌ Bad request — check parameters")

with open("data/raw/adzuna_jobs_raw.json", "w", encoding="utf-8") as f:
        json.dump(all_jobs, f, indent=4)

print(f"Total jobs collected: {len(all_jobs)}")