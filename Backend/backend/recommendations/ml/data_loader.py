import pandas as pd
import ast
from pathlib import Path

def load_job_skill_data():
    BASE_DIR = Path(__file__).resolve().parents[3]
    data_path = BASE_DIR / "data" / "processed" / "adzuna_jobs_clean_base.csv"
    
    print("Looking for file at:", data_path)
    
    df = pd.read_csv(data_path)

    # Fix 1: fill NaN safely
    df["skills"] = df["skills"].fillna("[]")

    # Fix 2: convert string → actual list
    df["skills"] = df["skills"].apply(
        lambda x: ast.literal_eval(x) if isinstance(x, str) else []
    )

    # Fix 3: normalize title for filtering
    df["title"] = df["title"].fillna("").str.lower().str.strip()

    return df
