
export const getVkUserUrl = (elem, fetchedUser) => {
    if (process.env.NODE_ENV === 'development') {
        // Running with npm start
        //DEBUG:
        return elem.id == ("vk.com/emmalain");
    } else {
        // Running with npm run deploy (production)
        return elem.id == ("vk.com/" + fetchedUser.screen_name) || elem.id == ("vk.com/id" + fetchedUser.id);
    }
}