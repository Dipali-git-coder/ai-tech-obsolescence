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

    # filter using TITLE instead of non-existent role column
    filtered_df = df[df["title"].str.contains(target_role, na=False)]

    print("Requested role:", target_role)
    print("Filtered rows:", len(filtered_df))
    print("Sample titles:", filtered_df["title"].head(5).tolist())

    # fallback if no matching jobs
    if filtered_df.empty:
        print("No exact role match found. Using full dataset.")
        filtered_df = df

    print("Total filtered jobs:", len(filtered_df))  # debug

    # convert skills list → text for TF-IDF
    job_skill_texts = [
        " ".join(skills) for skills in filtered_df["skills"]
    ]

    # build TF-IDF matrix
    job_matrix, vectorizer = build_tfidf_matrix(job_skill_texts)

    # convert user skills → vector
    user_skill_text = " ".join(user_skills)
    user_vector = vectorizer.transform([user_skill_text])

    # compute similarity
    similarity_scores = compute_similarity(user_vector, job_matrix)[0]

    # get top matching jobs
    top_indices = similarity_scores.argsort()[-5:][::-1]

    skill_counter = Counter()

    # count skills from top jobs
    for skills_list in filtered_df["skills"]:
        skill_counter.update(skills_list)

    # remove skills user already has
    user_skill_set = set(user_skills)

    for skill in list(skill_counter.keys()):
        if skill in user_skill_set:
            del skill_counter[skill]

    # remove overly dominant generic skill (optional but recommended)
    if "ai" in skill_counter:
        del skill_counter["ai"]

    # get top recommendations
    recommended_skills = [
        skill for skill, count in skill_counter.most_common(top_n)
    ]

    return {
        "recommended_skills": recommended_skills,
        "skill_gap_count": len(recommended_skills)
    }
