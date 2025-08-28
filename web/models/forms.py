from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column
from .base import Base


class Form(Base):
  __tablename__ = 'forms'
  
  uid: Mapped[str] = mapped_column(String(5), primary_key=True)
  name: Mapped[str] = mapped_column(String(50), nullable=False)
  phone: Mapped[str] = mapped_column(String(15), nullable=False)
  email: Mapped[str] = mapped_column(String(100), nullable=False)
  about: Mapped[str | None] = mapped_column(Text, nullable=True)
  attachment_ids: Mapped[str | None] = mapped_column(Text, nullable=True)
  
  def __init__(self, uid, name, phone, email, about=None, attachment_ids=None, **kwargs) -> None:
    self.uid = uid
    self.name = name
    self.phone = phone
    self.email = email
    self.about = about
    self.attachment_ids = attachment_ids
    
  
  @property
  def json(self):
    return dict(uid=self.uid, name=self.name, phone=self.phone, email=self.email, about=self.about, attachment_ids=self.attachment_ids)
  
  def __repr__(self):
    return f'<Form #{self.uid}>'
