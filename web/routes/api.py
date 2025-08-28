from aiohttp.web import RouteTableDef, Request, json_response
from sqlalchemy.ext.asyncio import AsyncSession
from aiohttp import MultipartReader
from datetime import datetime as dt
from aiogram.types import Message
from .bot import send_group_message
from web.models import Form


api = RouteTableDef()


async def decode_body(reader: MultipartReader):
  data = {
    'attachments': {
      'images': [],
      'files': [],
    }
  }
  
  async for part in reader:
    if part.filename:
      content = await part.read(decode=True)
      filetype = part.headers.get('Content-Type')
      ctype = 'images' if filetype in ['image/png', 'image/jpeg'] else 'files' 
      data['attachments'][ctype].append({
        'filename': part.filename,
        'data': content,
        'type': filetype
      })
    else:
      data[part.name] = await part.text()
  return data


def make_pretty_data(raw_data: dict, uid: str) -> tuple[str, dict]:
  attachments = raw_data.pop('attachments')
  current_date = dt.now().strftime('%H:%M:%S %d.%m.%Y')
  content = f"Новая форма от <u>{raw_data.get('name')}</u>\nНомер телефона: {raw_data.get('phone')}\nПочтовый адрес: {raw_data.get('email')}\nДополнительно: {raw_data.get('about')}\n\n<span class=\"tg-spoiler\">Отравлено: {current_date}\nЗапись в БД: forms/{uid}</span>"
  return content, attachments


def make_media(_type: str, attachments: dict) -> list:
  return [{'type': 'photo', 'media': image['data'], 'file_options': { 'filename': image['filename'], 'content_type': image['type']}} for image in attachments[_type]]


async def send_bot_message(atcmts: dict, text) -> str:
  file_id = None
  message_send = False
  if len(atcmts['images']) > 0 and len(atcmts['images']) < 2:
    message = await send_group_message('photo', caption=text, show_caption_above_media=True)
    message_send = True
    file_id = ','.join([p.file_id for p in message.photo])
  elif len(atcmts['images']) > 1:
    message = await send_group_message('media_group', media=make_media('image', atcmts))
    file_id = ','.join([p.file_id for p in message.photo if message.photo])
  else:
    if len(atcmts['files']) > 1:
      file_ids = []
      for file in atcmts['files']:
        message = await send_group_message('document', document=file['data'])
        file_ids.append(message.document.file_id)
      file_id = ','.join(file_ids)
  if not message_send:
    await send_group_message('message', text=text, disable_notification=True)
  return file_id

@api.get('/api/')
async def test_endpoint(req: Request, session: AsyncSession):
  return json_response(data=dict(status='success', ok=True))

@api.post('/api/forms/contacts')
async def handle_form(req: Request, session: AsyncSession):
  reader = await req.multipart()
  try:
    raw_data = await decode_body(reader)
    print(raw_data)
    form_uid = await Form.create_uid(session)
    text, attachments = make_pretty_data(raw_data, form_uid)
    file_id = await send_bot_message(attachments, text)
    
    form = Form(form_uid, raw_data['name'], raw_data['phone'], raw_data['email'], raw_data['about'], file_id)
    await form.save(session)
    return json_response(data=dict(status='success'))
  except Exception as ex:
    json_response(data=dict(status='error', message=str(ex)))
    raise
