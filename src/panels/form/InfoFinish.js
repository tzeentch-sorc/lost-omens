import { List, Cell } from "@vkontakte/vkui";
import React from "react";

const InfoFinish = () => {

    return (
        <List>
            <Cell multiline>
                <b>Почти готово!</b>
            </Cell>
            <Cell multiline>
                Здесь можно оставить обратную связь по любому из направлений. 
                Если есть какие-нибудь пожелания, замечания, комментарии или пожелания - не стесняйся оставлять их тут!
            </Cell>
        </List>
    );

};

export default InfoFinish;