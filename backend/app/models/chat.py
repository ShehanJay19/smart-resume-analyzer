from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Text
)

from app.db.database import Base

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    role = Column(String)

    message = Column(Text)