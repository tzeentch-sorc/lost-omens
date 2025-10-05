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