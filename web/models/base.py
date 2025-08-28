from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime as dt
from sqlalchemy import func, Integer
from sqlalchemy import select
import secrets
import string


class Base(DeclarativeBase):
  created: Mapped[dt] = mapped_column(Integer, default=int(dt.now().timestamp()))

  @classmethod
  async def get(cls, session: AsyncSession, **filters):
    query = select(cls).filter_by(**filters)
    result = await session.execute(query)
    return result.scalars().all()
  
  @classmethod
  async def create_uid(cls, session: AsyncSession):
    existing = await session.execute(select(cls.uid))
    uids = set(existing.scalars().all())
    alp = string.ascii_letters + string.digits
    while True:
      uid = ''.join(secrets.choice(alp) for _ in range(cls.__table__.c.uid.type.length))
      if uid not in uids:
        return uid
      
  @classmethod
  async def first(cls, session: AsyncSession, **filters):
    query = select(cls).filter_by(**filters)
    result = await session.execute(query)
    return result.scalars().first()

  @classmethod
  async def get_json(cls, session: AsyncSession, **filters):
    all = await cls.get(session, **filters)
    return [a.json for a in all]

  async def save(self, session: AsyncSession):
    session.add(self)
    await session.commit()
    
  async def delete(self, session: AsyncSession):
    await session.delete(self)
    await session.commit()
