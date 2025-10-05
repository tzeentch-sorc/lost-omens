import React from 'react';
import {
    Group, Div, Accordion, ContentCard
} from '@vkontakte/vkui';

import * as logger from "../../../util/Logger.js";

const LODescription = ({ room, imageSrc }) => {

    const infoStyle = { color: 'var(--vkui--color_text_subhead)' };

    const data = [
        {
            id: "description",
            title: 'Описание',
        }
    ];

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
                                {logger.log("imageSrc:", imageSrc)}
                                {imageSrc &&
                                <ContentCard
                                    overTitle={"Academy Dropout"}
                                    title={"Норлон Ювиэль"}
                                    description={"Высокий совершеннолетний полуэльф около 195 см ростом, с пышными рыжими волосами, синими глазами, подтянутым телом и заострёнными ушами. На усыпанном веснушками лице обычно никаких эмоций, безучастный взгляд с мешками под глазами и солидный шрам на нижней части левой стороны лица. Носит подвеску в виде камня, чтобы 'маскировать' светящийся на груди сигил неоднозначной формы. Одевается безвкусно и очень просто, словно его одежда не волнует вовсе. Обычно горбится, но, если выпрямится, вероятно, обязательно будет стукаться о дверные косяки."}
                                    caption={`Место жительства: комната ${room}`}
                                    src={imageSrc}
                                    imageObjectFit="contain"
                                    maxHeight={300}
                                />}
                            </Div>
                        </Accordion.Content>
                    </Accordion>
                )
            )}

        </>);

};

export default LODescription;

