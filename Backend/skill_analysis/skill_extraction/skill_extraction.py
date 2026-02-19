import pandas as pd

df = pd.read_csv("data/processed/adzuna_jobs_clean_base.csv")


SKILLS = [
    'python', 'java', 'react', 'node', 'aws', 'docker',
    'kubernetes', 'sql', 'pyspark', 'hadoop', 'spark',
    'machine learning', 'deep learning', 'ai', 'ml'
]

def extract_skills(text):
    found = []
    for skill in SKILLS:
        if skill in text:
            found.append(skill)
    return found

df["skills"] = df["clean_description"].apply(extract_skills)

#  Remove rows with no skills
df = df[df['skills'].str.len() > 0]

# saved the changes
df.to_csv("data/processed/adzuna_jobs_clean_base.csv")

# see if skill extraction working properly
print(df[['clean_description', 'skills']].head())

print(df.columns)