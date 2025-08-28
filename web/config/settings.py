from dotenv import load_dotenv
import os

class Settings:
  ROOT = os.path.join(os.path.abspath(os.path.dirname(__file__)), '..', '..')

  def __init__(self) -> None:
    load_dotenv(os.path.join(os.path.abspath(os.path.dirname(__file__)), '.env'))
    self.extra = dict()
    self._load_settings()
    
  def _load_settings(self):
    info = {
      'BOT_TOKEN': os.getenv('BOT_TOKEN'),
      'ADMIN_CHAT_ID': os.getenv('ADMIN_CHAT_ID'),
      'WS_HOST': os.getenv('WS_HOST'), 'WS_PORT': int(os.getenv('WS_PORT', 8090)),
      'BASE_WH_URL': os.getenv('BASE_WH_URL'), 'WH_PATH': os.getenv('WH_PATH'),
      'DB_URI': os.getenv('DB_URL')
    }
    self.__dict__.update(info)
