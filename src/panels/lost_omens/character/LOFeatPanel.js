import React from 'react';
import {
    Group, Div, Accordion
} from '@vkontakte/vkui';

import LOFeats from './LOFeats';

const LOFeatPanel = ({ featlist }) => {

    const infoStyle = { color: 'var(--vkui--color_text_subhead)' };

    const data = [
        {
            id: "feats",
            title: 'Черты',
        }
    ];

    const [openId, setOpenId] = React.useState();

    return (
        <Group>

            {data.map(

                ({ id, title }) => featlist && featlist[0] != "" && (
                    <Accordion
                        key={id}
                        expanded={openId === id}
                        onChange={(e) => (e ? setOpenId(id) : setOpenId(null))}
                    >
                        <Accordion.Summary iconPosition="before"><b>{title}</b></Accordion.Summary>
                        <Accordion.Content>
                            <Div style={infoStyle}>
                                <LOFeats featlist={featlist}/>
                            </Div>
                        </Accordion.Content>
                    </Accordion>
                )
            )}

        </Group>);
    
};

export default LOFeatPanel;