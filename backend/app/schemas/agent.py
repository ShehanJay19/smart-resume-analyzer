from pydantic import BaseModel

class CareerAgentRequest(BaseModel):
    job_description: str