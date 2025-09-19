import { DEBUG_MODE } from "../consts";

export const getVkUserUrl = (elem, fetchedUser) => {
    if (process.env.NODE_ENV === 'development') {
        // Running with npm start
        console.log("DEBUG_MODE:", DEBUG_MODE);
        //DEBUG:
        switch(DEBUG_MODE) {
            case 'LO':
            case 'SF':
            case 'HG':
                return elem.id == ("vk.com/dragon_chronicler");
            case 'SM':
                return elem.id == ("vk.com/id166159611");
            case 'RG':
                return elem.id == ("https://vk.com/nancy_drukovishna");
            default:
                return true;
        }  

    } else {
        // Running with npm run deploy (production)
        return elem.id == ("vk.com/" + fetchedUser.screen_name) ||
            elem.id == ("vk.com/id" + fetchedUser.id) ||
            elem.id == ("https://vk.com/id" + fetchedUser.id)||
            elem.id == ("https://vk.com/" + fetchedUser.screen_name)||
            elem.id == ("vk.ru/" + fetchedUser.screen_name) ||
            elem.id == ("vk.ru/id" + fetchedUser.id) ||
            elem.id == ("https://vk.ru/id" + fetchedUser.id)||
            elem.id == ("https://vk.ru/" + fetchedUser.screen_name);
    }
}