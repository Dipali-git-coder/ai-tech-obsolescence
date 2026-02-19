from sklearn.metrics.pairwise import cosine_similarity

def compute_similarity(user_vector, job_matrix):
    return cosine_similarity(user_vector, job_matrix)

