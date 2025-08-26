import { readMultipartFormData } from 'h3';
import { useNitroApp } from '#imports';

const nitroApp = useNitroApp();

function UTCTimestamp() {
  const date = new Date();
  const rawDate = {
    date: date.getDate(),
    month: date.getMonth() + 1,
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
  const nDate = {
    year: date.getFullYear(),
  };
  Object.entries(rawDate).forEach(([k, v]) => {
    nDate[k] = v.toString().padStart(2, '0');
  });
  nDate.UTCString = `${nDate.hours}:${nDate.minutes}:${nDate.seconds} ${nDate.date}.${nDate.month}.${nDate.year}`;
  return nDate;
}

function formatData({ name, phone, email, about }) {
  return `
  Новая форма от  <u>${name}</u>
Номер телефона: ${phone}
Почтовый адрес: ${email}
Дополнительно:  ${about}

<span class="tg-spoiler">Отправлено: ${UTCTimestamp().UTCString}</span>
  `;
}

function prettyForm(form) {
  const data = {};
  const fileTypes = {
    images: ['image/png', 'image/jpeg'],
    files: ['application/pdf'],
  };

  form.forEach((field) => {
    if (field.filename) {
      if (!data?.attachments) data.attachments = {};
      Object.entries(fileTypes).forEach(([fileType, exts]) => {
        if (exts.includes(field.type)) {
          if (!data.attachments?.[fileType]) {
            data.attachments[fileType] = [{ filename: field.filename, data: field.data, type: field.type }];
          }
          else {
            data.attachments[fileType].push({ filename: field.filename, data: field.data, type: field.type });
          }
        }
      });
    }
    else {
      data[field.name] = field.data.toString(); // `field.data` is a Buffer
    }
  });
  return data;
}

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event);
  const bot = nitroApp.tgBot;
  const data = prettyForm(form);
  let messageSent = false;

  if (data.attachments?.images && data.attachments?.images.length === 1) {
    await bot.sendPhoto(
      process.env.TELEGRAM_ADMIN_CHAT_ID,
      data.attachments.images[0].data,
      { parse_mode: 'html', show_caption_above_media: true, caption: formatData(data) },
      { filename: data.attachments.images[0].filename, contentType: data.attachments.images[0].type },
    );
    messageSent = true;
  }
  else if (data.attachments?.images && data.attachments?.images.length > 1) {
    const media = data.attachments.images.map(image => ({
      type: 'photo',
      media: image.data,
      fileOptions: { filename: image.filename, contentType: image.type },
    }));
    await bot.sendMediaGroup(process.env.TELEGRAM_ADMIN_CHAT_ID, media);
  }

  if (!messageSent) {
    await bot.sendMessage(process.env.TELEGRAM_ADMIN_CHAT_ID, formatData(data), { parse_mode: 'HTML' });
  }

  if (data.attachments?.files) {
    data.attachments.files.forEach(async (file) => {
      await bot.sendDocument(process.env.TELEGRAM_ADMIN_CHAT_ID, file.data, {}, { filename: file.filename, contentType: file.type });
    });
  }

  return { status: 'success' };
});
