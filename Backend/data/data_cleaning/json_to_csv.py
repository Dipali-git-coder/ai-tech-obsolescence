import json
import pandas as pd

# Load raw JSON file
with open("data/raw/adzuna_jobs_raw.json", "r", encoding="utf-8") as f:
    api_response = json.load(f)

# Normalize job results
df = pd.json_normalize(api_response)

# Select required columns
df = df[[
    "id",
    "title",
    "company.display_name",
    "location.display_name",
    "created",
    "description"
]]

# Rename columns for clarity
df.rename(columns={
    "company.display_name" : "company",
    "location.display_name": "location",
    "created" : "posted_date"
}, inplace=True)

# Save clean base CSV
df.to_csv("data/processed/adzuna_jobs_clean_base.csv", index=False)

print("✅ CSV file created successfully")
