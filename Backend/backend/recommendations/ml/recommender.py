import numpy as np
import re
from collections import Counter
from recommendations.ml.data_loader import load_job_skill_data
from recommendations.ml.vectorizer import build_tfidf_matrix
from recommendations.ml.similarity import compute_similarity


def clean_and_split_skills(skill_text):
    skill_text = skill_text.lower()
    skill_text = re.sub(r"[^\w\s,]", "", skill_text)
    skills = re.split(r"[,\s]+", skill_text)
    return [skill.strip() for skill in skills if skill.strip()]


def recommend_skills(user_skills, target_role, experience=None, top_n=10):
    print("DEBUG: recommend_skills function is running")
    df = load_job_skill_data()

    # normalize target role
    if not isinstance(target_role, str):
        target_role = str(target_role)
        
    target_role = target_role.lower().strip()

    # normalize user skills
    user_skills = [skill.lower().strip() for skill in user_skills]

    # filter using TITLE
    filtered_df = df[df["title"].str.contains(target_role, na=False)]

    print("Requested role:", target_role)
    print("Filtered rows:", len(filtered_df))
    print("Sample titles:", filtered_df["title"].head(5).tolist())

    # fallback
    if filtered_df.empty:
        print("No exact role match found. Using full dataset.")
        filtered_df = df

    print("Total filtered jobs:", len(filtered_df))

    # TF-IDF logic (UNCHANGED)
    job_skill_texts = [
        " ".join(skills) for skills in filtered_df["skills"]
    ]

    job_matrix, vectorizer = build_tfidf_matrix(job_skill_texts)

    user_skill_text = " ".join(user_skills)
    user_vector = vectorizer.transform([user_skill_text])

    similarity_scores = compute_similarity(user_vector, job_matrix)[0]

    top_indices = similarity_scores.argsort()[-5:][::-1]

    skill_counter = Counter()

    # 🔥 IMPORTANT FIX: only top jobs count karenge (better ML)
    for idx in top_indices:
        skills_list = filtered_df.iloc[idx]["skills"]
        skill_counter.update(skills_list)

    # remove user skills
    user_skill_set = set(user_skills)

    for skill in list(skill_counter.keys()):
        if skill in user_skill_set:
            del skill_counter[skill]

    # remove generic
    if "ai" in skill_counter:
        del skill_counter["ai"]

    # recommended skills (UNCHANGED LOGIC BASE)
    recommended_skills = [
        skill for skill, count in skill_counter.most_common(top_n)
    ]

    # 🔥 NEW: SKILL GAP LIST (IMPORTANT)
    skill_gap = recommended_skills.copy()

    # 🔥 NEW: LEARNING PATH
    learning_path = [
        {
            "title": "Core Strength",
            "status": "completed",
            "skills": user_skills
        },
        {
            "title": "Expansion",
            "status": "current",
            "progress": 40,
            "skills": recommended_skills[:2]
        },
        {
            "title": "Scalability",
            "status": "locked",
            "skills": recommended_skills[2:5]
        },
        {
            "title": "Advanced Systems",
            "status": "locked",
            "skills": recommended_skills[5:8]
        }
    ]

    return {
        "recommended_skills": recommended_skills,
        "skill_gap": skill_gap,  # ✅ NEW
        "skill_gap_count": len(recommended_skills),  # same as before
        "learning_path": learning_path  # ✅ NEW
    }