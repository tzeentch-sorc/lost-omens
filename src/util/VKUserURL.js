
export const getVkUserUrl = (elem, fetchedUser) => {
    if (process.env.NODE_ENV === 'development') {
        // Running with npm start
        //DEBUG:
        //return elem.id == ("vk.com/id166159611");
        return elem.id == ("https://vk.com/nancy_drukovishna");

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