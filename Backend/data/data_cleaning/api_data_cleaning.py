import pandas as pd 
import re
df = pd.read_csv('data/processed/adzuna_jobs_clean_base.csv')

print("Before: ", df.head())

# handle missing values
df['company'] = df['company'].fillna('Unknown')
df['location'] = df['location'].fillna('India')

# drop rows without job description
df.dropna(subset=['description'], inplace=True)
df.reset_index(drop=True, inplace=True)
print(df.columns)
# data cleaning & feature extraction
df['posted_date'] = pd.to_datetime(df['posted_date'], errors='coerce')

df['year'] = df['posted_date'].dt.year
df['month'] = df['posted_date'].dt.month

# job role normalization
def normalize_job_role(text):
    text = text.lower()
    if 'react' in text or 'node' in text:
        return 'Full Stack Developer'
    elif 'aws' in text or 'cloud' in text:
        return 'Cloud Engineer'
    elif 'ios' in text or 'swift' in text:
        return 'iOS Developer'
    elif 'java' in text:
        return 'Java Developer'
    elif 'python' in text:
        return 'Python Developer'
    else:
        return 'Other'  
    
df['job_role'] = df['description'].apply(normalize_job_role)

# description text cleaning
def clean_text(text):
    text = text.lower()
    text = re.sub(r'<.*?>', ' ', text) # remove html
    text = re.sub(r'[^a-z0-9,+# ]', ' ', text) # keep tech symbols
    text = re.sub(r'\s+', ' ', text).strip()
    return text
df['clean_description'] = df['description'].apply(clean_text)

# remove boilerplate phareses
boilerplate_pharases = [
    'job summary',
    'key responsibilities',
    'role and responsibilities',
    'apply now',
    'walk in'
]

def remove_boilerplate(text):
    for phrase in boilerplate_pharases:
        text = text.replace(phrase, '')
    return text

df['clean_description'] = df['clean_description'].apply(remove_boilerplate)

# remove duplicate & low quality data
# remove duplicate job
df.drop_duplicates(subset=['title', 'company', 'location'], inplace=True)

# remove very short description
df = df[df['clean_description'].str.len() > 100]

df = df.loc[:, ~df.columns.str.contains("^Unnamed")]

# save clean dataset
df.to_csv("data/processed/adzuna_jobs_clean_base.csv", index=False)

print("After: ", df.head())