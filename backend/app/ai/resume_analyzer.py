import re
import spacy

nlp = spacy.load("en_core_web_sm")

SKILLS = [
    "python",
    "java",
    "javascript",
    "react",
    "fastapi",
    "sql",
    "postgresql",
    "docker",
    "aws",
    "machine learning"
]

def extract_email(text: str):
    pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+"

    match = re.search(pattern, text)

    return match.group(0) if match else None

def extract_phone(text: str):
    pattern = r"\+?\d[\d\s\-]{8,15}"

    match = re.search(pattern, text)

    return match.group(0) if match else None

def extract_skills(text: str):
    text = text.lower()

    found_skills = []

    for skill in SKILLS:
        if skill.lower() in text:
            found_skills.append(skill)

    return list(set(found_skills))

def analyze_resume(text: str):
    return {
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text)
    }