from sqlalchemy.ext.asyncio import AsyncSession
from web.utils import setup_logger
from aiogram.filters import Command
from aiogram.types import Message
from aiogram import Router
import os


bot = Router()
logger = setup_logger('(BOT ROUTE)')

async def send_group_message(message_type: str, **kwargs) -> Message:
  from web import bot, settings
  return await getattr(bot, f'send_{message_type}')(settings.ADMIN_CHAT_ID, parse_mode='HTML', **kwargs)


@bot.message(Command('start'))
async def say_hi(m: Message, session: AsyncSession):
  try:
    await m.answer('Hello from aiogram!')
  except Exception as ex:
    print(ex)
    raise
  