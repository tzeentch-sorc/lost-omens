import { DEBUG_MODE, DEBUG_VK_IDS, DEV_BUILD } from "../consts";
import * as logger from './Logger.js';

// Мастера записывают ссылку на игрока как придётся: с протоколом и без,
// на vk.com и на vk.ru. Требовать от них единый вид нельзя — им и с таблицами
// неудобно, — поэтому приводим написание к одному виду перед сравнением.
const normalize = (url) => String(url ?? '')
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^(www\.|m\.)/, '')
    .replace(/^vk\.ru\//, 'vk.com/')
    .replace(/\/+$/, '');

const currentVKUser = (elem, fetchedUser) => {
    const link = normalize(elem.id);
    return link === normalize("vk.com/" + fetchedUser.screen_name) ||
        link === normalize("vk.com/id" + fetchedUser.id);
}

export const getVkUserUrl = (elem, mega, fetchedUser) => {
    if (DEV_BUILD) {
        // Дев-сборка — в том числе открытая внутри VK через тоннель:
        // DEBUG_MODE не зависит от того, доступен ли VK.
        //DEBUG:
        switch (DEBUG_MODE[mega]) {
            case "all":
                return true;
            case "none":
                return false;
            case "test":
                return elem.id == DEBUG_VK_IDS[mega];
            case "my":
            default:
                return currentVKUser(elem, fetchedUser);
        }
    } else {
        // Running with npm run deploy (production)
        return currentVKUser(elem, fetchedUser);
    }
}