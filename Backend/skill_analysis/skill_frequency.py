import pandas as pd
import ast
from collections import Counter

df = pd.read_csv("data/processed/adzuna_jobs_clean_base.csv")
df["skills"] = df["skills"].apply(ast.literal_eval)
# print(df.head())
# print(df.columns)
all_skills = [
    skill
    for skills in df["skills"] 
    for skill in skills
]

skill_frequency = Counter(all_skills)

skill_frequency_df = pd.DataFrame(
    skill_frequency.items(),
    columns= ['skills', "frequency"]
).sort_values(by="frequency", ascending=False)

print(skill_frequency_df.head(20))

print(type(df["skills"].iloc[0]))
