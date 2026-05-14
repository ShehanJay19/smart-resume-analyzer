from sentence_transformers import (
    SentenceTransformer,
    util
)

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

REQUIRED_SKILLS = [
    "python",
    "react",
    "sql",
    "docker",
    "aws",
    "fastapi"
]

def extract_missing_skills(
    resume_text: str,
    job_description: str
):
    resume_text = resume_text.lower()
    job_description = job_description.lower()

    missing_skills = []

    for skill in REQUIRED_SKILLS:
        if (
            skill in job_description
            and skill not in resume_text
        ):
            missing_skills.append(skill)

    return missing_skills

def calculate_match_score(
    resume_text: str,
    job_description: str
):
    resume_embedding = model.encode(
        resume_text,
        convert_to_tensor=True
    )

    jd_embedding = model.encode(
        job_description,
        convert_to_tensor=True
    )

    similarity = util.cos_sim(
        resume_embedding,
        jd_embedding
    )

    return round(
        similarity.item() * 100,
        2
    )

def match_resume_to_jd(
    resume_text: str,
    job_description: str
):
    match_score = calculate_match_score(
        resume_text,
        job_description
    )

    missing_skills = extract_missing_skills(
        resume_text,
        job_description
    )

    return {
        "match_score": match_score,
        "missing_skills": missing_skills
    }