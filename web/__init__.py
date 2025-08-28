from aiogram.webhook.aiohttp_server import SimpleRequestHandler, setup_application
from .utils import DatabaseMiddleware, db_middleware
from aiogram import Dispatcher, Bot
from .routes import routers, routes
from contextlib import suppress
from .config import Settings
from aiohttp import web
import asyncio
import sys

settings = Settings()

class BotPlatformHanlder:
  def __init__(self):
    self.dp = Dispatcher()
    
  async def win32(self, app: web.Application):
    from .utils.engine import session_maker
    app['db_sessionmaker'] = session_maker
    self.dp.update.middleware(DatabaseMiddleware(session=session_maker))
    self.dp.include_routers(*routers)
    self.dp.startup.register(on_startup)
    self.dp.shutdown.register(on_close)
    print('Starting bot..')
    await self.dp.start_polling(bot)

  async def linux(self, app: web.Application, dp: Dispatcher):
    from .utils.engine import session_maker
    app['db_sessionmaker'] = session_maker
    webhook_req_handler = SimpleRequestHandler(dp, bot)
    webhook_req_handler.register(app, path=settings.WH_PATH)
    setup_application(app, dp, bot=bot)
    
  
async def on_startup(bot: Bot) -> None:
  from .utils.engine import create_db
  await bot.delete_webhook(drop_pending_updates=True)
  if sys.platform == 'linux':
    await bot.set_webhook(f'{settings.BASE_WH_URL}{settings.WH_PATH}', drop_pending_updates=True)
  await create_db()
  
  
async def on_close(bot: Bot) -> None:
  pass


async def _init_bot(app):
  global bot
  bot = Bot(settings.BOT_TOKEN)
  await getattr(BotPlatformHanlder(), sys.platform)(app)

async def _init_api(app: web.Application):
  app.add_routes(*routes)
  runner = web.AppRunner(app)
  await runner.setup()
  site = web.TCPSite(runner, host=settings.WS_HOST, port=settings.WS_PORT)
  await site.start()
  print('Starting api...')
  
def start():
  app = web.Application(middlewares=[db_middleware])
  loop = asyncio.get_event_loop()
  bot_task = loop.create_task(_init_bot(app))
  api_task = loop.create_task(_init_api(app))
  loop.run_until_complete(asyncio.gather(bot_task, api_task))
  

