import React from 'react';
import {
    Div, Accordion
} from '@vkontakte/vkui';

// Список раскрывающихся разделов, из которых одновременно открыт только один.
// sections: [{ id, title, content }] — уже отфильтрованные и готовые к отрисовке.
const AccordionList = ({ sections }) => {

    const infoStyle = { color: 'var(--vkui--color_text_subhead)' };

    const [openId, setOpenId] = React.useState();

    return sections.map(({ id, title, content }) => (
        <Accordion
            key={id}
            expanded={openId === id}
            onChange={(e) => (e ? setOpenId(id) : setOpenId(null))}
        >
            <Accordion.Summary iconPosition="before"><b>{title}</b></Accordion.Summary>
            <Accordion.Content>
                <Div style={infoStyle}>
                    {content}
                </Div>
            </Accordion.Content>
        </Accordion>
    ));
};

export default AccordionList;
