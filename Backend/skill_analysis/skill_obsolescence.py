import pandas as pd
import ast

df = pd.read_csv("data/processed/adzuna_jobs_clean_base.csv")

def normalize_skills(x):
    if isinstance(x, list):
        return x
    if pd.isna(x):
        return []
    try:
        return ast.literal_eval(x)
    except:
        return str(x).split(",")
    
df["skills"] = df["skills"].apply(normalize_skills)

df = df.explode("skills")

df["skills"] = (
    df["skills"]
    .astype(str)
    .str.lower()
    .str.strip()
)
# print(df["skills"].unique()[:20])
df["skills"] = df["skills"].str.strip().str.lower()
# print(df["skills"].unique()[:20])

def skill_status_by_growth(counts, threshold=0.1): 
    if len(counts) < 2: 
        return "Insufficient Data" 
    
    start = counts[0] 
    end = counts[-1] 

    if start == 0 and end > 0: 
        return "Emerging" 
    
    if start == 0: 
        return "Stable" 
    
    growth_rate = (end - start) / start 

    if growth_rate > threshold: 
        return "Emerging" 
    
    elif growth_rate < -threshold: 
        return "Obsolete" 
    
    else: 
        return "Stable" 
    
def detect_skill_obsolescence(trend_df): 
    results = [] 

    for skill, group in trend_df.groupby("skills"): 
        group = group.sort_values("year") 
        counts = group["count"].tolist() 

        status = skill_status_by_growth(counts) 

        results.append({ 
            "skill": skill, 
            "status": status 
        }) 

        return pd.DataFrame(results)
trend_df = (
    df.groupby(["skills", "year"])
      .size()
      .reset_index(name="count")
)

obsolescence_df = detect_skill_obsolescence(trend_df)
print(obsolescence_df.head())
