import pandas as pd
import ast

df = pd.read_csv("data/processed/adzuna_jobs_clean_base.csv")
print(len(df))
print(df.head())
print(df.columns)
df["posted_date"] = pd.to_datetime(df["posted_date"], errors="coerce")
df["year"] = df["posted_date"].dt.year

skill_year_records = []
if isinstance(df["skills"].iloc[0], str):
    df["skills"] = df["skills"].apply(ast.literal_eval)

for job in df.itertuples():
    for skill in job.skills:
        skill_year_records.append({
            "skill": skill,
            "year": job.year
        })

trending = pd.DataFrame(skill_year_records)

skill_trend = (
    trending
    .groupby(["skill", "year"])
    .size()
    .reset_index(name="count")
)

print(skill_trend.head())
