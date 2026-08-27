import { DEBUG_MODE, DEBUG_VK_IDS, DEV_BUILD } from "../consts";
import * as logger from './Logger.js';

const currentVKUser = (elem, fetchedUser) => {
    return elem.id == ("vk.com/" + fetchedUser.screen_name) ||
        elem.id == ("vk.com/id" + fetchedUser.id) ||
        elem.id == ("https://vk.com/id" + fetchedUser.id) ||
        elem.id == ("https://vk.com/" + fetchedUser.screen_name) ||
        elem.id == ("vk.ru/" + fetchedUser.screen_name) ||
        elem.id == ("vk.ru/id" + fetchedUser.id) ||
        elem.id == ("https://vk.ru/id" + fetchedUser.id) ||
        elem.id == ("https://vk.ru/" + fetchedUser.screen_name);
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