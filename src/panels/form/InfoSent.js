import { List, Cell } from "@vkontakte/vkui";
import React from "react";

const InfoSent = () => {

    return (
        <List>
            <Cell multiline>
                Спасибо!
            </Cell>
            <Cell multiline>
                Твой ответ успешно отправлен.
            </Cell>
            <Cell multiline>
                Мы очень ценим твое время и участие, и будем рады видеть тебя на наших будущих мероприятиях!
            </Cell>
        </List>
    );

};

export default InfoSent;