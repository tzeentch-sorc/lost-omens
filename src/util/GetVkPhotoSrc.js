import bridge from '@vkontakte/vk-bridge';
import * as logger from "./Logger.js";
import { MOCKUP_VK_PHOTO } from "../consts.js";

/**
 * Gets direct image URL from VK photo link
 * @param {string} photoPageUrl - example: "https://vk.com/photo1234567890_123456789"
 * @param {string} accessToken - VK API token
 * @returns {Promise<string|null>} - direct image URL or null
 */
export async function getVkPhotoSrc(photoPageUrl, accessToken) {
  // Extract owner_id and photo_id from the link
  const match = photoPageUrl.match(/photo(-?\d+)_([0-9]+)/);
  if (!match) return null;

  const owner_id = match[1];
  const photo_id = match[2];

  try {
    // Make a request to VK API
    const result = await bridge.send('VKWebAppCallAPIMethod', {
      method: 'photos.getById',
      request_id: '1',
      params: {
        photos: `${owner_id}_${photo_id}`,
        v: '5.131',
        access_token: accessToken,
      },
    });

    logger.log("VK API response:", result);
    const item = result.response?.[0];
    if (!item || !item.sizes) return null;

    // Choose 'x' size or the largest
    const size = item.sizes.find(s => s.type === "x") || item.sizes[item.sizes.length - 1];
    logger.log("Получен VK фото URL:", size.url);
    return size.url;
  } catch (err) {
    logger.error("Ошибка VK API:", err);
    return null;
  }
}

export async function resolveVkPicturesBatch(items, accessToken, batchSize = 30) {
  // 1️⃣ собираем уникальные vk photo id
  const photoMap = new Map(); // photoPageUrl -> { owner_id, photo_id }

  for (const item of items) {
    const match = item.picture?.match(/photo(-?\d+)_([0-9]+)/);
    if (match) {
      photoMap.set(item.picture, {
        owner_id: match[1],
        photo_id: match[2]
      });
    }
  }

  const uniquePhotos = [...photoMap.entries()];

  // 2️⃣ результат: picture -> direct url
  const resolvedMap = new Map();

  // 3️⃣ режем на батчи
  for (let i = 0; i < uniquePhotos.length; i += batchSize) {
    const batch = uniquePhotos.slice(i, i + batchSize);

    const photosParam = batch
      .map(([, p]) => `${p.owner_id}_${p.photo_id}`)
      .join(',');

    try {
      const result = await bridge.send('VKWebAppCallAPIMethod', {
        method: 'photos.getById',
        request_id: '1',
        params: {
          photos: photosParam,
          v: '5.131',
          access_token: accessToken,
        }
      });

      const response = result.response || [];

      for (const photo of response) {
        const key = `photo${photo.owner_id}_${photo.id}`;

        const size =
          photo.sizes.find(s => s.type === 'x') ||
          photo.sizes[photo.sizes.length - 1];

        resolvedMap.set(key, size?.url ?? null);
      }

      // маленькая пауза между батчами
      await new Promise(r => setTimeout(r, 300));

    } catch (e) {
      console.error('Ошибка батча VK:', e);
    }
  }

  // 4️⃣ собираем итоговый массив (ФОРМАТ НЕ МЕНЯЕМ)
  return items.map(item => {
    const match = item.picture?.match(/photo(-?\d+)_([0-9]+)/);
    const key = match ? `photo${match[1]}_${match[2]}` : null;

    return {
      ...item,
      resolvedPicture: key ? resolvedMap.get(key) ?? null : null
    };
  });
}

