from sqlalchemy.orm import Session

from app.models.chat import ChatMessage

def save_message(
    user_id: int,
    role: str,
    message: str,
    db: Session
):
    chat = ChatMessage(
        user_id=user_id,
        role=role,
        message=message
    )

    db.add(chat)
    db.commit()

def get_chat_history(
    user_id: int,
    db: Session
):
    messages = db.query(ChatMessage).filter(
        ChatMessage.user_id == user_id
    ).all()

    return messages