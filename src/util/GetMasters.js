import bridge from '@vkontakte/vk-bridge';

import { VKToken, MOCKUP_FETCHED_USER, USE_MOCK_VK } from '../consts.js';
import * as logger from './Logger.js';

// Мастера кампании: в таблице лежат только VK id, имена и аватарки отдаёт VK.
// Локально bridge недоступен, поэтому подставляется мок из config.json.
export async function getMasters(mastersSettings) {
    const masterData = await mastersSettings.getQueryAll();
    const userIds = masterData.map(elem => elem.id).join(', ');
    logger.log("masterData: ", masterData);
    logger.log("userIds: ", userIds);

    if (USE_MOCK_VK) {
        return [MOCKUP_FETCHED_USER];
    }

    return await bridge
        .send('VKWebAppCallAPIMethod', {
            method: 'users.get',
            params: {
                user_ids: userIds,
                v: '5.131',
                fields: 'screen_name, photo_200',
                access_token: VKToken
            }
        }).then(resp => { return resp.response });
}
