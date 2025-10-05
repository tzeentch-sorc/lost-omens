import React from 'react';
import {
    Group, Div, Accordion, ContentCard
} from '@vkontakte/vkui';

import * as logger from "../../../util/Logger.js";
import { func } from 'prop-types';

const LODescription = ({ room, imageSrc, fullname, backstory, description, race }) => {

    const infoStyle = { color: 'var(--vkui--color_text_subhead)' };

    const data = [
        {
            id: "description",
            title: 'Описание',
        }
    ];

    function roomNumber(room) {
        if (!room) {
            return "Таверна Аврора";
        }
        const isOnlyDigits = /^\d+$/.test(room);
        if (isOnlyDigits) {
            return `Комната ${room}`;
        }
        return room;
    }

    const [openId, setOpenId] = React.useState();

    return (
        <>
            {data.map(

                ({ id, title }) => (
                    <Accordion
                        key={id}
                        expanded={openId === id}
                        onChange={(e) => (e ? setOpenId(id) : setOpenId(null))}
                    >
                        <Accordion.Summary iconPosition="before"><b>{title}</b></Accordion.Summary>
                        <Accordion.Content>
                            <Div style={infoStyle}>
                                <ContentCard
                                    overTitle={backstory}
                                    title={`${fullname}, ${race}`}
                                    description={description}
                                    caption={`Место жительства: ${roomNumber(room)}`}
                                    src={imageSrc}
                                    imageObjectFit="contain"
                                    maxHeight={300}
                                />
                            </Div>
                        </Accordion.Content>
                    </Accordion>
                )
            )}

        </>);

};

export default LODescription;

