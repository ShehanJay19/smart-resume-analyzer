import chromadb

from sentence_transformers import (
    SentenceTransformer
)

from app.data.jobs import JOBS

client = chromadb.Client()

collection = client.create_collection(
    name="jobs"
)

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

def load_jobs():
    for job in JOBS:
        embedding = model.encode(
            job["description"]
        ).tolist()

        collection.add(
            ids=[job["id"]],
            documents=[job["description"]],
            embeddings=[embedding],
            metadatas=[
                {
                    "title": job["title"]
                }
            ]
        )

def search_jobs(
    resume_text: str
):
    resume_embedding = model.encode(
        resume_text
    ).tolist()

    results = collection.query(
        query_embeddings=[resume_embedding],
        n_results=3
    )

    return results