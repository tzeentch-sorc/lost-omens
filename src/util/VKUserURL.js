import { DEBUG_MODE, DEBUG_VK_IDS } from "../consts";
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
    if (process.env.NODE_ENV === 'development') {
        // Running with npm start
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