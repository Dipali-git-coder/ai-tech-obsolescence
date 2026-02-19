def basic_recommend_skills(user_skills, trending_skills):
    user_set = set(user_skills)
    recommendations = []

    for skill in trending_skills:
        if skill not in user_set:
            recommendations.append(skill)

    return recommendations[:5]
