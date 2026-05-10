import fitz
import docx
import os

def extract_text_from_pdf(
    file_path: str
):
    text = ""

    pdf = fitz.open(file_path)

    for page in pdf:
        text += page.get_text()

    return text

def extract_text_from_docx(
    file_path: str
):
    text = ""

    document = docx.Document(file_path)

    for paragraph in document.paragraphs:
        text += paragraph.text + "\n"

    return text

def extract_resume_text(
    file_path: str
):
    extension = os.path.splitext(
        file_path
    )[1].lower()

    if extension == ".pdf":
        return extract_text_from_pdf(
            file_path
        )

    elif extension == ".docx":
        return extract_text_from_docx(
            file_path
        )

    return ""