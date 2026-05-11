REQUIRED_SECTIONS = [
    "education",
    "experience",
    "skills",
    "projects"
]

REQUIRED_SKILLS = [
    "python",
    "react",
    "sql",
    "docker"
]

def calculate_keyword_density(
    text: str,
    keywords: list
):
    text = text.lower()

    total_keywords = 0

    for keyword in keywords:
        total_keywords += text.count(
            keyword.lower()
        )

    total_words = len(text.split())

    if total_words == 0:
        return 0

    return round(
        (total_keywords / total_words) * 100,
        2
    )

def detect_missing_sections(
    text: str
):
    text = text.lower()

    missing_sections = []

    for section in REQUIRED_SECTIONS:
        if section not in text:
            missing_sections.append(section)

    return missing_sections

def detect_missing_skills(
    text: str
):
    text = text.lower()

    missing_skills = []

    for skill in REQUIRED_SKILLS:
        if skill.lower() not in text:
            missing_skills.append(skill)

    return missing_skills

def calculate_ats_score(
    text: str
):
    score = 100

    missing_sections = detect_missing_sections(
        text
    )

    missing_skills = detect_missing_skills(
        text
    )

    score -= len(missing_sections) * 10

    score -= len(missing_skills) * 5

    if score < 0:
        score = 0

    keyword_density = calculate_keyword_density(
        text,
        REQUIRED_SKILLS
    )

    return {
        "ats_score": score,
        "missing_sections": missing_sections,
        "missing_skills": missing_skills,
        "keyword_density": keyword_density
    }