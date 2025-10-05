import axios from "axios";
import * as logger from "./Logger.js";
import { MOCKUP_VK_PHOTO } from "../consts.js";

/**
 * Получает прямой URL изображения из ссылки VK photo
 * @param {string} photoPageUrl - пример: "https://vk.com/photo172683390_457260472"
 * @param {string} accessToken - VK API токен
 * @returns {Promise<string|null>} - прямой URL картинки или null
 */
export async function getVkPhotoSrc(photoPageUrl, accessToken) {
  // Извлекаем owner_id и photo_id из ссылки
  const match = photoPageUrl.match(/photo(-?\d+)_([0-9]+)/);
  if (!match) return null;

  const owner_id = match[1];
  const photo_id = match[2];

  try {
    // Делаем запрос к VK API
    var response = MOCKUP_VK_PHOTO;
    if (!window.location.hostname === 'localhost') {
      response = await axios.get(
        `https://api.vk.com/method/photos.getById`,
        {
          params: {
            photos: `${owner_id}_${photo_id}`,
            access_token: accessToken,
            v: "5.131",
          },
        }
      );
    }

    const item = response.data.response?.[0];
    if (!item || !item.sizes) return null;

    // Выбираем размер 'x' или самый большой
    const size = item.sizes.find(s => s.type === "x") || item.sizes[item.sizes.length - 1];
    logger.log("Получен VK фото URL:", size.url);
    return size.url;
  } catch (err) {
    logger.error("Ошибка VK API:", err);
    return null;
  }
}