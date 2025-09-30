import React from 'react';
import {
    Group, Div, Accordion, ContentCard
} from '@vkontakte/vkui';

const LODescription = ({ room }) => {

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
                                <ContentCard
                                    overTitle={"Academy Dropout"}
                                    title={"Норлон Ювиэль"}
                                    description={"Высокий совершеннолетний полуэльф около 195 см ростом, с пышными рыжими волосами, синими глазами, подтянутым телом и заострёнными ушами. На усыпанном веснушками лице обычно никаких эмоций, безучастный взгляд с мешками под глазами и солидный шрам на нижней части левой стороны лица. Носит подвеску в виде камня, чтобы 'маскировать' светящийся на груди сигил неоднозначной формы. Одевается безвкусно и очень просто, словно его одежда не волнует вовсе. Обычно горбится, но, если выпрямится, вероятно, обязательно будет стукаться о дверные косяки."}
                                    caption={`Место жительства: комната ${room}`}
                                    src="https://sun9-56.userapi.com/s/v1/ig2/BrpzqZqH7jpxHaDLCLW-POfyb16-C3eTiN8Hx3uGLlYCOen3OGM77elPad4ilucVRNRjPom1kCK_d8E_LagcI0VU.jpg?quality=95&as=32x33,48x50,72x74,108x112,160x165,240x248,360x372,480x496,540x559,640x662,720x745,1080x1117,1280x1324,1440x1489,1980x2048&from=bu&cs=1280x0"
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

