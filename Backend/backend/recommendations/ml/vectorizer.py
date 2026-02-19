from sklearn.feature_extraction.text import TfidfVectorizer

def build_tfidf_matrix(skill_texts):
    vectorizer = TfidfVectorizer(
        stop_words="english",
        ngram_range=(1,2)
    )

    tfidf_matrix = vectorizer.fit_transform(skill_texts)
    return tfidf_matrix, vectorizer