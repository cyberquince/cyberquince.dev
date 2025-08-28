from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession
from typing import Callable, Dict, Awaitable, Any
from aiogram.types import TelegramObject
from aiogram import BaseMiddleware
from aiohttp.web import Request
from aiohttp.web import middleware

class DatabaseMiddleware(BaseMiddleware):
  def __init__(self, session: async_sessionmaker[AsyncSession]) -> None:
    self.session = session
    
  async def __call__(self, handler: Callable[[TelegramObject, Dict[str, Any]], Awaitable[Any]], event: TelegramObject, data: dict[str, Any]) -> Any:
    async with self.session() as session:
      try:
        data['session'] = session
        response = await handler(event, data)
        await session.commit()
        return response
      except Exception as ex:
        await session.rollback()
        raise

@middleware
async def db_middleware(request, handler):
  session_factory: async_sessionmaker[AsyncSession] = request.app['db_sessionmaker']
  async with session_factory() as session:
    try:
      response = await handler(request, session)
      await session.commit()
      return response
    except Exception:
      await session.rollback()
      raise
