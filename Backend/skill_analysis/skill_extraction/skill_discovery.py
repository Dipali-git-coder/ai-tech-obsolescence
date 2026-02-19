from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd

df = pd.read_csv('data/processed/adzuna_jobs_clean_base.csv')

custom_stopwords = [
    "experience", "years", "year", "job", "role",
    "candidate", "responsibility", "requirements",
    "skills", "knowledge", "work", "using", "application", "apply"
]

df["clean_description"] = df["clean_description"].fillna("")

print(df.columns)
vectorizer = TfidfVectorizer(
    stop_words = custom_stopwords + list(TfidfVectorizer(stop_words="english").get_stop_words()),
    ngram_range= (1,2),
    max_features = 100
)
X = vectorizer.fit_transform(df["clean_description"])
skills = vectorizer.get_feature_names_out()

print(skills)